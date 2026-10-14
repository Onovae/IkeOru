"""Configuration loaded exclusively from environment variables."""

from __future__ import annotations

import hashlib
import hmac
import os
from dataclasses import dataclass
from pathlib import Path


def _int_from_env(name: str, default: int, *, minimum: int = 1) -> int:
    raw_value = os.getenv(name)
    if raw_value is None or raw_value == "":
        return default
    try:
        value = int(raw_value)
    except ValueError as exc:
        raise ValueError(f"{name} must be an integer") from exc
    if value < minimum:
        raise ValueError(f"{name} must be at least {minimum}")
    return value


def _optional_string_from_env(name: str) -> str | None:
    """Return a trimmed, non-empty environment value without exposing it."""

    raw_value = os.getenv(name)
    if raw_value is None:
        return None
    normalized = raw_value.strip()
    return normalized or None


@dataclass(frozen=True)
class Settings:
    """Runtime configuration for the local prototype.

    The development session secret is deliberately unusable in production. It
    is not an API credential and avoids making local setup depend on a secret.
    """

    environment: str
    database_url: str
    ai_mode: str
    openai_api_key: str | None
    openai_model: str | None
    session_secret: str
    cors_origins: tuple[str, ...]
    live_run_daily_limit: int
    run_timeout_seconds: int
    @classmethod
    def from_env(cls) -> "Settings":
        backend_directory = Path(__file__).resolve().parents[1]
        default_database = f"sqlite:///{(backend_directory / 'ikeoru.db').as_posix()}"
        environment = os.getenv("IKEORU_ENV", "development").strip().lower()
        ai_mode = os.getenv("IKEORU_AI_MODE", "mock").strip().lower()
        if ai_mode not in {"mock", "live"}:
            raise ValueError("IKEORU_AI_MODE must be 'mock' or 'live'")

        configured_session_secret = _optional_string_from_env("IKEORU_SESSION_SECRET")
        session_secret = configured_session_secret or "development-only-not-a-secret"
        if environment in {"production", "prod"} and session_secret == "development-only-not-a-secret":
            raise ValueError("IKEORU_SESSION_SECRET is required in production")

        origins = tuple(
            origin.strip().rstrip("/")
            for origin in os.getenv(
                "IKEORU_CORS_ORIGINS",
                "http://localhost:5173,http://127.0.0.1:5173",
            ).split(",")
            if origin.strip()
        )
        return cls(
            environment=environment,
            database_url=os.getenv("IKEORU_DATABASE_URL", default_database),
            ai_mode=ai_mode,
            openai_api_key=_optional_string_from_env("OPENAI_API_KEY"),
            openai_model=_optional_string_from_env("OPENAI_MODEL"),
            session_secret=session_secret,
            cors_origins=origins,
            live_run_daily_limit=_int_from_env("IKEORU_LIVE_RUN_DAILY_LIMIT", 10),
            run_timeout_seconds=_int_from_env("IKEORU_RUN_TIMEOUT_SECONDS", 60),
        )

    @property
    def secure_cookies(self) -> bool:
        return self.environment in {"production", "prod"}

    def token_digest(self, raw_token: str) -> str:
        return hmac.new(
            self.session_secret.encode("utf-8"), raw_token.encode("utf-8"), hashlib.sha256
        ).hexdigest()
