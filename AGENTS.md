# IkeOru Repository Rules

## Source of truth and scope

1. Read `MVP_SPEC.md` before changing behaviour. It is the authoritative Moonshot MVP contract.
2. Use `DECISIONS_AND_EDGE_CASES.md` for resolved edge cases; `plan.md` and `prompts.md` are historical context and do not override the specification.
3. Build exactly two active paths: `sales-qualify-new-lead` and `hr-candidate-screening`. Marketing, Finance, Operations, Customer Support, Business Intelligence, and all additional Sales/HR workflows are Coming Soon only.
4. Do not add Studio, real CRM/email/ATS integrations, arbitrary tool execution, billing, production onboarding, or automated employment decisions.
5. Use **IkeOru** in new product-facing copy. Preserve historical “Automation Lab” references where they explain earlier work; do not rename the repository unnecessarily.
6. Preserve the Academy-first **Learn → Do → Prove** philosophy: teach before execution, connect practice to concepts, and assess both knowledge and application.
7. Do not turn a shallow lesson, a successful workflow run, or a completion flag into a competence claim. Keep lesson completion, practical completion, assessment passing, demonstrated competence, and achievement awarded distinct.
8. Keep documentation aligned with the actual implementation and verification evidence. Mark deeper Academy requirements as pending until they are implemented and tested.

## Architecture and commands

- Frontend: React + Vite in `frontend/`; backend: FastAPI in `backend/`; local prototype database: SQLite.
- Start backend: `cd backend; uvicorn app.main:app --env-file .env --reload --port 8000`.
- Start frontend: `cd frontend; npm run dev`.
- Backend checks: `cd backend; python -m pytest -q --basetemp .pytest-tmp; python -m compileall -q app tests; python -m pip check`.
- Frontend check: `cd frontend; npm run build`.
- Repository check: `git diff --check`.

## Security, data, and AI rules

- Use synthetic lead, candidate, and job-requirement data only. Never commit, print, copy, log, or expose secrets, sessions, raw private inputs, review/task content, or assessment answers.
- Read credentials only from environment variables. `OPENAI_API_KEY` is backend-only; never use a secret in `VITE_*`, browser code, tests, or public portfolio data.
- Keep `IKEORU_AI_MODE=mock` for implementation and automated tests. A deterministic mock, replay, failure, and successful live response are distinct modes/states. Never fabricate a live call or silently fall back from failed live mode to mock.
- The backend validates input and adapter output, owns workflow policies/tool allowlists, and never evaluates user/model strings as code, SQL, URLs, or arbitrary actions.
- HR Candidate Screening may use only explicit job-related criteria. Never request, infer, use, rank, or recommend based on protected characteristics or proxies; never invent qualifications or make/recommend an automatic hiring decision. Require human review in every result.
- Enforce owner and organization checks on all private routes. Public serializers must use explicit safe-field allowlists.

## Quality and change discipline

- Inspect Git status and relevant files before editing. Preserve unrelated user work. Do not commit, push, force-push, reset history, or add unnecessary dependencies without approval.
- Add focused tests for changed behaviour. Preserve Sales coverage and add HR validation, structured output, evidence/gap, human-review, event, assessment/achievement, privacy/ownership, idempotency, and Coming Soon coverage.
- When improving Academy content, verify that teaching, guided practice, and assessment align to explicit objectives; do not jump directly from a shallow lesson to workflow execution.
- Run the relevant checks and report exact commands/results. Distinguish environment limitations from application failures.
- Do not call planned, mock, seeded, or untested work implemented, live, or verified without evidence.
