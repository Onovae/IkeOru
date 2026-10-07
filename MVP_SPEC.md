# Automation Lab — Moonshot MVP Specification

Version: 1.0 · Date: 2026-10-07 · Status: implementation baseline

This specification freezes the prototype scope for execution. It records implementation defaults chosen from the supplied plan, prompt history, and the current conversation; it does not claim that every detail has been separately approved or implemented. Changes require a reason, an acceptance-criteria update, and a corresponding entry in DECISIONS_AND_EDGE_CASES.md. Budget, event rules, and deployment details remain explicit open items.

## 1. Objective and product continuity

Deliver a low-budget, judge-ready prototype that demonstrates a professional learning how to identify, configure, run, explain, and prove a workplace automation skill. Preserve the long-term Academy → Lab → Studio → Cloud progression. Guided Lab definitions must be reusable by a future Studio.

The required proof is one complete experience: Sales → Qualify a New Lead → Learn → Practice → Run → Result → Assessment → Badge → Portfolio.

Success means a judge can understand the problem, observe a real AI-assisted workflow and a persisted follow-up task, see meaningful learning assessment, and inspect a portfolio entry. The prototype must clearly identify sample data, replay examples, and planned functionality. Neither time savings nor learning outcomes are presented as measured results without actual evidence.

## 2. Scope and priority

| Priority | Included |
|---|---|
| Required | Sales lead qualification; concise learning content; constrained practice choices; live AI classification; internal follow-up task; execution timeline; explanation; assessment; badge; persistent learner portfolio; private/organization/public visibility; public portfolio link; accessible responsive UI; failure handling |
| Required, small | Seeded learner and manager accounts; organization membership; minimal organization progress view; seven domain cards; explicit sample-data labels; labelled replay for service outages |
| Follow-on after acceptance | Lead Follow-Up and Lead Routing workflows; HR Candidate Screening; self-service organization administration and enrollment; email invitations; downloadable portfolio and badge assets |
| Future | Visual Studio, Cloud, real CRM/email integrations, payments, advanced analytics, full certification programs, enterprise SSO, broad connector ecosystem |

Domain states: Sales = Active; Human Resources = Next; Marketing, Finance, Operations, Customer Support, Business Intelligence = Coming Soon. Sales lists its additional planned workflows as unavailable. No enabled button leads to a pretend implementation.

This narrower delivery boundary supersedes older schedule entries that placed multiple Sales workflows and HR inside the mandatory 72-hour build. Those capabilities remain on the roadmap.

## 3. Personas and three experiences

- Learner: a professional beginning automation, using synthetic business examples.
- Manager: an organization member authorized to inspect team learning progress.
- Portfolio viewer: an unauthenticated visitor viewing only explicitly published achievements.

Learner journey: enter demo session → dashboard → Sales → workflow lesson → practice configuration → lead input → live run → result/reflection → assessment → badge → portfolio → optionally publish.

Manager journey: enter manager session → see sample organization roster, completion, assessment pass state, badges → inspect only organization-visible portfolio content. No raw lead data, private attempt answers, or private portfolio access.

Visitor journey: open public-safe portfolio link → see selected achievements and a badge verification reference → no account required. Private, organization-only, unknown, and revoked links return a neutral unavailable state.

## 4. Screens, states, and navigation

| Screen | Required content and behaviour |
|---|---|
| Demo entry | Explain synthetic data use; separate learner and manager demo sessions; do not imply production authentication; isolated sandbox identity per visitor |
| Dashboard | Name, beginner level, one required workflow progress, Continue learning, portfolio shortcut; progress based on stored activity |
| Explore | Seven domains with accurate availability; coming-soon explanation on unavailable cards |
| Sales | Foundations lesson, available lead qualification Lab, assessment and badge requirements; planned workflows visibly unavailable |
| Learn | Problem, manual steps, trigger/input/AI/condition/action/output, AI versus deterministic work, human review, diagram and Practice button |
| Practice/Lab | Guided trigger selection, follow-up rule selection, labelled synthetic sample loader, validated form, Run button, visible tools and timeline |
| Result | Priority, evidence-based explanation, missing information, chosen action, saved task details, next learning step; partial failure remains visible |
| Assessment | Questions, one practical rule exercise, submitted score, feedback, retry path; previous attempts retained |
| Badge | Earned state only after server checks; name, skills, award date, verification ID; link to portfolio |
| Portfolio | One persistent profile with progress, runs/projects, attempts, badges; visibility controls and selected public achievements; private by default |
| Public portfolio | Mobile layout, only selected achievements, no raw inputs or internal IDs; neutral unavailable state when access is denied |
| Manager | Organization-scoped learner counts, required-workflow completion, pass state and badges; sample organization labelled |

