# Automation Lab — Decisions, Grey Areas, and Edge Cases

Updated: 2026-10-07 · Baseline: MVP_SPEC.md v1.0

This is a living implementation register. “Resolved for v1” means the specification defines behaviour; it does not mean implementation or tests have passed. Implementation and verification are pending for all entries below.

## Decision register

| ID | Grey area | v1 decision / rationale | State |
|---|---|---|---|
| D01 | One workflow versus three Sales workflows and HR | Require lead qualification only; preserve other workflows as follow-on. Latest transfer prioritizes the first complete loop. | Resolved for v1 |
| D02 | What does “build” mean before Studio? | Constrained trigger/rule selection and a practical rule exercise; no graph editor. | Resolved for v1 |
| D03 | Are tools real? | AI classification is live; task action writes to the sandbox database; no external delivery claims. | Resolved for v1 |
| D04 | Authentication and organization enrollment cost | Isolated demo sessions and seeded organization membership; full real-user enrollment later. | Resolved for v1 |
| D05 | What earns a badge? | Lesson + eligible live Lab outcome + 5/6 including practical pass; one award; badge describes introductory capability. | Resolved for v1 |
| D06 | What can managers see? | Same-organization progress and organization-visible portfolio items; never private raw data. | Resolved for v1 |
| D07 | What does a public portfolio expose? | Selected achievements only; default private; raw lead inputs and private attempts excluded. | Resolved for v1 |
| D08 | Can replay count as achievement? | No; explicitly selected and labelled demonstration only. | Resolved for v1 |
| D09 | Timeline transport | Poll persisted ordered events; future streaming can reuse the event contract. | Resolved for v1 |
| D10 | What happens after refresh/restart? | Resume persisted state; interrupted runs fail explicitly; demo session supports same-browser continuity. | Resolved for v1 |
| D11 | Download/share feature scope | Copy link and safe public view now; PDF and downloadable badge assets follow later. | Resolved for v1 |
| D12 | Monetary budget, model and credentials | Establish a numeric spending allowance and available credentials before live integration/public access; keep model configurable. | Open, blocks live integration |
| D13 | Hosting and persistence | Select host; SQLite only with persistent single-instance disk, otherwise PostgreSQL. | Open, blocks deployment |
| D14 | Event details | Confirm official Moonshot name, deadline, judging rubric and submission constraints before final pitch/deployment decisions. Do not invent requirements. | Open, blocks final submission planning |
| D15 | Brand and visuals | Automation Lab remains working name; use consistent beginner-friendly layout and status vocabulary. | Working default |
| D16 | Monetization | Organization pilot then learner licenses is a hypothesis; price/customer demand unvalidated. | Open validation, no build blocker |
| D17 | Demo retention | Define retention after hosting selection and disclose it; do not promise indefinite demo storage. | Open, blocks public launch copy |

## Edge-case register

| ID | Scenario | Required response | Acceptance | Status |
|---|---|---|---|---|
| E01 | Blank, long, malformed, negative input | Field errors; no AI call; keep valid entered data | AC03, AC12 | Specified |
| E02 | Budget unknown versus zero | Preserve null versus zero; avoid false classification inference | AC05 | Specified |
| E03 | Vague/contradictory lead | NEEDS_REVIEW with missing information and review task | AC05 | Specified |
| E04 | Prompt injection in lead message | Treat as data; no unapproved action or instruction override | AC03 | Specified |
| E05 | Invalid AI JSON or unsupported enum | Reject; bounded safe recovery; fail explicitly if unresolved | AC03, AC12 | Specified |
| E06 | Provider timeout/rate limit/outage | Bounded retry; honest failure; explicit replay option | AC12, AC14 | Specified |
| E07 | Double-click or repeated network request | Same idempotent run; exactly one task | AC06 | Specified |
| E08 | Reused idempotency key with changed data | Conflict response; no unintended re-execution | AC06 | Specified |
| E09 | Task saved but response lost | Recover by unique run/action key; never duplicate | AC06 | Specified |
| E10 | Task creation fails after analysis | Preserve classification; show failed action; no completed badge prerequisite | AC04, AC07 | Specified |
| E11 | Cold lead requires no task | Successful completed branch with skipped action explanation | AC04, AC05 | Specified |
| E12 | Refresh/offline/reconnect during run | Resume stored events; no invented success or resubmission | AC04, AC09 | Specified |
| E13 | Backend exits mid-run | Detect interrupted state on restart; allow explicit linked retry | AC09, AC12 | Specified |
| E14 | Failed assessment or practical failure | Feedback and retry; preserve history; no badge | AC07, AC08 | Specified |
| E15 | Repeated passing attempt/concurrent award | Unique badge and grouped portfolio project | AC08 | Specified |
| E16 | Visit assessment without prerequisites | Server rejects award eligibility regardless of client state | AC07 | Specified |
| E17 | Replay viewed or replay result modified | Cannot satisfy live run evidence or write achievements | AC07, AC14 | Specified |
| E18 | Private/revoked/unknown public link | Neutral unavailable response; no private cache leakage | AC10 | Specified |
| E19 | Different user's run or organization ID | Ownership/tenant checks on every read/write | AC10, AC11 | Specified |
| E20 | Session expires during work | Explain session expiry; no unauthenticated result exposure | AC12 | Specified |
| E21 | Usage ceiling reached | Block provider call; explain limit and labelled replay option | AC12 | Specified |
| E22 | No progress or achievements yet | Useful empty state leading to first lesson | AC02 | Specified |
| E23 | Coming Soon workflow clicked | Honest roadmap placeholder; no fake run action | AC01 | Specified |
| E24 | Mobile, keyboard, reduced motion | Usable layout/focus; status conveyed without colour or animation alone | AC13 | Specified |
| E25 | Organization membership changes later | Personal portfolio persists; former manager access removed | AC10, AC11 | Specified; lifecycle UI deferred |
| E26 | Currency/timezone ambiguity | Explicit currency when amount set; UTC storage/local time display | AC05 | Specified |

## Update procedure

1. Add a discovered issue with reproducible scenario and affected screen/API.
2. Mark unresolved decisions Open; distinguish blocking from non-blocking.
3. Record chosen behaviour and rationale; update MVP_SPEC.md when the contract changes.
4. Update plan.md with actual implementation status and prompts.md with a dated summary.
5. Move a case from Specified → Implemented → Verified only with evidence (test/run/date). Record failures honestly.

## Change log

2026-10-07: Created v1 specification and this register. Resolved scope drift, constrained learner interaction, live/replay separation, badge eligibility, demo enrollment, privacy, persistence, and minimum failure behaviour. No application implementation or deployment is claimed.
