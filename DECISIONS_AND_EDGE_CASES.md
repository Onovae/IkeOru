# IkeOru — Decisions and Edge Cases

Updated: 2026-10-13 · Baseline: `MVP_SPEC.md` v1.1

This is the implementation register. “Resolved” defines required behaviour; it does not claim that code or tests have passed. Use exact test output and the delivery report as verification evidence.

## Decision register

| ID | Decision | Rationale and boundary | State |
| --- | --- | --- | --- |
| D01 | The former Sales-only v1.0 scope is superseded. | Keep its working Sales path; add exactly one HR path, Candidate Screening. | Historical / superseded by D19 |
| D02 | Learners use constrained choices, not a visual workflow editor. | Preserves meaningful practice without arbitrary code, tools, graphs, or conditions. | Resolved |
| D03 | The server owns the permitted action policy. | AI may return structured analysis only; backend code controls database effects. | Resolved |
| D04 | Demo sessions and organization membership are synthetic. | There is no production enrollment, invitation, or SSO claim. | Resolved |
| D05 | Achievements are path-specific and server-enforced. | Each requires lesson completion, eligible live run, and passing practical assessment; one award per definition. | Resolved |
| D06 | Manager data is organization-scoped and safe-field limited. | Raw workflow inputs, review/task content, and assessment answers are excluded. | Resolved |
| D07 | Public portfolios reveal selected safe achievements only. | Default is private; raw lead/candidate/job inputs and private answers are never public. | Resolved |
| D08 | Replay and mock are not achievement evidence. | Both are visibly labelled; only a validated successful live run can satisfy a live prerequisite. | Resolved |
| D09 | Events are persisted and polled. | Ordered, cursor-based events support refresh/reconnect without inventing progress. | Resolved |
| D10 | Idempotency protects all permitted effects. | A duplicate request must not create duplicate Sales tasks, HR review recommendations, awards, or projects. | Resolved |
| D11 | Copy/public preview is the sharing scope. | Native social posting, downloads, and PDF certificates remain later work. | Resolved |
| D12 | Live provider access is configured, bounded, and optional. | Model, credential, timeout, and daily limit come from backend config; missing/failed live access is an honest error. | Resolved; live smoke test remains separate |
| D13 | SQLite is local-prototype storage. | A deployment must use persistent single-instance storage or an appropriate replacement database. | Open deployment decision |
| D14 | Submission/deadline details are external facts. | Do not invent official requirements, dates, rubric, or deployment status. | Open submission check |
| D15 | Product-facing copy uses IkeOru. | “Automation Lab” remains historical wording only where preserving history helps context. | Resolved |
| D16 | Commercial claims remain hypotheses. | No customer, interview, pricing, revenue, or outcome claim is implied. | Open validation |
| D17 | Retention must be disclosed after hosting is chosen. | No promise of indefinite demo persistence. | Open hosting dependency |
| D18 | Mock output is deterministic and visibly labelled. | It supports automated tests without billable requests and never masquerades as live output. | Resolved |
| D19 | The MVP has two active domains and five previews. | Sales → Qualify a New Lead and HR → Candidate Screening are active; Marketing, Finance, Operations, Customer Support, and Business Intelligence remain Coming Soon. | Resolved |
| D20 | HR Candidate Screening is decision support for a human reviewer only. | It uses synthetic data and explicit job-related criteria; it cannot reject, advance, shortlist, or make a hiring decision. | Resolved |
| D21 | HR output must show evidence and gaps. | Evidence must be grounded in supplied candidate information; unknown information remains unknown. | Resolved |
| D22 | Protected characteristics and proxies are out of bounds. | The workflow must not request, infer, use, rank, or recommend based on them. | Resolved |
| D23 | Future Sales and HR cards are previews only. | They may describe roadmap work but must not trigger unfinished endpoints or actions. | Resolved |
| D24 | Academy is the first product responsibility. | A path must teach concepts and objectives before asking for practical execution; Learn → Do → Prove is a sequence, not decorative copy. | Resolved |
| D25 | Lesson completion and progression are distinct from competence. | Recording a lesson completion unlocks the next step where the path permits it, but does not prove understanding, practical success, or an achievement. | Resolved |
| D26 | Practical completion is distinct from achievement evidence. | A learner may complete a supported synthetic exercise and receive a terminal result in mock/replay practice; only the defined eligible live evidence can satisfy a live-run achievement prerequisite. | Resolved |
| D27 | Assessments must test theory and application. | Each path's server-graded assessment maps to explicit objectives, includes a practical requirement, uses meaningful passing criteria, and returns feedback without exposing answer keys. | Resolved |
| D28 | Competence claims are narrow and evidence-bounded. | “Demonstrated competence” means the defined introductory capability supported by the path prerequisites; it is not a workplace certification, hiring decision, or broad mastery claim. | Resolved |
| D29 | Assessment retries preserve learning history. | Each submitted attempt is retained and graded by the server; a learner can retry where the endpoint permits, feedback should direct further practice, and repeated passes cannot create duplicate awards. | Resolved |
| D30 | Independent practical reasoning is a server-owned prerequisite. | Each active path provides a synthetic scenario requiring evidence-based choices. The server records attempts, gives field-level feedback, and requires a passed scenario before practical assessment credit or a badge prerequisite can succeed. | Resolved |

## Edge-case register

