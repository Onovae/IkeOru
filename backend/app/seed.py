"""Idempotent catalog seeding and isolated demo-session creation."""

from __future__ import annotations

import secrets
from datetime import timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session

from .catalog import (
    ASSESSMENT_DEFINITIONS,
    BADGE_KEY,
    BADGE_SKILLS,
    BADGE_DEFINITIONS,
    DOMAINS,
    WORKFLOW_DEFINITIONS,
    WORKFLOW_KEY,
)
from .config import Settings
from .models import (
    Assessment,
    AssessmentAttempt,
    AuthSession,
    BadgeAward,
    BadgeDefinition,
    Domain,
    LessonProgress,
    Membership,
    Organization,
    Portfolio,
    PortfolioProject,
    Progress,
    User,
    Workflow,
    WorkflowVersion,
    utc_now,
)


def opaque_id(prefix: str) -> str:
    return f"{prefix}_{secrets.token_urlsafe(18)}"


def get_workflow_version(database: Session, key: str = WORKFLOW_KEY) -> tuple[Workflow, WorkflowVersion] | None:
    workflow = database.scalar(select(Workflow).where(Workflow.key == key))
    if workflow is None:
        return None
    version = database.scalar(
        select(WorkflowVersion)
        .where(WorkflowVersion.workflow_id == workflow.id)
        .order_by(WorkflowVersion.id.desc())
    )
    if version is None:
        return None
    return workflow, version


def seed_catalog(database: Session) -> None:
    """Seed catalog records and reconcile safe presentation metadata."""

    for domain_data in DOMAINS:
        domain = database.scalar(select(Domain).where(Domain.key == domain_data["key"]))
        if domain is None:
            database.add(Domain(**domain_data))
            continue
        # Keep old local prototype databases aligned with the current MVP scope:
        # Sales and HR are active; every other domain is explicitly coming soon.
        domain.title = domain_data["title"]
        domain.availability = domain_data["availability"]
        domain.sort_order = domain_data["sort_order"]
    database.flush()

    for definition in WORKFLOW_DEFINITIONS:
        domain = database.scalar(select(Domain).where(Domain.key == definition["domain"]))
        assert domain is not None
        workflow = database.scalar(select(Workflow).where(Workflow.key == definition["key"]))
        if workflow is None:
            workflow = Workflow(key=definition["key"], domain_id=domain.id, title=definition["title"])
            database.add(workflow)
            database.flush()
        else:
            workflow.domain_id = domain.id
            workflow.title = definition["title"]
        if database.scalar(
            select(WorkflowVersion).where(
                WorkflowVersion.workflow_id == workflow.id,
                WorkflowVersion.version == definition["version"],
            )
        ) is None:
            database.add(
                WorkflowVersion(
                    workflow_id=workflow.id,
                    version=definition["version"],
                    rubric_version=definition["rubric_version"],
                    definition=definition,
                )
            )
        else:
            # Reconcile lesson/Academy content in an existing prototype DB
            # without changing the workflow key or discarding prior progress.
            version = database.scalar(
                select(WorkflowVersion).where(
                    WorkflowVersion.workflow_id == workflow.id,
                    WorkflowVersion.version == definition["version"],
                )
            )
            assert version is not None
            version.rubric_version = definition["rubric_version"]
            version.definition = definition

    for definition in ASSESSMENT_DEFINITIONS:
        assessment = database.scalar(select(Assessment).where(Assessment.key == definition["key"]))
        if assessment is None:
            database.add(Assessment(key=definition["key"], version=definition["version"], definition=definition))
        else:
            assessment.version = definition["version"]
            assessment.definition = definition

    for definition in BADGE_DEFINITIONS:
        badge = database.scalar(select(BadgeDefinition).where(BadgeDefinition.key == definition["key"]))
        if badge is None:
            database.add(BadgeDefinition(**definition))
        else:
            badge.criteria_version = definition["criteria_version"]
            badge.name = definition["name"]
            badge.skills = definition["skills"]
    database.commit()


