"""Validated API input and AI-output contracts."""

from __future__ import annotations

import math
import re
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


SALES_WORKFLOW_KEY = "sales-qualify-new-lead"
HR_WORKFLOW_KEY = "hr-candidate-screening"
# Kept as the Sales alias for existing callers and historical API tests.
WORKFLOW_KEY = SALES_WORKFLOW_KEY
SUPPORTED_CURRENCIES = {"NGN", "USD", "GBP", "EUR", "ZAR"}
PURCHASE_TIMEFRAMES = {
    "immediate",
    "within_30_days",
    "one_to_three_months",
    "more_than_three_months",
    "unknown",
    "no_current_timeline",
}
EVIDENCE_FIELDS = {"message", "need", "purchase_timeframe", "company_size", "budget_amount", "industry"}
MISSING_FIELDS = {"need", "purchase_timeframe", "message", "company", "budget_amount", "company_size"}
HR_EVIDENCE_FIELDS = {"experience_summary", "skills", "work_examples"}
PROTECTED_CHARACTERISTIC_TERMS = (
    "age",
    "gender",
    "sex",
    "male",
    "female",
    "woman",
    "women",
    "race",
    "ethnicity",
    "religion",
    "religious",
    "disability",
    "disabled",
    "pregnan",
    "marital",
    "sexual orientation",
    "nationality",
    "national origin",
    "citizenship",
    "veteran",
    "caste",
    "young",
    "elderly",
)


