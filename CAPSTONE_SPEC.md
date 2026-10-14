# IkeOru — Capstone Specification

## Goal

Deliver a compact, testable Moonshot Learn MVP in which a learner moves from structured understanding to guided practical application and then to evidence of introductory capability: **Learn → Do → Prove**.

## In-scope vertical slices

1. `Sales → Qualify a New Lead → Learn → Practice → Run → Result → Assessment → Achievement → Portfolio`
2. `HR → Candidate Screening → Learn → Practice → Run → Result → Assessment → Achievement → Portfolio`

The slices use a React + Vite frontend, FastAPI backend, SQLite prototype persistence, server-owned workflow definitions, deterministic mock and configurable live OpenAI adapters, persisted events, server-graded assessments, backend achievement eligibility, and privacy-controlled portfolios.

Marketing, Finance, Operations, Customer Support, and Business Intelligence are Coming Soon. Additional Sales and HR workflows, Studio, real CRM/email/ATS actions, billing, production onboarding, and automated hiring decisions are excluded.

## Acceptance criteria

| Criterion | Checkable outcome |
| --- | --- |
| Domain truthfulness | Seven domains render; Sales and HR are active; the other five and all additional named paths are Coming Soon with no runnable unfinished endpoints. |
| Sales path | Valid synthetic lead input yields only `HOT`, `WARM`, `COLD`, or `NEEDS_REVIEW`, with supplied-input evidence and server-owned task policy. |
| HR path | Valid synthetic candidate and job-requirement input produces structured, criterion-grounded evidence, missing information, uncertainty, and a mandatory human-review recommendation. |
| HR safeguards | The workflow uses only explicit job-related criteria; it does not infer protected characteristics, invent qualifications, reject/advance a candidate, or make a final hiring decision. |
| Academy quality | Each active path states learning objectives and teaches foundations, definitions, business context, a worked example, common mistakes, and a knowledge check before practical work. The Lab provides guided practice that connects theory to behaviour; the assessment tests theory and practical application against explicit passing criteria. |
| Durable execution | Runs, monotonic events, safe results, and permitted internal effects persist; idempotency prevents duplicate tasks, review recommendations, achievements, and grouped projects. |
| Honest modes | Mock, live, replay, failed, and interrupted states are unmistakable. Tests use deterministic mock responses; failed live calls never silently become mock results. |
| Assessment and achievement | Each path has distinct learning content and assessment. The server grades answers and requires path lesson completion, eligible live run, and practical pass before a single path-specific achievement. |
| Portfolio privacy | Private data persists for the owner; public views reveal explicitly selected safe fields only, never raw inputs, assessment answers, or internal review/task content. |
| Authorization | Owner and organization checks protect private data; manager views remain organization-scoped. |

## Verification plan

1. Run focused backend tests for Sales branches/regression, HR input/output/evidence/human-review behaviour, idempotency, ordering/persistence, mode separation, assessments, achievement eligibility, privacy, ownership, and Coming Soon enforcement.
2. Run Python compilation, dependency integrity check, frontend production build, and `git diff --check`.
3. Manually walk both learner paths at narrow and desktop widths, including the Academy explanation, guided practice, keyboard/focus and safe error states, then test a public portfolio link and organization-scoped manager view.
4. Keep automated tests in mock mode. If credentials, budget, and human approval are available, run one bounded synthetic live-provider smoke test after the suite and record the actual result separately.
5. Rehearse both a live route (only after verified provider success) and the labelled mock/replay fallback in [DEMO_SCRIPT.md](DEMO_SCRIPT.md).

This document defines checks; command output and walkthrough evidence determine whether they passed.
