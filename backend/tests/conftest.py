from __future__ import annotations

from collections.abc import Generator
from pathlib import Path
from uuid import uuid4

import pytest
from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app


def make_settings(database_url: str, *, ai_mode: str = "mock") -> Settings:
    return Settings(
        environment="test",
        database_url=database_url,
        ai_mode=ai_mode,
        openai_api_key=None,
        openai_model=None,
        session_secret="test-session-secret",
        cors_origins=("http://testserver", "http://localhost:5173"),
        live_run_daily_limit=100,
        run_timeout_seconds=5,
    )


@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    # Keep SQLite test files under the writable repository rather than a
    # platform-specific temporary directory (important for restricted runners).
    test_data = Path(__file__).resolve().parents[1] / ".test-data"
    test_data.mkdir(exist_ok=True)
    database_path = test_data / f"ikeoru-{uuid4().hex}.db"
    settings = make_settings(f"sqlite:///{database_path.as_posix()}")
    app = create_app(settings)
    with TestClient(app) as test_client:
        yield test_client
    database_path.unlink(missing_ok=True)