| ID | Scenario | Required response | Related gates | Status |
| --- | --- | --- | --- | --- |
| E01 | Blank, malformed, negative, oversized, or wrong-type Sales input | Return safe field errors before any adapter call; preserve valid client input where feasible. | AC02, AC09 | Required |
| E02 | Budget unknown versus zero | Preserve the distinction and do not infer priority from either alone. | AC02 | Required |
| E03 | Vague or contradictory lead | Return `NEEDS_REVIEW`, missing information, and an internal review task. | AC02 | Required |
| E04 | Instruction-like text inside a lead message | Treat as data; it cannot change rubric, tools, or policy. | AC02, AC09 | Required |
| E05 | Malformed/unsupported Sales adapter output | Reject it and fail safely; do not fabricate a result. | AC02, AC06, AC09 | Required |
| E06 | Live timeout, rate limit, outage, or missing credentials | Return a safe provider/configuration error; offer labelled replay only if available. Never fall back to mock. | AC06, AC09 | Required |
| E07 | Duplicate request or double-click | Return/recover the idempotent run and create one permitted effect. | AC02, AC07 | Required |
| E08 | Same idempotency key with changed data | Return a conflict without re-executing. | AC07, AC09 | Required |
| E09 | Sales action succeeds but response is lost | Recover through its unique run/action key; do not duplicate the task. | AC02, AC07 | Required |
| E10 | A COLD Sales outcome | Complete honestly with a visible skipped-task explanation. | AC02 | Required |
| E11 | Refresh/reconnect during a run | Resume stored events and terminal state; do not invent completion. | AC07, AC09 | Required |
| E12 | Repeated passing assessment | Preserve attempts but award no duplicate achievement/project. | AC05, AC07 | Required |
| E13 | Assessment attempted without prerequisites | Server grades but blocks achievement eligibility as appropriate; browser state cannot override it. | AC05 | Required |
| E14 | Mock/replay/failed result used for achievement | Do not accept it as live evidence. | AC05, AC06 | Required |
| E15 | Private, revoked, unknown, cross-user, or cross-organization resource | Return neutral unavailable/authorization-safe response; disclose no private fields. | AC08, AC09 | Required |
| E16 | HR candidate/job input is blank, malformed, oversized, or not synthetic | Reject it before adapter use; return safe field errors. | AC03, AC09 | Required |
| E17 | HR request contains protected characteristics or proxy criteria | Reject or exclude the unsafe criterion according to the server schema; no screening result may use it. | AC03, AC04, AC09 | Required |
| E18 | Candidate information lacks evidence for a requirement | Mark information missing/insufficient; do not infer a qualification or a deficit. | AC03, AC04 | Required |
| E19 | Adapter invents candidate facts or makes a hiring decision | Reject the output and fail safely; never persist it as a result. | AC03, AC04, AC09 | Required |
| E20 | HR result appears favourable or unfavourable | Show criterion-grounded evidence and a mandatory human-review recommendation; do not advance/reject automatically. | AC03, AC04 | Required |
| E21 | Duplicate HR run/review recommendation | Recover idempotently; one persisted review recommendation and one grouped project only. | AC07 | Required |
| E22 | Coming Soon domain/workflow card is clicked | Show an honest unavailable state; do not call a workflow/provider/action endpoint. | AC01 | Required |
| E23 | Narrow, keyboard, or reduced-motion interaction | Keep controls, focus, labels, and status comprehensible without colour/animation alone. | AC10 | Required |
| E24 | Learner opens the Lab before completing the lesson | Keep the route safe, but do not describe the learner as competent or eligible for an achievement; the server remains authoritative for prerequisites. | AC05, AC07 | Required |
| E25 | Lesson is completed without a knowledge check or supported practice | Do not treat the completion flag as evidence of mastery; improve the Academy content before claiming the deeper learning requirement is met. | AC05 | Required |
| E26 | Practical run is mock, replay, failed, interrupted, or uncertain | Show the true mode/state, preserve the result or failure honestly, and exclude it from live evidence and achievement eligibility. | AC05, AC06, AC09 | Required |
| E27 | Assessment answer is wrong or practical exercise fails | Record the attempt and actionable feedback; preserve prior attempts and allow a supported retry where the endpoint permits. | AC05, AC07 | Required |
| E28 | User or manager view overstates an achievement or competence | Use the narrow server-issued status and defined evidence; never infer mastery from attendance, lesson completion, a single run, or an ungraded preview. | AC05, AC08 | Required |
| E29 | Independent scenario is incomplete or incorrect | Do not award practical credit; retain the attempt, explain the relevant Academy reasoning, and allow a retry without duplicating progress or awards. | AC05, AC07 | Required |

## Update procedure

1. Record a reproducible issue and the affected screen/API.
2. Separate specified behaviour from implemented and verified evidence.
3. Update `MVP_SPEC.md` when a contract changes, then add focused tests with the behaviour change.
4. Update `plan.md` with actual order/status and `prompts.md` only as historical context requires.
5. Never convert a required case to verified without the command, result, and date.

## Change log

- **2026-10-07:** v1.0 froze the initial Sales-only vertical slice and its safety, privacy, persistence, and live/replay boundaries.
- **2026-10-13:** Initial local implementation and focused checks were recorded separately; no successful live-provider call or deployment was claimed.
- **2026-10-13:** The agreed v1.1 scope adds HR → Candidate Screening as the second active learning path. The five remaining domains and all additional Sales/HR workflows remain previews. This contract update is not itself HR implementation or verification evidence.
