# IkeOru

> **Learn. Do. Prove.**

Built with Codex for the Moonshot Learn challenge.

IkeOru is an AI-powered practical learning platform for understanding workplace processes, practising bounded applications of that knowledge, and building evidence of introductory capability. It is deliberately academy-first: the product teaches the concepts and safety boundaries behind a process before asking a learner to use a workflow.

## At a glance

- **Active learning paths:** Sales — Qualify a New Lead; HR — Candidate Screening
- **Learning model:** Learn → Do → Prove
- **Safe demonstration mode:** deterministic, visibly labelled mock execution
- **Stack:** React, TypeScript, Vite, FastAPI, SQLAlchemy, and SQLite
- **Data boundary:** synthetic demo data only

## Product overview

IkeOru connects learning with practical workplace capability instead of treating course completion as proof of competence. The Academy is the foundation of each path: it establishes what the workflow does, why its business and safety boundaries exist, and what a learner should be able to explain before practical work begins.

The experience follows **Learn → Do → Prove**:

- **Learn** — structured lessons with learning objectives, foundational concepts, worked examples, common mistakes, knowledge checks, and feedback.
- **Do** — guided practice, constrained workflow choices, and a separate independent exercise using realistic synthetic scenarios.
- **Prove** — server-graded theory and practical assessments with feedback, plus eligibility-based achievement evidence.

These are distinct states. A lesson record, practical completion, assessment pass, introductory demonstrated capability, and an achievement are not interchangeable claims.

## Problem and value proposition

Workplace automation is often taught as vocabulary or demonstrated as a finished workflow. That leaves a gap between knowing that automation exists and being able to reason about its trigger, inputs, AI boundary, deterministic policy, permitted action, output, and human-review point.

IkeOru closes that gap with scoped learning journeys. Learners practise on synthetic data, inspect honest workflow results, and receive feedback on both conceptual understanding and bounded application. The product does not claim that course completion alone proves broad competence, certification, or readiness for an employment decision.

## Active MVP scope

The MVP intentionally has exactly two operational learning paths.

| Path | Purpose | Demonstrated capabilities |
| --- | --- | --- |
| **Sales — Qualify a New Lead** | Teach evidence-based lead qualification from supplied synthetic business context. | Validates lead input; produces `HOT`, `WARM`, `COLD`, or `NEEDS_REVIEW`; applies server-owned internal-task policy; stores an ordered result timeline. |
| **HR — Candidate Screening** | Teach evidence-based comparison of synthetic candidate information against explicit, job-related requirements. | Grounds evidence in supplied text; keeps gaps visible; rejects protected-characteristic criteria; creates only an internal human-review recommendation. |

Marketing, Finance, Operations, Customer Support, and Business Intelligence are **Coming Soon** previews. Additional Sales and HR workflows are also Coming Soon, including lead generation, follow-up, email drafting, pipeline reporting, re-engagement, interview scheduling, onboarding, leave processing, and training-needs identification. They are not runnable workflows in this MVP.

IkeOru does not include real CRM, email, ATS, or external hiring integrations. HR Candidate Screening is a learning exercise, not an applicant-tracking system or an automated employment-decision tool.

## Current capabilities

The implemented MVP includes:

- Ordered Academy sections with explicit objectives, concepts, worked examples, common-mistake guidance, knowledge checks, feedback, and persisted learning progress.
- Constrained Labs with guided choices and one separately server-graded independent exercise for each active path.
- Synthetic workflow inputs, server-side validation, persisted runs, ordered execution events, idempotency handling, and safe terminal states.
- Sales policy branches owned by the backend—not the model—including internal follow-up or review tasks where the policy allows them.
- HR evidence and missing-information handling limited to explicit job-related criteria, with a mandatory human-review boundary and no automatic advance, rejection, ranking, or final hiring decision.
- Server-graded theory and practical assessments with feedback for both paths.
- Path-scoped, duplicate-protected achievement issuance that checks recorded lesson/progress state, a passed independent exercise, a passing assessment, and eligible live-run evidence. These remain narrow, introductory evidence—not a general competence credential.
- Private-by-default portfolios, selected public-safe portfolio fields, path-scoped projects, and organization-scoped progress views.

Public portfolio and badge serializers use safe-field allowlists. Raw workflow inputs, private task/review content, session data, and assessment answers are not public.

## Architecture and technology

```text
React + TypeScript + Vite frontend
              │
              ▼
FastAPI backend ── SQLAlchemy ── SQLite prototype persistence
              │
              └── AI adapter: deterministic mock | optional server-only OpenAI adapter
```

