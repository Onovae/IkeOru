# IkeOru — Moonshot MVP Specification

> Learn. Do. Prove.

Version: 1.1 · Date: 2026-10-13 · Status: two-path MVP implementation contract

This is the authoritative scope for the Moonshot MVP. It supersedes the v1.0 Sales-only scope where they differ. Historical planning remains useful context, but it does not expand the active product beyond the two paths below. A specification is not evidence that a feature has been implemented or verified; record that evidence in tests and the delivery report.

## 1. Product objective

IkeOru is an academy-first practical learning platform. It helps learners understand workplace automation concepts, apply them through bounded practical work, and demonstrate introductory capability through meaningful assessment. Academy teaches the concepts; Lab provides a constrained workflow exercise; assessment, achievement, and portfolio provide supporting evidence of learning. Studio and Cloud remain future stages.

The MVP is intended to prove two complete, synthetic-data learner journeys:

1. `Sales → Qualify a New Lead → Learn → Practice → Run → Result → Assessment → Achievement → Portfolio`
2. `HR → Candidate Screening → Learn → Practice → Run → Result → Assessment → Achievement → Portfolio`

The product must distinguish a successful live provider result from a deterministic mock, replay, failed, or interrupted run. It must not claim measured business or learning outcomes without evidence.

## 1.1 Academy-first educational contract

The active paths must follow one learning model:

> **LEARN → DO → PROVE**

The model is an educational sequence, not a visual label for an execution screen. A learner should understand the relevant concept before configuring or running a workflow, practise with support before being assessed, and receive feedback against explicit learning objectives.

### Learn — structured understanding

Each active path's Academy lesson must provide:

- explicit learning objectives stated in learner-facing language;
- foundational concepts and definitions, including business context and the decision boundary;
- a worked example connecting the concept to the path's workflow;
- common mistakes, unsafe assumptions, and why they are mistakes;
- a concise knowledge check or retrieval prompt; and
- a clear expected outcome before the learner enters the Lab.

The workflow concepts (trigger, input, AI, condition, action, output, and human review where applicable) are the minimum foundation, not a substitute for explanation. Recording lesson completion confirms that the lesson was completed; it does not by itself prove understanding or competence.

### Do — guided practical application

Each active path's Lab must provide a guided demonstration or worked configuration, supported practice with constrained choices, and a progressively independent scenario in which the learner interprets supplied evidence and chooses a policy-safe outcome. Scenarios use synthetic but realistic workplace inputs and explain how theory maps to actual workflow behaviour. The server validates inputs, owns policy, persists the result and ordered events, and makes uncertainty visible.

Practical completion means that the learner completed the supported exercise and received an honest terminal result; practical assessment readiness additionally requires a passed independent scenario. A mock or replay can support practice and demonstration, but it is not eligible evidence for a live-run prerequisite or achievement. An incomplete, failed, interrupted, or uncertain outcome must remain visibly incomplete or in review; the interface must not imply successful capability.

### Prove — meaningful assessment

Each path's assessment must evaluate both theoretical understanding of the stated concepts and practical application of the workflow, policy, evidence handling, or human-review boundary. Passing criteria must be explicit, server-enforced, and tied to the learning objectives. Feedback should identify what was demonstrated and what needs more practice. Passing an assessment is evidence of that assessment attempt; it is not, by itself, a claim of broad workplace competence.

### Evidence vocabulary and achievement boundary

| State | Meaning | What it does not mean |
| --- | --- | --- |
| Lesson completion | The server recorded completion of the path's Academy lesson. | Mastery, practical success, or an achievement. |
| Practical completion | The guided Lab exercise reached an honest terminal result with validated synthetic data. | Eligibility for a live-run achievement when the mode is mock or replay. |
| Assessment passed | The server graded the theory and practical requirements at or above the path's passing criteria. | A final hiring decision, broad competence claim, or automatic badge without other prerequisites. |
| Demonstrated competence | Narrow introductory capability supported by lesson completion, eligible practical evidence, and a passing path assessment. | A workplace certification, employment decision, or claim beyond the defined objectives. |
| Achievement awarded | The backend created the path-specific award after all defined prerequisites were met. | Proof that mock, replay, failed, or interrupted work was live or successful. |

Portfolio, badge, progress, and manager views support this evidence trail. They do not replace teaching, practice, assessment, or server eligibility checks.

## 2. Scope boundary

| Area | MVP status |
| --- | --- |
| Sales → Qualify a New Lead | Active learning path; Academy depth and verification requirements apply |
| HR → Candidate Screening | Active learning path with mandatory human review; Academy depth and verification requirements apply |
| Marketing, Finance, Operations, Customer Support, Business Intelligence | Coming Soon preview only |
| Sales: lead generation, follow-up, email drafting, pipeline reporting, re-engagement | Coming Soon only |
| HR: interview scheduling, onboarding, employee-query classification, leave processing, training-needs identification, HR document processing | Coming Soon only |
| Visual Studio, Cloud, real CRM/email/ATS integrations, billing, production onboarding, broad connectors | Out of scope |