Every data screen has loading, empty, success, and relevant error states. Preserve form input on recoverable failure. Use labels, keyboard navigation, visible focus, sufficient contrast, text alongside status colours, and an accessible status region for run updates. Respect reduced-motion preferences. Test at narrow mobile and desktop widths.

## 5. Learning content and learner choices

The learner should explain: what triggers the workflow; why interpretation of a message benefits from AI; why task creation uses deterministic software; and when incomplete information requires review.

The guided exercise allows only predefined choices, not arbitrary code or graph editing:
1. Select “New lead submitted” as the correct trigger; explain incorrect options immediately.
2. Select a HOT follow-up policy: immediate or within 24 hours.
3. Enter/load sample data, run, inspect the explanation, and reflect on one changed input.

The lesson completion event records explicit completion. Clicking through alone does not award a badge. Reflection can be a short, non-graded prompt; automated essay grading is outside scope.

## 6. Lead input and classification contract

Required: synthetic lead name (1–100 characters), company (1–150), message (20–2,000). Optional: industry (100), company size (positive integer), budget amount (nonnegative), currency (supported code when an amount is entered), need (500), purchase timeframe (controlled choice). Trim whitespace; reject invalid types and excessive lengths server-side. Unknown budget is distinct from zero.

Use a fictional product context displayed in the lesson: a business software service for teams. Classification uses explicit need and purchase intent/timeframe; company size and budget alone do not determine priority. Avoid unsupported conclusions from company names or personal characteristics.

Structured AI response: priority HOT/WARM/COLD/NEEDS_REVIEW, short explanation, evidence drawn from supplied input, missing_fields, and suggested_next_step. No fabricated contact information or invented facts. No unsupported numeric confidence percentage.

- HOT: explicit relevant need and near-term intent.
- WARM: relevant interest with incomplete timing or commitment.
- COLD: explicit lack of current need or clearly irrelevant request.
- NEEDS_REVIEW: inadequate, contradictory, or unsafe-to-interpret information.

These are learning rubric definitions, not claims of predictive sales accuracy. Borderline outputs may vary; tests enforce schema, safety, and obvious fixtures rather than exact prose.

## 7. Workflow and approved actions

Server-owned, versioned definition: new_lead trigger → validate_input → classify_lead AI step → evaluate_policy condition → create_follow_up_task action → persist_result/explanation.

HOT creates an internal task due now or 24 hours after submission according to the selected rule. WARM creates a task due in 72 hours. COLD creates no task and explains why. NEEDS_REVIEW creates an internal review task with no fabricated lead priority. All due dates store UTC and display in the viewer's timezone.

Approved tool contracts:
- classify_lead(validated_lead, rubric_version): AI adapter returning validated structured classification.
- create_follow_up_task(run_id, task_kind, due_at, summary): internal database action; server supplies owner and organization; unique run/action key prevents duplicates.
- draft_follow_up_email: reserved future action; not exposed or executed in v1.

The server chooses the permitted tools from the workflow definition and validates arguments. The model cannot execute arbitrary URLs, code, SQL, tools, or external messages. Input text is untrusted data; instructions embedded in a lead message cannot override the rubric or tool policy.

Definition fields: stable workflow key, version, domain, input schema, ordered steps with stable IDs and types, registered action names, constrained conditions, output schema. Evaluate structured conditions using an allowlist; never eval user strings. Store the exact workflow/rubric/config version on every run. Future Studio can edit this representation; graph editing is deferred.

