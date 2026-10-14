"""HTTP API for the IkeOru Sales and HR two-path MVP."""

from __future__ import annotations

import secrets
import time
from contextlib import asynccontextmanager
from dataclasses import dataclass
from typing import Any, Generator

from fastapi import BackgroundTasks, Depends, FastAPI, Header, Query, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from sqlalchemy import select
from sqlalchemy.orm import Session, sessionmaker

from .config import Settings
from .database import create_database_engine, initialize_database, make_session_factory
from .models import AuthSession, Membership, User, WorkflowRun, utc_now
from .schemas import (
    AssessmentAttemptRequest,
    DemoSessionRequest,
    IndependentExerciseAttemptRequest,
    LessonCompletionRequest,
    LessonProgressRequest,
    PortfolioPatchRequest,
    HR_WORKFLOW_KEY,
    SALES_WORKFLOW_KEY,
    parse_run_request,
)
from .seed import create_demo_identity, get_workflow_version, seed_catalog
from .services import (
    ServiceError,
    complete_lesson,
    create_run,
    event_to_dict,
    organization_progress,
    public_lesson,
    public_independent_exercise,
    patch_portfolio,
    private_portfolio,
    public_assessment,
    public_badge,
    public_portfolio,
    recover_interrupted_runs,
    record_lesson_progress,
    submit_independent_exercise,
    replay_example,
    run_to_dict,
    submit_assessment,
    workflow_catalog_or_error,
    process_run,
)


SESSION_COOKIE = "ikeoru_session"
CSRF_COOKIE = "ikeoru_csrf"


@dataclass(frozen=True)
class CurrentIdentity:
    user: User
    membership: Membership
    auth_session: AuthSession


