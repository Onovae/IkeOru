# IkeOru

> Learn. Do. Prove.

**Built with Codex** for the Moonshot Learn challenge.

IkeOru is a practical AI-powered learning and workforce-capability platform. It helps people learn automation concepts, practise bounded workplace workflows, inspect safe results, and build evidence of introductory capability.

## MVP scope

The Moonshot MVP has two active, synthetic-data learning paths:

1. `Sales → Qualify a New Lead → Learn → Practice → Run → Result → Assessment → Achievement → Portfolio`
2. `HR → Candidate Screening → Learn → Practice → Run → Result → Assessment → Achievement → Portfolio`

Marketing, Finance, Operations, Customer Support, and Business Intelligence are **Coming Soon** previews. Future Sales paths (lead generation, follow-up, email drafting, pipeline reporting, re-engagement) and HR paths (interview scheduling, onboarding, employee-query classification, leave processing, training-needs identification, HR document processing) are also Coming Soon. Studio, real CRM/email/ATS integrations, billing, and automated hiring decisions are out of scope.

Sales retains server-controlled `HOT`, `WARM`, `COLD`, and `NEEDS_REVIEW` policy branches. HR Candidate Screening compares only supplied synthetic candidate information against explicit job-related criteria, identifies evidence and missing information, and always requires human review; it never makes a hiring decision or uses protected characteristics.

## Learning model

IkeOru is Academy-first. Its learning model is **Learn → Do → Prove**:

- **Learn:** understand the concepts, business context, safety boundaries, and expected outcome through a structured lesson.
- **Do:** practise a guided, constrained synthetic scenario and connect the concepts to the workflow behaviour.
- **Prove:** demonstrate knowledge and practical application through a distinct, server-graded assessment.

Lesson completion, practical completion, assessment passing, demonstrated competence, and achievement awarded are separate states. Badges, portfolios, progress tracking, and manager reporting support the evidence trail; they do not replace learning or assessment. The current local MVP provides ordered objective-led Academy sections, worked examples, common-mistake guidance, persisted knowledge checks, constrained Labs, and one server-graded independent scenario per active path. A passed independent scenario is required for the practical assessment requirement; this is introductory evidence, not broad competence certification.

## Honest execution modes

The backend owns validation, permitted actions, output-schema checks, persistence, assessment grading, achievement eligibility, and authorization.

- **MOCK** is deterministic and intended for local development and automated tests.
- **LIVE** is shown only after a real server-side provider call succeeds and output validation passes.
- **REPLAY** is a fixed labelled demonstration.
- **FAILED** and **INTERRUPTED** remain explicit terminal states.

Mock, replay, failed, and interrupted runs cannot satisfy a live-run achievement prerequisite. A failed live request never silently falls back to mock output. No successful live-provider call or deployment is claimed by this README; use the verification commands and record the actual result.

## Current local status

Both scoped workflow slices are implemented locally: Sales keeps the existing lead-classification policy loop, while HR adds constrained candidate-evidence review, an internal human-review task, a distinct assessment and achievement definition, and a path-specific portfolio project. The Academy provides ordered objective-led sections, worked examples, common-mistake guidance, server-checked knowledge checks, persisted section progress, and a server-graded independent scenario for both paths. Focused offline backend tests, Python compilation and dependency checks, and the frontend production build have passed. A local browser smoke check previously verified a fresh demo session and protected Sales and HR runs, including persisted results and ordered timelines; the new multi-section/independent-exercise walkthrough still requires a browser run. One explicitly authorized synthetic Sales live-provider diagnostic was attempted; it failed with a sanitized connection (`APIConnectionError`) diagnostic, no successful live result was recorded, and `IKEORU_AI_MODE` was restored to mock. The Windows/Python `TestClient` still stalls after collection for the focused HTTP CSRF test, so that remains an environment limitation rather than a claimed pass.

## Architecture

```text
React + Vite browser app
        │
        ▼
FastAPI API ── SQLite prototype database
        │
        └── AI adapter: deterministic mock (default) | OpenAI live (server-only)
```