## 8. Run lifecycle and timeline

States: queued → running → completed / needs_review / failed. A cold lead with a deliberately skipped task is completed. needs_review is a valid saved outcome. Failures never become completion through UI animation.

Persist ordered events with run ID, monotonic sequence, step ID, timestamp, status, safe message, and optional safe result reference. Events include received, validated, AI started, AI completed, policy evaluated, action started, action completed/skipped, result persisted, terminal state. Do not expose provider secrets or private reasoning; show a concise explanation based on input evidence.

Use polling for v1 (approximately once per second while active); retrieve events after a sequence cursor. Stop on terminal state. Reconnect and refresh resume from stored events. Streaming can be added later without changing event semantics.

Use a bounded provider timeout and at most one retry for transient classification failure. The total run deadline is configurable (initial default 60 seconds). An interrupted application process marks unfinished runs as interrupted/failed on recovery; no durable job queue is required for the prototype. A user retry creates a linked new attempt. Successful internal actions are protected from duplication and recovered by their unique action key.

Idempotency keys bind authenticated user, workflow version, and request payload hash. Repeating an identical request returns the same run; reusing a key with different input returns a conflict. Database transactions protect task creation and result state; duplicate submissions never create duplicate tasks.

## 9. Assessment and badge eligibility

Versioned assessment: five conceptual questions, one point each, plus one practical rule exercise worth one point. Pass requires at least 5/6 and a correct practical exercise. The practical exercise asks the learner to select/configure immediate HOT follow-up and predict behaviour for a WARM or review case. Verify the practical result with deterministic fixtures, not a second paid AI call.

Server-side prerequisites: lesson completed, at least one successful live eligible Lab run, assessment passed including practical requirement. A valid cold or needs-review run qualifies as a completed learning run when its expected branch persisted successfully. Failed and replay runs never qualify.

Award “Sales Automation — Level 1” once per user/badge definition, with skills narrowly described as this introductory guided lead-qualification capability. Do not imply accredited certification or completion of all Sales workflows. Preserve assessment attempts and feedback; use best passing status for completion, show attempt dates in private history. Never send answer keys to the client before submission.

## 10. Portfolio, sharing, and enrollment

Create exactly one portfolio when a user is created, including seeded/demo users. Uniqueness on user_id prevents duplicates. Domain switching and future organization membership changes do not create new portfolios.

Store lab history, assessment attempts, badge awards, and progress. The project entry groups runs for the workflow; reruns appear in history rather than creating repeated badges or inflated completed-project counts.

Visibility: private by default; organization-only limits access to authorized managers in the learner's current organization; public publishes explicitly selected achievements. Organization progress summaries are distinct from portfolio details. Raw lead inputs, task content, private answers, and email addresses never appear publicly. Share identifiers are opaque and separate from internal IDs; possession of an identifier is not authorization for private content.

Copy link and public preview work in v1. Native social posting and PDF/badge downloads are follow-on. Public badge verification follows the owner's publication choice; revoking visibility removes public access immediately, without cached private content.

Prototype enrollment is a seed/admin setup operation, not a full invitation service. Demo entry creates an isolated sandbox learner and sample organization context server-side; manager demo data is synthetic. Session identity persists across refresh; another browser/device is not guaranteed to restore that demo identity. Cross-device sign-in and real organization onboarding remain later work. Demo data retention must be disclosed; no promise of indefinite retention before hosting is chosen.

## 11. Authentication, authorization, and security

Use backend-created opaque sessions with expiry and secure HttpOnly cookies on deployed HTTPS; sessions resolve roles and organization membership server-side. Demo role selection only grants access to the visitor's synthetic sandbox; it never promotes a real user or unlocks another tenant. Production signup, password recovery and SSO are outside v1.

Owner checks apply to every run, event, assessment attempt, task, portfolio edit and progress route. Manager reads require same-organization membership and allowed fields. Public endpoints serialize an explicit safe field allowlist. Implement CSRF protection/origin checks for cookie-authenticated writes, restricted CORS, server-side validation, output escaping, and rate limits. Keep API credentials server-side and out of source control/logs. Record sanitized provider failures without raw lead text by default.

