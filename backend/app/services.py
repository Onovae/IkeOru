"""Server-owned workflow, assessment, portfolio, and authorization services."""

from __future__ import annotations

import hashlib
import json
from datetime import datetime, timedelta, timezone
from typing import Any
from uuid import uuid4

from sqlalchemy import func, select
from sqlalchemy.orm import Session, sessionmaker

from .ai import AIAdapterError, AIOutputInvalid, AIProviderUnavailable, get_classifier
from .catalog import (
    ACADEMY_CHECK_ANSWERS,
    ACADEMY_CHECK_FEEDBACK,
    ASSESSMENT_ANSWERS_BY_KEY,
    ASSESSMENT_FEEDBACK_BY_KEY,
    BADGE_KEY_BY_WORKFLOW,
    BADGE_SKILLS_BY_WORKFLOW,
    HR_WORKFLOW_KEY,
    INDEPENDENT_EXERCISE_ANSWERS,
    INDEPENDENT_EXERCISE_FEEDBACK,
    INDEPENDENT_EXERCISES,
    PRACTICAL_ANSWERS_BY_KEY,
    SALES_WORKFLOW_KEY,
    WORKFLOW_KEY,
)
from .config import Settings
from .models import (
    Assessment,
    AssessmentAttempt,
    AuthSession,
    BadgeAward,
    BadgeDefinition,
    FollowUpTask,
    LessonProgress,
    Membership,
    Portfolio,
    PortfolioProject,
    Progress,
    RunEvent,
    User,
    Workflow,
    WorkflowRun,
    WorkflowVersion,
    utc_now,
)
from .schemas import (
    AssessmentAttemptRequest,
    CandidateInput,
    CandidateScreeningPayload,
    ClassificationPayload,
    HRCandidateScreeningRunRequest,
    IndependentExerciseAttemptRequest,
    JobRequirementsInput,
    LeadInput,
    LessonCompletionRequest,
    LessonProgressRequest,
    PortfolioPatchRequest,
    RunRequest,
)
from .seed import get_workflow_version, opaque_id


class ServiceError(RuntimeError):
    def __init__(
        self,
        code: str,
        message: str,
        *,
        status_code: int = 400,
        retryable: bool = False,
        field_errors: dict[str, str] | None = None,
    ) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code
        self.retryable = retryable
        self.field_errors = field_errors or {}


def _utc(value: datetime) -> datetime:
    return value.replace(tzinfo=timezone.utc) if value.tzinfo is None else value.astimezone(timezone.utc)


def iso(value: datetime | None) -> str | None:
    if value is None:
        return None
    return _utc(value).isoformat().replace("+00:00", "Z")


def workflow_catalog_or_error(database: Session, key: str) -> tuple[Workflow, WorkflowVersion]:
    catalog = get_workflow_version(database, key)
    if catalog is None:
        raise ServiceError("workflow_unavailable", "This workflow is not available.", status_code=404)
    return catalog


def append_event(
    database: Session,
    run: WorkflowRun,
    step_id: str,
    status: str,
    message: str,
    payload: dict[str, Any] | None = None,
) -> RunEvent:
    # A run can add multiple events before its next commit. Flush pending
    # inserts first so the sequence query sees those in-transaction events;
    # otherwise consecutive calls can both choose the same sequence number.
    database.flush()
    current_sequence = database.scalar(
        select(func.coalesce(func.max(RunEvent.sequence), 0)).where(RunEvent.run_id == run.id)
    )
    event = RunEvent(
        run_id=run.id,
        sequence=int(current_sequence or 0) + 1,
        step_id=step_id,
        status=status,
        safe_message=message,
        safe_payload=payload,
    )
    database.add(event)
    return event


def _task_to_dict(task: FollowUpTask | None) -> dict[str, Any] | None:
    if task is None:
        return None
    return {
        "kind": task.kind,
        "due_at": iso(task.due_at),
        "summary": task.summary,
        "status": task.status,
    }


def _public_run_result(safe_output: dict[str, Any]) -> dict[str, Any]:
    """Remove developer-only diagnostics from learner-facing run responses."""

    public_result = dict(safe_output)
    failure = public_result.get("failure")
    if isinstance(failure, dict) and "diagnostic" in failure:
        public_result["failure"] = {key: value for key, value in failure.items() if key != "diagnostic"}
    return public_result


def _workflow_for_run(database: Session, run: WorkflowRun) -> tuple[Workflow | None, WorkflowVersion | None]:
    workflow_version = database.get(WorkflowVersion, run.workflow_version_id)
    if workflow_version is None:
        return None, None
    return database.get(Workflow, workflow_version.workflow_id), workflow_version


def run_to_dict(database: Session, run: WorkflowRun) -> dict[str, Any]:
    task = database.scalar(select(FollowUpTask).where(FollowUpTask.run_id == run.id))
    workflow, workflow_version = _workflow_for_run(database, run)
    workflow_key = workflow.key if workflow is not None else "unavailable"
    safe_output = run.safe_output if isinstance(run.safe_output, dict) else {}
    classification = safe_output.get("classification")
    classification = classification if isinstance(classification, dict) else {}
    screening = safe_output.get("screening")
    screening = screening if isinstance(screening, dict) else {}
    result: dict[str, Any] = {
        "id": run.id,
        "workflow_key": workflow_key,
        "workflow_version": workflow_version.version if workflow_version else None,
        "state": run.state,
        # Friendly aliases retained alongside the canonical persisted names.
        "status": run.state,
        "mode": run.mode,
        "is_replay": False,
        "eligible_for_achievement": run.eligible_for_achievement,
        "eligible_for_progress": run.eligible_for_achievement,
        "priority": classification.get("priority"),
        "explanation": classification.get("explanation") or screening.get("explanation"),
        "evidence": classification.get("evidence", screening.get("evidence", [])),
        "missing_fields": classification.get("missing_fields", screening.get("missing_fields", [])),
        "suggested_next_step": classification.get("suggested_next_step") or screening.get("suggested_next_step"),
        "recommendation": screening.get("recommendation"),
        "human_review_required": screening.get("human_review_required"),
        "evidence_status": screening.get("evidence_status"),
        "criteria_evidence": screening.get("criteria_evidence", []),
        "configuration": run.configuration,
        "result": _public_run_result(safe_output) if safe_output else None,
        "task": _task_to_dict(task),
        "retry_of": run.retry_of_id,
        "created_at": iso(run.created_at),
        "updated_at": iso(run.updated_at),
    }
    return result


def event_to_dict(event: RunEvent) -> dict[str, Any]:
    return {
        "sequence": event.sequence,
        "step_id": event.step_id,
        "status": event.status,
        "message": event.safe_message,
        "payload": event.safe_payload,
        "created_at": iso(event.created_at),
    }