- **Frontend:** React 19, TypeScript, and Vite 7 present the Academy, Labs, assessments, timelines, and portfolio views.
- **Backend:** FastAPI and Uvicorn expose the application API; SQLAlchemy persists the local prototype to SQLite.
- **Startup:** the FastAPI lifespan initializes the local schema, applies the project’s built-in migrations, and seeds the workflow catalog—no separate migration command is required for local setup.
- **AI adapter:** mock mode provides deterministic local results for development and automated tests. Live mode is server-only, configurable by environment, and validates structured adapter output before applying backend policy.
- **Execution safety:** the backend owns validation, permitted business actions, assessment grading, eligibility checks, and authorization. The browser cannot grant an achievement or run arbitrary tools.

## Local setup

### Prerequisites

- Git
- Python 3.12
- Node.js with npm

Clone the repository and create local configuration files from the tracked templates:

```powershell
git clone https://github.com/Onovae/IkeOru.git
Set-Location IkeOru

Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

For safe local development, leave `IKEORU_AI_MODE=mock` in `backend/.env`. The backend template keeps provider credentials and the live model blank; do not place a credential in the frontend environment file or in a `VITE_*` variable.

Create and use a project-local Python environment, then start the backend:

```powershell
Set-Location backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn app.main:app --env-file .env --reload --port 8000
```

In a second PowerShell window, return to the repository root, then install frontend dependencies and start Vite:

```powershell
Set-Location frontend
npm ci
npm run dev
```

Open:

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:8000/api/health`

The local prototype database is initialized automatically when the backend starts. Do not commit the resulting local database, virtual environment, or environment files.

## Mock and live execution

**Mock mode** is the safe local demonstration and automated-test mode. Its deterministic results are labelled as mock and are not real OpenAI responses.

**Live mode** requires a valid server-side API key, configured model, daily limit, and working outbound TLS connectivity. The live integration has not yet been verified successfully in this environment. Automatic provider retries are disabled, and a failed live request must remain an honest failure—it must never silently become a successful mock result.

Configured credentials, a selected model, a mock response, or a replay are not evidence of successful authenticated live access.

## Testing and verification

With the backend virtual environment activated and mock mode enabled, use the project checks below:

```powershell
Set-Location backend
python -m pytest -q --basetemp .pytest-tmp
python -m compileall -q app tests
python -m pip check

Set-Location ..\frontend
npm run build

Set-Location ..
git diff --check
```

The backend suite covers the active Sales and HR paths, validation and structured output, evidence/gaps and mandatory human review, event ordering, persistence, idempotency, mode separation, assessment/achievement logic, Coming Soon enforcement, and privacy/ownership boundaries. Browser walkthroughs and live-provider behavior are environment-dependent checks and should be reported only when actually performed.

## Security and privacy

- Secrets belong only in the ignored local `backend/.env`; local `.env` files must never be committed.
- The OpenAI API key is backend-only. Never put it in frontend code, `VITE_*` variables, logs, screenshots, or public portfolio data.
- The demo uses synthetic lead, candidate, and job-requirement information.
- HR output is evidence-based and requires human review before any employment action; it does not infer protected characteristics or make a hiring decision.
- Portfolio data is private by default. Public visibility is limited to explicitly selected, safe fields protected by the implementation’s privacy controls.

## Current limitations

- SQLite is local-prototype persistence, not a hosted multi-instance deployment design.
- Only the two active paths are implemented; all other domains and workflows are previews.
- There are no real CRM, email, ATS, billing, Studio, Cloud, production-onboarding, or automated hiring features.
- Live OpenAI connectivity has not been successfully verified, so the application must not be presented as having a working live-provider integration.

## Reviewer guide

To evaluate the MVP quickly:

1. Start a synthetic demo session and select either active path.
2. Follow the Academy before the Lab: inspect objectives, examples, knowledge checks, and feedback.
3. Complete the guided choices and independent scenario, then run the labelled mock workflow.
4. Inspect the saved result and ordered timeline.
5. Review the theory-and-practical assessment, achievement evidence boundaries, and private/public portfolio controls.
6. Compare the experience with the detailed product contract and demo guide below.

## Project documents

- [MVP_SPEC.md](MVP_SPEC.md) — authoritative MVP contract and acceptance gates.
- [CAPSTONE_SPEC.md](CAPSTONE_SPEC.md) — concise scope and verification plan.
- [PRODUCT_BRIEF.md](PRODUCT_BRIEF.md) — product problem and value proposition.
- [DEMO_SCRIPT.md](DEMO_SCRIPT.md) — reviewer walkthrough and honest fallback guidance.
- [DECISIONS_AND_EDGE_CASES.md](DECISIONS_AND_EDGE_CASES.md) — resolved scope and safety decisions.
- [AGENTS.md](AGENTS.md) — repository contribution rules.

Historical material may use the former working name “Automation Lab.” New product-facing documentation uses **IkeOru**.