def create_portfolio(database: Session, user: User) -> Portfolio:
    portfolio = Portfolio(user_id=user.id, public_id=opaque_id("ikp"), visibility="private")
    database.add(portfolio)
    database.flush()
    return portfolio


def _seed_completed_sample(database: Session, user: User, organization: Organization) -> None:
    """Create visibly seeded fallback evidence; it is never a new live result."""

    catalog = get_workflow_version(database)
    if catalog is None:
        raise RuntimeError("Catalog must be seeded before demo data")
    workflow, workflow_version = catalog
    portfolio = create_portfolio(database, user)
    portfolio.visibility = "organization"
    lesson = LessonProgress(user_id=user.id, workflow_version_id=workflow_version.id)
    progress = Progress(
        user_id=user.id,
        workflow_id=workflow.id,
        lesson_completed=True,
        eligible_lab_completed=False,
        independent_exercise_passed=True,
        independent_attempts=[{"correct": True, "submitted_at": utc_now().isoformat()}],
        assessment_passed=True,
    )
    database.add_all([lesson, progress])
    project = PortfolioProject(
        portfolio_id=portfolio.id,
        workflow_id=workflow.id,
        qualifying_run_ids=[],
        title="Qualify a New Lead (seeded sample)",
        skills=BADGE_SKILLS,
        first_activity_at=utc_now(),
        last_activity_at=utc_now(),
    )
    database.add(project)
    badge = database.scalar(select(BadgeDefinition).where(BadgeDefinition.key == BADGE_KEY))
    assert badge is not None
    database.add(
        BadgeAward(
            user_id=user.id,
            badge_definition_id=badge.id,
            verification_id=opaque_id("ikb"),
            evidence={"label": "Seeded demonstration evidence; not a newly earned live result"},
            is_seeded_sample=True,
        )
    )


def create_demo_identity(
    database: Session,
    settings: Settings,
    *,
    role: str,
    profile: str,
) -> tuple[User, Organization, Membership, str, str]:
    """Create an isolated demo user, organization, membership, and session."""

    suffix = secrets.token_hex(3).upper()
    organization = Organization(name=f"IkeOru Demo Workspace {suffix}", is_demo=True)
    database.add(organization)
    database.flush()
    display_name = "Demo manager" if role == "manager" else "Demo learner"
    user = User(
        display_name=f"{display_name} {suffix}",
        is_demo=True,
        is_seeded_sample=profile == "seeded",
    )
    database.add(user)
    database.flush()
    membership = Membership(user_id=user.id, organization_id=organization.id, role=role)
    database.add(membership)
    create_portfolio(database, user)

    if profile == "seeded":
        # Replace the just-created empty portfolio with sample evidence only by
        # keeping one profile; the helper creates a second only for seeded data.
        existing_portfolio = database.scalar(select(Portfolio).where(Portfolio.user_id == user.id))
        if existing_portfolio is not None:
            database.delete(existing_portfolio)
            database.flush()
        _seed_completed_sample(database, user, organization)

    if role == "manager":
        sample_user = User(display_name="Sample learner (seeded)", is_demo=True, is_seeded_sample=True)
        database.add(sample_user)
        database.flush()
        database.add(Membership(user_id=sample_user.id, organization_id=organization.id, role="learner"))
        _seed_completed_sample(database, sample_user, organization)

    raw_session_token = secrets.token_urlsafe(32)
    raw_csrf_token = secrets.token_urlsafe(24)
    auth_session = AuthSession(
        token_hash=settings.token_digest(raw_session_token),
        csrf_token_hash=settings.token_digest(raw_csrf_token),
        user_id=user.id,
        expires_at=utc_now() + timedelta(hours=8),
    )
    database.add(auth_session)
    database.commit()
    return user, organization, membership, raw_session_token, raw_csrf_token
