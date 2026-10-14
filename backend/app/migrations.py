"""Small, dependency-free migration runner for the prototype schema."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass

from sqlalchemy import Connection, Engine, text

from .models import Base


@dataclass(frozen=True)
class Migration:
    version: str
    name: str
    upgrade: Callable[[Connection], None]


def _initial_schema(connection: Connection) -> None:
    Base.metadata.create_all(bind=connection)


def _academy_progress_columns(connection: Connection) -> None:
    """Add persisted Academy section/check state to existing local databases."""

    columns = {row[1] for row in connection.exec_driver_sql("PRAGMA table_info(lesson_progress)").fetchall()}
    if "completed_sections" not in columns:
        connection.exec_driver_sql("ALTER TABLE lesson_progress ADD COLUMN completed_sections JSON NOT NULL DEFAULT '[]'")
    if "knowledge_checks" not in columns:
        connection.exec_driver_sql("ALTER TABLE lesson_progress ADD COLUMN knowledge_checks JSON NOT NULL DEFAULT '{}'")


def _independent_exercise_columns(connection: Connection) -> None:
    """Add persisted practical-exercise state without rewriting existing progress."""

    columns = {row[1] for row in connection.exec_driver_sql("PRAGMA table_info(progress)").fetchall()}
    if "independent_exercise_passed" not in columns:
        connection.exec_driver_sql(
            "ALTER TABLE progress ADD COLUMN independent_exercise_passed BOOLEAN NOT NULL DEFAULT 0"
        )
    if "independent_attempts" not in columns:
        connection.exec_driver_sql(
            "ALTER TABLE progress ADD COLUMN independent_attempts JSON NOT NULL DEFAULT '[]'"
        )


MIGRATIONS: tuple[Migration, ...] = (
    Migration(version="001", name="initial_schema", upgrade=_initial_schema),
    Migration(version="002", name="academy_progress_columns", upgrade=_academy_progress_columns),
    Migration(version="003", name="independent_exercise_columns", upgrade=_independent_exercise_columns),
)


def apply_migrations(engine: Engine) -> None:
    """Apply each ordered migration once and record its immutable version."""

    with engine.begin() as connection:
        connection.execute(
            text(
                "CREATE TABLE IF NOT EXISTS schema_migrations "
                "(version VARCHAR(50) PRIMARY KEY, name VARCHAR(150) NOT NULL, applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)"
            )
        )
        applied = set(connection.execute(text("SELECT version FROM schema_migrations")).scalars())
        for migration in MIGRATIONS:
            if migration.version in applied:
                continue
            migration.upgrade(connection)
            connection.execute(
                text("INSERT INTO schema_migrations (version, name) VALUES (:version, :name)"),
                {"version": migration.version, "name": migration.name},
            )