Only synthetic data is supported in the prototype. Isolate tenants even when data is synthetic. Publishing requires an explicit user action; no automated external email or messaging is part of the Lab.

## 12. Data model

| Entity | Minimum fields and constraints |
|---|---|
| User | id, display_name, demo flag, created_at |
| Organization / Membership | organization id/name/demo flag; user_id, organization_id, role; unique membership |
| Session | token hash, user_id, expires_at; never store plaintext tokens in logs |
| Portfolio | user_id unique, opaque public_id unique, visibility, selected public items, updated_at |
| Domain | stable key, title, availability, order |
| Workflow / WorkflowVersion | stable key, domain_id, title; immutable versioned definition and rubric |
| LessonProgress | user_id, lesson/version, completed_at; unique completion |
| WorkflowRun | owner, organization context, workflow version, config/input, state, safe output, mode, retry_of, timestamps, idempotency key/hash |
| RunEvent | run_id, sequence unique per run, step, state, timestamp, safe payload |
| FollowUpTask | owner, run_id, kind, due_at, summary, status; unique run/action key |
| Assessment / Attempt | assessment version, user, answers, server score, practical_pass, overall_pass, submitted_at |
| BadgeDefinition / Award | criteria version, name; unique user/definition award, verification ID, date, evidence refs |
| PortfolioProject | portfolio/workflow unique, qualifying run refs, title, skills, first/last activity |
| Progress | user/workflow unique, lesson/lab/assessment states; derived or transactionally updated |

Use migrations, foreign keys, and explicit delete policy. Seed catalog and assessment definitions idempotently. A failed write cannot leave a awarded badge without its evidence. Later domains reuse these entities.

## 13. API contract

All private endpoints derive user identity from the session. Resource identifiers never grant access by themselves.

| Endpoint | Purpose |
|---|---|
| POST /api/demo/session | Create isolated learner or manager sandbox session; rate limited |
| GET /api/me | Current identity, role, and demo status |
| GET /api/domains | Availability-aware catalog |
| GET /api/workflows/{key} | Lesson, version, allowed configuration, safe metadata |
| POST /api/lessons/{key}/complete | Record explicit lesson completion |
| POST /api/workflows/{key}/runs | Validate, authorize, enforce quotas/idempotency, return 202 + run_id |
| GET /api/runs/{id} | Current owned run state and safe result |
| GET /api/runs/{id}/events?after= | Ordered owned events and cursor |
| GET /api/assessments/{key} | Questions without answer keys |
| POST /api/assessments/{key}/attempts | Grade, persist attempt, transactionally award eligible badge |
| GET /api/me/portfolio | Complete private learner portfolio |
| PATCH /api/me/portfolio | Visibility and public-item selection |
| GET /api/p/{public_id} | Public allowlisted portfolio or neutral 404 |
| GET /api/badges/{verification_id} | Published badge evidence or neutral 404 |
| GET /api/organizations/{id}/progress | Authorized manager summary |
| GET /api/examples/{key} | Labelled static replay, never recorded as live achievement |

Errors use code, friendly message, safe field errors, retryable flag, and request ID. Use 400/422 for invalid input, 401 for expired session, 403/404 for unavailable resources, 409 for idempotency/state conflict, 429 for usage limit, and 503 for provider/service outage. Never expose exception traces.

## 14. Budget, technology, and deployment

Preserve recommended React + Vite frontend, FastAPI backend, SQLite for the local/prototype database, and OpenAI Responses integration. Model selection is configurable and validated during integration; do not hardcode a speculative model or price. Static lessons and deterministic assessment grading avoid unnecessary API calls. One classification call per run is the default; use its structured explanation for the result.

Initial protective limits: 10 live runs per demo session per day, bounded input/output, one concurrent run per session, and a configurable global daily live-run ceiling. A monetary budget has not been agreed. Set the global ceiling and provider limits before public live access; usage counters alone are not an exact monetary cap. Exhaustion gives an honest limit message and optional replay.

