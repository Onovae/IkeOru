"""Offline configuration and adapter-boundary tests.

These tests use dummy values only. They never read a developer's local .env
file and never make a network request.
"""

from __future__ import annotations

import json
import sys
from types import ModuleType, SimpleNamespace

import pytest

from app.ai import AIOutputInvalid, AIProviderUnavailable, LiveOpenAILeadClassifier, get_classifier
from app.config import Settings
from app.schemas import CandidateInput, JobRequirementsInput, LeadInput


def make_settings(*, ai_mode: str = "mock", api_key: str | None = None, model: str | None = None, timeout: int = 17) -> Settings:
    return Settings(
        environment="test",
        database_url="sqlite:///./test-config.db",
        ai_mode=ai_mode,
        openai_api_key=api_key,
        openai_model=model,
        session_secret="test-session-secret",
        cors_origins=("http://localhost:5173",),
        live_run_daily_limit=3,
        run_timeout_seconds=timeout,
    )


def sample_lead() -> LeadInput:
    return LeadInput(
        name="Test learner",
        company="Test company",
        message="Our sales team needs lead qualification automation this week.",
        need="Lead qualification automation",
        purchase_timeframe="immediate",
    )


def sample_candidate() -> tuple[CandidateInput, JobRequirementsInput]:
    return (
        CandidateInput(
            name="Synthetic Candidate",
            experience_summary="Prepared clear customer updates and maintained support tickets for a product team.",
            skills=["written communication", "Zendesk"],
        ),
        JobRequirementsInput(
            title="Customer Support Specialist",
            criteria=[
                {"id": "written_updates", "description": "Clear written communication for customer updates."},
                {"id": "data_reporting", "description": "Experience creating data reporting dashboards."},
            ],
        ),
    )


def test_settings_from_env_reads_and_normalizes_expected_variables(monkeypatch: pytest.MonkeyPatch) -> None:
    for name in (
        "IKEORU_ENV",
        "IKEORU_DATABASE_URL",
        "IKEORU_AI_MODE",
        "OPENAI_API_KEY",
        "OPENAI_MODEL",
        "IKEORU_SESSION_SECRET",
        "IKEORU_CORS_ORIGINS",
        "IKEORU_LIVE_RUN_DAILY_LIMIT",
        "IKEORU_RUN_TIMEOUT_SECONDS",
    ):
        monkeypatch.delenv(name, raising=False)
    monkeypatch.setenv("IKEORU_ENV", "development")
    monkeypatch.setenv("IKEORU_DATABASE_URL", "sqlite:///./config-test.db")
    monkeypatch.setenv("IKEORU_AI_MODE", "mock")
    monkeypatch.setenv("OPENAI_API_KEY", " dummy-test-key ")
    monkeypatch.setenv("OPENAI_MODEL", " gpt-4o-mini ")
    monkeypatch.setenv("IKEORU_SESSION_SECRET", " test-session-secret ")
    monkeypatch.setenv("IKEORU_CORS_ORIGINS", "http://localhost:5173/, http://127.0.0.1:5173")
    monkeypatch.setenv("IKEORU_LIVE_RUN_DAILY_LIMIT", "7")
    monkeypatch.setenv("IKEORU_RUN_TIMEOUT_SECONDS", "23")

    settings = Settings.from_env()

    assert settings.database_url == "sqlite:///./config-test.db"
    assert settings.ai_mode == "mock"
    assert settings.openai_api_key == "dummy-test-key"
    assert settings.openai_model == "gpt-4o-mini"
    assert settings.session_secret == "test-session-secret"
    assert settings.cors_origins == ("http://localhost:5173", "http://127.0.0.1:5173")
    assert settings.live_run_daily_limit == 7
    assert settings.run_timeout_seconds == 23