class APIModel(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class DemoSessionRequest(APIModel):
    role: Literal["learner", "manager"] = "learner"
    profile: Literal["fresh", "seeded"] = "fresh"


class LeadInput(APIModel):
    name: str = Field(min_length=1, max_length=100)
    company: str = Field(min_length=1, max_length=150)
    message: str = Field(min_length=20, max_length=2000)
    industry: str | None = Field(default=None, max_length=100)
    company_size: int | None = Field(default=None, gt=0)
    budget_amount: float | None = Field(default=None, ge=0)
    currency: str | None = Field(default=None, min_length=3, max_length=3)
    need: str | None = Field(default=None, max_length=500)
    purchase_timeframe: str | None = Field(default=None, max_length=40)

    @field_validator("industry", "currency", "need", "purchase_timeframe", mode="before")
    @classmethod
    def blank_optional_strings_are_none(cls, value: object) -> object:
        if isinstance(value, str) and not value.strip():
            return None
        return value

    @field_validator("currency")
    @classmethod
    def validate_currency(cls, value: str | None) -> str | None:
        if value is None:
            return None
        normalized = value.upper()
        if normalized not in SUPPORTED_CURRENCIES:
            raise ValueError("currency must be one of NGN, USD, GBP, EUR, or ZAR")
        return normalized

    @field_validator("purchase_timeframe")
    @classmethod
    def validate_purchase_timeframe(cls, value: str | None) -> str | None:
        if value is None:
            return None
        if value not in PURCHASE_TIMEFRAMES:
            raise ValueError("purchase_timeframe must be a supported choice")
        return value

    @field_validator("budget_amount")
    @classmethod
    def reject_non_finite_budget(cls, value: float | None) -> float | None:
        if value is not None and not math.isfinite(value):
            raise ValueError("budget_amount must be a finite number")
        return value

    @model_validator(mode="after")
    def validate_budget_currency_pair(self) -> "LeadInput":
        if self.budget_amount is not None and self.currency is None:
            raise ValueError("currency is required when budget_amount is supplied")
        if self.budget_amount is None and self.currency is not None:
            raise ValueError("currency can only be supplied with budget_amount")
        return self


class SalesRunRequest(APIModel):
    lead: LeadInput
    trigger: Literal["new_lead", "new_lead_submitted"] = "new_lead"
    hot_follow_up_rule: Literal["immediate", "within_24_hours"]
    idempotency_key: str | None = Field(default=None, min_length=8, max_length=128, pattern=r"^[A-Za-z0-9._:-]+$")


# Preserve the original public Python name for the Sales workflow.
RunRequest = SalesRunRequest


def _reject_protected_characteristic_text(value: str) -> str:
    terms = "|".join(re.escape(term) for term in PROTECTED_CHARACTERISTIC_TERMS)
    if re.search(rf"\b(?:{terms})\w*\b", value, re.IGNORECASE):
        raise ValueError("candidate screening accepts job-related evidence only")
    return value


class CandidateInput(APIModel):
    """Synthetic, job-related candidate evidence only.

    The name is a local display label and is intentionally not passed to the
    AI adapter or used as screening evidence.
    """

    name: str = Field(min_length=1, max_length=100)
    experience_summary: str = Field(min_length=20, max_length=2000)
    skills: list[str] = Field(min_length=1, max_length=12)
    work_examples: str | None = Field(default=None, max_length=1200)

    @field_validator("work_examples", mode="before")
    @classmethod
    def blank_work_examples_are_none(cls, value: object) -> object:
        if isinstance(value, str) and not value.strip():
            return None
        return value

    @field_validator("experience_summary", "work_examples")
    @classmethod
    def require_job_related_text(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return _reject_protected_characteristic_text(value)

    @field_validator("skills")
    @classmethod
    def validate_skills(cls, values: list[str]) -> list[str]:
        cleaned: list[str] = []
        seen: set[str] = set()
        for value in values:
            if not isinstance(value, str):
                raise ValueError("skills must contain text values")
            skill = value.strip()
            if not skill or len(skill) > 80:
                raise ValueError("skills must contain non-empty values up to 80 characters")
            _reject_protected_characteristic_text(skill)
            key = skill.casefold()
            if key in seen:
                raise ValueError("skills must not contain duplicates")
            seen.add(key)
            cleaned.append(skill)
        return cleaned


class JobCriterion(APIModel):
    id: str = Field(min_length=2, max_length=64, pattern=r"^[a-z][a-z0-9_-]*$")
    description: str = Field(min_length=3, max_length=240)

    @field_validator("description")
    @classmethod
    def require_job_related_criterion(cls, value: str) -> str:
        return _reject_protected_characteristic_text(value)


class JobRequirementsInput(APIModel):
    title: str = Field(min_length=1, max_length=120)
    criteria: list[JobCriterion] = Field(min_length=1, max_length=6)

    @field_validator("title")
    @classmethod
    def title_must_be_job_related(cls, value: str) -> str:
        return _reject_protected_characteristic_text(value)

    @field_validator("criteria")
    @classmethod
    def criteria_must_have_unique_ids(cls, values: list[JobCriterion]) -> list[JobCriterion]:
        ids = [criterion.id for criterion in values]
        if len(ids) != len(set(ids)):
            raise ValueError("criteria must have unique IDs")
        return values


class HRCandidateScreeningRunRequest(APIModel):
    candidate: CandidateInput
    job_requirements: JobRequirementsInput
    trigger: Literal["candidate_submitted"] = "candidate_submitted"
    review_rule: Literal["human_review_required"] = "human_review_required"
    idempotency_key: str | None = Field(default=None, min_length=8, max_length=128, pattern=r"^[A-Za-z0-9._:-]+$")


class ClassificationPayload(APIModel):
    priority: Literal["HOT", "WARM", "COLD", "NEEDS_REVIEW"]
    explanation: str = Field(min_length=1, max_length=500)
    evidence: list[str] = Field(min_length=1, max_length=4)
    missing_fields: list[str] = Field(default_factory=list, max_length=6)
    suggested_next_step: str = Field(min_length=1, max_length=300)

    @field_validator("evidence")
    @classmethod
    def evidence_must_use_known_fields(cls, values: list[str]) -> list[str]:
        if len(values) != len(set(values)) or any(value not in EVIDENCE_FIELDS for value in values):
            raise ValueError("evidence must contain unique supplied-input field names")
        return values

    @field_validator("missing_fields")
    @classmethod
    def missing_fields_must_be_known(cls, values: list[str]) -> list[str]:
        if len(values) != len(set(values)) or any(value not in MISSING_FIELDS for value in values):
            raise ValueError("missing_fields must contain known input field names")
        return values

    @field_validator("explanation", "suggested_next_step")
    @classmethod
    def reject_unapproved_output_targets(cls, value: str) -> str:
        # The classifier may describe supplied facts, but it may not smuggle a
        # URL, email address, or external-contact instruction into its output.
        if re.search(r"https?://|www\.|\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b", value, re.IGNORECASE):
            raise ValueError("classification output cannot contain external contact targets")
        return value


def validate_classification_against_lead(
    classification: ClassificationPayload, lead: LeadInput
) -> ClassificationPayload:
    """Reject provider output that cites missing input as evidence."""

    lead_data = lead.model_dump()
    unavailable = [field for field in classification.evidence if lead_data.get(field) is None]
    if unavailable:
        raise ValueError("classification cited unavailable lead fields")
    return classification


class CriterionEvidence(APIModel):
    criterion_id: str = Field(min_length=2, max_length=64, pattern=r"^[a-z][a-z0-9_-]*$")
    status: Literal["supported", "not_evidenced", "unclear"]
    evidence_fields: list[Literal["experience_summary", "skills", "work_examples"]] = Field(default_factory=list, max_length=3)

    @model_validator(mode="after")
    def evidence_status_matches_field_references(self) -> "CriterionEvidence":
        if self.status == "supported" and not self.evidence_fields:
            raise ValueError("supported criteria must cite a supplied candidate field")
        if self.status != "supported" and self.evidence_fields:
            raise ValueError("unsupported criteria cannot cite candidate fields as evidence")
        if len(self.evidence_fields) != len(set(self.evidence_fields)):
            raise ValueError("evidence fields must be unique")
        return self


class CandidateScreeningPayload(APIModel):
    """A constrained evidence review, never a hiring decision."""

    evidence_status: Literal["EVIDENCE_ALIGNS", "PARTIAL_EVIDENCE", "INSUFFICIENT_INFORMATION"]
    criteria_evidence: list[CriterionEvidence] = Field(min_length=1, max_length=6)
    evidence: list[str] = Field(default_factory=list, max_length=6)
    missing_fields: list[str] = Field(default_factory=list, max_length=6)
    recommendation: Literal["HUMAN_REVIEW_REQUIRED"]
    human_review_required: Literal[True]
    suggested_next_step: Literal[
        "A human reviewer must review the supplied job-related evidence before making any hiring decision."
    ]


def validate_screening_against_input(
    screening: CandidateScreeningPayload,
    candidate: CandidateInput,
    job_requirements: JobRequirementsInput,
) -> CandidateScreeningPayload:
    """Make the model cite only requested criteria and supplied candidate fields."""

    requested_ids = {criterion.id for criterion in job_requirements.criteria}
    provided_fields = {"experience_summary", "skills"}
    if candidate.work_examples:
        provided_fields.add("work_examples")

    evidence_ids = [item.criterion_id for item in screening.criteria_evidence]
    if len(evidence_ids) != len(set(evidence_ids)) or set(evidence_ids) != requested_ids:
        raise ValueError("screening must evaluate each requested criterion exactly once")
    for item in screening.criteria_evidence:
        if any(field not in provided_fields for field in item.evidence_fields):
            raise ValueError("screening cited an unavailable candidate field")

    supported_ids = {item.criterion_id for item in screening.criteria_evidence if item.status == "supported"}
    missing_ids = {item.criterion_id for item in screening.criteria_evidence if item.status != "supported"}
    if len(screening.evidence) != len(set(screening.evidence)) or set(screening.evidence) != supported_ids:
        raise ValueError("screening evidence must match supported criteria")
    if len(screening.missing_fields) != len(set(screening.missing_fields)) or set(screening.missing_fields) != missing_ids:
        raise ValueError("screening missing information must match unevidenced criteria")

    expected_status = (
        "EVIDENCE_ALIGNS"
        if not missing_ids
        else "PARTIAL_EVIDENCE"
        if supported_ids
        else "INSUFFICIENT_INFORMATION"
    )
    if screening.evidence_status != expected_status:
        raise ValueError("screening evidence status is inconsistent with cited criteria")
    return screening


def parse_run_request(workflow_key: str, payload: dict[str, Any]) -> SalesRunRequest | HRCandidateScreeningRunRequest:
    if workflow_key == SALES_WORKFLOW_KEY:
        return SalesRunRequest.model_validate(payload)
    if workflow_key == HR_WORKFLOW_KEY:
        return HRCandidateScreeningRunRequest.model_validate(payload)
    raise ValueError("workflow is unavailable")


class AssessmentAttemptRequest(APIModel):
    answers: dict[str, Any] = Field(default_factory=dict)
    practical: dict[str, Any] = Field(default_factory=dict)


class LessonProgressRequest(APIModel):
    """A single Academy section/check update from the learner."""

    section_id: str = Field(min_length=2, max_length=80, pattern=r"^[a-z][a-z0-9_-]*$")
    knowledge_check_id: str | None = Field(default=None, min_length=2, max_length=100, pattern=r"^[a-z][a-z0-9_-]*$")
    answer: str | None = Field(default=None, min_length=1, max_length=20)


class LessonCompletionRequest(APIModel):
    section_ids: list[str] = Field(default_factory=list, max_length=20)
    knowledge_check_ids: list[str] = Field(default_factory=list, max_length=20)


class IndependentExerciseAttemptRequest(APIModel):
    """Learner choices for a server-graded independent scenario."""

    answers: dict[str, str] = Field(default_factory=dict, max_length=8)

    @field_validator("answers")
    @classmethod
    def validate_answer_values(cls, values: dict[str, str]) -> dict[str, str]:
        if any(len(key) > 80 or len(value) > 120 for key, value in values.items()):
            raise ValueError("Independent exercise answers are too long.")
        return values


class PortfolioPatchRequest(APIModel):
    visibility: Literal["private", "organization", "public"] | None = None
    selected_public_items: list[str] | None = Field(default=None, max_length=20)

    @field_validator("selected_public_items")
    @classmethod
    def no_duplicate_public_items(cls, values: list[str] | None) -> list[str] | None:
        if values is not None and len(values) != len(set(values)):
            raise ValueError("selected_public_items cannot contain duplicates")
        return values