Hosting is undecided. SQLite deployment requires persistent storage and a single application instance; do not place the only database on an ephemeral filesystem. Use PostgreSQL if the selected host requires stateless/multi-instance execution. Prefer same-origin frontend/API routing. Verify HTTPS, secrets, migrations, restart persistence, and a restoreable demo seed before presenting. The 72-hour sequence is a target, not a delivery guarantee.

Live mode calls the configured provider and persists real sandbox actions. Replay mode displays a fixed, labelled example and does not award progress, assessments prerequisites, badges, or projects. It never silently replaces a failed live request.

## 15. Acceptance and testing gates

- AC01: All seven domains display correctly; only implemented workflows are runnable.
- AC02: Learner completes the lesson and meaningful constrained practice choices using keyboard or pointer.
- AC03: Valid live input invokes the configured AI adapter, validates its output, executes the permitted branch, and saves the result.
- AC04: Timeline accurately shows persisted events, including skipped actions and partial failures; refresh resumes.
- AC05: HOT/WARM/COLD/NEEDS_REVIEW policies match the contract; unknown budget is not treated as zero.
- AC06: Duplicate submissions and transient retries cannot duplicate follow-up tasks.
- AC07: Failed/replay runs cannot satisfy badge prerequisites; passing score alone is insufficient.
- AC08: Eligible completion produces exactly one badge and one grouped project; retries preserve attempt history.
- AC09: Portfolio and progress survive refresh and backend restart in the selected deployment.
- AC10: Public views expose only selected safe fields; private and cross-tenant access fail; revocation works.
- AC11: Manager sees only authorized organization progress and permitted portfolio details.
- AC12: Input errors, provider outage, malformed output, quota exhaustion, session expiry and interrupted runs have actionable UI states.
- AC13: Narrow-screen layout, keyboard navigation, focus, status announcements and reduced motion are verified.
- AC14: Live and replay modes are unmistakable; sample data and planned features are labelled.
- AC15: Three-minute demo can complete using a prepared learner state while retaining a separate fresh learner walkthrough.

Tests: backend integration tests for authorization, policy branches, schema rejection, idempotency, transactional awards and privacy; provider adapter mocks for failure cases; one low-cost live provider smoke test after credentials/budget are configured; browser walkthrough of learner → assessment → badge → publication → visitor and manager paths. Test an adversarial instruction inside lead text. Validate restart persistence on the actual deployment. Mock-only tests cannot establish live provider functionality.

## 16. 72-hour implementation sequence

Day 1: repository and app shells; migrations and seed; isolated demo sessions; catalog; Sales lesson and constrained Lab form; server workflow definition and validation.

Day 2: AI adapter and approved task action; persisted event timeline; result and failure UI; assessment prerequisites and grading; transactional badge/project creation.

Day 3: portfolio visibility and public view; small manager view; quota/replay handling; focused integration and browser checks; deployment persistence; demo rehearsal and pitch evidence.

If behind schedule, defer animation polish and manager presentation detail before compromising persistence, authorization, the core learner loop, or truthful execution states. HR remains follow-on.

## 17. Monetization and demonstration

Working commercial hypothesis: organizations pay for a small Sales automation learning pilot, followed by learner licenses as content grows. Individual paid pathways and later Studio usage plans are future options. Pricing and willingness to pay are unvalidated. Checkout is outside this prototype.

Demo outline: show a repetitive Sales problem; teach the workflow; let the learner choose a rule; run a prepared synthetic lead live; explain AI versus deterministic action; show an assessment and earned evidence; open the portfolio; briefly show manager value and future progression. A seeded completed account may shorten presentation time but must be labelled and must not be presented as a newly earned achievement.

## 18. Change discipline and current state

The implementation has not started in the supplied materials. This document supplies the engineering baseline. Maintain DECISIONS_AND_EDGE_CASES.md as the issue register, plan.md as the roadmap/status, and prompts.md as an append-only decision/prompt history. Record what changed, why, affected acceptance criteria, verification evidence, and remaining uncertainties. Do not label planned work complete until it is implemented and checked.