def test_production_rejects_blank_session_secret(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("IKEORU_ENV", "production")
    monkeypatch.setenv("IKEORU_SESSION_SECRET", "   ")

    with pytest.raises(ValueError, match="IKEORU_SESSION_SECRET is required in production"):
        Settings.from_env()


def test_mock_adapter_is_deterministic_and_live_requires_credentials() -> None:
    lead = sample_lead()
    classifier = get_classifier(make_settings())

    assert classifier.classify(lead, "1.0") == classifier.classify(lead, "1.0")
    candidate, requirements = sample_candidate()
    screening = classifier.screen_candidate(candidate, requirements, "1.0")
    assert screening == classifier.screen_candidate(candidate, requirements, "1.0")
    assert screening.recommendation == "HUMAN_REVIEW_REQUIRED"
    assert screening.human_review_required is True
    assert {item.criterion_id for item in screening.criteria_evidence} == {"written_updates", "data_reporting"}
    with pytest.raises(AIProviderUnavailable, match="Live AI is not configured"):
        LiveOpenAILeadClassifier(make_settings(ai_mode="live"))


def test_live_adapter_uses_model_and_request_timeout_without_network(monkeypatch: pytest.MonkeyPatch) -> None:
    captured: dict[str, object] = {}

    class FakeResponses:
        def create(self, **kwargs: object) -> SimpleNamespace:
            captured["request"] = kwargs
            return SimpleNamespace(
                output_text=json.dumps(
                    {
                        "priority": "HOT",
                        "explanation": "The supplied context has a relevant near-term need.",
                        "evidence": ["need", "purchase_timeframe", "message"],
                        "missing_fields": [],
                        "suggested_next_step": "Create the permitted internal follow-up task.",
                    }
                )
            )

    class FakeOpenAI:
        def __init__(self, *, api_key: str, timeout: int, max_retries: int) -> None:
            captured["api_key"] = api_key
            captured["timeout"] = timeout
            captured["max_retries"] = max_retries
            self.responses = FakeResponses()

    fake_openai = ModuleType("openai")
    fake_openai.OpenAI = FakeOpenAI  # type: ignore[attr-defined]
    monkeypatch.setitem(sys.modules, "openai", fake_openai)
    settings = make_settings(ai_mode="live", api_key="dummy-test-key", model="gpt-4o-mini", timeout=23)

    result = LiveOpenAILeadClassifier(settings).classify(sample_lead(), "1.0")

    assert result.priority == "HOT"
    assert captured["timeout"] == 23
    assert captured["max_retries"] == 0
    assert isinstance(captured["request"], dict)
    assert captured["request"]["model"] == "gpt-4o-mini"  # type: ignore[index]
    assert captured["request"]["text"] == {
        "format": {
            "type": "json_schema",
            "name": "ikeoru_lead_classification",
            "strict": True,
            "schema": captured["request"]["text"]["format"]["schema"],  # type: ignore[index]
        }
    }


def test_live_hr_adapter_uses_strict_responses_output_without_candidate_name(monkeypatch: pytest.MonkeyPatch) -> None:
    captured: dict[str, object] = {}

    class FakeResponses:
        def create(self, **kwargs: object) -> SimpleNamespace:
            captured["request"] = kwargs
            return SimpleNamespace(
                output_text=json.dumps(
                    {
                        "evidence_status": "PARTIAL_EVIDENCE",
                        "criteria_evidence": [
                            {"criterion_id": "written_updates", "status": "supported", "evidence_fields": ["skills"]},
                            {"criterion_id": "data_reporting", "status": "not_evidenced", "evidence_fields": []},
                        ],
                        "evidence": ["written_updates"],
                        "missing_fields": ["data_reporting"],
                        "recommendation": "HUMAN_REVIEW_REQUIRED",
                        "human_review_required": True,
                        "suggested_next_step": "A human reviewer must review the supplied job-related evidence before making any hiring decision.",
                    }
                )
            )

    class FakeOpenAI:
        def __init__(self, *, api_key: str, timeout: int, max_retries: int) -> None:
            captured["api_key"] = api_key
            captured["timeout"] = timeout
            captured["max_retries"] = max_retries
            self.responses = FakeResponses()

    fake_openai = ModuleType("openai")
    fake_openai.OpenAI = FakeOpenAI  # type: ignore[attr-defined]
    monkeypatch.setitem(sys.modules, "openai", fake_openai)
    candidate, requirements = sample_candidate()
    result = LiveOpenAILeadClassifier(
        make_settings(ai_mode="live", api_key="dummy-test-key", model="gpt-4o-mini", timeout=23)
    ).screen_candidate(candidate, requirements, "1.0")

    assert result.recommendation == "HUMAN_REVIEW_REQUIRED"
    assert captured["timeout"] == 23
    assert captured["max_retries"] == 0
    assert isinstance(captured["request"], dict)
    request = captured["request"]
    assert request["model"] == "gpt-4o-mini"  # type: ignore[index]
    assert request["text"]["format"]["name"] == "ikeoru_candidate_evidence_review"  # type: ignore[index]
    payload = json.loads(request["input"][1]["content"])  # type: ignore[index]
    assert "name" not in payload["candidate"]


def test_live_provider_error_is_not_converted_to_a_mock_result(monkeypatch: pytest.MonkeyPatch) -> None:
    class FailingResponses:
        def create(self, **_kwargs: object) -> None:
            raise RuntimeError("simulated provider failure")

    class FakeOpenAI:
        def __init__(self, *, api_key: str, timeout: int, max_retries: int) -> None:
            self.responses = FailingResponses()

    fake_openai = ModuleType("openai")
    fake_openai.OpenAI = FakeOpenAI  # type: ignore[attr-defined]
    monkeypatch.setitem(sys.modules, "openai", fake_openai)

    with pytest.raises(AIProviderUnavailable, match="Live AI is unavailable"):
        LiveOpenAILeadClassifier(
            make_settings(ai_mode="live", api_key="dummy-test-key", model="gpt-4o-mini")
        ).classify(sample_lead(), "1.0")


@pytest.mark.parametrize(
    ("exception_name", "status_code", "provider_type", "provider_code", "expected_category"),
    [
        ("AuthenticationError", 401, "authentication_error", "invalid_api_key", "authentication"),
        ("PermissionDeniedError", 403, "permission_error", "access_denied", "authorization"),
        ("BadRequestError", 400, "invalid_request_error", "invalid_parameter", "invalid_request"),
        ("RateLimitError", 429, "rate_limit_error", "insufficient_quota", "rate_limit_or_quota"),
        ("APITimeoutError", None, None, None, "timeout"),
        ("APIConnectionError", None, None, None, "connection"),
        ("InternalServerError", 500, "server_error", "internal_error", "provider_service_error"),
        ("RuntimeError", None, None, None, "application_error"),
    ],
)
def test_live_adapter_captures_bounded_failure_diagnostics(
    monkeypatch: pytest.MonkeyPatch,
    exception_name: str,
    status_code: int | None,
    provider_type: str | None,
    provider_code: str | None,
    expected_category: str,
) -> None:
    error_class = type(exception_name, (Exception,), {})
    provider_error = error_class("raw provider message containing a secret-looking value")
    provider_error.status_code = status_code
    provider_error.body = {
        "error": {
            "type": provider_type,
            "code": provider_code,
            "message": "raw provider message containing a secret-looking value",
        }
    }
    provider_error.request_id = "req_synthetic_123"

    class FailingResponses:
        def create(self, **_kwargs: object) -> None:
            raise provider_error

    class FakeOpenAI:
        def __init__(self, *, api_key: str, timeout: int, max_retries: int) -> None:
            assert api_key == "dummy-test-key"
            assert timeout == 17
            assert max_retries == 0
            self.responses = FailingResponses()

    fake_openai = ModuleType("openai")
    fake_openai.OpenAI = FakeOpenAI  # type: ignore[attr-defined]
    monkeypatch.setitem(sys.modules, "openai", fake_openai)

    with pytest.raises(AIProviderUnavailable) as caught:
        LiveOpenAILeadClassifier(
            make_settings(ai_mode="live", api_key="dummy-test-key", model="gpt-4o-mini")
        ).classify(sample_lead(), "1.0")

    diagnostic = caught.value.diagnostic
    assert diagnostic is not None
    assert diagnostic["category"] == expected_category
    assert diagnostic["exception_class"] == exception_name
    assert diagnostic["summary"]
    if status_code is not None:
        assert diagnostic["status_code"] == status_code
    else:
        assert "status_code" not in diagnostic
    if provider_type is not None:
        assert diagnostic["provider_type"] == provider_type
        assert diagnostic["provider_code"] == provider_code
    assert diagnostic["request_id"] == "req_synthetic_123"
    assert "raw provider message" not in json.dumps(diagnostic)


def test_live_adapter_marks_invalid_structured_output_without_raw_content(monkeypatch: pytest.MonkeyPatch) -> None:
    class FakeResponses:
        def create(self, **_kwargs: object) -> SimpleNamespace:
            return SimpleNamespace(output_text='{"priority":"NOT_A_VALID_PRIORITY"}')

    class FakeOpenAI:
        def __init__(self, *, api_key: str, timeout: int, max_retries: int) -> None:
            self.responses = FakeResponses()

    fake_openai = ModuleType("openai")
    fake_openai.OpenAI = FakeOpenAI  # type: ignore[attr-defined]
    monkeypatch.setitem(sys.modules, "openai", fake_openai)

    with pytest.raises(AIOutputInvalid) as caught:
        LiveOpenAILeadClassifier(
            make_settings(ai_mode="live", api_key="dummy-test-key", model="gpt-4o-mini")
        ).classify(sample_lead(), "1.0")

    assert caught.value.diagnostic is not None
    assert caught.value.diagnostic["category"] == "invalid_response"