Coming Soon cards may explain planned capability but must not invoke unfinished workflow, automation, or provider endpoints.

## 3. Shared learner experience

The two active paths reuse one server-owned workflow architecture. A learner can:

1. Open a synthetic-data demo session and choose an active domain.
2. Complete the path's Academy lesson, including the structured Learn requirements in Section 1.1, before entering practical work.
3. Make constrained practice choices; arbitrary code, tools, graph editing, and workflow conditions are unavailable.
4. Submit validated synthetic data to a versioned workflow.
5. Inspect a persisted result and ordered execution timeline.
6. Complete a path-specific server-graded assessment.
7. Meet server-enforced prerequisites for a path-specific introductory achievement.
8. View persistent private portfolio evidence and explicitly choose safe public items.

Screens must retain relevant loading, empty, success, and safe error states; preserve recoverable form input; work with keyboard navigation; use visible focus and accessible status text; respect reduced motion; and remain usable on narrow screens.

## 4. Domain dashboard

The dashboard displays exactly seven domains:

- Sales — **Active**
- HR — **Active**
- Marketing — **Coming Soon**
- Finance — **Coming Soon**
- Operations — **Coming Soon**
- Customer Support — **Coming Soon**
- Business Intelligence — **Coming Soon**

Each active domain shows one active workflow and its learning, practice, assessment, achievement, and portfolio route. The future Sales and HR paths named in Section 2 are visible only as unavailable roadmap entries.

## 5. Sales — Qualify a New Lead

### Learning and practice

Teach why a new lead is the trigger, lead data is input, AI interprets supplied business context, a deterministic condition applies policy, an internal task is the approved action, and incomplete information can require human review. Learners choose the predefined `New lead submitted` trigger and an allowed HOT follow-up rule (`immediate` or `within 24 hours`).

### Input and result contract

Use synthetic lead data only. Required input is lead name, company, and message; optional business context may include industry, company size, budget, currency, need, and controlled purchase timeframe. The backend trims and validates types, sizes, and values. Unknown budget is distinct from zero.

The validated AI result contains one of `HOT`, `WARM`, `COLD`, or `NEEDS_REVIEW`; a concise explanation grounded only in supplied input; supporting evidence; missing information; and a safe suggested next step. It must not invent contact details, facts, or confidence percentages.

### Server policy

- `HOT`: create an internal follow-up task according to the selected rule.
- `WARM`: create an internal follow-up task due within 72 hours.
- `COLD`: complete successfully without creating a task.
- `NEEDS_REVIEW`: create an internal review task.

The backend, not the model, owns these policies and task arguments. The model cannot execute arbitrary code, SQL, URLs, external messages, or unapproved tools.

## 6. HR — Candidate Screening

### Purpose and safety boundary

Candidate Screening is a learning workflow that helps a learner compare supplied **synthetic** candidate information against explicit, job-related requirements. It is not an applicant-tracking system, automated hiring decision, or employment recommendation engine.

Never use, infer, request, rank, or recommend action based on protected characteristics or proxies for them. Do not invent candidate qualifications, credentials, work history, or gaps. Do not automatically reject, advance, shortlist, or make a final hiring decision. Every result must recommend human review before any employment action.

### Learning and practice

Teach the same workflow concepts in an HR context: a candidate submission and job requirements are inputs; AI assists evidence extraction and comparison; deterministic backend rules constrain output; the learner inspects missing information; and a human reviewer owns the next decision.

Practice uses a bounded set of job-related criteria and labelled synthetic candidate/job-requirement examples. It does not accept arbitrary workflow logic or free-form hiring rules.

### Input and result contract

The backend validates synthetic candidate and job-requirement input before invoking an adapter. The structured result must:

- assess only explicit job-related criteria supplied for the exercise;
- list evidence tied to supplied candidate text;
- identify missing or insufficient information without filling gaps with assumptions;
- make uncertainty visible; and
- return a recommended next step that requires human review.

The server validates adapter output against its HR schema and stores only safe result data and ordered events. Provider output that is malformed, unsupported, ungrounded, or unsafe fails honestly; it never becomes a fabricated result.

### Approved action

The only permitted HR action is to persist an internal **human-review recommendation** for the synthetic exercise. It does not contact a candidate, modify an external ATS, create a hiring decision, or execute external actions.

## 7. AI modes and execution safety

The backend offers a deterministic mock adapter for development/tests and a configurable server-only OpenAI Responses API adapter for live mode. `IKEORU_AI_MODE` must be explicit; mock mode is the safe default. Automated tests use mock responses and make no billable provider calls.

- **MOCK**: deterministic local output, visibly labelled; useful for development and tests.
- **LIVE**: labelled only after a real provider response succeeds and passes server validation.
- **REPLAY**: fixed, labelled demonstration; not a provider call.
- **FAILED / INTERRUPTED**: explicit terminal states, never animated or described as completed.