The application persists runs, monotonic execution events, permitted internal effects, assessment attempts, achievements, progress, and portfolio projects. Public portfolio serializers expose only explicitly selected safe fields. Raw lead/candidate/job inputs, private review/task content, session data, and assessment answers are never public.

## Local setup

1. Copy the safe examples; never commit the resulting `.env` files.

   ```powershell
   Copy-Item backend/.env.example backend/.env
   Copy-Item frontend/.env.example frontend/.env
   ```

2. Keep `IKEORU_AI_MODE=mock` during development and all automated tests.

3. Start the backend:

   ```powershell
   cd backend
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   python -m pip install -r requirements.txt
   uvicorn app.main:app --env-file .env --reload --port 8000
   ```

4. In another terminal, start the frontend:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

The default frontend URL is `http://localhost:5173`; the default API URL is `http://localhost:8000`.

## Configuration

Copy the examples rather than adding credentials to source. The OpenAI credential is backend-only; the browser receives only `VITE_API_URL`.

| Variable | Purpose | Safe local default |
| --- | --- | --- |
| `IKEORU_ENV` | Runtime environment label | `development` |
| `IKEORU_DATABASE_URL` | SQLite connection URL | `sqlite:///./ikeoru.db` |
| `IKEORU_AI_MODE` | Explicit `mock` or `live` adapter mode | `mock` |
| `OPENAI_API_KEY` | Server-only live provider credential | empty |
| `OPENAI_MODEL` | Configured live provider model | empty |
| `IKEORU_SESSION_SECRET` | Server-side session secret | empty in example only |
| `IKEORU_CORS_ORIGINS` | Allowed browser origins | `http://localhost:5173` |
| `IKEORU_LIVE_RUN_DAILY_LIMIT` | Live provider protective ceiling | `10` |
| `IKEORU_RUN_TIMEOUT_SECONDS` | Bounded live provider request timeout | `60` |
| `VITE_API_URL` | Browser-visible API base URL only | `http://localhost:8000` |

Never place a secret in `VITE_*`, browser code, logs, screenshots, commits, issue text, or public portfolio fields.

## Verification

Run focused backend tests, compilation, dependency checks, the production build, and a whitespace check. Tests must use mock mode and make no provider calls.

```powershell
cd backend
python -m pytest -q --basetemp .pytest-tmp
python -m compileall -q app tests
python -m pip check

cd ..
git diff --check

cd frontend
npm run build
```

The test suite should cover Sales regression branches, HR validation/schema/evidence/human-review behaviour, persistence/event ordering, idempotency, mode separation, assessments and achievements, Coming Soon enforcement, privacy, and ownership. Browser and live-provider verification must be reported only when they have actually run.

## One bounded live-provider check

Do this only after the automated suite is complete and a human authorizes the cost:

1. Keep a database backup or disposable local database and set a low live-run daily limit.
2. Set `IKEORU_AI_MODE=live` in the backend environment; keep the key and session secret private.
3. Start the backend, create a demo session, and submit one valid synthetic workflow input.
4. Confirm the persisted run is labelled `LIVE` only if the provider returns successfully and the backend accepts its structured output. Record a safe success or failure result.
5. Return `IKEORU_AI_MODE` to `mock` after the single check.

Do not treat a configured key, a mocked result, or a replay as proof of live access.

## Repository guides

- [MVP_SPEC.md](MVP_SPEC.md) — authoritative two-path behaviour and acceptance gates.
- [CAPSTONE_SPEC.md](CAPSTONE_SPEC.md) — concise scope and verification plan.
- [PRODUCT_BRIEF.md](PRODUCT_BRIEF.md) — problem, value proposition, and target user.
- [DEMO_SCRIPT.md](DEMO_SCRIPT.md) — rehearsable demo and provider-outage fallback.
- [AGENTS.md](AGENTS.md) — repository rules for coding agents.
- [DECISIONS_AND_EDGE_CASES.md](DECISIONS_AND_EDGE_CASES.md) — scope decisions and safety cases.

Historical planning material may retain the former working name “Automation Lab.” New product-facing copy uses **IkeOru**.