def _error_payload(request: Request, error: ServiceError) -> dict[str, Any]:
    return {
        "code": error.code,
        "message": error.message,
        "field_errors": error.field_errors,
        "retryable": error.retryable,
        "request_id": getattr(request.state, "request_id", None),
    }


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or Settings.from_env()
    engine = create_database_engine(settings)
    session_factory = make_session_factory(engine)

    @asynccontextmanager
    async def lifespan(application: FastAPI) -> Generator[None, None, None]:
        initialize_database(engine)
        database = session_factory()
        try:
            seed_catalog(database)
            recover_interrupted_runs(database)
        finally:
            database.close()
        yield
        engine.dispose()

    application = FastAPI(title="IkeOru API", version="0.1.0", lifespan=lifespan)
    application.state.settings = settings
    application.state.session_factory = session_factory
    application.state.demo_rate_log: dict[str, list[float]] = {}
    application.add_middleware(
        CORSMiddleware,
        allow_origins=list(settings.cors_origins),
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
        allow_headers=["Content-Type", "Idempotency-Key", "X-CSRF-Token", "X-Request-ID"],
        expose_headers=["X-Request-ID"],
        max_age=600,
    )

    @application.middleware("http")
    async def request_id_middleware(request: Request, call_next: Any) -> Response:
        request.state.request_id = request.headers.get("X-Request-ID") or secrets.token_urlsafe(12)
        response = await call_next(request)
        response.headers["X-Request-ID"] = request.state.request_id
        return response

    @application.exception_handler(ServiceError)
    async def service_error_handler(request: Request, error: ServiceError) -> JSONResponse:
        return JSONResponse(status_code=error.status_code, content=_error_payload(request, error))

    @application.exception_handler(RequestValidationError)
    async def validation_error_handler(request: Request, error: RequestValidationError) -> JSONResponse:
        field_errors: dict[str, str] = {}
        for item in error.errors():
            location = [str(part) for part in item.get("loc", ()) if part not in {"body", "query", "path"}]
            field = ".".join(location) or "request"
            field_errors[field] = "Enter a valid value."
        validation_error = ServiceError(
            "validation_error",
            "Some fields need attention.",
            status_code=422,
            field_errors=field_errors,
        )
        return JSONResponse(status_code=422, content=_error_payload(request, validation_error))

    @application.exception_handler(Exception)
    async def unexpected_error_handler(request: Request, _error: Exception) -> JSONResponse:
        # Never emit tracebacks, provider metadata, or private inputs in the API.
        unexpected = ServiceError("internal_error", "The service could not complete that request.", status_code=500)
        return JSONResponse(status_code=500, content=_error_payload(request, unexpected))

    def get_database() -> Generator[Session, None, None]:
        database = session_factory()
        try:
            yield database
        finally:
            database.close()

    def get_identity(request: Request, database: Session = Depends(get_database)) -> CurrentIdentity:
        raw_token = request.cookies.get(SESSION_COOKIE)
        if not raw_token:
            raise ServiceError("session_required", "Start a demo session to continue.", status_code=401)
        auth_session = database.scalar(
            select(AuthSession).where(AuthSession.token_hash == settings.token_digest(raw_token))
        )
        if auth_session is None:
            raise ServiceError("session_required", "Your demo session is unavailable. Start a new session.", status_code=401)
        if auth_session.expires_at.replace(tzinfo=auth_session.expires_at.tzinfo or utc_now().tzinfo) <= utc_now():
            database.delete(auth_session)
            database.commit()
            raise ServiceError("session_expired", "Your demo session has expired. Start a new session.", status_code=401)
        user = database.get(User, auth_session.user_id)
        membership = database.scalar(select(Membership).where(Membership.user_id == auth_session.user_id))
        if user is None or membership is None:
            raise ServiceError("session_required", "Your demo session is unavailable. Start a new session.", status_code=401)
        return CurrentIdentity(user=user, membership=membership, auth_session=auth_session)

    def require_write(request: Request, identity: CurrentIdentity = Depends(get_identity)) -> CurrentIdentity:
        origin = request.headers.get("origin", "").rstrip("/")
        own_origin = str(request.base_url).rstrip("/")
        if origin and origin not in settings.cors_origins and origin != own_origin:
            raise ServiceError("origin_not_allowed", "This request origin is not allowed.", status_code=403)
        # Every cookie-authenticated write uses a session-bound double-submit
        # token. The demo-session bootstrap is the only exception.
        csrf_header = request.headers.get("X-CSRF-Token")
        csrf_cookie = request.cookies.get(CSRF_COOKIE)
        if (
            not csrf_header
            or not csrf_cookie
            or not secrets.compare_digest(csrf_header, csrf_cookie)
            or not secrets.compare_digest(settings.token_digest(csrf_header), identity.auth_session.csrf_token_hash)
        ):
            raise ServiceError("csrf_failed", "Refresh your demo session before trying again.", status_code=403)
        return identity

    def enforce_demo_rate_limit(request: Request) -> None:
        client_key = request.client.host if request.client else "unknown"
        now = time.monotonic()
        recent = [timestamp for timestamp in application.state.demo_rate_log.get(client_key, []) if now - timestamp < 60]
        if len(recent) >= 20:
            raise ServiceError("demo_rate_limited", "Please wait a moment before starting another demo session.", status_code=429, retryable=True)
        recent.append(now)
        application.state.demo_rate_log[client_key] = recent

    @application.get("/api/health")
    def health() -> dict[str, str]:
        return {"status": "ok", "product": "IkeOru"}

    @application.post("/api/demo/session", status_code=201)
    def create_demo_session(request: Request, body: DemoSessionRequest, response: Response) -> dict[str, Any]:
        origin = request.headers.get("origin", "").rstrip("/")
        own_origin = str(request.base_url).rstrip("/")
        if origin and origin not in settings.cors_origins and origin != own_origin:
            raise ServiceError("origin_not_allowed", "This request origin is not allowed.", status_code=403)
        enforce_demo_rate_limit(request)
        database = session_factory()
        try:
            user, organization, membership, raw_token, csrf_token = create_demo_identity(
                database,
                settings,
                role=body.role,
                profile=body.profile,
            )
        finally:
            database.close()
        max_age = 8 * 60 * 60
        response.set_cookie(
            SESSION_COOKIE,
            raw_token,
            httponly=True,
            secure=settings.secure_cookies,
            samesite="lax",
            max_age=max_age,
            path="/",
        )
        response.set_cookie(
            CSRF_COOKIE,
            csrf_token,
            httponly=False,
            secure=settings.secure_cookies,
            samesite="lax",
            max_age=max_age,
            path="/",
        )
        return {
            "user": {
                "display_name": user.display_name,
                "role": membership.role,
                "is_demo": True,
                "is_seeded_sample": user.is_seeded_sample,
            },
            "organization": {"id": organization.id, "name": organization.name, "is_demo": True},
            "csrf_token": csrf_token,
            "notice": "Synthetic demo data only. Seeded profiles are prepared samples, not newly earned live achievements." if body.profile == "seeded" else "Synthetic demo data only.",
        }

    @application.get("/api/me")
    def get_me(
        request: Request,
        database: Session = Depends(get_database),
        identity: CurrentIdentity = Depends(get_identity),
    ) -> dict[str, Any]:
        from .models import Organization

        organization = database.get(Organization, identity.membership.organization_id)
        return {
            "display_name": identity.user.display_name,
            "role": identity.membership.role,
            "organization": {"id": identity.membership.organization_id, "name": organization.name if organization else None, "is_demo": True},
            "is_demo": identity.user.is_demo,
            "demo": identity.user.is_demo,
            "is_seeded_sample": identity.user.is_seeded_sample,
            "organization_id": identity.membership.organization_id,
            "organization_name": organization.name if organization else None,
            "csrf_token": request.cookies.get(CSRF_COOKIE),
        }

    @application.get("/api/domains")
    def list_domains(database: Session = Depends(get_database)) -> dict[str, Any]:
        from .models import Domain

        domains = database.scalars(select(Domain).order_by(Domain.sort_order)).all()
        domain_payload = [
                {
                    "key": domain.key,
                    "title": domain.title,
                    "availability": domain.availability,
                    "is_runnable": domain.key in {"sales", "human-resources"} and domain.availability == "active",
                }
                for domain in domains
            ]
        return {"domains": domain_payload, "data": domain_payload}

    @application.get("/api/workflows/{key}")
    def get_workflow(key: str, database: Session = Depends(get_database)) -> dict[str, Any]:
        workflow, version = workflow_catalog_or_error(database, key)
        return {
            "key": workflow.key,
            "title": workflow.title,
            "version": version.version,
            "rubric_version": version.rubric_version,
            "definition": version.definition,
        }

    @application.get("/api/lessons/{key}")
    def get_lesson(key: str, database: Session = Depends(get_database), identity: CurrentIdentity = Depends(get_identity)) -> dict[str, Any]:
        return public_lesson(database, user=identity.user, key=key)

    @application.post("/api/lessons/{key}/progress")
    def save_lesson_progress(
        key: str,
        body: LessonProgressRequest,
        database: Session = Depends(get_database),
        identity: CurrentIdentity = Depends(require_write),
    ) -> dict[str, Any]:
        return record_lesson_progress(database, user=identity.user, key=key, request=body)

    @application.post("/api/lessons/{key}/complete")
    def mark_lesson_complete(
        key: str,
        body: LessonCompletionRequest | None = None,
        database: Session = Depends(get_database),
        identity: CurrentIdentity = Depends(require_write),
    ) -> dict[str, Any]:
        return complete_lesson(database, user=identity.user, key=key, completion=body)

    @application.get("/api/lessons/{key}/independent-exercise")
    def get_independent_exercise(
        key: str,
        database: Session = Depends(get_database),
        identity: CurrentIdentity = Depends(get_identity),
    ) -> dict[str, Any]:
        return public_independent_exercise(database, user=identity.user, key=key)

    @application.post("/api/lessons/{key}/independent-exercise")
    def post_independent_exercise(
        key: str,
        body: IndependentExerciseAttemptRequest,
        database: Session = Depends(get_database),
        identity: CurrentIdentity = Depends(require_write),
    ) -> dict[str, Any]:
        return submit_independent_exercise(database, user=identity.user, key=key, request=body)

    @application.post("/api/workflows/{key}/runs", status_code=202)
    def start_run(
        key: str,
        body: dict[str, Any],
        background_tasks: BackgroundTasks,
        idempotency_key: str | None = Header(default=None, alias="Idempotency-Key"),
        database: Session = Depends(get_database),
        identity: CurrentIdentity = Depends(require_write),
    ) -> dict[str, Any]:
        if key not in {SALES_WORKFLOW_KEY, HR_WORKFLOW_KEY}:
            raise ServiceError("workflow_unavailable", "This workflow is not available.", status_code=404)
        try:
            run_request = parse_run_request(key, body)
        except ValidationError as error:
            field_errors: dict[str, str] = {}
            for item in error.errors():
                location = [str(part) for part in item.get("loc", ()) if part not in {"body", "query", "path"}]
                field_errors[".".join(location) or "request"] = "Enter a valid value."
            raise ServiceError(
                "validation_error",
                "Some fields need attention.",
                status_code=422,
                field_errors=field_errors,
            ) from None
        except ValueError:
            raise ServiceError("workflow_unavailable", "This workflow is not available.", status_code=404) from None
        run, idempotent_replay = create_run(
            database,
            settings,
            user=identity.user,
            membership=identity.membership,
            auth_session=identity.auth_session,
            request=run_request,
            header_idempotency_key=idempotency_key,
            workflow_key=key,
        )
        if not idempotent_replay:
            background_tasks.add_task(process_run, session_factory, settings, run.id)
        return {"run_id": run.id, "idempotent_replay": idempotent_replay, "run": run_to_dict(database, run)}

    @application.get("/api/runs/{run_id}")
    def get_run(run_id: str, database: Session = Depends(get_database), identity: CurrentIdentity = Depends(get_identity)) -> dict[str, Any]:
        run = database.scalar(select(WorkflowRun).where(WorkflowRun.id == run_id, WorkflowRun.owner_id == identity.user.id))
        if run is None:
            raise ServiceError("run_unavailable", "Run unavailable.", status_code=404)
        return run_to_dict(database, run)

    @application.get("/api/runs/{run_id}/events")
    def get_run_events(
        run_id: str,
        after: int = Query(default=0, ge=0),
        database: Session = Depends(get_database),
        identity: CurrentIdentity = Depends(get_identity),
    ) -> dict[str, Any]:
        from .models import RunEvent

        run = database.scalar(select(WorkflowRun).where(WorkflowRun.id == run_id, WorkflowRun.owner_id == identity.user.id))
        if run is None:
            raise ServiceError("run_unavailable", "Run unavailable.", status_code=404)
        events = database.scalars(
            select(RunEvent)
            .where(RunEvent.run_id == run.id, RunEvent.sequence > after)
            .order_by(RunEvent.sequence)
        ).all()
        return {"events": [event_to_dict(event) for event in events], "next_after": events[-1].sequence if events else after}

    @application.get("/api/assessments/{key}")
    def get_assessment(key: str, database: Session = Depends(get_database), _identity: CurrentIdentity = Depends(get_identity)) -> dict[str, Any]:
        return public_assessment(database, key)

    @application.post("/api/assessments/{key}/attempts")
    def post_assessment_attempt(
        key: str,
        body: AssessmentAttemptRequest,
        database: Session = Depends(get_database),
        identity: CurrentIdentity = Depends(require_write),
    ) -> dict[str, Any]:
        return submit_assessment(database, user=identity.user, key=key, request=body)

    @application.get("/api/me/portfolio")
    def get_private_portfolio(database: Session = Depends(get_database), identity: CurrentIdentity = Depends(get_identity)) -> dict[str, Any]:
        return private_portfolio(database, identity.user)

    @application.patch("/api/me/portfolio")
    def update_portfolio(
        body: PortfolioPatchRequest,
        database: Session = Depends(get_database),
        identity: CurrentIdentity = Depends(require_write),
    ) -> dict[str, Any]:
        return patch_portfolio(database, user=identity.user, patch=body)

    @application.get("/api/p/{public_id}")
    def get_public_portfolio(public_id: str, database: Session = Depends(get_database)) -> dict[str, Any]:
        portfolio = public_portfolio(database, public_id)
        if portfolio is None:
            raise ServiceError("portfolio_unavailable", "Portfolio unavailable.", status_code=404)
        return portfolio

    @application.get("/api/badges/{verification_id}")
    def get_public_badge(verification_id: str, database: Session = Depends(get_database)) -> dict[str, Any]:
        badge = public_badge(database, verification_id)
        if badge is None:
            raise ServiceError("badge_unavailable", "Badge unavailable.", status_code=404)
        return badge

    @application.get("/api/organizations/{organization_id}/progress")
    def get_organization_progress(
        organization_id: int,
        database: Session = Depends(get_database),
        identity: CurrentIdentity = Depends(get_identity),
    ) -> dict[str, Any]:
        return organization_progress(database, requester=identity.user, organization_id=organization_id)

    @application.get("/api/examples/{key}")
    def get_example(key: str) -> dict[str, Any]:
        return replay_example(key)

    return application


app = create_app()