Provider errors, missing credentials, invalid output, request timeout, and daily live-run-limit exhaustion must produce safe errors. A failed live request must never silently return mock output. The API key remains backend-only and is never returned or logged. The model setting, provider timeout, and live daily limit come from server configuration.

## 8. Persistence, policies, and idempotency

Every run stores its workflow/version, sanitized input and safe result, explicit mode, terminal state, and ordered events. Events use a monotonic sequence per run and include receipt, validation, AI start/completion or failure, policy evaluation, permitted action, result persistence, and terminal state. The UI polls persisted events and resumes from a cursor after refresh.

Idempotency binds the authenticated user, workflow version, and request payload. Repeating the same request returns the original run; reusing a key with changed input conflicts. Transactions and unique action keys prevent duplicate Sales tasks, HR human-review recommendations, achievements, and portfolio projects.

## 9. Assessment, achievement, and portfolio

Each active path has distinct lesson content, assessment questions, practical exercise, workflow version, and introductory achievement definition. The server grades answers and checks prerequisites; the browser cannot award an achievement itself.

A path-specific achievement requires its lesson completion, a successful eligible **live** run for that path, and a passing assessment including its practical requirement. Mock, replay, failed, and interrupted runs cannot satisfy a live-run prerequisite. Repeated passing attempts cannot create duplicate awards.

Each user has one persistent portfolio. Projects group history by workflow rather than inflate completion counts on rerun. Portfolios are private by default. Public views disclose only explicitly selected, safe achievements/projects; they never expose raw lead/candidate/job inputs, internal task or review content, assessment answers, email addresses, session identifiers, or internal database IDs. Owner and organization checks protect private routes.

## 10. Data, authorization, and privacy

Use synthetic data only. The backend owns validation, workflow policy, tool allowlists, output validation, assessment grading, achievement eligibility, persistence, and authorization. Inputs and model outputs are untrusted data; never evaluate them as code, SQL, URLs, or arbitrary tools.

Demo sessions are server-created sandbox identities. Managers may view only same-organization progress and permitted portfolio fields. Public identifiers are opaque and do not grant private access. Cookie-authenticated writes use CSRF/origin checks and restricted CORS. Secrets, raw private data, and provider traces must not be committed, returned, or logged.

## 11. API and technology boundary

The MVP uses React + Vite, FastAPI, and SQLite for the local prototype. The API exposes availability-aware domains; one safe workflow, lesson, run, events, assessment, and portfolio route per active key; public allowlisted portfolio/badge routes; and organization-scoped progress. Requests must derive identity server-side.

Use the OpenAI Responses API only through the backend adapter. Live mode uses a configurable model, bounded request timeout, structured-output validation, and a daily live-run limit. Hosting and deployment persistence remain separate decisions; SQLite needs persistent single-instance storage.

## 12. Acceptance and verification gates

| ID | Criterion |
| --- | --- |
| AC01 | Seven domains render with Sales and HR active, five domains Coming Soon, and no runnable unfinished future paths. |
| AC02 | Sales preserves its four classifications, server-owned task policy, validation, persistence, ordered events, and idempotency. |
| AC03 | HR accepts only valid synthetic candidate/job inputs and returns schema-validated, evidence-grounded, missing-information-aware output with a human-review recommendation. |
| AC04 | Neither path uses protected characteristics, makes an autonomous hiring decision, invents facts, or performs external actions. |
| AC05 | Each active path meets the Section 1.1 Learn → Do → Prove contract: structured lesson objectives and foundations precede guided practice; practical completion is distinct from assessment; assessments test theory and application with server grading and meaningful criteria; backend achievement prerequisites remain enforced. |
| AC06 | Mock, live, replay, failed, and interrupted modes are distinct; a failed live call never falls back to mock; automated tests are non-billable. |
| AC07 | Runs, events, results, permitted actions, progress, assessments, achievements, and grouped projects persist without duplicate effects. |
| AC08 | Public portfolio and manager outputs are safe-field allowlists, with owner/organization authorization intact. |
| AC09 | Invalid input, malformed output, provider errors, limits, timeouts, duplicate requests, and unavailable routes fail safely and honestly. |
| AC10 | Focused backend tests, Python compilation, frontend production build, dependency check, and diff check are run and reported with exact results. Browser and live-provider results are reported only if actually executed. |

## 13. Non-goals

Do not add further Sales or HR workflows, real CRM/email/ATS integrations, automated hiring actions, a visual workflow editor, arbitrary prompt/tool execution, billing, production authentication/SSO, advanced analytics, downloadable credentials, or a deployment claim. Preserve future architecture without implementing it.

## 14. Change discipline

Record scope changes and edge cases in `DECISIONS_AND_EDGE_CASES.md`; use `plan.md` for current implementation order; keep `prompts.md` as historical context. Update tests with behavior changes. Do not describe a planned, mock, seeded, or untested path as implemented, live, or verified without evidence.