def _payload_hash(workflow_key: str, request: RunRequest | HRCandidateScreeningRunRequest) -> str:
    if workflow_key == HR_WORKFLOW_KEY and isinstance(request, HRCandidateScreeningRunRequest):
        canonical = {
            "candidate": request.candidate.model_dump(mode="json"),
            "job_requirements": request.job_requirements.model_dump(mode="json"),
            "trigger": request.trigger,
            "review_rule": request.review_rule,
        }
    elif workflow_key == SALES_WORKFLOW_KEY and isinstance(request, RunRequest):
        canonical = {
            "lead": request.lead.model_dump(mode="json"),
            "trigger": "new_lead",
            "hot_follow_up_rule": request.hot_follow_up_rule,
        }
    else:
        raise ServiceError("workflow_input_mismatch", "The input does not match this workflow.", status_code=422)
    serialized = json.dumps(canonical, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    return hashlib.sha256(serialized.encode("utf-8")).hexdigest()


def create_run(
    database: Session,
    settings: Settings,
    *,
    user: User,
    membership: Membership,
    auth_session: AuthSession,
    request: RunRequest | HRCandidateScreeningRunRequest,
    header_idempotency_key: str | None,
    workflow_key: str | None = None,
) -> tuple[WorkflowRun, bool]:
    inferred_key = HR_WORKFLOW_KEY if isinstance(request, HRCandidateScreeningRunRequest) else SALES_WORKFLOW_KEY
    workflow_key = workflow_key or inferred_key
    if workflow_key != inferred_key:
        raise ServiceError("workflow_input_mismatch", "The input does not match this workflow.", status_code=422)
    workflow, workflow_version = workflow_catalog_or_error(database, workflow_key)
    if isinstance(request, RunRequest) and request.trigger not in {"new_lead", "new_lead_submitted"}:
        raise ServiceError("invalid_trigger", "Select the supported New lead submitted trigger.", field_errors={"trigger": "Unsupported trigger."})
    if isinstance(request, HRCandidateScreeningRunRequest) and request.trigger != "candidate_submitted":
        raise ServiceError("invalid_trigger", "Select the supported synthetic candidate trigger.", field_errors={"trigger": "Unsupported trigger."})
    if header_idempotency_key and request.idempotency_key and header_idempotency_key != request.idempotency_key:
        raise ServiceError("idempotency_key_mismatch", "The request idempotency keys do not match.", status_code=400)

    payload_hash = _payload_hash(workflow_key, request)
    idempotency_key = header_idempotency_key or request.idempotency_key or f"payload-{payload_hash}"
    existing = database.scalar(
        select(WorkflowRun).where(
            WorkflowRun.owner_id == user.id,
            WorkflowRun.workflow_version_id == workflow_version.id,
            WorkflowRun.idempotency_key == idempotency_key,
        )
    )
    if existing is not None:
        if existing.payload_hash != payload_hash:
            raise ServiceError(
                "idempotency_conflict",
                "This idempotency key was already used with different input.",
                status_code=409,
            )
        return existing, True

    if settings.ai_mode == "live" and (not settings.openai_api_key or not settings.openai_model):
        raise ServiceError(
            "live_ai_not_configured",
            "Live AI is not configured. Use the labelled replay or configure the server.",
            status_code=503,
            retryable=False,
        )

    active_run = database.scalar(
        select(WorkflowRun).where(
            WorkflowRun.session_id == auth_session.id,
            WorkflowRun.state.in_(("queued", "running")),
        )
    )
    if active_run is not None:
        raise ServiceError(
            "run_in_progress",
            "A run is already in progress for this demo session.",
            status_code=409,
            retryable=True,
        )

    today_start = utc_now().replace(hour=0, minute=0, second=0, microsecond=0)
    if settings.ai_mode == "live":
        used_live_runs = database.scalar(
            select(func.count(WorkflowRun.id)).where(
                WorkflowRun.mode == "live",
                WorkflowRun.created_at >= today_start,
            )
        )
        if int(used_live_runs or 0) >= settings.live_run_daily_limit:
            raise ServiceError(
                "live_run_limit_reached",
                "The live AI run limit has been reached. Try the labelled replay instead.",
                status_code=429,
                retryable=False,
            )

    if isinstance(request, HRCandidateScreeningRunRequest):
        configuration = {"trigger": request.trigger, "review_rule": request.review_rule}
        input_data = {
            "candidate": request.candidate.model_dump(mode="json"),
            "job_requirements": request.job_requirements.model_dump(mode="json"),
        }
        received_message = "Synthetic candidate and job criteria received for the guided workflow."
    else:
        configuration = {"trigger": "new_lead", "hot_follow_up_rule": request.hot_follow_up_rule}
        input_data = request.lead.model_dump(mode="json")
        received_message = "Synthetic lead received for the guided workflow."

    run = WorkflowRun(
        id=str(uuid4()),
        owner_id=user.id,
        organization_id=membership.organization_id,
        session_id=auth_session.id,
        workflow_version_id=workflow_version.id,
        state="queued",
        configuration=configuration,
        input_data=input_data,
        safe_output=None,
        mode=settings.ai_mode,
        eligible_for_achievement=False,
        idempotency_key=idempotency_key,
        payload_hash=payload_hash,
    )
    database.add(run)
    database.flush()
    append_event(database, run, "received", "completed", received_message)
    database.commit()
    database.refresh(run)
    return run, False


def _safe_task_summary(priority: str, lead: LeadInput) -> str:
    if priority == "NEEDS_REVIEW":
        return f"Review the supplied lead context for {lead.company}."
    return f"Follow up with {lead.name} at {lead.company} about the supplied business need."


def _policy_for(classification: ClassificationPayload, rule: str, lead: LeadInput) -> dict[str, Any]:
    if classification.priority == "HOT":
        due_at = utc_now() if rule == "immediate" else utc_now() + timedelta(hours=24)
        return {"action": "create", "kind": "follow_up", "due_at": due_at, "summary": _safe_task_summary("HOT", lead)}
    if classification.priority == "WARM":
        return {
            "action": "create",
            "kind": "follow_up",
            "due_at": utc_now() + timedelta(hours=72),
            "summary": _safe_task_summary("WARM", lead),
        }
    if classification.priority == "NEEDS_REVIEW":
        return {"action": "create", "kind": "review", "due_at": None, "summary": _safe_task_summary("NEEDS_REVIEW", lead)}
    return {"action": "skip", "reason": "A COLD result does not create an internal task."}


def _create_follow_up_task(database: Session, run: WorkflowRun, policy: dict[str, Any]) -> FollowUpTask:
    existing = database.scalar(
        select(FollowUpTask).where(
            FollowUpTask.run_id == run.id,
            FollowUpTask.action_key == "create_follow_up_task",
        )
    )
    if existing is not None:
        return existing
    task = FollowUpTask(
        owner_id=run.owner_id,
        run_id=run.id,
        action_key="create_follow_up_task",
        kind=policy["kind"],
        due_at=policy["due_at"],
        summary=policy["summary"],
        status="open",
    )
    database.add(task)
    database.flush()
    return task


def _create_hr_review_task(database: Session, run: WorkflowRun, job_requirements: JobRequirementsInput) -> FollowUpTask:
    """Persist the only HR-side effect: an internal human-review task."""

    existing = database.scalar(
        select(FollowUpTask).where(
            FollowUpTask.run_id == run.id,
            FollowUpTask.action_key == "create_review_task",
        )
    )
    if existing is not None:
        return existing
    task = FollowUpTask(
        owner_id=run.owner_id,
        run_id=run.id,
        action_key="create_review_task",
        kind="review",
        due_at=None,
        summary=f"Review the supplied job-related evidence for {job_requirements.title}.",
        status="open",
    )
    database.add(task)
    database.flush()
    return task


def _ensure_eligible_project(database: Session, run: WorkflowRun) -> None:
    """Update progress and one grouped project only for real, completed live runs."""

    workflow_version = database.get(WorkflowVersion, run.workflow_version_id)
    if workflow_version is None:
        return
    workflow = database.get(Workflow, workflow_version.workflow_id)
    if workflow is None:
        return
    progress = database.scalar(
        select(Progress).where(Progress.user_id == run.owner_id, Progress.workflow_id == workflow.id)
    )
    if progress is None:
        progress = Progress(user_id=run.owner_id, workflow_id=workflow.id)
        database.add(progress)
    progress.eligible_lab_completed = True
    portfolio = database.scalar(select(Portfolio).where(Portfolio.user_id == run.owner_id))
    if portfolio is None:
        return
    project = database.scalar(
        select(PortfolioProject).where(
            PortfolioProject.portfolio_id == portfolio.id,
            PortfolioProject.workflow_id == workflow.id,
        )
    )
    workflow_key = workflow.key
    if project is None:
        project = PortfolioProject(
            portfolio_id=portfolio.id,
            workflow_id=workflow.id,
            qualifying_run_ids=[run.id],
            title="Candidate Screening" if workflow_key == HR_WORKFLOW_KEY else "Qualify a New Lead",
            skills=BADGE_SKILLS_BY_WORKFLOW.get(workflow_key, []),
            first_activity_at=utc_now(),
            last_activity_at=utc_now(),
        )
        database.add(project)
    else:
        run_ids = list(project.qualifying_run_ids or [])
        if run.id not in run_ids:
            run_ids.append(run.id)
            project.qualifying_run_ids = run_ids
        project.last_activity_at = utc_now()


def _fail_run(
    database: Session,
    run_id: str,
    message: str,
    *,
    retryable: bool,
    diagnostic: dict[str, Any] | None = None,
) -> None:
    database.rollback()
    run = database.get(WorkflowRun, run_id)
    if run is None or run.state in {"completed", "needs_review", "failed"}:
        return
    prior_result = dict(run.safe_output or {})
    failure: dict[str, Any] = {"message": message, "retryable": retryable}
    if diagnostic:
        failure["diagnostic"] = diagnostic
    prior_result.update({"mode": run.mode, "failure": failure})
    run.safe_output = prior_result
    run.eligible_for_achievement = False
    run.state = "failed"
    append_event(database, run, "workflow", "failed", message, {"retryable": retryable})
    append_event(database, run, "terminal", "failed", "Workflow failed; no achievement was recorded.")
    database.commit()


def _classify_sales_once(settings: Settings, lead: LeadInput) -> ClassificationPayload:
    classifier = get_classifier(settings)
    return classifier.classify(lead, rubric_version="1.0")


def _screen_hr_once(
    settings: Settings,
    candidate: CandidateInput,
    job_requirements: JobRequirementsInput,
) -> CandidateScreeningPayload:
    classifier = get_classifier(settings)
    return classifier.screen_candidate(candidate, job_requirements, rubric_version="1.0")


def _complete_sales_run(database: Session, run: WorkflowRun, settings: Settings) -> None:
    lead = LeadInput.model_validate(run.input_data)
    append_event(database, run, "classify_lead", "started", f"{run.mode.title()} classifier started.", {"mode": run.mode})
    database.commit()
    classification = _classify_sales_once(settings, lead)
    run.safe_output = {
        "mode": run.mode,
        "is_replay": False,
        "classification": classification.model_dump(mode="json"),
    }
    append_event(
        database,
        run,
        "classify_lead",
        "completed",
        "Lead classification completed.",
        {"priority": classification.priority, "mode": run.mode},
    )
    policy = _policy_for(classification, str(run.configuration["hot_follow_up_rule"]), lead)
    append_event(
        database,
        run,
        "evaluate_policy",
        "completed",
        "Server policy selected the permitted branch.",
        {"priority": classification.priority, "action": policy["action"]},
    )
    database.commit()

    if policy["action"] == "skip":
        run.safe_output = {
            **(run.safe_output or {}),
            "task": {"created": False, "reason": policy["reason"]},
            "next_learning_step": "Review why a COLD lead intentionally skips task creation.",
        }
        append_event(database, run, "create_follow_up_task", "skipped", str(policy["reason"]))
    else:
        append_event(database, run, "create_follow_up_task", "started", "Creating permitted internal task.")
        database.commit()
        task = _create_follow_up_task(database, run, policy)
        run.safe_output = {
            **(run.safe_output or {}),
            "task": {"created": True, **(_task_to_dict(task) or {})},
            "next_learning_step": "Inspect the result, then complete the assessment when eligible.",
        }
        append_event(
            database,
            run,
            "create_follow_up_task",
            "completed",
            "Internal task saved.",
            {"kind": task.kind, "due_at": iso(task.due_at)},
        )
    run.state = "needs_review" if classification.priority == "NEEDS_REVIEW" else "completed"


def _complete_hr_run(database: Session, run: WorkflowRun, settings: Settings) -> None:
    input_data = run.input_data if isinstance(run.input_data, dict) else {}
    candidate = CandidateInput.model_validate(input_data.get("candidate"))
    job_requirements = JobRequirementsInput.model_validate(input_data.get("job_requirements"))
    append_event(
        database,
        run,
        "evaluate_candidate_evidence",
        "started",
        f"{run.mode.title()} evidence evaluator started.",
        {"mode": run.mode},
    )
    database.commit()
    screening = _screen_hr_once(settings, candidate, job_requirements)
    descriptions = {criterion.id: criterion.description for criterion in job_requirements.criteria}
    criteria_evidence = [
        {
            **item.model_dump(mode="json"),
            "criterion": descriptions[item.criterion_id],
            "evidence": item.evidence_fields,
        }
        for item in screening.criteria_evidence
    ]
    run.safe_output = {
        "mode": run.mode,
        "is_replay": False,
        "screening": {
            **screening.model_dump(mode="json"),
            "criteria_evidence": criteria_evidence,
            "explanation": "Only the supplied job-related evidence was mapped to the explicit criteria; a human must decide the next step.",
        },
    }
    append_event(
        database,
        run,
        "evaluate_candidate_evidence",
        "completed",
        "Supplied evidence was mapped to the explicit criteria.",
        {"evidence_status": screening.evidence_status, "mode": run.mode},
    )
    append_event(
        database,
        run,
        "require_human_review",
        "completed",
        "The server requires a human reviewer; no hiring decision was made.",
        {"recommendation": screening.recommendation},
    )
    database.commit()
    append_event(database, run, "create_review_task", "started", "Creating the permitted internal review task.")
    database.commit()
    task = _create_hr_review_task(database, run, job_requirements)
    run.safe_output = {
        **(run.safe_output or {}),
        "task": {"created": True, **(_task_to_dict(task) or {})},
        "next_learning_step": "Inspect the evidence and complete the human-review assessment when eligible.",
    }
    append_event(
        database,
        run,
        "create_review_task",
        "completed",
        "Internal human-review task saved.",
        {"kind": task.kind},
    )
    # The only terminal state communicates that a human must review the result.
    run.state = "needs_review"


def process_run(session_factory: sessionmaker[Session], settings: Settings, run_id: str) -> None:
    """Execute only versioned, server-owned effects for a queued workflow run."""

    database = session_factory()
    try:
        run = database.get(WorkflowRun, run_id)
        if run is None or run.state not in {"queued", "running"}:
            return
        workflow, _version = _workflow_for_run(database, run)
        if workflow is None:
            raise ServiceError("workflow_unavailable", "This workflow is not available.", status_code=404)
        run.state = "running"
        append_event(database, run, "workflow", "started", "Workflow started.")
        append_event(database, run, "validate_input", "completed", "Input validation completed.")
        database.commit()

        if workflow.key == SALES_WORKFLOW_KEY:
            _complete_sales_run(database, run, settings)
        elif workflow.key == HR_WORKFLOW_KEY:
            _complete_hr_run(database, run, settings)
        else:
            raise ServiceError("workflow_unavailable", "This workflow is not available.", status_code=404)

        # Mock and replay output are deliberately hard-ineligible. A successful
        # provider-backed live run is the only automatic achievement evidence.
        run.eligible_for_achievement = run.mode == "live"
        if run.eligible_for_achievement:
            _ensure_eligible_project(database, run)
        append_event(database, run, "persist_result", "completed", "Result and timeline persisted.")
        append_event(database, run, "terminal", run.state, "Workflow reached a saved terminal state.")
        database.commit()
    except AIOutputInvalid as exc:
        _fail_run(
            database,
            run_id,
            "The AI response did not meet the required safety schema.",
            retryable=False,
            diagnostic=exc.diagnostic,
        )
    except AIProviderUnavailable as exc:
        _fail_run(
            database,
            run_id,
            "The AI service is unavailable. No mock result was substituted.",
            retryable=True,
            diagnostic=exc.diagnostic,
        )
    except AIAdapterError as exc:
        _fail_run(
            database,
            run_id,
            "The AI adapter could not complete safely.",
            retryable=False,
            diagnostic=exc.diagnostic,
        )
    except Exception as exc:
        # Do not expose exceptions or input data in a failure event. Retain
        # only the exception class so a developer can distinguish an
        # application-side failure from a provider response.
        _fail_run(
            database,
            run_id,
            "The workflow could not finish safely. Please retry with the same synthetic data.",
            retryable=False,
            diagnostic={
                "category": "application_error",
                "exception_class": type(exc).__name__[:120],
                "summary": "The workflow failed inside the application before a result was saved.",
            },
        )
    finally:
        database.close()


def recover_interrupted_runs(database: Session) -> None:
    unfinished = database.scalars(select(WorkflowRun).where(WorkflowRun.state.in_(("queued", "running")))).all()
    for run in unfinished:
        run.state = "failed"
        run.eligible_for_achievement = False
        run.safe_output = {
            **(run.safe_output or {}),
            "mode": run.mode,
            "failure": {"message": "The server restarted before this run finished.", "retryable": True},
        }
        append_event(database, run, "terminal", "failed", "Run interrupted by a server restart.")
    if unfinished:
        database.commit()


def _lesson_record(database: Session, *, user: User, version: WorkflowVersion) -> LessonProgress:
    lesson = database.scalar(
        select(LessonProgress).where(
            LessonProgress.user_id == user.id,
            LessonProgress.workflow_version_id == version.id,
        )
    )
    if lesson is None:
        lesson = LessonProgress(user_id=user.id, workflow_version_id=version.id, completed_sections=[], knowledge_checks={})
        database.add(lesson)
        database.flush()
    if not isinstance(lesson.completed_sections, list):
        lesson.completed_sections = []
    if not isinstance(lesson.knowledge_checks, dict):
        lesson.knowledge_checks = {}
    return lesson


def _academy_sections(version: WorkflowVersion) -> list[dict[str, Any]]:
    definition = version.definition if isinstance(version.definition, dict) else {}
    lesson = definition.get("lesson") if isinstance(definition.get("lesson"), dict) else {}
    academy = lesson.get("academy") if isinstance(lesson.get("academy"), list) else []
    return [section for section in academy if isinstance(section, dict) and isinstance(section.get("id"), str)]


def _lesson_progress_payload(lesson: LessonProgress, sections: list[dict[str, Any]]) -> dict[str, Any]:
    section_ids = [str(section["id"]) for section in sections]
    checks = lesson.knowledge_checks if isinstance(lesson.knowledge_checks, dict) else {}
    completed_sections = [section_id for section_id in lesson.completed_sections if section_id in section_ids]
    completed_checks = [check_id for check_id, value in checks.items() if isinstance(value, dict) and value.get("correct") is True]
    return {
        "completed_sections": completed_sections,
        "knowledge_checks": {key: value for key, value in checks.items() if key in {str(section.get("knowledge_check", {}).get("id")) for section in sections}},
        "completed_knowledge_checks": completed_checks,
        "current_section": len(completed_sections),
        "section_count": len(section_ids),
        "complete": bool(section_ids) and len(completed_sections) == len(section_ids) and len(completed_checks) == len(section_ids),
    }


def public_lesson(database: Session, *, user: User, key: str) -> dict[str, Any]:
    """Return Academy content without answer keys or private input."""

    workflow, version = workflow_catalog_or_error(database, key)
    definition = version.definition if isinstance(version.definition, dict) else {}
    lesson_definition = definition.get("lesson") if isinstance(definition.get("lesson"), dict) else {}
    sections: list[dict[str, Any]] = []
    for section in _academy_sections(version):
        public_section = {field: section.get(field) for field in ("id", "title", "objective", "overview", "concepts", "worked_example")}
        check = section.get("knowledge_check") if isinstance(section.get("knowledge_check"), dict) else None
        if check is not None:
            public_section["knowledge_check"] = {
                "id": check.get("id"),
                "prompt": check.get("prompt"),
                "options": check.get("options", []),
            }
        sections.append(public_section)
    lesson = _lesson_record(database, user=user, version=version)
    database.commit()
    return {
        "workflow_key": workflow.key,
        "workflow_title": workflow.title,
        "version": version.version,
        "title": lesson_definition.get("title"),
        "problem": lesson_definition.get("problem"),
        "sections": sections,
        "progress": _lesson_progress_payload(lesson, _academy_sections(version)),
    }


def record_lesson_progress(
    database: Session,
    *,
    user: User,
    key: str,
    request: LessonProgressRequest,
) -> dict[str, Any]:
    workflow, version = workflow_catalog_or_error(database, key)
    sections = _academy_sections(version)
    section_index = next((index for index, section in enumerate(sections) if section.get("id") == request.section_id), None)
    if section_index is None:
        raise ServiceError("lesson_section_unavailable", "That Academy section is unavailable.", status_code=404)
    lesson = _lesson_record(database, user=user, version=version)
    completed = list(lesson.completed_sections or [])
    if section_index > len(completed):
        raise ServiceError("lesson_progression_required", "Complete the previous Academy section first.", status_code=409)
    section = sections[section_index]
    check = section.get("knowledge_check") if isinstance(section.get("knowledge_check"), dict) else None
    expected_check_id = check.get("id") if check else None
    correct = True
    feedback = "Section complete. Continue to the next part of the Academy."
    checks = dict(lesson.knowledge_checks or {})
    if expected_check_id:
        if request.knowledge_check_id != expected_check_id or request.answer is None:
            raise ServiceError("knowledge_check_required", "Answer the knowledge check before continuing.", status_code=422)
        expected_answer = ACADEMY_CHECK_ANSWERS.get(key, {}).get(expected_check_id)
        correct = request.answer == expected_answer
        prior_attempts = checks.get(expected_check_id, {}).get("attempts", 0) if isinstance(checks.get(expected_check_id), dict) else 0
        checks[expected_check_id] = {"correct": correct, "attempts": int(prior_attempts) + 1}
        feedback = (
            "Correct. " + ACADEMY_CHECK_FEEDBACK.get(expected_check_id, "Your answer matches the evidence and safety boundary.")
            if correct
            else "Not yet. Re-read the section and choose the option that stays grounded in supplied evidence and server policy."
        )
    if correct:
        if request.section_id not in completed:
            completed.append(request.section_id)
        lesson.completed_sections = completed
    lesson.knowledge_checks = checks
    database.commit()
    return {
        "workflow_key": workflow.key,
        "section_id": request.section_id,
        "correct": correct,
        "section_complete": correct,
        "feedback": feedback,
        "progress": _lesson_progress_payload(lesson, sections),
    }


def complete_lesson(
    database: Session,
    *,
    user: User,
    key: str,
    completion: LessonCompletionRequest | None = None,
) -> dict[str, Any]:
    workflow, version = workflow_catalog_or_error(database, key)
    lesson = _lesson_record(database, user=user, version=version)
    sections = _academy_sections(version)
    if completion is not None:
        required_sections = {str(section["id"]) for section in sections}
        required_checks = {
            str(section["knowledge_check"]["id"])
            for section in sections
            if isinstance(section.get("knowledge_check"), dict) and section["knowledge_check"].get("id")
        }
        stored_checks = {key for key, value in (lesson.knowledge_checks or {}).items() if isinstance(value, dict) and value.get("correct") is True}
        if not required_sections.issubset(set(lesson.completed_sections or [])) or not required_checks.issubset(stored_checks):
            raise ServiceError("lesson_incomplete", "Complete every Academy section and knowledge check before marking the lesson complete.", status_code=409)
        if set(completion.section_ids) != required_sections or set(completion.knowledge_check_ids) != required_checks:
            raise ServiceError("lesson_progress_mismatch", "The submitted Academy completion does not match the server record.", status_code=409)
    progress = database.scalar(select(Progress).where(Progress.user_id == user.id, Progress.workflow_id == workflow.id))
    if progress is None:
        progress = Progress(user_id=user.id, workflow_id=workflow.id)
        database.add(progress)
    progress.lesson_completed = True
    database.commit()
    return {
        "workflow_key": key,
        "completed_at": iso(lesson.completed_at),
        "lesson_completed": True,
        "progress": _lesson_progress_payload(lesson, sections),
    }


def public_independent_exercise(database: Session, *, user: User, key: str) -> dict[str, Any]:
    """Return a learner-safe independent scenario without its answer key."""

    workflow, _ = workflow_catalog_or_error(database, key)
    exercise = INDEPENDENT_EXERCISES.get(key)
    if exercise is None:
        raise ServiceError("exercise_unavailable", "This independent exercise is not available.", status_code=404)
    progress = database.scalar(
        select(Progress).where(Progress.user_id == user.id, Progress.workflow_id == workflow.id)
    )
    attempts = list(progress.independent_attempts or []) if progress is not None else []
    return {
        "id": exercise["id"],
        "workflow_key": key,
        "title": exercise["title"],
        "objective": exercise["objective"],
        "instructions": exercise["instructions"],
        "scenario": exercise["scenario"],
        "evidence": exercise.get("evidence", []),
        "criteria": exercise.get("criteria", []),
        "fields": exercise["fields"],
        "progress": {
            "attempt_count": len(attempts),
            "passed": bool(progress and progress.independent_exercise_passed),
        },
    }


def submit_independent_exercise(
    database: Session,
    *,
    user: User,
    key: str,
    request: IndependentExerciseAttemptRequest,
) -> dict[str, Any]:
    """Grade independent practical reasoning against a server-owned answer key."""

    workflow, _ = workflow_catalog_or_error(database, key)
    exercise = INDEPENDENT_EXERCISES.get(key)
    expected = INDEPENDENT_EXERCISE_ANSWERS.get(key)
    feedback_by_field = INDEPENDENT_EXERCISE_FEEDBACK.get(key, {})
    if exercise is None or expected is None:
        raise ServiceError("exercise_unavailable", "This independent exercise is not available.", status_code=404)
    progress = database.scalar(
        select(Progress).where(Progress.user_id == user.id, Progress.workflow_id == workflow.id)
    )
    if progress is None:
        progress = Progress(user_id=user.id, workflow_id=workflow.id)
        database.add(progress)
        database.flush()
    if not progress.lesson_completed:
        raise ServiceError(
            "lesson_required",
            "Complete the Academy lesson before attempting the independent exercise.",
            status_code=409,
        )
    required_fields = {field["id"] for field in exercise["fields"]}
    if set(request.answers) != required_fields or any(not value for value in request.answers.values()):
        raise ServiceError(
            "exercise_answers_required",
            "Choose an answer for each independent scenario question.",
            status_code=422,
        )
    field_results = {
        field_id: {
            "correct": request.answers.get(field_id) == expected_answer,
            "feedback": feedback_by_field.get(field_id, "Review the related Academy section and supplied evidence."),
        }
        for field_id, expected_answer in expected.items()
    }
    passed = all(result["correct"] for result in field_results.values())
    attempts = list(progress.independent_attempts or [])
    attempts.append({"correct": passed, "submitted_at": iso(utc_now())})
    progress.independent_attempts = attempts
    if passed:
        progress.independent_exercise_passed = True
    database.commit()
    return {
        "exercise_id": exercise["id"],
        "passed": passed,
        "field_results": field_results,
        "feedback": (
            "Independent scenario passed. You applied the Academy concepts to a new case."
            if passed
            else "Review the feedback, revisit the related Academy section, and try the scenario again."
        ),
        "progress": {"attempt_count": len(attempts), "passed": bool(progress.independent_exercise_passed)},
    }


def public_assessment(database: Session, key: str) -> dict[str, Any]:
    assessment = database.scalar(select(Assessment).where(Assessment.key == key))
    if assessment is None:
        raise ServiceError("assessment_unavailable", "This assessment is not available.", status_code=404)
    definition = assessment.definition
    questions = [
        {
            **question,
            "options": [
                {"id": option, "label": option.replace("_", " ").capitalize()}
                for option in question["options"]
            ],
        }
        for question in definition["questions"]
    ]
    return {
        "key": assessment.key,
        "version": assessment.version,
        "title": definition.get("title"),
        "objectives": definition.get("objectives", []),
        "pass_requirement": definition["pass_requirement"],
        "questions": questions,
        "practical": definition["practical"],
        "practical_prompt": definition["practical"]["prompt"],
    }


def _badge_prerequisites(database: Session, user_id: int, workflow: Workflow, version: WorkflowVersion) -> dict[str, bool]:
    lesson = database.scalar(
        select(LessonProgress.id).where(
            LessonProgress.user_id == user_id,
            LessonProgress.workflow_version_id == version.id,
        )
    )
    eligible_run = database.scalar(
        select(WorkflowRun.id).where(
            WorkflowRun.owner_id == user_id,
            WorkflowRun.workflow_version_id == version.id,
            WorkflowRun.eligible_for_achievement.is_(True),
            WorkflowRun.state.in_(("completed", "needs_review")),
        )
    )
    progress = database.scalar(select(Progress).where(Progress.user_id == user_id, Progress.workflow_id == workflow.id))
    return {
        "lesson_completed": lesson is not None,
        "independent_exercise_passed": bool(progress and progress.independent_exercise_passed),
        "eligible_live_run": eligible_run is not None,
    }


def _badge_to_dict(database: Session, award: BadgeAward) -> dict[str, Any]:
    definition = database.get(BadgeDefinition, award.badge_definition_id)
    return {
        "key": definition.key if definition else "unavailable",
        "name": definition.name if definition else "IkeOru workflow achievement",
        "skills": definition.skills if definition else [],
        "verification_id": award.verification_id,
        "awarded_at": iso(award.awarded_at),
        "is_seeded_sample": award.is_seeded_sample,
    }


def submit_assessment(
    database: Session,
    *,
    user: User,
    key: str,
    request: AssessmentAttemptRequest,
) -> dict[str, Any]:
    assessment = database.scalar(select(Assessment).where(Assessment.key == key))
    if assessment is None:
        raise ServiceError("assessment_unavailable", "This assessment is not available.", status_code=404)
    workflow, version = workflow_catalog_or_error(database, key)
    correct_answers = ASSESSMENT_ANSWERS_BY_KEY.get(key)
    practical_answers = PRACTICAL_ANSWERS_BY_KEY.get(key)
    badge_key = BADGE_KEY_BY_WORKFLOW.get(key)
    if correct_answers is None or practical_answers is None or badge_key is None:
        raise ServiceError("assessment_unavailable", "This assessment is not available.", status_code=404)
    answers = request.answers
    conceptual_score = sum(1 for question, answer in correct_answers.items() if answers.get(question) == answer)
    progress = database.scalar(select(Progress).where(Progress.user_id == user.id, Progress.workflow_id == workflow.id))
    policy_practical_pass = all(request.practical.get(question) == answer for question, answer in practical_answers.items())
    independent_passed = bool(progress and progress.independent_exercise_passed)
    practical_pass = policy_practical_pass and independent_passed
    score = conceptual_score + int(practical_pass)
    overall_pass = score >= 5 and practical_pass
    attempt = AssessmentAttempt(
        assessment_id=assessment.id,
        user_id=user.id,
        answers={"answers": answers, "practical": request.practical},
        score=score,
        practical_pass=practical_pass,
        overall_pass=overall_pass,
    )
    database.add(attempt)

    if progress is None:
        progress = Progress(user_id=user.id, workflow_id=workflow.id)
        database.add(progress)
    if overall_pass:
        progress.assessment_passed = True

    prerequisites = _badge_prerequisites(database, user.id, workflow, version)
    awarded: BadgeAward | None = None
    if overall_pass and all(prerequisites.values()):
        badge = database.scalar(select(BadgeDefinition).where(BadgeDefinition.key == badge_key))
        assert badge is not None
        awarded = database.scalar(
            select(BadgeAward).where(BadgeAward.user_id == user.id, BadgeAward.badge_definition_id == badge.id)
        )
        if awarded is None:
            run_ids = database.scalars(
                select(WorkflowRun.id).where(
                    WorkflowRun.owner_id == user.id,
                    WorkflowRun.workflow_version_id == version.id,
                    WorkflowRun.eligible_for_achievement.is_(True),
                    WorkflowRun.state.in_(("completed", "needs_review")),
                )
            ).all()
            awarded = BadgeAward(
                user_id=user.id,
                badge_definition_id=badge.id,
                verification_id=opaque_id("ikb"),
                evidence={"workflow_key": key, "qualifying_run_count": len(run_ids), "assessment_version": assessment.version},
                is_seeded_sample=False,
            )
            database.add(awarded)
    database.commit()
    database.refresh(attempt)
    practice_feedback = (
        "Practical human-review control passed."
        if key == HR_WORKFLOW_KEY and practical_pass
        else "Review the required human-review control and evidence boundary."
        if key == HR_WORKFLOW_KEY
        else "Practical policy passed."
        if practical_pass
        else "Review the immediate HOT, WARM, and review policy outcomes."
    )
    if not independent_passed:
        practice_feedback += " Complete and pass the independent scenario before the practical requirement can pass."
    objective_feedback = ASSESSMENT_FEEDBACK_BY_KEY.get(key, {})
    question_feedback = [
        {
            "question_id": question,
            "correct": answers.get(question) == expected,
            "feedback": objective_feedback.get(question, "Review the related Academy section and try again."),
        }
        for question, expected in correct_answers.items()
    ]
    feedback = [
        practice_feedback,
        "Assessment passed." if overall_pass else "Retry after reviewing the lesson and policy choices.",
    ]
    attempt_payload = {
        "id": attempt.id,
        "score": score,
        "total_points": 6,
        "practical_pass": practical_pass,
        "overall_pass": overall_pass,
        "submitted_at": iso(attempt.submitted_at),
    }
    badge_payload = _badge_to_dict(database, awarded) if awarded else None
    return {
        "attempt": attempt_payload,
        "score": score,
        "max_score": 6,
        "practical_pass": practical_pass,
        "overall_pass": overall_pass,
        "badge": badge_payload,
        "feedback": feedback,
        "question_feedback": question_feedback,
        "score_breakdown": {
            "theory_points": conceptual_score,
            "practical_points": int(practical_pass),
            "theory_total": len(correct_answers),
            "practical_total": 1,
            "independent_exercise_passed": independent_passed,
            "policy_practical_passed": policy_practical_pass,
        },
        "badge_prerequisites": {**prerequisites, "assessment_passed": overall_pass},
    }


def _project_to_dict(database: Session, project: PortfolioProject) -> dict[str, Any]:
    workflow = database.get(Workflow, project.workflow_id)
    return {
        "workflow_key": workflow.key if workflow is not None else "unavailable",
        "title": project.title,
        "skills": project.skills,
        "first_activity_at": iso(project.first_activity_at),
        "last_activity_at": iso(project.last_activity_at),
        "qualifying_run_count": len(project.qualifying_run_ids or []),
    }


def private_portfolio(database: Session, user: User) -> dict[str, Any]:
    portfolio = database.scalar(select(Portfolio).where(Portfolio.user_id == user.id))
    if portfolio is None:
        raise ServiceError("portfolio_unavailable", "Portfolio unavailable.", status_code=404)
    runs = database.scalars(
        select(WorkflowRun).where(WorkflowRun.owner_id == user.id).order_by(WorkflowRun.created_at.desc())
    ).all()
    attempts = database.scalars(
        select(AssessmentAttempt).where(AssessmentAttempt.user_id == user.id).order_by(AssessmentAttempt.submitted_at.desc())
    ).all()
    awards = database.scalars(select(BadgeAward).where(BadgeAward.user_id == user.id).order_by(BadgeAward.awarded_at.desc())).all()
    projects = database.scalars(select(PortfolioProject).where(PortfolioProject.portfolio_id == portfolio.id)).all()
    progress_by_workflow: dict[str, dict[str, Any]] = {}
    active_workflows = database.scalars(
        select(Workflow).where(Workflow.key.in_((SALES_WORKFLOW_KEY, HR_WORKFLOW_KEY)))
    ).all()
    for active_workflow in active_workflows:
        workflow_progress = database.scalar(
            select(Progress).where(Progress.user_id == user.id, Progress.workflow_id == active_workflow.id)
        )
        version = database.scalar(
            select(WorkflowVersion).where(WorkflowVersion.workflow_id == active_workflow.id).order_by(WorkflowVersion.id.desc())
        )
        lesson_record = _lesson_record(database, user=user, version=version) if version is not None else None
        lesson_progress = _lesson_progress_payload(lesson_record, _academy_sections(version)) if version is not None and lesson_record is not None else {}
        progress_by_workflow[active_workflow.key] = {
            "lesson_completed": bool(workflow_progress and workflow_progress.lesson_completed),
            "eligible_live_lab_completed": bool(workflow_progress and workflow_progress.eligible_lab_completed),
            "independent_exercise_passed": bool(workflow_progress and workflow_progress.independent_exercise_passed),
            "independent_attempt_count": len(workflow_progress.independent_attempts or []) if workflow_progress else 0,
            "assessment_passed": bool(workflow_progress and workflow_progress.assessment_passed),
            "lesson_sections_completed": len(lesson_progress.get("completed_sections", [])),
            "lesson_section_count": int(lesson_progress.get("section_count", 0)),
            "knowledge_checks_completed": len(lesson_progress.get("completed_knowledge_checks", [])),
        }
    sales_progress = progress_by_workflow.get(
        SALES_WORKFLOW_KEY,
        {"lesson_completed": False, "eligible_live_lab_completed": False, "assessment_passed": False},
    )
    return {
        "public_id": portfolio.public_id,
        "visibility": portfolio.visibility,
        "selected_public_items": portfolio.selected_public_items,
        "profile": {"display_name": user.display_name, "is_demo": user.is_demo, "is_seeded_sample": user.is_seeded_sample},
        "progress": {
            # Retain Sales aliases for the original frontend while exposing a
            # per-workflow map for the two active paths.
            "lesson_completed": sales_progress["lesson_completed"],
            "lesson_complete": sales_progress["lesson_completed"],
            "eligible_live_lab_completed": sales_progress["eligible_live_lab_completed"],
            "lab_complete": sales_progress["eligible_live_lab_completed"],
            "assessment_passed": sales_progress["assessment_passed"],
            "by_workflow": progress_by_workflow,
        },
        "runs": [run_to_dict(database, run) for run in runs],
        "attempts": [
            {
                "id": attempt.id,
                "score": attempt.score,
                "total_points": 6,
                "practical_pass": attempt.practical_pass,
                "overall_pass": attempt.overall_pass,
                "submitted_at": iso(attempt.submitted_at),
                "assessment_key": database.get(Assessment, attempt.assessment_id).key
                if database.get(Assessment, attempt.assessment_id)
                else "unavailable",
            }
            for attempt in attempts
        ],
        "badges": [_badge_to_dict(database, award) for award in awards],
        "projects": [_project_to_dict(database, project) for project in projects],
    }


def patch_portfolio(database: Session, *, user: User, patch: PortfolioPatchRequest) -> dict[str, Any]:
    portfolio = database.scalar(select(Portfolio).where(Portfolio.user_id == user.id))
    if portfolio is None:
        raise ServiceError("portfolio_unavailable", "Portfolio unavailable.", status_code=404)
    if patch.visibility is not None:
        portfolio.visibility = patch.visibility
    if patch.selected_public_items is not None:
        award_ids = set(
            database.scalars(select(BadgeAward.verification_id).where(BadgeAward.user_id == user.id)).all()
        )
        projects = database.scalars(
            select(PortfolioProject).where(PortfolioProject.portfolio_id == portfolio.id)
        ).all()
        project_keys = {
            workflow.key
            for project in projects
            if (workflow := database.get(Workflow, project.workflow_id)) is not None
        }
        invalid_items: list[str] = []
        for item in patch.selected_public_items:
            if item.startswith("badge:") and item.removeprefix("badge:") in award_ids:
                continue
            if item.startswith("project:") and item.removeprefix("project:") in project_keys:
                continue
            invalid_items.append(item)
        if invalid_items:
            raise ServiceError(
                "invalid_public_item",
                "Only achievements owned by this portfolio can be selected.",
                status_code=422,
                field_errors={"selected_public_items": "One or more selected items are unavailable."},
            )
        portfolio.selected_public_items = patch.selected_public_items
    database.commit()
    return private_portfolio(database, user)


def public_portfolio(database: Session, public_id: str) -> dict[str, Any] | None:
    portfolio = database.scalar(select(Portfolio).where(Portfolio.public_id == public_id))
    if portfolio is None or portfolio.visibility != "public":
        return None
    user = database.get(User, portfolio.user_id)
    if user is None:
        return None
    selected = set(portfolio.selected_public_items or [])
    awards = database.scalars(select(BadgeAward).where(BadgeAward.user_id == user.id)).all()
    badges = [
        _badge_to_dict(database, award)
        for award in awards
        if f"badge:{award.verification_id}" in selected
    ]
    projects = database.scalars(select(PortfolioProject).where(PortfolioProject.portfolio_id == portfolio.id)).all()
    visible_projects = [
        _project_to_dict(database, project)
        for project in projects
        if (workflow := database.get(Workflow, project.workflow_id)) is not None
        and f"project:{workflow.key}" in selected
    ]
    return {
        "display_name": user.display_name,
        "public_id": portfolio.public_id,
        "badges": badges,
        "projects": visible_projects,
        "is_seeded_sample": user.is_seeded_sample,
    }


def public_badge(database: Session, verification_id: str) -> dict[str, Any] | None:
    award = database.scalar(select(BadgeAward).where(BadgeAward.verification_id == verification_id))
    if award is None:
        return None
    portfolio = database.scalar(select(Portfolio).where(Portfolio.user_id == award.user_id))
    if portfolio is None or portfolio.visibility != "public":
        return None
    if f"badge:{verification_id}" not in set(portfolio.selected_public_items or []):
        return None
    user = database.get(User, award.user_id)
    if user is None:
        return None
    return {"holder": user.display_name, **_badge_to_dict(database, award)}


def organization_progress(database: Session, *, requester: User, organization_id: int) -> dict[str, Any]:
    membership = database.scalar(
        select(Membership).where(Membership.user_id == requester.id, Membership.organization_id == organization_id)
    )
    if membership is None or membership.role != "manager":
        raise ServiceError("organization_unavailable", "Organization progress is unavailable.", status_code=404)
    members = database.scalars(
        select(Membership).where(Membership.organization_id == organization_id, Membership.role == "learner")
    ).all()
    workflow, _ = workflow_catalog_or_error(database, WORKFLOW_KEY)
    learners: list[dict[str, Any]] = []
    for learner_membership in members:
        learner = database.get(User, learner_membership.user_id)
        if learner is None:
            continue
        progress = database.scalar(select(Progress).where(Progress.user_id == learner.id, Progress.workflow_id == workflow.id))
        award_count = database.scalar(select(func.count(BadgeAward.id)).where(BadgeAward.user_id == learner.id)) or 0
        portfolio = database.scalar(select(Portfolio).where(Portfolio.user_id == learner.id))
        organization_items: dict[str, Any] | None = None
        if portfolio is not None and portfolio.visibility in {"organization", "public"}:
            projects = database.scalars(select(PortfolioProject).where(PortfolioProject.portfolio_id == portfolio.id)).all()
            organization_items = {"projects": [_project_to_dict(database, project) for project in projects]}
        learners.append(
            {
                "display_name": learner.display_name,
                "lesson_completed": bool(progress and progress.lesson_completed),
                "eligible_live_lab_completed": bool(progress and progress.eligible_lab_completed),
                "independent_exercise_passed": bool(progress and progress.independent_exercise_passed),
                "assessment_passed": bool(progress and progress.assessment_passed),
                "badge_count": int(award_count),
                "organization_visible_portfolio": organization_items,
                "is_seeded_sample": learner.is_seeded_sample,
            }
        )
    return {"organization_id": organization_id, "sample_data": True, "learner_count": len(learners), "learners": learners}


def replay_example(key: str) -> dict[str, Any]:
    if key in {SALES_WORKFLOW_KEY, f"{SALES_WORKFLOW_KEY}-hot"}:
        return {
        "label": "Static replay — not a live AI result and never eligible for achievements.",
        "mode": "replay",
        "is_replay": True,
        "eligible_for_achievement": False,
        "result": {
            "classification": {
                "priority": "HOT",
                "explanation": "The sample describes a relevant need with near-term intent.",
                "evidence": ["need", "purchase_timeframe"],
                "missing_fields": [],
                "suggested_next_step": "Create an immediate internal follow-up task.",
            },
            "task": {"created": True, "kind": "follow_up", "due_at": "sample", "status": "open"},
        },
        "events": [
            {"sequence": 1, "step_id": "received", "status": "completed", "message": "Sample lead received."},
            {"sequence": 2, "step_id": "classify_lead", "status": "completed", "message": "Sample classification completed."},
            {"sequence": 3, "step_id": "create_follow_up_task", "status": "completed", "message": "Sample internal task shown."},
        ],
        }
    if key == HR_WORKFLOW_KEY:
        return {
            "label": "Static replay — not a live AI result and never eligible for achievements.",
            "mode": "replay",
            "is_replay": True,
            "eligible_for_achievement": False,
            "state": "needs_review",
            "recommendation": "HUMAN_REVIEW_REQUIRED",
            "human_review_required": True,
            "evidence": ["written_communication", "ticketing_workflow"],
            "missing_fields": ["customer_support_experience"],
            "suggested_next_step": "A human reviewer must review the supplied job-related evidence before making any hiring decision.",
            "result": {
                "mode": "replay",
                "screening": {
                    "evidence_status": "PARTIAL_EVIDENCE",
                    "evidence": ["written_communication", "ticketing_workflow"],
                    "missing_fields": ["customer_support_experience"],
                    "recommendation": "HUMAN_REVIEW_REQUIRED",
                    "human_review_required": True,
                    "suggested_next_step": "A human reviewer must review the supplied job-related evidence before making any hiring decision.",
                    "criteria_evidence": [
                        {"criterion_id": "customer_support_experience", "status": "not_evidenced", "evidence": []},
                        {"criterion_id": "written_communication", "status": "supported", "evidence": ["experience_summary"]},
                        {"criterion_id": "ticketing_workflow", "status": "supported", "evidence": ["skills"]},
                    ],
                },
                "task": {"created": False, "reason": "Replay does not create a review task."},
            },
            "events": [
                {"sequence": 1, "step_id": "received", "status": "completed", "message": "Sample candidate received."},
                {"sequence": 2, "step_id": "evaluate_candidate_evidence", "status": "completed", "message": "Sample evidence review completed."},
                {"sequence": 3, "step_id": "require_human_review", "status": "completed", "message": "Sample requires human review."},
            ],
        }
    raise ServiceError("example_unavailable", "This replay example is unavailable.", status_code=404)
