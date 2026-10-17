# IkeOru — Prompts and Transfer Context

Updated: 2026-10-17 · Historical archive; current contract: `MVP_SPEC.md` v1.1

This file preserves product reasoning and user requests. It is historical context, not the current specification, an execution checklist, or standing authorization. Read [AGENTS.md](AGENTS.md), [MVP_SPEC.md](MVP_SPEC.md), and [DECISIONS_AND_EDGE_CASES.md](DECISIONS_AND_EDGE_CASES.md) before changing behaviour. `plan.md` records implementation order and historical planning; it does not override the MVP specification.

## Current context and superseded instructions

- Use **IkeOru** for new product-facing copy. “Automation Lab” is the historical working name retained below.
- Exactly two paths are active: `sales-qualify-new-lead` and `hr-candidate-screening`. All other Sales/HR workflows and Marketing, Finance, Operations, Customer Support, and Business Intelligence are Coming Soon. Studio, Cloud, real integrations, billing, and production onboarding remain outside this MVP.
- Preserve Academy-first **Learn → Do → Prove**: explicit objectives, foundational teaching, worked examples, knowledge checks, guided practice, progressively independent scenarios, and assessments covering theory and application. Lesson completion, practical completion, assessment passing, demonstrated competence, and achievement awarded are distinct.
- HR exercises use synthetic evidence and explicit job-related criteria, expose evidence and gaps, exclude protected characteristics and proxies, and require human review without an automated employment decision.
- Implementation and automated tests use mock mode. Mock, replay, failed, interrupted, and successful live outcomes remain distinct. The archived requests do not establish that a live call succeeded, a feature passed verification, or a deployment occurred; deeper Academy requirements remain pending wherever implementation and test evidence are absent.
- Historical approvals for provider calls, model/configuration changes, commits, or pushes apply only to their original tasks. They do not authorize a new action in a later session. The 2026-10-17 approval covers this prompt-history update; commit and push await separate approval.

The original sections 1–31 are preserved below. Read their dated statements with these qualifications:

| Historical sections | Current interpretation |
| --- | --- |
| 1 and 25: transfer instructions and future sessions | Their `plan.md`-first instructions are superseded by the authority above. |
| 10, 13, 26 and 29: Sales first, HR next | Historical scope; v1.1 now requires the two active paths above. |
| 3–9, 16–17, 20–24 and 26: broad vision and future tools | Product history and roadmap only; they do not expand the active MVP or permit arbitrary execution. |
| 27–29: continuation summaries and engineering defaults | Summaries/defaults rather than verified verbatim user messages; recommendations remain distinct from user requests. |
| 30: v1.0, initialize the application next | Historical preimplementation baseline, superseded by v1.1; do not restart or recreate the application. |
| 31: implementation and verification update | Dated report retained as written, not a fresh claim about today's runner, live provider, or deployment status. |

[Recovery scope and chronological index](#32-recovery-scope-and-chronological-index-2026-10-17) · [Recovered prompt text](#33-recovered-user-prompts) · [Current archive-maintenance request](#34-current-archive-maintenance-request-2026-10-17)

---

# Automation Lab — Prompts & Transfer Context

This document preserves the major product prompts, decisions, positioning, and iteration history so the project can be transferred to another ChatGPT account.

---

# 1. Transfer Instruction

Upload:
- `plan.md`
- `prompts.md`

Then use:

> Treat `plan.md` as the current source of truth for the Automation Lab product. Treat `prompts.md` as the preserved product reasoning and decision history. Do not restart ideation from scratch. Continue from the current implementation plan. When proposing changes, preserve existing product decisions unless there is a clear technical, UX, safety, or strategic reason to change them.

---

# 2. Original Product Prompt — Product Ideation

> I want to build an app that teaches employees and professionals how to automate repetitive work across different business fields such as sales, HR, management, marketing and other functions. The app should be practical rather than theory-heavy. A user selects a business field, selects a real repetitive task, learns briefly why it can be automated, then enters a practical environment where they connect/configure tools and see the automation run live. OpenAI should help guide the learner and orchestrate approved tools. The product is intended for a Moonshot event under a Learn theme and should improve people's working lives.

---

# 3. Core Product Insight

The product should NOT be positioned as another Zapier or Make.

Core statement:

> **Zapier and Make help people automate. We help people learn how to think about automation.**

Expanded:

> We help people identify what should be automated, understand why it should be automated, learn how to design the workflow, practice it in a sandbox, run it, reflect on the result, prove their capability, and eventually build their own automations.

---

# 4. Product Differentiation Prompt

> Compare our proposed Automation Lab product with Zapier, Make and similar automation platforms. Identify what would make our product meaningfully different. Focus on automation education, role-specific learning, practical sandbox learning, automation thinking, AI mentoring, assessment, badges, portfolios, and progression from beginner to professional. Do not recommend competing primarily on integration count.

Decision:

The product competes on:
- Automation literacy
- Role-specific learning
- Practical learning
- AI guidance
- Skills progression
- Assessment
- Badges
- Portfolio
- Seamless graduation into an Automation Studio

---

# 5. Academy Concept

The user should be able to start with almost no automation knowledge.

Journey:

> Employee knows the word automation
> ↓
> Enrolls
> ↓
> Learns why automation matters
> ↓
> Learns how to identify repetitive work
> ↓
> Learns workflow thinking
> ↓
> Learns AI vs deterministic automation
> ↓
> Practices
> ↓
> Builds
> ↓
> Runs
> ↓
> Completes assessment
> ↓
> Earns badge
> ↓
> Portfolio updated
> ↓
> Can graduate into Automation Studio

---

# 6. Academy → Lab → Studio Prompt

> Design the product so Academy, Lab and future Automation Studio are one continuous experience. The user should not finish learning and then be forced to leave the platform and learn Zapier or Make. The concepts taught in Academy must become the exact concepts and components used in Lab and Studio.

Key concepts:

- Trigger
- Input
- AI
- Logic
- Condition
- Action
- Output
- Human Review
- Error
- Monitoring

---

# 7. Studio Vision

Future Automation Studio should allow users who already understand automation to build workflows.

Possible components:
- Triggers
- AI nodes
- Conditions
- Filters
- Actions
- APIs
- Webhooks
- Custom tools
- MCP/connectors
- Testing
- Debugging
- Deployment

The Studio should use the same workflow model as the Lab.

A guided Lab workflow should be convertible into an editable Studio workflow.

---

# 8. Portfolio Prompt

> Design a persistent professional automation portfolio. Every user should automatically receive a portfolio when they enroll/sign up. The portfolio should preserve their learning history, completed labs, projects, assessments, scores, badges, skills, Studio projects and other meaningful activity. The portfolio should support private, organization-only and public visibility. Users should be able to share a portfolio URL, send it through WhatsApp or LinkedIn, and eventually download a PDF portfolio.

Portfolio decisions:
- Portfolio created automatically
- Unique public-safe portfolio identifier
- Projects persist
- Assessments persist
- Badges persist
- Skills persist
- Shareable public link
- Downloadable portfolio
- Privacy controls

---

# 9. Badge Prompt

> Create a skill-based badge system. Badges should represent demonstrated practical capability, not simply course attendance. Badges should automatically enter the user's portfolio, have verification identifiers, and be shareable/downloadable.

Example:

> Sales Automation — Level 1

Future:
- Sales Automation — Level 2
- Sales Automation — Professional
- HR Automation — Level 1
- BI Automation — Level 1
- etc.

---

# 10. Multi-Domain Prompt

> Create a domain-based learning architecture. Users should be able to choose a business function independently and accumulate skills across domains without being locked into one path. Completing Sales should not prevent the user from later learning HR, Marketing, Finance, Operations, Customer Support or Business Intelligence. All achievements should accumulate in the same portfolio.

Current domain cards:

1. Sales — ACTIVE MVP
2. Human Resources — NEXT
3. Marketing — COMING SOON
4. Finance — COMING SOON
5. Operations — COMING SOON
6. Customer Support — COMING SOON
7. Business Intelligence — COMING SOON

---

# 11. Business Intelligence Decision

Business Intelligence is explicitly included.

Reason:

Automation should include data work, not only administrative workflows.

BI can eventually cover:
- Data collection
- Data cleaning
- Data transformation
- Reporting
- KPI automation
- Data quality
- Anomaly detection
- Data analysis
- Dashboard refresh
- AI-assisted insights
- ETL/ELT automation

---

# 12. Coming Soon UX

The UI should show all domain cards even when they are not implemented.

Coming-soon cards:
- Marketing
- Finance
- Operations
- Customer Support
- Business Intelligence

They should clearly say:

> COMING SOON

Clicking should show a lightweight placeholder and must not pretend the functionality is implemented.

---

# 13. MVP Scope Prompt

> Keep the Moonshot MVP deliberately small. Build Sales as the first complete vertical slice. Build the architecture so HR can be cloned from Sales. Show other domains in the UI as Coming Soon. Do not attempt to build a Zapier/Make competitor in the MVP.

MVP:
- Sales
- Guided Academy
- Practical Lab
- OpenAI
- Controlled tools
- Execution timeline
- Assessment
- Badge
- Portfolio
- Coming-soon domain cards

---

# 14. First Workflow Prompt

> Design the first complete workflow as Sales → Qualify a New Lead. It must demonstrate the entire product loop: learn, practice, run, see the execution, receive a result, complete an assessment, earn a badge, and have the project saved to the portfolio.

Workflow:

New Lead
→ AI Analysis
→ Lead Classification
→ Recommended Action
→ Follow-Up Task
→ Result

---

# 15. HR Clone Prompt

> Once the Sales workflow architecture works, clone the same architecture into HR. Do not create a separate technical architecture. Use Candidate Screening as the first HR workflow.

Workflow:

Job Description
→ Candidate Profile
→ AI Criteria Extraction
→ Candidate Match
→ Human Review
→ Result

---

# 16. OpenAI Architecture Prompt

> Use OpenAI as the intelligence/orchestration layer. Keep tool execution controlled by the backend. The model should not have unrestricted external access. Expose approved functions/tools, validate their arguments server-side, execute them through the backend, log the result, and return a user-readable explanation.

Potential functions:

- `classify_lead`
- `create_follow_up_task`
- `draft_follow_up_email`
- `screen_candidate`
- `create_onboarding_checklist`

---

# 17. Workflow Engine Prompt

> Design the workflow engine so guided Lab workflows and future Studio workflows share the same underlying JSON/workflow representation. The Studio should eventually visualize and edit the same workflow structure used by the Lab.

Example:

```json
{
  "trigger": "new_lead",
  "steps": [
    {
      "type": "ai",
      "action": "classify_lead"
    },
    {
      "type": "condition",
      "condition": "priority == HOT"
    },
    {
      "type": "action",
      "action": "create_follow_up_task"
    }
  ]
}
```

---

# 18. Execution Timeline Prompt

> Make automation execution visible. The user should watch the automation move through explicit stages rather than only seeing the final answer.

Stages:
1. Trigger received
2. Input validated
3. AI analyzing
4. Decision made
5. Tool called
6. Tool result
7. Workflow completed
8. Explanation

---

# 19. Assessment Prompt

> Assess practical automation understanding rather than only memorization. Include conceptual questions and practical workflow reasoning.

Assessment examples:
- What should be handled by AI?
- What should be deterministic?
- Where should human review happen?
- Modify the workflow for HOT leads.
- Identify the trigger/action/condition.

---

# 20. Portfolio Sharing Prompt

> Create a shareable public portfolio page using a public-safe unique identifier. The portfolio should be mobile-friendly and suitable for sharing through WhatsApp, LinkedIn, email and other channels. Users should control whether the portfolio is private, organization-only or public.

Example:

`automationlab.example/p/AL-P-8F4K92`

---

# 21. Moonshot Pitch Prompt

> Position the product around the Learn theme. Do not present it as another automation platform. Present it as a platform that teaches people how to think about automation, lets them practice it, proves their skills, and eventually lets them build their own automations.

Recommended pitch:

> “Most employees know the word automation, but many don't know what they should automate or how to start. Automation Lab teaches them how to identify repetitive work, think through automation, practice it safely, run it, and prove that they can do it. Once they graduate, they don't leave the platform — they move into Automation Studio and build their own automations.”

---

# 22. Product North Star Prompt

> Ensure the product answers four questions for every professional:
>
> 1. What can I automate?
> 2. How do I automate it?
> 3. Can I actually build and run it?
> 4. Can I prove that I know how to automate?

Mapping:
- Discovery
- Academy/Lab
- Studio
- Portfolio + badges

---

# 23. Current Build Sequence

Do not restart ideation.

Current sequence:

1. Freeze MVP requirements
2. Create MVP_SPEC.md
3. Initialize repository
4. Set up frontend
5. Set up FastAPI backend
6. Create database models
7. Build seven domain cards
8. Mark non-MVP domains Coming Soon
9. Build Sales page
10. Build Qualify a New Lead learning screen
11. Build Automation Lab
12. Integrate OpenAI
13. Build controlled tool registry
14. Build execution timeline
15. Build result screen
16. Build assessment
17. Build badge
18. Build portfolio
19. Build shareable portfolio identifier
20. Add HR architecture
21. Build HR Candidate Screening
22. Test end-to-end
23. Deploy
24. Prepare Moonshot demo

---

# 24. What Not To Build Yet

Do not expand scope into:
- Full Zapier competitor
- Full Make competitor
- Hundreds of integrations
- Full Studio
- Enterprise SSO
- Advanced permissions
- Full billing
- Marketplace
- Complex MCP ecosystem
- Production HR decision automation
- Full Cloud deployment/monitoring

Design the architecture for these, but implement them later.

---

# 25. Instruction for Future Development Sessions

When coding:

1. Read `plan.md`.
2. Read the relevant section of `prompts.md`.
3. Do not invent a competing product direction without discussing it.
4. Preserve the Academy → Lab → Studio → Cloud architecture.
5. Preserve the portfolio as a persistent user asset.
6. Preserve domain cards and Coming Soon states.
7. Prefer reusable workflow infrastructure over domain-specific duplication.
8. Keep Sales as the current implementation priority.
9. After Sales works, clone the architecture to HR.
10. Do not expand MVP scope unless explicitly approved.

---

# 26. Current Source-of-Truth Statement

The current product is:

> **Automation Lab — an AI-powered workplace automation learning and execution platform that takes professionals from automation beginner to capable automation practitioner.**

The current MVP is:

> **Sales → Qualify a New Lead → Academy → Lab → OpenAI → Tool → Execution Timeline → Assessment → Badge → Portfolio**

The next domain is:

> **HR**

The future domains shown in the UI as Coming Soon are:

> **Marketing, Finance, Operations, Customer Support, Business Intelligence**

The future professional workspace is:

> **Automation Studio**

The long-term execution environment is:

> **Automation Cloud**

The user's persistent proof of capability is:

> **Automation Portfolio**


# 27. Continuation — Moonshot Prototype Constraints (2026-10-07)

The user reiterated that this is a low-budget Moonshot prototype intended to attract judges' attention through a complete product experience and a credible pitch. Monetization was discussed as a business hypothesis, not a request to add billing.

Working recommendation: begin with organization-paid training pilots and later learner licenses; individual pathways and Studio usage plans may follow. Pricing and willingness to pay are unvalidated.

# 28. MVP Execution and Grey-Area Tracking Request (2026-10-07)

Faithful summary of the user's request: continue the MVP; identify and clarify grey areas and edge cases while producing it; keep the prompt history, plan, and other relevant documents updated as work progresses.

Response implemented in documentation: created MVP_SPEC.md v1.0 and DECISIONS_AND_EDGE_CASES.md; updated plan.md with the current scope, pending implementation sequence, and open dependencies.

# 29. v1 Implementation Defaults and Scope Reconciliation

These are recorded engineering defaults, not additional verbatim user instructions:

- One complete Sales → Qualify a New Lead experience is mandatory. Older three-workflow Sales and HR delivery targets remain follow-on.
- Learners make constrained trigger and follow-up-rule choices before running the Lab; full Studio remains future.
- Live AI produces validated classification; the approved action saves an internal sandbox task.
- Replay is explicitly labelled and does not earn progress or badges.
- Badge eligibility requires lesson completion, an eligible live Lab outcome and assessment pass including the practical exercise.
- One persistent portfolio groups workflow runs and protects private data; public sharing exposes selected achievements only.
- Three prototype experiences: learner, small organization manager view, and public portfolio viewer.
- Isolated demo sessions and synthetic organization enrollment keep scope small while preserving server-side authorization.
- Copy-link/public-view sharing is in v1; PDF/downloadable badge assets and full invitations follow later.
- Budget, credentials, host, event requirements and retention remain open dependencies.

# 30. Continuing Work from This Baseline

Read MVP_SPEC.md v1.0 for current behaviour and DECISIONS_AND_EDGE_CASES.md for open issues and verification status. Preserve the Academy → Lab → Studio → Cloud vision. Initialize the application next, then build the complete Sales journey. Update document status based on evidence; the application has not yet been implemented in this continuation.

# 31. IkeOru Implementation Update (2026-10-13)

The local implementation now contains the scoped Sales → Qualify a New Lead and HR → Candidate Screening slices: React/Vite learner UI, FastAPI/SQLite workflow service, deterministic mock adapter, configurable server-only OpenAI adapter, Academy progress, assessments, badge prerequisites, portfolio safety controls, and the required submission material.

Verification evidence: focused backend suites and the frontend production build have passed; the exact command results are recorded in the working-session report. During direct persistence smoke testing, a same-transaction run-event sequence collision was found and fixed. Full HTTP `TestClient` verification remains blocked because the current Windows/Python runner hangs creating a local async socket. One separately authorized synthetic Sales live diagnostic reached the provider path and failed with a sanitized connection error; mock mode was restored and no successful live-provider or deployment claim is made.

---

# 32. Recovery Scope and Chronological Index (2026-10-17)

This update records all **37 user messages returned from five identified project chats**, dated October 7–15, 2026. Each chat was read through its oldest available page. The archived-chat listing returned no archived chats. This is a bounded recovery of the available project history, not a claim that every prompt from every account or attachment has been recovered.

| Source chat title | Recovered user messages |
| --- | ---: |
| Summarize Automation Lab Monetization | 3 |
| Inspect IkeOru MVP and plan sprint | 1 |
| Explain repo authentication flow | 2 |
| Build IkeOru Moonshot MVP | 26 |
| Diagnose IkeOru OpenAI connectivity | 5 |
| **Total** | **37** |

The earlier account's shared conversation and the three files mentioned in P001 were not recovered through the chat tools. Their original messages cannot be reconstructed from the handoff alone. Sections 1–31 remain the existing preserved baseline and are not relabelled as newly verified transcripts. P020 is an attachment-reference summary because the tool did not supply its body; P021 contains a subsequent full-text request on the same topic.

**Transcription policy:** recovered user wording is retained, including voice-transcription errors and historical instructions. Line endings and surrounding whitespace are normalized; every quoted line is rendered as a Markdown blockquote. Private workflow record identifiers, the shared prior-account conversation link, and the machine-specific repository/attachment paths are omitted explicitly. No secret values, session credentials, private workflow payloads, assessment submissions/answers, or assistant tool outputs are included. Configuration variable names, non-secret mode/limit/model settings, and public repository references remain useful historical context.

There are **33 quoted prompt bodies**, **three indexed repeated submissions** (P026, P032, P033), and **one attachment-reference summary** (P020). Repeated wording is stored once and linked from each separate submission. A quoted prompt records what was requested and what context the user supplied; it does not independently verify the claims inside that prompt or prove that the work was completed. Archived live-call and publication approvals are historical only.

All times below are **Africa/Lagos (WAT, UTC+1)**.

| Record | Date and time | User request |
| --- | --- | --- |
| [P001](#p001-prior-account-context-handoff) | 07/10/2026 17:30 WAT | Prior-account context handoff |
| [P002](#p002-monetization-and-low-budget-prototype) | 07/10/2026 17:35 WAT | Monetization and low-budget prototype |
| [P003](#p003-continue-the-mvp-and-maintain-project-documents) | 07/10/2026 17:54 WAT | Continue the MVP and maintain project documents |
| [P004](#p004-inspect-the-repository-and-plan-the-sprint) | 12/10/2026 02:42 WAT | Inspect the repository and plan the sprint |
| [P005](#p005-explain-repository-authentication) | 12/10/2026 03:01 WAT | Explain repository authentication |
| [P006](#p006-audit-authentication-and-secure-demo-sessions) | 12/10/2026 03:12 WAT | Audit authentication and secure demo sessions |
| [P007](#p007-build-the-moonshot-mvp-and-submission-materials) | 13/10/2026 00:09 WAT | Build the Moonshot MVP and submission materials |
| [P008](#p008-verify-local-configuration-and-secret-handling) | 13/10/2026 10:07 WAT | Verify local configuration and secret handling |
| [P009](#p009-implement-the-two-path-mvp) | 13/10/2026 10:26 WAT | Implement the two-path MVP |
| [P010](#p010-resume-the-interrupted-two-path-implementation) | 13/10/2026 12:58 WAT | Resume the interrupted two-path implementation |
| [P011](#p011-polish-the-frontend-and-prepare-verification) | 13/10/2026 14:02 WAT | Polish the frontend and prepare verification |
| [P012](#p012-diagnose-the-browser-session-and-csrf-failure) | 13/10/2026 14:26 WAT | Diagnose the browser session and CSRF failure |
| [P013](#p013-finish-mock-mode-assessment-and-persistence-verification) | 13/10/2026 15:01 WAT | Finish mock-mode assessment and persistence verification |
| [P014](#p014-investigate-learner-and-manager-views) | 13/10/2026 15:30 WAT | Investigate Learner and Manager views |
| [P015](#p015-restore-manager-demo-discoverability) | 13/10/2026 16:16 WAT | Restore Manager demo discoverability |
| [P016](#p016-improve-beginner-onboarding-and-workflow-usability) | 13/10/2026 17:51 WAT | Improve beginner onboarding and workflow usability |
| [P017](#p017-align-documentation-with-the-educational-philosophy) | 13/10/2026 18:46 WAT | Align documentation with the educational philosophy |
| [P018](#p018-implement-the-academy-first-learning-experience) | 13/10/2026 18:53 WAT | Implement the Academy-first learning experience |
| [P019](#p019-complete-independent-practice-and-verify-the-academy) | 13/10/2026 19:17 WAT | Complete independent practice and verify the Academy |
| [P020](#p020-attachment-reference-for-final-mock-mode-verification) | 13/10/2026 20:06 WAT | Attachment reference for final mock-mode verification |
| [P021](#p021-perform-final-mock-mode-academy-verification) | 13/10/2026 20:07 WAT | Perform final mock-mode Academy verification |
| [P022](#p022-resolve-the-python-environment-and-run-the-application) | 13/10/2026 20:39 WAT | Resolve the Python environment and run the application |
| [P023](#p023-perform-one-bounded-live-smoke-test) | 13/10/2026 22:15 WAT | Perform one bounded live smoke test |
| [P024](#p024-investigate-the-failed-live-request-and-retries) | 13/10/2026 22:30 WAT | Investigate the failed live request and retries |
| [P025](#p025-identify-the-actual-provider-failure) | 13/10/2026 22:57 WAT | Identify the actual provider failure |
| [P026](#p026-repeat-the-provider-failure-investigation) | 13/10/2026 23:04 WAT | Repeat the provider-failure investigation (same wording as P025) |
| [P027](#p027-perform-one-additional-diagnostic-request) | 13/10/2026 23:11 WAT | Perform one additional diagnostic request |
| [P028](#p028-permit-a-model-change-during-the-diagnostic-task) | 13/10/2026 23:14 WAT | Permit a model change during the diagnostic task |
| [P029](#p029-perform-one-diagnostic-request-with-a-temporary-limit-change) | 13/10/2026 23:31 WAT | Perform one diagnostic request with a temporary limit change |
| [P030](#p030-review-and-commit-the-implementation-locally) | 13/10/2026 23:45 WAT | Review and commit the implementation locally |
| [P031](#p031-diagnose-connectivity-after-the-checkpoint) | 14/10/2026 17:55 WAT | Diagnose connectivity after the checkpoint |
| [P032](#p032-repeat-connectivity-diagnostics) | 14/10/2026 17:57 WAT | Repeat connectivity diagnostics (same wording as P031) |
| [P033](#p033-repeat-connectivity-diagnostics-in-the-diagnostics-chat) | 15/10/2026 10:03 WAT | Repeat connectivity diagnostics in the diagnostics chat (same wording as P031) |
| [P034](#p034-verify-the-running-backend-environment) | 15/10/2026 11:51 WAT | Verify the running backend environment |
| [P035](#p035-inspect-the-sdk-transport-and-align-the-model) | 15/10/2026 12:24 WAT | Inspect the SDK transport and align the model |
| [P036](#p036-verify-windows-certificate-trust-compatibility) | 15/10/2026 12:35 WAT | Verify Windows certificate trust compatibility |
| [P037](#p037-finalize-the-readme-and-publish-the-mvp) | 15/10/2026 22:21 WAT | Finalize the README and publish the MVP |

# 33. Recovered User Prompts

### P001: Prior-account context handoff

Date: 07/10/2026 17:30 WAT · Source chat: **Summarize Automation Lab Monetization**

Record type: Recovered text with explicit redactions.

> [shared prior-account conversation link omitted] So here is the link to my monetization, um, iteration I have done from another account earlier. So I need you to go to the conversation. I'm also going to upload the plans, the MVP, and the prompts that clearly that was generated from that account. How to to both from that account. Let's see, which is going to show you gets the dip core, what I'm trying to do. So that way you understand. You can take the words stuff.
>
> [User attached 3 files; file contents were not included]

---

### P002: Monetization and low-budget prototype

Date: 07/10/2026 17:35 WAT · Source chat: **Summarize Automation Lab Monetization**

Record type: Recovered text.

> Great. We can continue from where we stopped, over the composition stuff. So, what do you propose for the monetization? And also remember that I need to reiterate that this project is for Munstone. Munstone project. Yeah, I know that the team is many, right? I want you to, for it. I'm confident that this project is low, low budget. No idea. I mean this project. We're just trying to create a prototype. So this is, you know, the project that passes all implementation stuff. The project that can just get attention with judges. And the pitch this project. That's what we are creating. So we need it all it. With a, the edge cases and the three UX. We need to touch and do.

---

### P003: Continue the MVP and maintain project documents

Date: 07/10/2026 17:54 WAT · Source chat: **Summarize Automation Lab Monetization**

Record type: Recovered text.

> Okay, so let's continue with the MVP, for the MVP. And then while we are producing that, we'll also be looking out for grid areas and making sure that those grid areas are lighting out, any edge cases that need to be lighting out as well. Then as we go, as we progress, we'll be updating the prompts, those ends as well, and any other that needs to be updated.

---

### P004: Inspect the repository and plan the sprint

Date: 12/10/2026 02:42 WAT · Source chat: **Inspect IkeOru MVP and plan sprint**

Record type: Recovered text.

> We are building IkeOru. First, inspect the existing repository and read MVP_SPEC.md, plan.md, DECISIONS_AND_EDGE_CASES.md, and prompts.md.
> Do not create, edit, delete, or rename any files yet. Report the current repository structure, what has already been implemented, what is missing, and the proposed implementation sequence for our 30-hour development sprint.
> Treat MVP_SPEC.md as the primary engineering specification. Do not expand the agreed MVP scope.

---

### P005: Explain repository authentication

Date: 12/10/2026 03:01 WAT · Source chat: **Explain repo authentication flow**

Record type: Recovered text.

> [@GitHub](plugin://github@openai-curated-remote) Explain this repo's authentication using code and docs: components, request flow, and how credentials and tokens are handled

---

### P006: Audit authentication and secure demo sessions

Date: 12/10/2026 03:12 WAT · Source chat: **Explain repo authentication flow**

Record type: Recovered text.

> We are building Ikoru. Inspect the current repository and compare the actual implementation against `MVP_SPEC.md`, `plan.md`, and `DECISIONS_AND_EDGE_CASES.md`.
>
> Focus on authentication, session management, authorization, database models, and API routes.
>
> 1. &#x20;Identify which files and components actually exist.&#x20;
> 2. &#x20;Distinguish implemented functionality from documentation-only plans.&#x20;
> 3. &#x20;Identify security gaps and decisions that must be resolved before implementation.&#x20;
> 4. &#x20;Recommend the smallest implementation phase that establishes a working frontend, FastAPI backend, database, and secure demo-session authentication.&#x20;
> 5. &#x20;Do not modify files yet. Report your findings and proposed implementation steps first.&#x20;
>
> Treat `MVP_SPEC.md` as the primary engineering contract. Do not expand the MVP scope.

---

### P007: Build the Moonshot MVP and submission materials

Date: 13/10/2026 00:09 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> PROJECT: IkeOru
> SPELLING: I-K-E-O-R-U
> TAGLINE: Learn. Do. Prove.
>
> OBJECTIVE
>
> Build a compelling, working IkeOru MVP for the Moonshot Learn challenge.
>
> We have less than 48 hours before submission. Codex usage is limited,
> so work efficiently. Avoid unnecessary planning loops, duplicate work,
> scope expansion, and repeated prompts.
>
> PRODUCT VISION
>
> IkeOru is a practical AI-powered learning and workforce capability
> platform that helps students, employees, and professionals turn
> learning into demonstrable workplace skills.
>
> It helps users learn automation concepts, practise workflows,
> run them, assess their understanding, and build a portfolio of
> demonstrated capabilities.
>
> Organizations can use IkeOru to develop, track, and recognize
> workforce capabilities.
>
> Long-term architecture:
> Academy → Lab → Studio → Cloud
>
> The Moonshot MVP focuses on Academy and Lab.
>
> PRODUCT NAMING
>
> Use IkeOru exactly as written throughout the application and all
> new user-facing documentation.
>
> Older references to Automation Lab are historical working names
> for the same product.
>
> Do not rename the GitHub repository, destroy Git history, or
> rename existing files unnecessarily.
>
> SOURCE OF TRUTH
>
> Read the existing files before implementation:
>
> - MVP_SPEC.md
> - DECISIONS_AND_EDGE_CASES.md
> - plan.md
> - prompts.md
> - README.md, if present
>
> Treat MVP_SPEC.md v1.0 as the authoritative implementation contract.
>
> Use the other documents for product context, historical decisions,
> roadmap information, and unresolved issues.
>
> If an older document conflicts with MVP_SPEC.md, follow the
> authoritative MVP specification unless a genuine blocker requires
> clarification.
>
> Inspect the repository before creating or replacing files.
>
> MANDATORY MVP JOURNEY
>
> Sales
> → Qualify a New Lead
> → Learn
> → Practice
> → Run
> → Result
> → Assessment
> → Badge
> → Portfolio
>
> This complete vertical slice is the primary deliverable.
>
> REQUIRED WORKSHOP SUBMISSION MATERIALS
>
> Verify whether these files exist and create or update them as needed:
>
> 1. PRODUCT_BRIEF.md
>    Explain the problem, product, value proposition, and one specific
>    real target user. Do not invent a named customer or claim interviews
>    that never happened.
>
> 2. CAPSTONE_SPEC.md
>    State the MVP scope, acceptance criteria, and how the working
>    vertical slice will be verified.
>
> 3. AGENTS.md
>    Provide concise, actionable repository rules, commands, security
>    requirements, testing expectations, and scope boundaries for Codex.
>
> 4. README.md
>    Include "Built with Codex", product overview, architecture,
>    setup instructions, configuration variable names, test commands,
>    and truthful implementation status.
>
> 5. DEMO_SCRIPT.md
>    Provide a rehearsable demonstration of the complete learner journey,
>    including a fallback if the live AI provider is unavailable.
>
> Keep these files concise and consistent with the existing documents.
> Do not duplicate the entire product specification into every file.
>
> WORKING APPLICATION
>
> Frontend: React + Vite
> Backend: Python + FastAPI
> Database: SQLite for the local prototype
> AI: OpenAI API through a backend-only adapter
>
> First inspect what already exists. Reuse working code and dependencies.
>
> Only Sales → Qualify a New Lead is an active workflow.
> Other domains should be accurately labelled Coming Soon.
> Do not implement the full visual Automation Studio, additional Sales
> workflows, HR workflows, real CRM integrations, or billing.
>
> AI AND API KEY
>
> The API key has not yet been received.
>
> Do not block development waiting for it.
>
> Implement a clean backend AI adapter interface with:
>
> - A deterministic mock adapter for local development and tests.
> - A configurable live OpenAI adapter ready to use when credentials
>   become available.
> - Server-side validation of AI output.
> - Clear distinction between live and mock/replay results.
>
> Never fabricate a successful live AI call.
>
> Read credentials from environment variables. Do not hardcode,
> print, log, commit, or expose secrets in frontend code.
>
> When the API key becomes available, integration should require
> configuration rather than architectural rework.
>
> CORE WORKFLOW
>
> Accept validated synthetic lead data.
>
> Classify the lead as HOT, WARM, COLD, or NEEDS_REVIEW.
>
> Explain the result using evidence from the supplied input.
>
> Apply the server-defined policy:
>
> - HOT: create an internal follow-up task using the selected rule.
> - WARM: create a follow-up task due within 72 hours.
> - COLD: complete successfully without creating a task.
> - NEEDS_REVIEW: create an internal review task.
>
> Do not invent facts or contact information.
>
> The model must not execute arbitrary code, SQL, URLs, or external
> actions. Backend code controls permitted tools and business rules.
>
> Persist the run, ordered execution events, result, and task where
> appropriate. Handle invalid input and failures honestly.
>
> LEARNING AND ACHIEVEMENTS
>
> Teach trigger, input, AI, condition, action, output, and human review.
>
> Provide constrained practical choices rather than a full visual
> workflow editor.
>
> Implement assessment grading and enforce badge prerequisites on
> the server.
>
> Keep learner progress and portfolio data persistent.
>
> Public portfolios must expose only explicitly selected safe fields.
> Private lead inputs and assessment answers must never be exposed.
>
> REPOSITORY AND SECURITY
>
> Before editing:
>
> - Inspect Git status and the existing file structure.
> - Preserve unrelated user work.
> - Do not overwrite useful documentation blindly.
> - Do not commit secrets.
> - Do not force-push.
> - Do not automatically commit or push without reporting changes
>   and obtaining approval.
>
> Do not install unnecessary dependencies.
>
> Use existing project conventions where practical.
>
> TESTING
>
> Prioritize tests for:
>
> - Lead validation and classification schema.
> - HOT, WARM, COLD, and NEEDS_REVIEW behaviour.
> - Task creation and duplicate prevention.
> - Mock/live mode separation.
> - Assessment and badge eligibility.
> - Portfolio privacy and ownership checks.
> - Persistence and important failure cases.
>
> Run the tests that are feasible within the available time.
>
> Report exactly which tests ran and which passed or failed.
>
> WORKSHOP CHECKLIST
>
> Prepare the repository for these submission checks:
>
> - Public GitHub repository.
> - PRODUCT_BRIEF.md identifying one real target user.
> - CAPSTONE_SPEC.md with checkable criteria.
> - AGENTS.md containing project rules.
> - One working vertical slice with tests.
> - An appropriate skill or MCP server only if genuinely useful.
> - README.md containing "Built with Codex".
> - DEMO_SCRIPT.md with rehearsed fallback behaviour.
> - No secrets anywhere in the repository.
>
> Do not add an MCP server merely to satisfy the checklist if the
> working product does not require one.
>
> TIME AND CREDIT MANAGEMENT
>
> Prioritize a working, testable end-to-end experience over breadth.
>
> Do not repeatedly re-plan decisions already established in the
> source-of-truth documents.
>
> Do not expand the scope.
>
> Inspect first, then propose the shortest implementation sequence.
> After inspection, implement in small, verifiable phases rather than
> attempting a blind rewrite of the entire application.
>
> Report blockers immediately.
>
> DELIVERABLE
>
> First report:
>
> 1. Existing implementation and repository structure.
> 2. Missing implementation and submission files.
> 3. Any conflicts between documents.
> 4. The smallest practical implementation sequence.
> 5. The immediate first coding task.
>
> Then proceed only within the approved implementation scope.
>
> At each milestone, report changed files, test results, and the next
> highest-priority task.
>
> Never describe planned functionality as implemented or tested
> without evidence.

---

### P008: Verify local configuration and secret handling

Date: 13/10/2026 10:07 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> PROJECT: IkeOru
> TASK: Verify local configuration before the next implementation phase.
>
> CONTEXT
> I have configured backend/.env locally with:
> - The OpenAI API key
> - The OpenAI model setting
> - The IkeOru session secret
> - The database URL
> - The CORS configuration
> - The live-run daily limit
> - The run timeout
>
> IKEORU_AI_MODE remains set to mock intentionally.
>
> Do not print, reveal, copy, or log any secret values.
>
> OBJECTIVE
> Verify that the existing configuration is correct before we implement
> the expanded Sales and HR learning paths.
>
> 1. INSPECT THE CONFIGURATION
>
> Inspect:
> - backend/.env.example
> - backend/app/config.py
> - backend/app/ai.py
> - backend/app/main.py
> - backend requirements or dependency files
> - root .gitignore
> - backend/.gitignore, if present
> - existing configuration and AI tests
>
> Confirm that the backend reads the environment variables actually
> defined in the project.
>
> 2. VERIFY SECRET HANDLING
>
> Confirm that:
> - backend/.env is excluded from Git.
> - OPENAI_API_KEY is used only by the backend.
> - No frontend environment variable exposes the API key.
> - The key is never returned in API responses or written to logs.
> - The session secret is non-empty.
> - Error messages do not expose secrets.
>
> Do not print secret values or reveal them in the report.
>
> 3. VERIFY OPENAI CONFIGURATION
>
> Confirm that:
> - The installed OpenAI SDK supports the implementation's API calls.
> - The live adapter uses the supported Responses API interface.
> - OPENAI_MODEL is read from configuration.
> - The selected model identifier is configured correctly.
> - Missing credentials produce a safe configuration error.
> - Provider errors do not silently produce mock results.
>
> Do not make a live API request during this task.
>
> 4. VERIFY SAFETY LIMITS
>
> Confirm that:
> - IKEORU_LIVE_RUN_DAILY_LIMIT is read and enforced.
> - IKEORU_RUN_TIMEOUT_SECONDS is read and enforced.
> - Invalid inputs are rejected.
> - Live mode cannot be enabled accidentally because configuration
>   silently defaults to a live provider.
> - Mock mode remains deterministic for automated tests.
>
> 5. RUN CHECKS
>
> Run the relevant configuration tests and Python compilation.
>
> Run git diff --check.
>
> Check Git status and ensure the local .env file is not tracked.
>
> Do not modify unrelated files. Make only small, necessary corrections
> directly related to configuration or security.
>
> Do not commit or push.
>
> FINAL REPORT
>
> Return:
> A. Configuration checks passed.
> B. Configuration issues found and fixed.
> C. Remaining configuration issues.
> D. Test commands and exact results.
> E. Whether a live API test is still required.
> F. The exact next step before implementing the expanded MVP.
>
> Never include secret values in the report.

---

### P009: Implement the two-path MVP

Date: 13/10/2026 10:26 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> PROJECT: IkeOru
> TAGLINE: Learn. Do. Prove.
>
> TASK: Implement the agreed two-path MVP and prepare it for verification.
>
> CONTEXT
>
> The repository already contains:
> - React/Vite frontend.
> - FastAPI/Python backend.
> - SQLite persistence.
> - Sales → Qualify a New Lead.
> - Mock and live AI adapter architecture.
> - Assessment, badge, and portfolio functionality.
> - Submission documentation.
> - Configuration and core-service tests.
>
> The configuration verification phase has completed.
>
> Reported checks:
> - 10 configuration/core-service tests passed.
> - Python compilation passed.
> - pip check passed.
> - git diff --check passed.
> - backend/.env is ignored and untracked.
> - No live OpenAI request has been made.
>
> Do not repeat these checks without a specific reason.
>
> IMPORTANT CONSTRAINTS
>
> - Inspect current Git status before editing.
> - Preserve all existing work.
> - Do not rebuild working components.
> - Do not expand scope beyond the agreed MVP.
> - Do not print, expose, or copy secrets.
> - Do not commit or push.
> - Keep IKEORU_AI_MODE=mock during implementation.
> - Do not make billable API calls during automated tests.
> - Do not claim unverified functionality works.
>
> AUTHORITATIVE SCOPE
>
> The MVP now contains TWO complete learning paths:
>
> 1. Sales → Qualify a New Lead.
> 2. HR → Candidate Screening.
>
> The other five domains are previews only:
> - Marketing.
> - Finance.
> - Operations.
> - Customer Support.
> - Business Intelligence.
>
> Update MVP_SPEC.md and DECISIONS_AND_EDGE_CASES.md to reflect
> this agreed scope. Preserve historical decisions where useful.
>
> PHASE 1 — AUDIT
>
> Inspect the current:
> - Frontend domain catalog and navigation.
> - Backend workflow catalog and routes.
> - AI adapter and output schemas.
> - Learning content and lesson-completion logic.
> - Workflow run services.
> - Events and persistence.
> - Assessment and achievement logic.
> - Portfolio services.
> - Existing tests and documentation.
>
> Identify reusable components and implement the smallest changes
> necessary.
>
> PHASE 2 — PRESERVE AND VERIFY SALES
>
> Keep the existing workflow:
> sales-qualify-new-lead.
>
> Verify the complete journey:
>
> Learn → Practice → Run → Result and Timeline → Assessment →
> Achievement → Portfolio.
>
> Preserve:
> - HOT, WARM, COLD, NEEDS_REVIEW classifications.
> - Server-controlled business policies.
> - Correct internal task creation.
> - Ordered event persistence.
> - Idempotency.
> - Input validation.
> - Assessment grading on the server.
> - Backend-enforced achievement eligibility.
> - Privacy-safe portfolio publication.
>
> Do not replace the existing Sales implementation.
>
> PHASE 3 — IMPLEMENT HR CANDIDATE SCREENING
>
> Add one complete workflow:
> hr-candidate-screening.
>
> Reuse shared architecture and components from Sales.
>
> Implement:
> 1. HR learning content.
> 2. Guided practice using synthetic data.
> 3. Candidate and job-requirement inputs.
> 4. AI-assisted evidence evaluation against explicit job-related criteria.
> 5. Structured results showing supporting evidence and missing information.
> 6. A recommended next step requiring human review.
> 7. Persisted workflow results and ordered events.
> 8. An HR-specific assessment.
> 9. Backend-enforced achievement prerequisites.
> 10. Portfolio integration.
>
> Do not invent candidate qualifications.
>
> Do not infer protected characteristics or use them as screening
> criteria. Do not autonomously reject candidates or make final hiring
> decisions. Use synthetic candidate information only.
>
> The workflow must explain its findings and require human review.
>
> Mock results must be visibly labelled MOCK. Live results must be
> labelled LIVE only when a real provider call succeeds.
>
> Do not silently fall back from a failed live request to mock output.
>
> PHASE 4 — DOMAIN DASHBOARD
>
> Display seven domains:
>
> Sales — Active
> HR — Active
> Marketing — Coming Soon
> Finance — Coming Soon
> Operations — Coming Soon
> Customer Support — Coming Soon
> Business Intelligence — Coming Soon
>
> Show future Sales paths as Coming Soon, including lead generation,
> follow-up, email drafting, pipeline reporting, and re-engagement.
>
> Show future HR paths as Coming Soon, including interview scheduling,
> onboarding, employee-query classification, leave processing,
> training-needs identification, and HR document processing.
>
> Do not implement these future workflows.
>
> Coming Soon cards must not trigger unfinished automation endpoints.
>
> PHASE 5 — LIVE OPENAI READINESS
>
> Inspect the existing live adapter, configuration, and dependencies.
>
> Preserve:
> - Backend-only credentials.
> - Configurable model setting.
> - Supported Responses API interface.
> - Structured response validation.
> - Bounded request timeout.
> - Daily live-run limits.
> - Safe provider errors.
> - Explicit mock/live mode separation.
>
> Keep mock mode enabled throughout implementation.
>
> Automated tests must use deterministic mock provider responses.
> Do not make billable requests during the test suite.
>
> Do not repeatedly probe the live API.
>
> Once the application and automated checks are ready, report the exact
> steps for performing one bounded live test. Do not claim live access
> until the request actually succeeds.
>
> PHASE 6 — ASSESSMENT AND PORTFOLIO
>
> Verify that:
> - Sales and HR have distinct learning content and assessments.
> - Answers are graded on the server.
> - Achievement prerequisites are enforced on the backend.
> - Mock/replay results cannot earn achievements requiring live runs.
> - Repeated requests cannot create duplicate tasks or achievements.
> - Progress persists across refreshes.
> - Public portfolios reveal only explicitly permitted fields.
> - Private workflow inputs and assessment answers are never exposed.
> - User ownership and authorization checks remain effective.
>
> PHASE 7 — TESTING
>
> Add focused tests for:
> - HR input validation.
> - HR structured AI output.
> - Evidence and missing-information handling.
> - Human-review recommendation.
> - HR persistence and ordered events.
> - HR assessment and achievement eligibility.
> - Sales regression coverage.
> - Mock/live separation.
> - Coming Soon domain enforcement.
> - Portfolio privacy and ownership.
> - Idempotency and duplicate prevention.
>
> Run the relevant tests, Python compilation, frontend production build,
> pip check, and git diff --check.
>
> Do not weaken or remove existing tests to obtain a passing result.
>
> If a test fails because of the local Windows socket/TLS environment,
> record the exact failure and distinguish it from an application defect.
>
> PHASE 8 — DOCUMENTATION
>
> Update:
> - README.md.
> - PRODUCT_BRIEF.md.
> - CAPSTONE_SPEC.md.
> - AGENTS.md.
> - DEMO_SCRIPT.md.
> - MVP_SPEC.md.
> - DECISIONS_AND_EDGE_CASES.md.
> - plan.md.
>
> The README must include "Built with Codex".
>
> Keep documentation concise and consistent.
>
> The demo should show the learner journey, explain the difference
> between mock and live execution, and include a fallback if the
> provider is unavailable.
>
> Do not invent customers, interviews, test results, or deployments.
>
> PHASE 9 — FINAL REPORT
>
> Report:
> 1. Files changed.
> 2. Sales functionality verified.
> 3. HR functionality verified.
> 4. Exact tests and results.
> 5. Whether the frontend production build passed.
> 6. Whether live OpenAI was tested.
> 7. Whether the browser journey was verified.
> 8. Security findings without secret values.
> 9. Remaining critical blockers.
> 10. Exact next steps before submission.
>
> Do not commit or push.
>
> Prioritize a complete, testable, honest two-path MVP.

---

### P010: Resume the interrupted two-path implementation

Date: 13/10/2026 12:58 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> Continue the existing IkeOru two-path MVP implementation from
> the exact point where you stopped before the usage limit was reached.
>
> Do not start over. Do not discard, overwrite, or recreate existing work.
>
> FIRST:
> 1. Inspect the current Git status and diff.
> 2. Identify the files already changed and any incomplete edits.
> 3. Review the existing Sales implementation and the HR work already
>    started.
> 4. Determine which tasks from my original specification remain
>    incomplete.
>
> THEN:
> Continue implementing the agreed MVP, preserving existing work.
>
> Required active workflows:
> - Sales → Qualify a New Lead.
> - HR → Candidate Screening.
>
> The other five domains remain Coming Soon.
>
> Complete the HR backend, frontend, learning content, assessment,
> achievement eligibility, persistence, ordered events, and portfolio
> integration using the existing shared architecture.
>
> Preserve the existing Sales implementation.
>
> Keep IKEORU_AI_MODE=mock.
> Do not make live OpenAI calls during implementation or testing.
> Do not expose secrets.
> Do not commit or push to GitHub.
> Do not implement workflows marked Coming Soon.
>
> Add and run focused tests for HR, Sales regression, assessment and
> achievement eligibility, persistence, privacy, ownership, idempotency,
> mock/live separation, and Coming Soon enforcement.
>
> Run the relevant Python tests, Python compilation, frontend production
> build, pip check, and git diff --check. Do not repeat checks that have
> already passed unless changes make them necessary.
>
> If a test fails, investigate and report the actual failure. Do not
> remove or weaken tests to make the suite pass.
>
> Finally, report:
> - What was already present when you resumed.
> - Files changed.
> - What is now complete.
> - Exact tests and results.
> - Whether the browser journey was verified.
> - Whether live OpenAI was tested.
> - Remaining blockers and next steps.
>
> Do not claim anything works unless you have verified it.

---

### P011: Polish the frontend and prepare verification

Date: 13/10/2026 14:02 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> PROJECT: IkeOru
> TAGLINE: Learn. Do. Prove.
>
> OBJECTIVE:
> Polish the existing IkeOru application into a professional,
> premium-quality, minimalist workplace learning platform.
>
> Complete the remaining frontend refinements, improve usability,
> verify the existing two-path MVP, address launch-blocking issues,
> and prepare the application for a controlled live-provider test.
>
> We have limited time. Prioritize quality, functional completeness,
> and submission readiness over adding new features.
>
> Do not rebuild the application.
>
> Do not discard or overwrite existing work.
>
> ============================================================
> 1. CURRENT PROJECT CONTEXT
> ============================================================
>
> IkeOru is an AI-powered practical learning and workplace
> capability platform.
>
> Its purpose is to help students, employees, and professionals
> learn practical workplace tasks, practise them, demonstrate
> their skills, and build a portfolio of completed work.
>
> The application currently contains:
>
> - React and Vite frontend.
> - FastAPI and Python backend.
> - SQLite persistence.
> - Sales → Qualify a New Lead.
> - HR → Candidate Screening.
> - Mock and live AI adapter architecture.
> - Learning content and guided practice.
> - Workflow execution and results.
> - Ordered event history.
> - Assessments and achievement functionality.
> - Portfolio functionality.
> - Configuration and core-service tests.
> - Submission documentation.
>
> The application has already been started locally.
>
> The dashboard opens, the frontend communicates with the backend,
> and the Sales and HR workflow screens are accessible.
>
> The previous implementation report stated:
>
> - 14 focused configuration/core-service tests passed.
> - 20 tests were collected.
> - Python compilation passed.
> - pip check passed.
> - Frontend production build passed.
> - git diff --check passed.
> - No live OpenAI request was made.
> - The browser journey was not verified.
> - No commit or push was performed.
>
> Treat those as previously reported results, not proof that every
> current file and workflow remains correct.
>
> The last implementation changed backend AI, schemas, services,
> routes, tests, frontend application/types/API, seed configuration,
> and documentation.
>
> Preserve all useful existing work.
>
> ============================================================
> 2. NON-NEGOTIABLE RULES
> ============================================================
>
> Before making changes:
>
> 1. Inspect Git status and the current diff.
> 2. Inspect the actual frontend and backend implementation.
> 3. Identify existing changes and incomplete work.
> 4. Determine which requested refinements are already implemented.
> 5. Make the smallest safe changes necessary.
>
> Do not start over.
>
> Do not replace working architecture with a new architecture.
>
> Do not overwrite user changes.
>
> Do not remove tests to obtain passing results.
>
> Do not invent successful test results, deployments, customers,
> interviews, or live API calls.
>
> Do not expose, print, copy, or commit secrets.
>
> Keep backend/.env ignored and untracked.
>
> Keep IKEORU_AI_MODE=mock during ordinary implementation and
> automated testing.
>
> Automated tests must use deterministic mock/fake providers.
> They must not make billable API requests.
>
> Do not commit or push to GitHub.
>
> Do not add new product features outside the agreed MVP.
>
> Do not implement unfinished workflows.
>
> Do not weaken authorization, validation, privacy, idempotency,
> assessment grading, achievement eligibility, or business rules
> to make the interface easier to implement.
>
> Do not make unnecessary dependency upgrades.
>
> Preserve the existing API contracts unless a genuine defect
> requires a narrowly scoped correction.
>
> ============================================================
> 3. AUTHORITATIVE PRODUCT SCOPE
> ============================================================
>
> There are exactly TWO active learning paths.
>
> ACTIVE PATH 1:
> Sales → Qualify a New Lead.
>
> ACTIVE PATH 2:
> HR → Candidate Screening.
>
> The other five domains are previews only:
>
> - Marketing.
> - Finance.
> - Operations.
> - Customer Support.
> - Business Intelligence.
>
> Future Sales paths remain Coming Soon:
>
> - Lead generation.
> - Follow-up.
> - Email drafting.
> - Pipeline reporting.
> - Re-engagement.
>
> Future HR paths remain Coming Soon:
>
> - Interview scheduling.
> - Onboarding.
> - Employee-query classification.
> - Leave processing.
> - Training-needs identification.
> - HR document processing.
>
> Coming Soon cards must never launch unfinished automation
> or imply that an unavailable workflow is functional.
>
> Do not add further workflows.
>
> ============================================================
> 4. VISUAL DESIGN DIRECTION
> ============================================================
>
> The agreed design direction is:
>
> PREMIUM CORPORATE STRUCTURE
> combined with
> MODERN MINIMALIST STYLING.
>
> IkeOru should feel professional, polished, sophisticated,
> trustworthy, intelligent, and easy to use.
>
> The interface must remain approachable for beginners while
> looking credible to professionals and enterprise organizations.
>
> Use these design principles:
>
> A. COLOUR
>
> - Deep navy or charcoal as the primary brand colour.
> - Warm white or a very light neutral background.
> - Restrained muted gold or teal accents.
> - Accessible text and control contrast.
> - Consistent semantic colours for success, warning, error,
>   and informational states.
>
> Avoid excessive gradients, neon colours, competing accents,
> and unnecessary decorative effects.
>
> B. TYPOGRAPHY
>
> - Use a clean, modern, professional font stack.
> - Establish a clear hierarchy for page titles, section headings,
>   card titles, body copy, captions, and metadata.
> - Use consistent font weights and line heights.
> - Avoid excessive uppercase text.
> - Ensure paragraphs are readable and not excessively wide.
>
> C. SPACING AND LAYOUT
>
> - Use a consistent spacing scale.
> - Give important content sufficient breathing room.
> - Align cards, headings, forms, and buttons consistently.
> - Reduce unnecessary borders, shadows, labels, and containers.
> - Keep the main content area readable and focused.
> - Prevent excessive information density.
>
> D. COMPONENTS
>
> Standardize:
>
> - Navigation.
> - Buttons.
> - Form controls.
> - Cards.
> - Status indicators.
> - Progress indicators.
> - Alerts and error messages.
> - Result panels.
> - Assessment questions.
> - Achievement cards.
> - Portfolio cards.
> - Expandable detail sections.
>
> Use subtle borders, restrained shadows, consistent corner radii,
> and clear hover, focus, disabled, loading, and error states.
>
> E. ICONS AND MOTION
>
> Use a consistent icon style.
>
> Avoid excessive emoji, decorative symbols, and inconsistent icons.
>
> Animations must be subtle and should not delay the learner's
> progress through a task.
>
> Respect reduced-motion preferences.
>
> F. RESPONSIVE DESIGN
>
> Verify desktop and narrower-screen layouts.
>
> Navigation, cards, forms, result panels, and action buttons must
> remain readable and usable on smaller screens.
>
> Do not introduce horizontal overflow or clipped content.
>
> Do not sacrifice accessibility for visual styling.
>
> ============================================================
> 5. DASHBOARD REDESIGN
> ============================================================
>
> Simplify the dashboard so that a learner can quickly understand:
>
> 1. What can I learn?
> 2. What should I do next?
> 3. What have I achieved?
>
> Use a clean, consistent navigation structure based on
> functionality that actually exists.
>
> Possible navigation labels:
>
> - Overview.
> - Learning Paths.
> - My Portfolio.
> - My Progress.
>
> Inspect the existing routes and features before using these labels.
>
> Do not add nonfunctional navigation pages or pretend that
> unimplemented features exist.
>
> The dashboard should have a concise welcome heading such as:
>
> "Build skills that show up at work."
>
> Use a short supporting sentence explaining that learners can
> learn practical workplace tasks, practise guided scenarios,
> and demonstrate their capabilities.
>
> Avoid lengthy introductions.
>
> Make the two active paths the visual focus.
>
> SALES CARD
>
> Title:
> Sales
>
> Workflow:
> Qualify a New Lead
>
> Description:
> Learn to evaluate a lead, apply business rules, and determine
> the appropriate next action.
>
> Primary action:
> Start learning or Continue learning, depending on persisted
> learner progress.
>
> HR CARD
>
> Title:
> Human Resources
>
> Workflow:
> Candidate Screening
>
> Description:
> Learn to evaluate job-related evidence, identify missing
> information, and prepare a recommendation for human review.
>
> Primary action:
> Start learning or Continue learning, depending on persisted
> learner progress.
>
> Each active card should have:
>
> - A clear title.
> - A concise description.
> - A consistent icon or visual marker.
> - A meaningful progress indicator when real progress exists.
> - One clear primary action.
>
> Avoid multiple competing buttons and long explanations
> inside the cards.
>
> Display the five Coming Soon domains in a visually secondary
> section.
>
> Their unavailable status must be clear without dominating
> the dashboard.
>
> If the backend supports real progress summaries, present a
> small number of useful metrics such as completed lessons,
> learning paths started, or demonstrated skills.
>
> Do not invent numbers or show misleading zero-value statistics
> merely to fill space.
>
> Do not introduce complex analytics into the MVP.
>
> ============================================================
> 6. REMOVE UNNECESSARY INFORMATION DENSITY
> ============================================================
>
> The current interface feels crowded and exposes too much
> information at once.
>
> Audit the actual screens for redundant headings, repeated
> explanations, unnecessary metadata, oversized status labels,
> technical details, excessive helper text, and competing actions.
>
> Examples of potentially noisy information include technical
> execution details, page-size information, role metadata,
> support-demand fields, repeated workflow descriptions,
> and verbose event histories.
>
> Inspect each field before changing it.
>
> Do not remove information required for correct workflow
> execution or meaningful learning.
>
> Use progressive disclosure:
>
> - Show essential information first.
> - Place secondary explanations behind expandable sections.
> - Keep advanced technical details out of the main learner path
>   unless they are necessary for understanding a result.
> - Retain useful validation messages close to their inputs.
> - Remove duplicated explanations.
> - Keep required form fields clearly labelled.
> - Explain unfamiliar concepts concisely.
>
> Do not hide required candidate criteria, business rules,
> important warnings, or essential user decisions.
>
> The objective is to simplify presentation, not weaken the
> underlying workflow.
>
> ============================================================
> 7. MOCK/LIVE STATUS PRESENTATION
> ============================================================
>
> The interface must distinguish development execution from
> real provider execution honestly.
>
> During mock mode:
>
> - Retain an accurate MOCK indicator.
> - Make it discreet and unobtrusive.
> - Avoid letting technical status dominate the dashboard.
> - Display it clearly on the relevant execution result.
>
> During live mode:
>
> - Display LIVE only after a real provider request succeeds.
> - Never label mock output as live.
> - Never silently fall back from a failed live request to mock.
> - Display a concise, understandable error if live execution fails.
> - Keep technical diagnostics out of public-facing result text.
>
> Do not remove execution-status information simply because
> it looks less attractive.
>
> Do not make the application appear live while it is in mock mode.
>
> Do not make switching modes depend on frontend-only state.
>
> The backend remains authoritative for execution mode and results.
>
> ============================================================
> 8. WORKFLOW SCREEN REFINEMENT
> ============================================================
>
> Apply the same design system to Sales and HR.
>
> Preserve the existing journey:
>
> Learn → Practice → Run → Result and Timeline → Assessment
> → Achievement → Portfolio.
>
> Do not redesign each workflow independently.
>
> Reuse shared components where practical.
>
> LEARN
>
> Show:
>
> - What the learner will learn.
> - Why the task matters.
> - The relevant business concept.
> - A concise expected outcome.
>
> Avoid lengthy introductory text.
>
> PRACTICE
>
> Use clear instructions and synthetic examples.
>
> Explain what the learner should pay attention to.
>
> RUN
>
> Use a clean form layout.
>
> Group related inputs logically.
>
> Distinguish required and optional fields.
>
> Show concise helper text only where useful.
>
> Provide one prominent execution button.
>
> Prevent duplicate submissions while a request is in progress.
>
> Show loading and error states clearly.
>
> RESULT
>
> Present the outcome first.
>
> Show the explanation and recommended next action.
>
> Provide access to supporting details without making them
> all compete for attention.
>
> TIMELINE
>
> Preserve ordered event history and backend persistence.
>
> Consider a collapsed "View activity history" section if
> the current interface displays too much detail by default.
>
> Do not remove the underlying event records.
>
> ASSESSMENT
>
> Use a consistent, readable question layout.
>
> Clearly distinguish unanswered, selected, submitted, and
> graded states.
>
> Show appropriate feedback after submission.
>
> Do not expose correct answers prematurely.
>
> ACHIEVEMENT
>
> Explain what the learner demonstrated and why the achievement
> was earned.
>
> Never display an earned achievement unless the backend confirms
> eligibility.
>
> PORTFOLIO
>
> Present completed work in a professional, readable format.
>
> Keep private and public portfolio views distinct.
>
> Show only information permitted for the selected visibility.
>
> ============================================================
> 9. SALES WORKFLOW — PRESERVE BUSINESS LOGIC
> ============================================================
>
> Preserve the existing workflow:
>
> sales-qualify-new-lead.
>
> Preserve all four classifications:
>
> - HOT.
> - WARM.
> - COLD.
> - NEEDS_REVIEW.
>
> Preserve server-controlled business policies.
>
> Preserve the correct internal task creation rules.
>
> Preserve input validation, ordered event persistence,
> idempotency, server-side assessment grading, backend-enforced
> achievement eligibility, and portfolio privacy.
>
> Do not replace or rewrite the working Sales implementation
> merely to improve the frontend.
>
> Verify that frontend changes have not changed the meaning
> of existing API requests or results.
>
> ============================================================
> 10. HR CANDIDATE SCREENING — SAFETY AND FUNCTIONALITY
> ============================================================
>
> Preserve the workflow:
>
> hr-candidate-screening.
>
> Use synthetic candidate information only.
>
> Evaluation must use explicit, job-related criteria.
>
> Do not infer or use protected characteristics.
>
> Do not invent candidate qualifications.
>
> Distinguish supporting evidence from missing information.
>
> Always frame the output as a recommendation for human review.
>
> Never autonomously reject a candidate or make a final hiring
> decision.
>
> Preserve the HR-specific learning content, structured AI result,
> ordered events, persistence, assessment, achievement eligibility,
> and portfolio integration.
>
> The result must make it clear that human review is required.
>
> Candidate names are display labels, not evaluation evidence.
>
> Ensure frontend refinements do not remove important safeguards
> or make the recommendation appear to be a final hiring decision.
>
> ============================================================
> 11. FUNCTIONAL, SECURITY, AND DATA INTEGRITY AUDIT
> ============================================================
>
> Inspect the existing implementation for critical defects.
>
> Verify, where supported by the existing architecture:
>
> - User/session ownership checks.
> - Authorization for private resources.
> - Backend-side assessment grading.
> - Backend-side achievement eligibility.
> - Mock/live separation.
> - Input validation.
> - Safe error handling.
> - Rate and live-run limits.
> - Request timeouts.
> - Idempotency and duplicate prevention.
> - Ordered event persistence.
> - Progress persistence across refreshes.
> - Portfolio privacy.
> - Public portfolio field allowlisting.
> - Prevention of private assessment answers and workflow inputs
>   leaking into public responses.
> - No frontend exposure of provider credentials.
> - No secrets in source files, logs, documentation, or Git changes.
> - No Coming Soon card invoking an unfinished workflow.
>
> Do not introduce a new authentication system or major security
> architecture unless a genuine launch-blocking defect requires it.
>
> If a serious security defect is found, fix it narrowly and
> document the change.
>
> Do not claim a security audit is comprehensive merely because
> a source scan passes.
>
> ============================================================
> 12. LIVE OPENAI READINESS
> ============================================================
>
> Inspect the existing live adapter and configuration.
>
> Preserve:
>
> - Backend-only API credentials.
> - Configurable model setting.
> - Existing supported Responses API integration.
> - Structured output validation.
> - Bounded provider request timeout.
> - Daily live-run limits.
> - Safe provider error handling.
> - Explicit mock/live separation.
> - No silent mock fallback after live failures.
>
> Do not expose environment variable values.
>
> Do not print API keys or session secrets.
>
> Do not replace the configured model with an assumed model ID.
>
> Do not repeatedly probe the provider.
>
> Automated tests must remain mock-only.
>
> Once the application is stable and the automated checks pass,
> prepare a controlled live smoke test.
>
> Use synthetic data only.
>
> Use a single explicitly bounded live-provider test with the
> daily live-run limit set to 1.
>
> Do not conduct repeated probes.
>
> Do not run live calls during the automated test suite.
>
> If the provider configuration is missing, invalid, or cannot
> be verified safely, report the blocker rather than inventing
> a successful result.
>
> If a live test is attempted, report whether the real provider
> request actually succeeded.
>
> After the smoke test, restore IKEORU_AI_MODE=mock and verify
> the resulting local configuration without revealing secrets.
>
> Do not claim that live access works unless the actual request
> succeeds.
>
> ============================================================
> 13. TESTING AND REGRESSION VERIFICATION
> ============================================================
>
> Do not repeat previously successful checks without a reason.
>
> Because frontend files are changing, run the production build.
>
> Run the relevant backend tests after implementation changes.
>
> Verify that existing tests have not been removed or weakened.
>
> Use focused tests for any new logic or defects discovered.
>
> At minimum, verify:
>
> 1. Sales regression.
> 2. HR workflow behavior.
> 3. Input validation.
> 4. Structured result validation.
> 5. Human-review recommendation.
> 6. Persistence and ordered events.
> 7. Assessment and achievement eligibility.
> 8. Mock/live separation.
> 9. Idempotency.
> 10. Portfolio privacy and ownership.
> 11. Coming Soon enforcement.
> 12. Configuration safety.
>
> Run:
>
> - Relevant pytest tests.
> - Python compilation.
> - npm run build.
> - pip check.
> - git diff --check.
>
> Use the repository's existing commands and environment.
>
> If Windows/Python socket, TLS, or browser limitations prevent
> a check from completing, report the exact failure.
>
> Distinguish environmental failures from application defects.
>
> Do not report a test as passed unless it actually passed.
>
> ============================================================
> 14. BROWSER VERIFICATION
> ============================================================
>
> Determine whether the current environment provides a working
> browser-testing mechanism.
>
> If it does, use it to verify the actual application.
>
> Do not claim browser verification if only a frontend build
> or service-level tests were run.
>
> Verify:
>
> A. Dashboard opens.
> B. Both active paths are visible.
> C. Coming Soon cards do not launch unfinished workflows.
> D. Sales can complete its learner journey.
> E. HR can complete its learner journey.
> F. Validation and error states are understandable.
> G. Results and timelines render correctly.
> H. Assessments and achievements behave correctly.
> I. Portfolio views respect privacy.
> J. Refreshing the application does not lose persisted progress.
> K. The layout remains usable on narrower screens.
>
> If browser testing is unavailable, provide a short manual test
> checklist for the user and clearly state that the browser journey
> has not been verified.
>
> Do not spend excessive time fighting an environment limitation
> if the application itself is otherwise testable.
>
> ============================================================
> 15. DOCUMENTATION AND SUBMISSION READINESS
> ============================================================
>
> Review and update only what is necessary for consistency:
>
> - README.md.
> - PRODUCT_BRIEF.md.
> - CAPSTONE_SPEC.md.
> - AGENTS.md.
> - DEMO_SCRIPT.md.
> - MVP_SPEC.md.
> - DECISIONS_AND_EDGE_CASES.md.
> - plan.md.
>
> Ensure the documents consistently describe the two active
> learning paths and five Coming Soon domains.
>
> The README must contain the exact phrase:
>
> "Built with Codex"
>
> The demo script must explain:
>
> - The learner journey.
> - The difference between mock and live execution.
> - What happens if the provider is unavailable.
> - How to demonstrate Sales.
> - How to demonstrate HR.
> - Which features remain Coming Soon.
>
> Do not claim production deployment, live AI success, customer
> adoption, or browser verification unless confirmed.
>
> Keep the documentation concise and consistent.
>
> Do not rewrite every document unnecessarily.
>
> ============================================================
> 16. FINAL ACCEPTANCE CRITERIA
> ============================================================
>
> The work is ready for final review when:
>
> - The existing application has been preserved.
> - The dashboard looks noticeably more polished and professional.
> - The primary learner interface is less cluttered.
> - Navigation is consistent.
> - Sales and HR remain the only active paths.
> - Coming Soon paths remain unavailable.
> - Workflow functionality and business logic remain intact.
> - Mock/live status is accurate and unobtrusive.
> - Responsive layout has been checked to the extent possible.
> - The frontend production build passes.
> - Relevant backend tests pass.
> - Python compilation passes.
> - pip check passes.
> - git diff --check passes.
> - No secrets have been exposed.
> - No commit or push has occurred.
> - Remaining blockers are explicitly documented.
>
> ============================================================
> 17. FINAL REPORT
> ============================================================
>
> Provide a concise but complete report containing:
>
> 1. Initial Git status and existing changes preserved.
> 2. Files changed.
> 3. Visual and usability refinements completed.
> 4. Sales functionality verified.
> 5. HR functionality verified.
> 6. Automated test commands and exact results.
> 7. Frontend production build result.
> 8. Python compilation and dependency-check results.
> 9. Whether browser testing actually succeeded.
> 10. Whether a real OpenAI request was made and whether it succeeded.
> 11. Security findings and any unresolved risks, without secrets.
> 12. Remaining blockers.
> 13. Exact steps to start the backend and frontend.
> 14. Exact manual verification steps still required.
> 15. Whether the application is ready for a demo, a controlled live
>     test, or production deployment.
>
> Do not conflate these three states.
>
> A successful local demo does not automatically mean production-ready.
>
> Do not commit or push.
>
> Prioritize a polished, functional, honest, testable IkeOru MVP.
>
> Begin by auditing the current working tree and continue from the
> existing implementation.

---

### P012: Diagnose the browser session and CSRF failure

Date: 13/10/2026 14:26 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> PROJECT: IkeOru
> TASK: Diagnose and fix the local browser session/CSRF failure.
>
> CONTEXT
>
> The application starts successfully.
>
> The React/Vite frontend and FastAPI backend work.
> The dashboard renders.
> Sales and HR lesson and lab screens render.
> Coming Soon domains behave correctly.
>
> However, actual browser writes fail in both Chrome and a fresh
> in-app browser context with this message:
>
> "Refresh your demo session before trying again."
>
> The failure blocks end-to-end verification of workflow execution,
> assessment, achievements, portfolio, and persistence.
>
> Previous focused service tests passed, but a browser TestClient/API
> test stalled in the local Windows/Python environment.
>
> IMPORTANT:
> Do not assume this is merely a Windows environment problem.
> Investigate the actual session and CSRF flow before drawing conclusions.
>
> RESTRICTIONS
>
> - Inspect the current Git status and diff first.
> - Preserve all existing changes.
> - Do not rebuild or redesign the application.
> - Do not change business logic to bypass the failure.
> - Do not disable CSRF protection.
> - Do not weaken ownership or authorization checks.
> - Do not expose secrets or print environment variable values.
> - Keep IKEORU_AI_MODE=mock.
> - Do not make OpenAI API calls.
> - Do not commit or push.
> - Make the smallest safe correction.
>
> INVESTIGATION
>
> Trace the complete flow:
>
> 1. Demo-session creation.
> 2. Session cookie issuance and attributes.
> 3. Frontend handling of the session response.
> 4. Frontend storage and transmission of any CSRF token.
> 5. Cookie transmission on subsequent API requests.
> 6. Backend session lookup and expiration handling.
> 7. CSRF validation.
> 8. Origin and CORS checks.
> 9. Frontend API base URL and credentials configuration.
> 10. Any stale-session recovery or retry logic.
>
> Check whether the failure is caused by:
>
> - Missing or stale CSRF token.
> - Session cookie not being sent.
> - Incorrect cookie attributes or path.
> - Origin mismatch.
> - Frontend/backend URL mismatch.
> - A mismatch between the CSRF token returned and the token expected.
> - Session rotation or expiration.
> - Incorrect handling of 401, 403, or CSRF errors.
> - A local development configuration issue.
>
> Do not print session secrets, cookies, or tokens in logs.
>
> IMPLEMENTATION
>
> If a genuine defect is found, fix it narrowly.
>
> Ensure the frontend obtains a fresh demo session and then
> uses the correct session cookie and CSRF token for protected writes.
>
> Recovery should be explicit and safe.
>
> Do not automatically retry a non-idempotent write unless the
> request is protected by the existing idempotency mechanism.
>
> Do not silently bypass authorization or CSRF validation.
>
> TESTING
>
> Add or update focused tests for the actual defect.
>
> Where feasible, verify:
>
> - Demo-session creation.
> - A protected write with a valid session and CSRF token.
> - Rejection of a missing or invalid CSRF token.
> - Rejection of an invalid or expired session.
> - Correct frontend credential handling.
> - Safe stale-session recovery.
>
> Run the relevant tests and report the exact outcomes.
>
> If the Windows/Python HTTP test environment stalls, identify the
> precise failing step and distinguish an environment limitation
> from an application defect.
>
> Do not remove or weaken existing tests.
>
> FINAL REPORT
>
> Report:
>
> 1. Root cause, if established.
> 2. Files changed.
> 3. Fix implemented.
> 4. Tests run and exact results.
> 5. Whether a protected browser write succeeds.
> 6. Whether the full Sales and HR journeys can now be tested.
> 7. Remaining blockers.
>
> Do not claim success without evidence.
>
> Begin with diagnosis. Do not make unrelated changes.

---

### P013: Finish mock-mode assessment and persistence verification

Date: 13/10/2026 15:01 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> Continue the existing IkeOru project from its current state.
>
> The CSRF header-merging fix has been implemented, and browser
> verification has confirmed that protected Sales and HR workflow
> runs now succeed in MOCK mode.
>
> Do not rebuild or redesign the application.
>
> FIRST:
> 1. Inspect the current Git status and diff.
> 2. Preserve all existing changes.
> 3. Confirm the CSRF fix preserves both X-CSRF-Token and
>    Idempotency-Key.
> 4. Keep IKEORU_AI_MODE=mock.
>
> NEXT, complete the remaining verification:
>
> 1. Finish the Sales assessment and portfolio walkthrough.
> 2. Verify HR assessment progress and portfolio persistence.
> 3. Confirm refresh does not lose persisted progress.
> 4. Confirm mock runs cannot earn achievements requiring live runs.
> 5. Verify portfolio privacy and Coming Soon enforcement.
> 6. Run relevant backend tests, Python compilation, frontend build,
>    pip check, and git diff --check where needed.
>
> Do not weaken security or remove tests to obtain passing results.
> Do not print or expose secrets.
> Do not commit or push.
>
> After the mock-mode verification passes, STOP and report the results.
>
> Then prepare, but do not execute, one controlled live OpenAI
> smoke test using synthetic Sales data, with the daily live-run
> limit set to 1.
>
> Show me the exact proposed configuration changes and test procedure
> without revealing secret values. Ask for my explicit approval before
> switching to live mode or making any live API request.
>
> After I approve the live test, execute only that bounded test.
> If it fails, stop; do not retry or silently fall back to mock.
>
> Once the test is complete, restore IKEORU_AI_MODE=mock and verify
> that mock mode is active again.
>
> Do not claim anything was verified unless the relevant check
> actually succeeded.

---

### P014: Investigate Learner and Manager views

Date: 13/10/2026 15:30 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> PROJECT: IkeOru
> TASK: Investigate the missing Learner and Manager views.
>
> IMPORTANT:
> This is an investigation first. Do not immediately modify code.
>
> I previously had two distinct experiences in IkeOru:
>
> 1. LEARNER VIEW
>    For individuals completing lessons, practical workflows,
>    assessments, achievements, and portfolios.
>
> 2. MANAGER VIEW
>    For managers or organizations to monitor employees' learning
>    progress, completed learning paths, assessments, achievements,
>    and demonstrated capabilities.
>
> After the recent frontend polish, I can no longer find the
> Manager view in the interface.
>
> I need you to establish exactly what happened.
>
> STEP 1 — INSPECT THE CURRENT IMPLEMENTATION
>
> Inspect:
> - frontend/src/App.tsx
> - frontend/src/api.ts
> - frontend/src/types.ts
> - frontend/src/styles.css
> - backend/app/main.py
> - backend/app/services.py
> - backend/app/schemas.py
> - backend/app/catalog.py
> - README.md
> - MVP_SPEC.md
> - plan.md
> - DECISIONS_AND_EDGE_CASES.md
>
> Inspect other relevant files where necessary.
>
> STEP 2 — CHECK THE MANAGER FUNCTIONALITY
>
> Determine:
>
> 1. Whether the Manager frontend screen still exists.
> 2. Whether manager navigation or role selection was removed.
> 3. Whether the manager functionality is hidden behind a condition.
> 4. Whether an organization-progress backend endpoint still exists.
> 5. Whether the frontend still calls that endpoint.
> 6. Whether seeded demo employees or organization data exist.
> 7. Whether the manager view was intentionally excluded from the
>    final two-path MVP scope or accidentally lost during polishing.
> 8. Whether there are authorization and privacy safeguards for
>    manager access to employee progress.
>
> Do not infer the answers without inspecting the actual code.
>
> STEP 3 — REPORT THE FINDINGS
>
> Explain clearly:
> - What existed before.
> - What exists now.
> - What is missing, if anything.
> - Whether this is a navigation problem, a frontend regression,
>   a backend limitation, or an intentional scope decision.
>
> STEP 4 — RECOMMEND THE SMALLEST CORRECTION
>
> If the manager experience still exists, explain how to access it
> or restore its navigation.
>
> If it was accidentally removed, propose the smallest safe fix.
>
> If the backend exists but the frontend is missing, identify the
> minimum implementation needed to restore a usable manager view.
>
> Preserve the existing Sales and HR learner journeys.
>
> Do not rebuild the application.
> Do not implement additional workflows.
> Do not remove security or privacy protections.
> Do not expose private learner data.
> Do not commit or push.
>
> Do not change files until you have reported the findings and
> the proposed correction.

---

### P015: Restore Manager demo discoverability

Date: 13/10/2026 16:16 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> PROJECT: IkeOru
> TASK: Restore discoverability of the existing Manager demo.
>
> The investigation confirmed that ManagerScreen, manager navigation,
> the organization-progress endpoint, seeded demo data, and backend
> authorization already exist.
>
> The problem is that an existing learner session automatically
> restores the learner view and provides no accessible way to return
> to the role-selection screen.
>
> Implement the smallest safe correction.
>
> 1. Add a discreet, clearly labelled "Switch demo role" action
>    to the learner header or dashboard.
>
> 2. When selected, clear the current frontend session state and
>    return to the existing role-selection screen.
>
> 3. Let the user choose the existing "Start manager demo" action.
>
> 4. Use the existing backend session-creation mechanism to create
>    a fresh manager demo session.
>
> 5. Do not change the user's role solely in frontend state.
>
> 6. Preserve the existing ManagerScreen and organization-progress
>    API integration.
>
> 7. Preserve all Sales and HR workflows, persisted progress,
>    session protections, CSRF validation, and authorization.
>
> 8. Add or update focused tests to verify:
>    - learner-to-role-selection navigation;
>    - manager demo session creation;
>    - manager access to its authorized organization;
>    - learner sessions cannot access manager-only progress;
>    - the role-switching action does not expose private data.
>
> 9. Run the relevant tests and frontend production build.
>    Run git diff --check.
>
> 10. Inspect the final diff and report all changes.
>
> Do not rebuild the application.
> Do not add new product features.
> Do not weaken security.
> Do not expose secrets.
> Do not commit or push.
>
> Keep IKEORU_AI_MODE=mock.
>
> If the proposed UI action conflicts with the existing session
> lifecycle, stop and explain the conflict rather than bypassing
> the backend session mechanism.
>
> Proceed with this narrowly scoped correction.

---

### P016: Improve beginner onboarding and workflow usability

Date: 13/10/2026 17:51 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> PROJECT: IkeOru
> TAGLINE: Learn. Do. Prove.
>
> TASK: Final beginner onboarding and workflow usability improvements.
>
> OBJECTIVE
>
> Make IkeOru intuitive for first-time users while preserving the
> existing working application.
>
> We want a premium corporate structure combined with modern
> minimalist styling.
>
> The product should feel polished, professional, approachable,
> and easy to understand.
>
> Time is limited. Prioritize usability, functional correctness,
> and final verification over adding features.
>
> ==================================================
> 1. INSPECT BEFORE EDITING
> ==================================================
>
> Inspect the current Git status and diff.
>
> Preserve all existing changes.
>
> Review:
> - frontend/src/App.tsx
> - frontend/src/api.ts
> - frontend/src/types.ts
> - frontend/src/styles.css
> - relevant backend routes and services
> - README.md
> - MVP_SPEC.md
> - DEMO_SCRIPT.md
> - relevant tests
>
> The current application has:
> - Sales → Qualify a New Lead.
> - HR → Candidate Screening.
> - Learner workspace.
> - Manager workspace.
> - Switch demo role navigation.
> - Assessments, achievements, and portfolios.
> - Mock and live AI adapter architecture.
>
> Recent browser verification confirmed:
> - Sales and HR protected workflow runs succeed in mock mode.
> - Sales and HR assessment functionality works.
> - Progress persists across refreshes.
> - Manager demo navigation works.
> - Manager organization progress is displayed.
> - Coming Soon domains have no launch actions.
>
> Previously reported automated checks:
> - 14 configuration/core-service tests passed.
> - Python compilation passed.
> - pip check passed.
> - Frontend production build passed.
> - git diff --check passed.
>
> The Windows/Python 3.14 TestClient environment has stalled during
> some API tests. Do not claim those tests passed unless they actually
> complete successfully.
>
> ==================================================
> 2. ADD A BEGINNER-FRIENDLY ONBOARDING EXPERIENCE
> ==================================================
>
> Create a concise, professional onboarding experience that explains
> how to use IkeOru without overwhelming the user.
>
> The onboarding should explain:
>
> 1. What IkeOru does.
> 2. The difference between Learner and Manager.
> 3. How to navigate the active learning paths.
> 4. What Learn → Do → Prove means.
> 5. How assessments and portfolios demonstrate capabilities.
>
> Use the actual application features and screens.
>
> Do not invent functionality.
>
> Provide:
>
> - A short welcome message.
> - A guided, step-by-step tour.
> - Next and Back controls where appropriate.
> - Skip and Finish controls.
> - A persistent Help & tour entry point.
> - The ability to replay the tour.
> - Clear explanations of the current screen.
> - A way to exit without losing persisted progress.
>
> Keep the tour short enough to complete in approximately
> 60–90 seconds.
>
> Use a lightweight implementation compatible with the existing
> frontend. Avoid adding dependencies unless necessary.
>
> Do not make onboarding mandatory every time a user visits.
>
> Do not block access to the dashboard if onboarding is dismissed.
>
> The tour must not interfere with form submissions, CSRF handling,
> idempotency, session creation, workflow execution, or navigation.
>
> If a fully interactive overlay would require excessive complexity,
> implement a simpler guided tour using the existing interface.
>
> ==================================================
> 3. PRESERVE LEARNER AND MANAGER EXPERIENCES
> ==================================================
>
> Keep the existing Learner and Manager workspaces.
>
> Preserve the "Switch demo role" action.
>
> Ensure the role-switching flow uses the existing server-backed
> demo-session mechanism.
>
> Do not grant manager access by changing frontend state alone.
>
> Do not expose manager-only information to learners.
>
> The Manager view should continue displaying only permitted
> organization progress and capability summaries.
>
> Do not rebuild the Manager dashboard.
>
> ==================================================
> 4. SIMPLIFY THE LEARNER MENTAL MODEL
> ==================================================
>
> Use one consistent model throughout Sales and HR:
>
> LEARN:
> Understand the task and relevant business concepts.
>
> DO:
> Practise and execute the workflow.
>
> PROVE:
> Complete the assessment and demonstrate the skill.
>
> The same structure should apply to both active learning paths.
>
> Use clear headings and concise instructions.
>
> Make the learner's next action obvious at every stage.
>
> Avoid showing several competing primary buttons.
>
> Do not add extra workflows.
>
> ==================================================
> 5. SIMPLIFY THE SALES RESULT SCREEN
> ==================================================
>
> The current result screen exposes several elements simultaneously:
> classification, execution status, approved internal action,
> evidence, missing information, suggested next step, and a detailed
> activity timeline.
>
> Preserve all underlying data and business logic, but improve
> the information hierarchy.
>
> Prioritize:
>
> 1. Clear result heading.
> 2. Plain-language explanation.
> 3. Supporting information.
> 4. Missing or uncertain information.
> 5. Recommended next action.
> 6. Optional detailed evidence and activity history.
>
> Use progressive disclosure for secondary details.
>
> For example, detailed evidence and ordered activity history
> may be placed in expandable sections if appropriate.
>
> Use clear language suitable for beginners.
>
> Preserve the meaning of the existing classification and business
> rules.
>
> Do not turn an approved internal action into an unapproved
> recommendation or change any business policy.
>
> Keep MOCK, LIVE, and REPLAY indicators accurate, visible,
> and unobtrusive.
>
> Never label mock output as live.
>
> ==================================================
> 6. SIMPLIFY THE HR RESULT SCREEN
> ==================================================
>
> Prioritize:
>
> - Screening summary.
> - Supporting job-related evidence.
> - Missing or uncertain information.
> - Recommended next step.
> - Explicit human-review requirement.
>
> Keep detailed evidence and event history accessible without
> overwhelming the initial result screen.
>
> Preserve synthetic-data restrictions.
>
> Do not infer protected characteristics.
>
> Do not invent qualifications.
>
> Do not autonomously reject candidates or make hiring decisions.
>
> Human review must remain mandatory.
>
> Do not change backend HR policy or structured result contracts
> just to simplify the frontend.
>
> ==================================================
> 7. ACCESSIBILITY AND RESPONSIVE BEHAVIOUR
> ==================================================
>
> Ensure:
>
> - Buttons and controls have clear labels.
> - Keyboard navigation is usable.
> - Focus indicators are visible.
> - Tour dialogs can be dismissed.
> - Text contrast remains sufficient.
> - Reduced-motion preferences are respected.
> - Layouts remain usable on narrower screens.
>
> Avoid unnecessary animations and visual effects.
>
> ==================================================
> 8. REGRESSION AND SECURITY REQUIREMENTS
> ==================================================
>
> Preserve:
>
> - CSRF validation.
> - Idempotency.
> - Session handling.
> - Ownership and authorization.
> - Server-side assessment grading.
> - Backend-enforced achievement eligibility.
> - Portfolio privacy.
> - Progress persistence.
> - Ordered event persistence.
> - Mock/live separation.
> - Coming Soon enforcement.
>
> Do not weaken or remove tests.
>
> Do not print or expose secrets.
>
> Keep backend/.env ignored and untracked.
>
> Keep IKEORU_AI_MODE=mock.
>
> Do not make live OpenAI calls during implementation or testing.
>
> Do not commit or push.
>
> ==================================================
> 9. TESTING
> ==================================================
>
> Run relevant tests after changes.
>
> At minimum, verify:
>
> - Onboarding can be opened, skipped, completed, and replayed.
> - Dismissing the tour does not break navigation.
> - Learner and Manager navigation still works.
> - Sales and HR forms still function.
> - Result screens display the correct data.
> - CSRF and idempotency headers remain intact.
> - Portfolio and assessment functionality remains intact.
> - Coming Soon paths remain unavailable.
>
> Run:
>
> - Relevant pytest tests.
> - Python compilation if backend code changes.
> - npm run build.
> - pip check if dependencies change.
> - git diff --check.
>
> Do not repeat checks unnecessarily if no relevant files changed.
>
> If browser verification is available, test the actual user journey.
>
> If an environment limitation prevents a check, report the exact
> failure and distinguish it from an application defect.
>
> ==================================================
> 10. FINAL REPORT
> ==================================================
>
> Report:
>
> 1. Files changed.
> 2. Onboarding functionality implemented.
> 3. Sales result-screen improvements.
> 4. HR result-screen improvements.
> 5. Learner and Manager functionality preserved.
> 6. Exact test commands and results.
> 7. Whether browser verification succeeded.
> 8. Remaining blockers.
> 9. Whether the application is ready for a demo or a controlled
>    live-provider test.
>
> Do not claim production readiness without evidence.
>
> Do not commit or push.
>
> Prioritize a simple, understandable, reliable IkeOru MVP.
>
> Begin by inspecting the current working tree.

---

### P017: Align documentation with the educational philosophy

Date: 13/10/2026 18:46 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> TASK: ALIGN IKEORU DOCUMENTATION WITH ITS EDUCATIONAL PHILOSOPHY
>
> Before implementing the new Academy improvements, update the project
> documentation so that it accurately captures the product vision,
> educational requirements, assessment standards, and implementation
> priorities.
>
> PRODUCT PHILOSOPHY
>
> IkeOru is an AI-powered practical learning platform designed to help
> people understand workplace processes, apply their knowledge through
> practical work, and demonstrate their capabilities through meaningful
> assessments.
>
> Its core learning model is:
>
> LEARN → DO → PROVE
>
> The Academy is the foundation of the product.
>
> Learners must understand a concept before being expected to apply it.
> They must have opportunities to practise before being assessed.
> Assessments must evaluate what they have learned and what they can
> actually do.
>
> The objective is not merely to help learners execute workflows.
> It is to help them develop knowledge, practical ability, and
> demonstrable workplace competence.
>
> DOCUMENTATION TO INSPECT
>
> Inspect the existing:
> - MVP_SPEC.md
> - PRODUCT_BRIEF.md
> - plan.md
> - DECISIONS_AND_EDGE_CASES.md
> - AGENTS.md
> - README.md
> - CAPSTONE_SPEC.md
> - DEMO_SCRIPT.md
>
> Do not assume these documents are identical to their previously
> reported versions. Read their current contents before editing.
>
> DOCUMENTATION REQUIREMENTS
>
> 1. MVP_SPEC.md
>
> Document the educational requirements for Learn, Do, and Prove.
>
> Learn must cover structured teaching, foundational concepts,
> definitions, business context, worked examples, common mistakes,
> knowledge checks, and explicit learning objectives.
>
> Do must cover guided demonstrations, supported practice, progressively
> independent exercises, realistic scenarios, and explanations connecting
> theory to actual workflow behaviour.
>
> Prove must assess theoretical understanding and practical application
> against explicit learning objectives and meaningful passing criteria.
>
> Document the distinctions between lesson completion, practical
> completion, assessment passed, demonstrated competence, and achievement
> awarded.
>
> 2. PRODUCT_BRIEF.md
>
> Clearly establish that IkeOru is an academy-first practical learning
> platform, not simply a workflow execution tool.
>
> Explain how Learn, Do, and Prove work together to develop workplace
> capabilities.
>
> Describe portfolio, badges, progress tracking, and organisational
> reporting as supporting capabilities rather than substitutes for
> learning and assessment.
>
> 3. plan.md
>
> Identify the remaining implementation work required to deliver the
> deeper Academy experience for the existing Sales and HR learning paths.
>
> Separate documented requirements from implemented and verified
> functionality.
>
> Do not mark incomplete work as complete.
>
> 4. DECISIONS_AND_EDGE_CASES.md
>
> Document the relevant rules for:
> - Lesson completion and progression.
> - Practical completion.
> - Assessment passing and feedback.
> - Assessment retries, where supported.
> - Competence claims.
> - Badge eligibility.
> - Mock, replay, and live execution.
> - Handling incomplete or uncertain practical outcomes.
>
> Preserve existing security, privacy, and achievement safeguards.
>
> 5. AGENTS.md
>
> Add concise, actionable instructions requiring future contributors to:
> - Preserve the Academy-first educational philosophy.
> - Align teaching, practice, and assessment.
> - Avoid shallow lessons that jump directly to workflow execution.
> - Avoid claiming competence without appropriate assessment.
> - Keep documentation aligned with the actual implementation.
> - Preserve the current MVP scope and safety restrictions.
>
> 6. README.md
>
> Explain the learning model concisely and accurately.
>
> 7. CAPSTONE_SPEC.md and DEMO_SCRIPT.md
>
> Review both documents for alignment.
>
> Update only where needed. The eventual demo should demonstrate genuine
> learning, practical application, and assessment rather than only a
> successful workflow execution.
>
> ACTIVE MVP SCOPE
>
> Only two learning paths are active:
>
> 1. Sales — Qualify a New Lead.
> 2. HR — Candidate Screening.
>
> Lead generation is not an active workflow. It may be explained as a
> concept when teaching the distinction between lead generation and
> lead qualification, but it must not be implemented or presented as
> an available practical workflow.
>
> Other domains and unfinished workflows remain Coming Soon.
>
> HR must continue using synthetic candidate data, explicit job-related
> criteria, evidence-based review, and mandatory human review. Do not
> introduce autonomous hiring or rejection decisions.
>
> IMPLEMENTATION CONSTRAINTS
>
> - Preserve the current architecture.
> - Do not rebuild the application.
> - Do not add unnecessary dependencies.
> - Do not introduce unrelated features.
> - Do not change the active MVP scope.
> - Do not make live OpenAI calls.
> - Keep IKEORU_AI_MODE=mock.
> - Do not commit or push changes.
>
> WORK PROCESS
>
> First inspect the current documentation and identify conflicts,
> gaps, and authoritative sources.
>
> Then update the relevant Markdown files with consistent terminology
> and clear requirements.
>
> Do not duplicate the same detailed specification across every file.
> Use the MVP specification for authoritative requirements, the product
> brief for product philosophy, the decisions document for behavioural
> rules, and the plan for implementation work.
>
> After editing, check for contradictions across the documents.
>
> Run git diff --check.
>
> Finally, report:
> - Files changed.
> - Key requirements added.
> - Decisions documented.
> - Any unresolved contradictions or ambiguities.
> - Any implementation work that remains.
>
> Do not begin the Academy implementation in this task.

---

### P018: Implement the Academy-first learning experience

Date: 13/10/2026 18:53 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> TASK: IMPLEMENT IKEORU'S ACADEMY-FIRST LEARN → DO → PROVE EXPERIENCE
>
> The documentation alignment phase is complete.
>
> Now implement the educational improvements specified in the updated
> MVP_SPEC.md, PRODUCT_BRIEF.md, plan.md, DECISIONS_AND_EDGE_CASES.md,
> and AGENTS.md.
>
> The Academy is the foundation of IkeOru.
>
> Our objective is not to add a brief introduction before an AI workflow.
> Our objective is to build a serious, structured learning experience
> that develops knowledge, practical ability, and demonstrable competence.
>
> CORE PRINCIPLE
>
> Understand before you do.
> Learn before you practise.
> Practise before you prove.
>
> A successful workflow execution does not, by itself, establish mastery.
>
> ========================================================
> 1. INSPECT BEFORE IMPLEMENTING
> ========================================================
>
> Inspect the current application and identify:
>
> - How learning paths and lessons are represented.
> - How the existing Learn, Do, and Prove stages work.
> - How lesson content is rendered.
> - How lesson progression and completion are recorded.
> - How practical exercises work.
> - How theoretical and practical assessments are implemented.
> - How assessments are graded.
> - How badges and other achievements are awarded.
> - How progress is persisted.
> - Which tests currently cover these behaviours.
>
> Read the updated project documentation.
>
> Use the documentation as the source of truth. Do not reintroduce
> requirements or behaviours that conflict with it.
>
> Preserve existing functionality that is already correct.
>
> After this inspection, prepare a brief internal implementation plan
> and proceed with the implementation. Do not stop after producing
> a plan or ask for another approval unless you encounter a genuinely
> blocking issue.
>
> ========================================================
> 2. LEARN — BUILD A SUBSTANTIAL ACADEMY
> ========================================================
>
> This is the highest educational priority.
>
> The current learning experience has been identified as too shallow.
> Address this directly.
>
> A beginner should be able to enter either active learning path,
> learn the foundations of the subject, understand the relevant
> business process, and build the knowledge necessary to perform
> the task confidently.
>
> Do not assume the learner already understands business automation,
> AI workflows, or the terminology used in the lessons.
>
> For each active learning path, create a structured curriculum that
> contains:
>
> A. Orientation
>
> Explain the business task, its purpose, why it matters, the problem
> it solves, and the capabilities learners should develop.
>
> Explain what the learner will learn, practise, and eventually
> demonstrate.
>
> B. Foundational concepts
>
> Teach the important terminology, principles, business context,
> decision-making criteria, and relationships between concepts.
>
> Introduce concepts in a logical learning sequence.
>
> For each important concept, explain:
> - What it means.
> - Why it matters.
> - How it works.
> - When it applies.
> - A realistic example.
> - Common mistakes.
> - How to recognise correct and incorrect application.
>
> C. Detailed conceptual teaching
>
> Go beyond definitions.
>
> Explain the reasoning behind the business process and how its
> different components work together.
>
> Teach the limitations of the process, relevant exceptions, uncertainty,
> and the consequences of poor decisions.
>
> Where AI is used, explain what it contributes, what it cannot
> reliably establish, and when human judgement is necessary.
>
> D. Worked examples
>
> Provide realistic examples with enough detail for the learner to
> follow the reasoning.
>
> Show the scenario, available evidence, relevant criteria, decision
> process, result, and explanation.
>
> Where appropriate, compare a correct decision with a poor decision
> and a case in which more information is required.
>
> E. Embedded knowledge checks
>
> Add knowledge checks at appropriate points in the learning sequence.
>
> Test understanding, not just memorisation.
>
> Include terminology, conceptual reasoning, scenario interpretation,
> application of criteria, recognition of errors, and handling of
> uncertain situations.
>
> Where supported by the existing architecture, provide explanatory
> feedback that identifies why an answer is correct or incorrect.
>
> F. Explicit learning outcomes
>
> Every lesson or lesson group must have clear learning objectives.
>
> The objectives must describe what a learner should be able to explain,
> identify, analyse, or perform.
>
> Use these objectives to guide the practical exercises and assessments.
>
> G. Lesson progression
>
> Organise the material into manageable, ordered sections.
>
> Avoid placing the entire curriculum on one enormous screen.
>
> Avoid reducing the curriculum to shallow cards, one-sentence
> descriptions, or isolated terminology lists.
>
> Learners should know where they are, what they are learning, and
> how the current lesson relates to the broader subject.
>
> Where the architecture supports it, preserve progress so that
> learners can return to their learning.
>
> The result must be a substantial Academy experience, not a collection
> of short introductions attached to workflow execution.
>
> ========================================================
> 3. SALES CURRICULUM — QUALIFY A NEW LEAD
> ========================================================
>
> The active Sales workflow is lead qualification.
>
> Lead generation is not an active workflow and must remain outside
> the implemented practical scope.
>
> Teach lead qualification from first principles.
>
> The curriculum should cover, in an appropriate sequence:
>
> 1. Introduction to the sales process.
> 2. What a lead is.
> 3. The difference between a lead, a prospect, and a customer.
> 4. Lead generation versus lead qualification.
> 5. Why lead qualification matters to a business.
> 6. The information used to assess a lead.
> 7. Relevant qualification criteria and business rules.
> 8. Distinguishing evidence from assumptions.
> 9. How qualification decisions are made.
> 10. The meaning of HOT, WARM, COLD, and NEEDS_REVIEW.
> 11. Missing, conflicting, and insufficient information.
> 12. How qualification outcomes inform next steps.
> 13. Common qualification mistakes.
> 14. AI's role and limitations in lead qualification.
> 15. Human review, uncertainty, and responsible decision-making.
> 16. Worked business examples.
> 17. Knowledge checks and scenario-based learning.
>
> Explain the business reasoning behind the existing qualification
> workflow.
>
> Use synthetic examples and realistic business situations.
>
> The learner must understand why a particular result is justified,
> what evidence supports it, and when the correct action is to request
> more information or conduct a review.
>
> Teaching lead generation as a concept is permitted because it helps
> explain the sales process. Do not create a lead-generation workflow.
>
> Do not teach rules, outputs, or behaviour that contradict the actual
> Sales implementation.
>
> ========================================================
> 4. HR CURRICULUM — CANDIDATE SCREENING
> ========================================================
>
> Teach candidate screening from first principles.
>
> The curriculum should cover, in an appropriate sequence:
>
> 1. The purpose of candidate screening.
> 2. The relationship between a job description and screening criteria.
> 3. Essential versus preferred requirements.
> 4. Evidence-based assessment against explicit, job-related criteria.
> 5. Distinguishing evidence from assumptions.
> 6. Missing or ambiguous candidate information.
> 7. Consistent application of criteria.
> 8. The role and limitations of AI.
> 9. Errors, uncertainty, and risks in AI-assisted recruitment.
> 10. Protected-characteristic safeguards.
> 11. Mandatory human review.
> 12. Documentation and explanation of screening outcomes.
> 13. Common screening mistakes.
> 14. Worked candidate-screening examples.
> 15. Knowledge checks and scenario-based learning.
>
> Use synthetic candidate information and explicit, job-related criteria.
>
> Never introduce autonomous hiring or rejection decisions.
>
> Do not infer candidate suitability from protected characteristics.
>
> Human review must remain mandatory.
>
> Ensure all explanations accurately reflect the existing HR implementation.
>
> ========================================================
> 5. DO — TURN LEARNING INTO PRACTICAL ABILITY
> ========================================================
>
> The practical stage must build directly on the Academy.
>
> A learner should encounter concepts in the Academy before being
> expected to apply them in an exercise.
>
> Strengthen the existing practical experience with a progression
> appropriate to the current application architecture:
>
> 1. Demonstration: show how an experienced practitioner approaches
>    the business task.
> 2. Guided practice: help the learner apply the relevant concepts.
> 3. Workflow walkthrough: explain the meaning and purpose of the
>    implemented steps.
> 4. Supported exercise: let the learner practise with guidance.
> 5. Independent exercise: ask the learner to apply the concepts.
> 6. Scenario challenge: introduce a realistic variation or complication.
> 7. Result review: help the learner explain and evaluate the outcome.
>
> The practical stage should teach the relationship between the theory
> and the workflow.
>
> Where applicable, make the trigger, inputs, business rules, AI
> evaluation, action, output, exceptions, and human-review requirements
> understandable to the learner.
>
> The learner should understand not only what happened, but why.
>
> Do not make the stage a sequence of buttons that run a workflow
> without explaining the decisions involved.
>
> Preserve existing mock, replay, and live execution distinctions.
> A simulated run must never be represented as a live provider request.
>
> Do not implement additional business workflows.
>
> ========================================================
> 6. PROVE — ASSESS THEORY AND PRACTICE
> ========================================================
>
> The Prove stage must establish whether the learner has met the defined
> learning objectives.
>
> Assessments must reflect both the Academy and the practical work.
>
> THEORETICAL EVALUATION
>
> Include suitable questions that test:
> - Fundamental concepts and terminology.
> - Understanding of the business process.
> - Explanation of why decisions are made.
> - Application of business rules.
> - Interpretation of evidence.
> - Analysis of unfamiliar but relevant scenarios.
> - Recognition of errors and limitations.
> - Handling of uncertainty and exceptions.
> - Appropriate use of AI and human review.
>
> Do not rely exclusively on simple definition-recall questions.
>
> PRACTICAL EVALUATION
>
> Use the existing practical implementation to assess appropriate
> capabilities, including relevant inputs, criteria, evidence
> interpretation, decision justification, handling of missing
> information, and understanding of outputs.
>
> Only claim to evaluate behaviours the application genuinely tests.
>
> ASSESSMENT DESIGN
>
> Map assessment questions and exercises to the learning objectives.
>
> Use meaningful passing criteria consistent with the documented
> requirements.
>
> Feedback should help learners understand why they were unsuccessful
> and which concepts or practical capabilities require further work.
>
> Where supported by the application, connect assessment feedback
> to the relevant lessons so that learners can revisit them.
>
> Keep theoretical and practical performance distinguishable where
> needed, so that success in one area does not conceal a gap in another.
>
> Ensure completion requirements are enforced by the appropriate
> existing server-side mechanisms where applicable.
>
> Do not rely solely on hiding or disabling frontend controls to enforce
> completion, eligibility, or achievement requirements.
>
> Preserve existing authorization, ownership, CSRF, and other security
> safeguards.
>
> Do not award badges for simply clicking through lessons or completing
> a mock run when the documented achievement criteria have not been met.
>
> Implement only assessment behaviours that can be supported correctly
> by the current architecture. If a material gap requires a structural
> change, explain it and make the smallest justified change.
>
> ========================================================
> 7. MAKE LEARNING, PRACTICE, AND ASSESSMENT CONNECT
> ========================================================
>
> Treat each path as one coherent educational journey.
>
> The learning objectives should guide the curriculum.
>
> The curriculum should prepare the learner for the practical exercises.
>
> The practical exercises should prepare the learner for the assessments.
>
> The assessments should evaluate the objectives established by the
> curriculum.
>
> There should be no unexplained jump from theory to practice and no
> assessment that tests something important that was never taught.
>
> The learner should understand:
> - What they are learning.
> - Why it matters.
> - What they have practised.
> - What they have demonstrated.
> - What remains to be completed.
> - What a badge or completion state actually represents.
>
> Portfolio, achievements, progress tracking, and organisational
> reporting should support this learning journey, not replace it.
>
> ========================================================
> 8. IMPLEMENTATION AND SCOPE CONSTRAINTS
> ========================================================
>
> - Preserve the existing architecture unless a change is justified.
> - Keep exactly two active learning paths: Sales and HR.
> - Do not activate Coming Soon domains or workflows.
> - Preserve HR's synthetic-data and human-review safeguards.
> - Preserve progress and portfolio persistence.
> - Preserve privacy and ownership restrictions.
> - Preserve mock/live/replay integrity.
> - Do not add unnecessary dependencies.
> - Do not redesign unrelated parts of the application.
> - Do not make live OpenAI requests during implementation.
> - Keep IKEORU_AI_MODE=mock.
> - Do not print, expose, or request secret values.
> - Do not commit or push changes.
> - Update plan.md as real implementation milestones are completed.
>
> Prioritise a complete, coherent educational journey for the two
> existing paths over superficial changes across the entire application.
>
> ========================================================
> 9. VERIFICATION
> ========================================================
>
> Add or update focused tests for the behaviours changed, particularly:
>
> - Lesson progression and persistence.
> - Knowledge-check behaviour, where applicable.
> - Assessment grading and objective alignment.
> - Practical completion.
> - Completion eligibility.
> - Badge and achievement safeguards.
> - HR review requirements.
> - Mock/replay restrictions.
>
> Run the relevant backend tests and the frontend build.
>
> Run git diff --check.
>
> Use browser verification if available to inspect the actual learner
> experience from lesson entry through practical work and assessment.
>
> Check that educational content is legible and properly organised,
> and that progression states accurately reflect what the learner
> has completed.
>
> Do not claim a test passed if it was not run successfully.
> Report environment-related test stalls separately from assertion
> failures.
>
> At completion, report:
>
> 1. What changed in Learn.
> 2. What changed in Do.
> 3. What changed in Prove.
> 4. How the three stages connect.
> 5. How completion and badges are governed.
> 6. Files changed.
> 7. Tests and builds run, with actual results.
> 8. Anything that remains incomplete.
> 9. Any important architectural limitation preventing a requirement
>    from being implemented correctly.
>
> Do not stop at documentation or a plan. Implement and verify the
> educational improvements.

---

### P019: Complete independent practice and verify the Academy

Date: 13/10/2026 19:17 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> TASK: COMPLETE IKEORU'S PRACTICAL LEARNING JOURNEY AND VERIFY THE ACADEMY
>
> The Academy-first Learn → Do → Prove improvements have been implemented.
>
> The remaining documented work includes progressively independent
> exercises and a browser walkthrough of the multi-section Academy.
>
> Before making changes, inspect the current implementation, recent diff,
> updated documentation, and test coverage.
>
> Do not rebuild existing functionality that is already working.
>
> PRIORITY 1: PROGRESSIVELY INDEPENDENT EXERCISES
>
> Complete the practical-learning progression for both active paths:
>
> 1. Sales — Qualify a New Lead.
> 2. HR — Candidate Screening.
>
> The practical experience should progress from:
> - Worked demonstration.
> - Guided practice.
> - Supported exercise.
> - Independent scenario.
> - Review and explanation of the learner's decisions.
>
> The independent exercise must require the learner to make meaningful
> decisions using the concepts taught in the Academy.
>
> It must not merely ask the learner to click a button that runs the
> existing workflow.
>
> Where supported by the current implementation, require the learner to
> interpret available information, apply the relevant criteria, recognise
> missing information, and select or justify an appropriate outcome.
>
> Provide feedback that explains the reasoning behind the expected
> outcome and helps the learner understand any mistakes.
>
> Connect feedback to the concepts taught in the Academy wherever
> practical.
>
> Use the smallest justified architectural changes. Inspect existing
> schemas, APIs, persistence, and assessment mechanisms before deciding
> how independent exercises should be represented or evaluated.
>
> Do not create a new workflow engine or introduce unnecessary
> dependencies.
>
> Keep grading or validation server-authoritative wherever required by
> the existing architecture and documented safeguards.
>
> Persist progress consistently with the current learning model.
>
> SALES REQUIREMENTS
>
> Use realistic synthetic lead scenarios and the existing qualification
> policy.
>
> Require learners to apply evidence and criteria rather than guess
> a classification.
>
> Include situations involving insufficient, conflicting, or missing
> information where appropriate.
>
> The outcomes must align with the implemented HOT, WARM, COLD, and
> NEEDS_REVIEW rules.
>
> Do not create a lead-generation workflow.
>
> HR REQUIREMENTS
>
> Use synthetic candidate information and explicit job-related criteria.
>
> Require learners to interpret evidence against those criteria and
> recognise when information is insufficient or ambiguous.
>
> Preserve mandatory human review.
>
> Do not introduce autonomous hiring or rejection decisions or infer
> candidate suitability from protected characteristics.
>
> PRIORITY 2: ASSESSMENT ALIGNMENT
>
> Verify that the assessment evaluates the objectives taught in the
> Academy and the capabilities exercised in practical work.
>
> Do not assume that a theory/practical score breakdown alone proves
> that the assessment is sufficiently rigorous.
>
> Review the actual questions, practical requirements, scoring rules,
> passing criteria, and feedback.
>
> Make focused corrections where there are demonstrable gaps.
>
> Preserve server-side grading and existing assessment and achievement
> safeguards.
>
> PRIORITY 3: DATABASE AND PROGRESS SAFETY
>
> Review the new SQLite migration and persisted Academy progress.
>
> Verify, through tests where possible, that:
> - An existing database can be upgraded safely.
> - New installations initialise correctly.
> - Learning progress persists across application restarts.
> - Knowledge-check validation remains server-side.
> - Progress and assessment data remain correctly scoped to the user.
> - Existing data is not unintentionally lost.
> - Repeated requests do not incorrectly duplicate progress or results.
>
> Do not reset the user's database to make the tests pass.
>
> PRIORITY 4: BROWSER VERIFICATION
>
> Attempt the browser walkthrough after the implementation and tests.
>
> Previously, local server startup failed with a socket-permission error.
>
> Investigate whether this is an environment restriction or an application
> problem. Check for an existing development server before starting
> another one.
>
> Use the normal project startup procedure and an available permitted port
> if the environment allows it.
>
> Do not weaken application security or make unrelated changes merely to
> work around an environment restriction.
>
> If browser verification remains blocked, report the exact limitation
> and provide a concise manual verification checklist for the developer.
> Do not claim that browser verification passed.
>
> When browser access is available, verify the complete learner journey:
>
> 1. Open each active learning path.
> 2. Navigate through the ordered Academy sections.
> 3. Review objectives, explanations, worked examples, and knowledge checks.
> 4. Confirm knowledge-check feedback is meaningful.
> 5. Confirm progress persists when returning to lessons.
> 6. Complete guided practice.
> 7. Attempt an independent exercise without following the demonstration.
> 8. Review the resulting feedback.
> 9. Complete the assessment and inspect its theory/practical results.
> 10. Verify the completion state and badge eligibility.
> 11. Confirm the HR human-review safeguards remain visible and enforced.
> 12. Confirm Coming Soon workflows remain unavailable.
>
> Check that the interface is readable and responsive.
>
> VERIFICATION
>
> Keep IKEORU_AI_MODE=mock.
>
> Do not make live OpenAI requests.
>
> Run relevant focused backend tests, compile checks, dependency checks,
> the frontend build, and git diff --check.
>
> Attempt the broader test suite if feasible, but report any environment
> stalls separately from actual test failures.
>
> Do not claim any check passed unless it ran successfully.
>
> SCOPE AND SAFETY
>
> - Keep exactly two active learning paths.
> - Preserve privacy and authorization safeguards.
> - Preserve mock/live/replay integrity.
> - Do not expose secrets.
> - Do not commit or push.
> - Update plan.md to reflect actual completion status.
> - Preserve unrelated working-tree changes.
>
> FINAL REPORT
>
> Summarise:
> - The independent exercises implemented.
> - How learners must apply their knowledge.
> - How the practical work aligns with the Academy and assessment.
> - Database migration and persistence verification.
> - Tests and build results.
> - Browser verification results or the exact remaining blocker.
> - Outstanding work.
>
> Prioritise educational substance and verified behaviour over visual
> changes or additional features.

---

### P020: Attachment reference for final mock-mode verification

Date: 13/10/2026 20:06 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Faithful summary of an attachment-reference message.

The user supplied a pasted-text attachment titled "TASK: FINAL MOCK-MODE VERIFICATION OF IKEORU ACADEMY" and instructed that it contained the request. The chat tool did not return this attachment's contents. The next user message, P021, supplies the full request text on the same topic. The local attachment path is omitted; the attachment's exact contents have not been independently compared with P021.

---

### P021: Perform final mock-mode Academy verification

Date: 13/10/2026 20:07 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> TASK: FINAL MOCK-MODE VERIFICATION OF IKEORU ACADEMY
>
> The Academy-first Learn → Do → Prove implementation and independent
> exercises are in place.
>
> Do not add new product features or redesign the application in this task.
>
> The priority is to verify the existing implementation, investigate
> the outstanding environment limitations, and fix genuine defects if
> found.
>
> Read the latest changes and documentation before beginning.
>
> IMPORTANT CONSTRAINTS
>
> - Keep IKEORU_AI_MODE=mock.
> - Do not make any live OpenAI requests.
> - Do not expose secrets.
> - Do not commit or push.
> - Preserve existing and unrelated working-tree changes.
> - Do not reset or overwrite the user's existing database.
> - Use an isolated test database for persistence experiments.
> - Do not claim successful verification unless it actually occurred.
>
> 1. VERIFY THE COMPLETE LEARNER JOURNEY
>
> Inspect the existing application and verify, through browser testing
> if possible, both active learning paths:
>
> Sales — Qualify a New Lead.
> HR — Candidate Screening.
>
> For each path, verify:
>
> A. LEARN
> - Ordered Academy sections load correctly.
> - Learning objectives, explanations, examples, and knowledge checks
>   are displayed correctly.
> - Knowledge checks reject incorrect answers where appropriate and
>   return meaningful feedback.
> - Section progression and lesson completion follow the documented rules.
> - Progress persists when the learner returns to the Academy.
>
> B. DO
> - Guided practice works.
> - The independent exercise is available at the correct stage.
> - Independent exercises require meaningful learner decisions.
> - The server validates submissions and generates appropriate feedback.
> - Attempt history and progress persist correctly.
> - Sales outcomes match the implemented qualification policy.
> - HR preserves evidence-based review and mandatory human oversight.
>
> C. PROVE
> - The assessment covers the documented learning objectives.
> - Theoretical and practical results are calculated correctly.
> - Feedback identifies relevant knowledge gaps.
> - Independent-exercise prerequisites are enforced.
> - Completion and badge eligibility follow server-side rules.
> - Mock and replay runs cannot satisfy achievements that explicitly
>   require live execution.
>
> 2. INVESTIGATE THE WINDOWS SOCKET ERROR
>
> Browser verification has previously been blocked by Windows socket
> error 10013 when starting Uvicorn on port 18000.
>
> Investigate this before making application changes.
>
> First check whether a local server is already running.
>
> Test whether the environment permits binding to 127.0.0.1 using an
> ephemeral port. If it does, start the application on an available
> permitted port and attempt the browser walkthrough.
>
> Check frontend API configuration and the required development
> startup procedure before changing ports.
>
> Do not weaken security, change application behaviour unnecessarily,
> or repeatedly retry the same blocked port.
>
> If socket binding is prohibited by the environment, report that
> limitation clearly. Do not claim browser verification succeeded.
>
> 3. VERIFY PERSISTENCE ACROSS A COMPLETE RESTART
>
> Use an isolated temporary SQLite database.
>
> Start the application, create a test learner, and progress through
> the relevant Academy and independent-exercise operations.
>
> Stop the application completely and start it again against the same
> temporary database.
>
> Verify that the expected lesson progress, knowledge-check progress,
> independent-exercise attempts, and relevant assessment records remain
> available.
>
> Check migrations 002 and 003 against representative existing database
> states and fresh database initialisation.
>
> Do not migrate, reset, or overwrite the user's real working database
> as part of these experiments.
>
> Report exactly which persistence behaviours were verified.
>
> 4. INVESTIGATE THE HTTP/API TEST SUITE STALL
>
> The focused core-service tests pass, but tests/test_api.py stalls
> after collection in the local Windows/Python environment.
>
> Do not simply rerun the same command and report the same outcome.
>
> Use verbose execution or targeted test selection to identify the
> test or setup stage where execution stalls.
>
> Determine whether the cause appears to be:
> - Test-environment or Python-version incompatibility.
> - Application startup or shutdown behaviour.
> - Database initialisation or locking.
> - HTTP client or asynchronous event-loop behaviour.
> - A genuine application defect.
>
> Run relevant tests individually where practical.
>
> Do not classify a stalled test as passed. Do not make broad dependency
> or runtime changes without a clear technical justification.
>
> If the full suite remains blocked, document the smallest reproducible
> case and the next step required to resolve it.
>
> 5. RUN REGRESSION CHECKS
>
> Run:
>
> python -m pytest -q --basetemp .pytest-tmp-academy tests/test_configuration.py tests/test_core_services.py
>
> python -m compileall -q app tests
>
> python -m pip check
>
> npm run build
>
> git diff --check
>
> Run from the correct project directories.
>
> Report the actual result of each command.
>
> 6. FIX ONLY VERIFIED DEFECTS
>
> If verification reveals a genuine defect in the new Academy experience,
> make the smallest appropriate fix and add a focused regression test.
>
> Do not introduce new features, broaden the MVP, or rewrite working
> components merely to improve their appearance.
>
> Preserve the existing Sales and HR scope, security restrictions,
> privacy controls, assessment rules, and mock/live/replay distinctions.
>
> 7. FINAL REPORT
>
> Report:
>
> - Browser walkthrough: passed, failed, or blocked.
> - Persistence across full restart: verified behaviours and results.
> - HTTP/API suite: exact blocker or successful result.
> - Regression test and build results.
> - Any verified defects fixed.
> - Any outstanding issues requiring another environment or manual step.
>
> Clearly distinguish verified behaviour from behaviour inferred from
> code inspection.
>
> Do not initiate a live OpenAI request in this task.

---

### P022: Resolve the Python environment and run the application

Date: 13/10/2026 20:39 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> TASK: RESOLVE IKEORU'S LOCAL PYTHON ENVIRONMENT AND RUN THE APPLICATION
>
> We have not established that IkeOru has been tested successfully in a
> clean virtual environment using a different Python interpreter.
>
> The current Windows/Python 3.14.6 environment has exhibited these issues:
>
> - Focused backend service tests pass.
> - Some tests in tests/test_api.py stall when entering TestClient.
> - Even a minimal asyncio.run(asyncio.sleep(0)) operation stalled in
>   the reported environment.
> - Uvicorn did not become reachable in the browser.
> - Database initialisation and migration tests succeeded.
>
> Investigate the environment systematically and attempt to run the
> application successfully.
>
> IMPORTANT SAFETY REQUIREMENTS
>
> - Preserve all existing source-code changes.
> - Do not reset or overwrite the working database.
> - Do not modify application code unless a reproducible application
>   defect is identified.
> - Keep IKEORU_AI_MODE=mock.
> - Do not make live OpenAI requests.
> - Never print or expose secret values.
> - Do not commit or push changes.
>
> STEP 1: INSPECT THE CURRENT ENVIRONMENT
>
> Inspect:
> - Installed Python interpreters using the Windows Python launcher.
> - The project's requirements.txt and any other dependency manifests.
> - Existing virtual environments.
> - The project's documented startup instructions.
> - The repository's .gitignore rules.
> - The Python version and package versions currently used.
>
> Determine which installed Python version is appropriate for the
> project's dependencies.
>
> Do not assume Python 3.14.6 is required simply because it is currently
> being used.
>
> STEP 2: CREATE AN ISOLATED VIRTUAL ENVIRONMENT
>
> If a suitable existing interpreter is available, create a clean
> backend virtual environment using that interpreter.
>
> Prefer a Python version compatible with the existing dependencies
> and project configuration.
>
> Do not overwrite an existing virtual environment without first
> checking whether it contains anything important.
>
> Ensure the new virtual environment is excluded from Git.
>
> Install the backend dependencies from the existing project
> requirements. Do not introduce unnecessary dependency upgrades.
>
> STEP 3: TEST THE PYTHON RUNTIME
>
> Inside the new virtual environment, verify:
>
> 1. Python starts correctly.
> 2. The required dependencies import successfully.
> 3. A minimal asyncio operation completes.
> 4. FastAPI and Starlette import successfully.
> 5. TestClient can be constructed and entered using a minimal,
>    controlled test application.
> 6. Database initialisation and migrations still work.
>
> Use timeouts where appropriate so a stalled operation does not
> consume unlimited time.
>
> If the asyncio or TestClient operation hangs, identify the last
> successful operation and report the result. Do not describe a timeout
> as a passing test.
>
> Compare the new environment's behaviour with the original environment
> if this helps isolate the cause.
>
> STEP 4: RUN THE BACKEND TESTS
>
> Using the virtual environment, run:
>
> python -m pytest -q --basetemp .pytest-tmp-academy tests/test_configuration.py tests/test_core_services.py
>
> Then investigate the previously stalled tests_api.py suite.
>
> Start with one targeted HTTP/API test and use verbose output and
> reasonable timeouts.
>
> If the API suite still stalls, identify whether the problem occurs
> during fixture setup, TestClient startup, an HTTP request, or teardown.
>
> Do not claim the API suite passed unless it actually completes.
>
> STEP 5: START THE APPLICATION
>
> If the environment checks succeed, launch the backend using the
> project's documented configuration.
>
> Use the normal local development host and an available permitted port.
>
> Start the frontend using its existing development command.
>
> Check the backend health endpoint if one exists, and confirm that
> the frontend can communicate with the backend.
>
> If the socket error persists, investigate the actual error rather
> than repeatedly retrying the same port.
>
> Do not weaken security controls or make speculative source-code
> changes merely to work around the environment.
>
> STEP 6: BROWSER VERIFICATION
>
> If the application becomes reachable, walk through both learning paths:
>
> Sales — Qualify a New Lead.
> HR — Candidate Screening.
>
> Verify the Academy sections, knowledge checks, guided practice,
> independent exercises, assessment feedback, and progress persistence.
>
> Confirm that the HR human-review requirements remain enforced and
> that Coming Soon workflows remain unavailable.
>
> Use only synthetic data.
>
> If browser access remains unavailable, report the exact limitation.
> Do not claim the browser walkthrough passed.
>
> STEP 7: FRONTEND AND FINAL CHECKS
>
> Run the frontend production build and git diff --check.
>
> Preserve the existing implementation and unrelated working-tree changes.
>
> Keep IKEORU_AI_MODE=mock throughout.
>
> FINAL REPORT
>
> Tell me:
> - Which Python interpreter was tested.
> - Whether a virtual environment was created successfully.
> - Whether asyncio and TestClient work in that environment.
> - Which backend tests passed or remained blocked.
> - Whether the backend and frontend started successfully.
> - Whether browser verification was possible.
> - The actual root cause, if established.
> - Any remaining limitations.
>
> Do not stop after creating the virtual environment. Attempt to run
> IkeOru and verify the outcome.

---

### P023: Perform one bounded live smoke test

Date: 13/10/2026 22:15 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> TASK: PERFORM THE SINGLE APPROVED LIVE OPENAI SMOKE TEST FOR IKEORU
>
> The mock-mode application has been verified. The backend and frontend
> are running, the focused backend tests pass, and the Sales and HR
> learning journeys have been exercised.
>
> I explicitly authorise ONE bounded live OpenAI smoke test.
>
> The objective is to establish whether IkeOru can make a genuine
> OpenAI request and successfully process the response through the
> existing Sales workflow.
>
> SAFETY RULES
>
> - Make exactly ONE live Sales workflow submission.
> - Use synthetic business information only.
> - Do not use real customer or personal information.
> - Do not make a live HR request.
> - Do not run other tests or workflows while live mode is enabled.
> - Do not retry the provider request if it fails or times out.
> - Do not silently fall back to mock mode.
> - Never print, expose, or modify the API key.
> - Do not commit or push.
> - Do not change unrelated application code.
> - Restore mock mode immediately after the attempt.
>
> STEP 1: INSPECT THE CURRENT CONFIGURATION
>
> Inspect the existing backend configuration and relevant live-run code.
>
> Confirm that:
> - The existing API key is configured without displaying its value.
> - The configured model identifier is present.
> - The live provider adapter uses the intended OpenAI API.
> - The live-run daily limit is enforced.
> - The application can distinguish a successful real provider response
>   from a mock or replay result.
> - A failed provider request cannot be reported as a successful live run.
>
> Do not make any provider request during this inspection.
>
> If required configuration is missing, the key is unavailable, or an
> unexpected configuration change would be necessary, stop and report
> the issue before making a live request.
>
> STEP 2: PRESERVE THE EXISTING SETTINGS
>
> Record the original values and presence/absence of:
> - IKEORU_AI_MODE
> - IKEORU_LIVE_RUN_DAILY_LIMIT
>
> Do not print any secrets.
>
> Preserve the exact original configuration so it can be restored,
> including whether the daily-limit setting was originally absent.
>
> Temporarily configure:
>
> IKEORU_AI_MODE=live
> IKEORU_LIVE_RUN_DAILY_LIMIT=1
>
> Do not change other configuration values.
>
> Ensure that the correct backend process is stopped and restarted so
> it actually loads the intended settings.
>
> Verify from safe configuration metadata that live mode is active and
> the daily limit is one. Do not submit a workflow during this check.
>
> STEP 3: SUBMIT EXACTLY ONE LIVE SALES LEAD
>
> Create a fresh demo session using the existing application procedure.
>
> Submit exactly one synthetic lead through the actual Sales workflow.
>
> Use a simple, realistic example such as:
>
> Company: Northstar Office Supplies
> Industry: Business services
> Need: An office supplies provider for a growing team
> Budget: Not yet provided
> Timeline: Not yet provided
> Contact status: Initial enquiry
>
> Adapt the fields to the existing schema. Do not invent unsupported
> fields or bypass normal validation.
>
> Use the normal application workflow and backend policy.
>
> The daily limit must remain one.
>
> Do not execute a second run if the first request fails, times out,
> returns an invalid response, or produces an unexpected outcome.
>
> STEP 4: VERIFY THE RESULT
>
> If the provider request succeeds, establish that:
>
> - A genuine OpenAI provider request was made.
> - The response was received and validated.
> - The existing Sales policy processed the result correctly.
> - The resulting classification is consistent with the available evidence
>   and the implemented qualification rules.
> - Missing budget or timeline information is not invented.
> - Any uncertainty or required review is handled appropriately.
> - The run is recorded as LIVE only because the actual provider
>   request succeeded.
> - The run's events, status, and output are persisted correctly.
> - The request did not silently return a mock or replay result.
>
> Record the run identifier, final status, classification, and any
> relevant validation result.
>
> Never include secrets in the report. Do not dump raw environment
> variables or sensitive request headers.
>
> IMPORTANT:
> A returned HTTP response alone does not establish that the provider
> request succeeded. Verify the actual provider result and the application's
> recorded execution mode.
>
> If the request fails or the result cannot be verified, stop immediately.
> Do not retry or make another live request.
>
> STEP 5: RESTORE MOCK MODE IMMEDIATELY
>
> After the single attempt, regardless of success or failure:
>
> 1. Restore the exact previous IKEORU_AI_MODE value.
> 2. Restore the exact previous daily-limit setting, including its
>    original presence or absence.
> 3. Preserve all unrelated settings and existing data.
> 4. Restart the backend so it loads the restored configuration.
> 5. Verify that mock mode is active again.
> 6. Confirm that the application remains usable in mock mode.
>
> Do not make another provider request during restoration.
>
> If restoration or restart fails, stop and report the issue clearly.
> Do not claim the application is safely restored until it is verified.
>
> STEP 6: FINAL REPORT
>
> Report:
>
> - Whether exactly one live workflow submission was attempted.
> - Whether a genuine OpenAI request succeeded.
> - The model identifier, without exposing secrets.
> - The run identifier and final status, if available.
> - The resulting classification and how uncertainty was handled.
> - Whether the result was persisted correctly.
> - Whether any provider error occurred.
> - Whether mock mode and the original daily limit were restored.
> - Whether the frontend and backend remain operational.
> - Any outstanding issue preventing acceptance of the live integration.
>
> Do not run additional live tests, make additional provider calls,
> commit, or push changes.

---

### P024: Investigate the failed live request and retries

Date: 13/10/2026 22:30 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text with explicit redactions.

> TASK: INVESTIGATE IKEORU'S FAILED LIVE OPENAI REQUEST AND AUTOMATIC RETRIES
>
> The first approved live Sales smoke test failed before producing a
> provider result.
>
> Run ID:
> [private record identifier omitted]
>
> The run was recorded as failed, no classification was produced, and
> no achievement was awarded.
>
> The configured model was gpt-6-luna.
>
> The final application state was restored to mock mode, with the
> daily live-run limit set to 1.
>
> The run's event history included:
> classify_lead:retrying
>
> This raises concern that application-level retry logic may have
> attempted another provider request after the initial failure.
>
> OBJECTIVE
>
> Identify the actual cause of the provider failure, investigate the
> retry behaviour, and add regression coverage where necessary.
>
> Do not make any live OpenAI requests.
>
> SAFETY CONSTRAINTS
>
> - Keep IKEORU_AI_MODE=mock.
> - Do not initiate or retry any provider request.
> - Do not run a live workflow.
> - Do not expose the API key or other secrets.
> - Do not print raw environment variables.
> - Do not display authorization headers or sensitive request payloads.
> - Do not reset the database.
> - Do not commit or push.
> - Preserve unrelated working-tree changes.
>
> 1. INVESTIGATE THE FAILED RUN
>
> Inspect the persisted run and its ordered events.
>
> Find the available, sanitized failure information, including:
> - Provider HTTP status, if available.
> - Provider error type and error code, if available.
> - Sanitized error message.
> - Whether a provider request identifier was recorded.
> - Whether the SDK or application retry layer initiated another attempt.
> - Whether the final failure represents authentication, authorization,
>   quota, rate limiting, timeout, connection failure, invalid request,
>   structured-output validation, or another error.
>
> Do not invent a cause if the available records are insufficient.
>
> If necessary, inspect existing logs without displaying secrets or
> sensitive request data.
>
> Do not make another provider request to obtain missing information.
>
> 2. INSPECT THE LIVE PROVIDER ADAPTER
>
> Inspect the OpenAI SDK configuration and application service code.
>
> Determine:
> - Which API endpoint is used.
> - Which response format is requested.
> - How the provider result is validated.
> - Whether the SDK or application has automatic retries.
> - Whether multiple retry layers exist.
> - How actual provider failure is propagated into the run state.
>
> Do not assume that the model identifier is the cause.
>
> 3. CORRECT RETRY BEHAVIOUR
>
> The live smoke-test requirements prohibit automatic retries.
>
> Implement the smallest justified change so a live workflow submission
> does not transparently repeat a failed provider request.
>
> Inspect both SDK-level and application-level retry behaviour.
>
> Where appropriate, configure the live provider call to make one
> provider attempt per workflow submission.
>
> Do not silently switch to mock mode after a live failure.
>
> A provider failure must remain a failure, with safe diagnostic
> information and accurate persisted status.
>
> If an existing retry policy is needed elsewhere, preserve it where
> possible, but do not allow it to violate the explicit single-attempt
> live-run policy.
>
> 4. ADD REGRESSION TESTS
>
> Add tests that verify:
>
> - A failed live provider call is not automatically retried.
> - A failed live result is never reported as a successful live run.
> - A provider failure does not silently fall back to mock output.
> - The failed run remains ineligible for live-run achievements.
> - Safe error details are persisted where supported.
> - Mock-mode behaviour remains unchanged.
>
> Use mocked provider responses in tests. Do not make live requests.
>
> Verify the number of provider-client invocations in the failure test.
>
> 5. PRESERVE THE SAFE STATE
>
> Keep:
> IKEORU_AI_MODE=mock
>
> Keep the current daily-limit configuration unchanged.
>
> Do not edit the API key.
>
> 6. VERIFICATION
>
> Run focused tests for the changed provider and retry behaviour.
>
> Run the relevant backend test suite, Python compilation,
> dependency checks, frontend build, and git diff --check where feasible.
>
> Report test stalls separately from failures.
>
> 7. FINAL REPORT
>
> Report:
> - The actual provider failure cause, if established.
> - The sanitized provider error category.
> - What the retry event means and whether multiple provider attempts
>   can be established from existing evidence.
> - Any verified retry-policy change.
> - Regression test results.
> - Confirmation that mock mode remains active.
> - What still prevents acceptance of the live integration.
>
> Do not make another live API request as part of this task.

---

### P025: Identify the actual provider failure

Date: 13/10/2026 22:57 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text with explicit redactions.

> TASK: IDENTIFY THE ACTUAL CAUSE OF IKEORU'S FAILED OPENAI REQUEST
>
> We must determine why IkeOru's first live Sales workflow failed.
>
> Do not make another live OpenAI request in this task.
>
> Original failed run ID:
> [private record identifier omitted]
>
> Configured model:
> gpt-6-luna
>
> The persisted failure was reported as:
> AIProviderUnavailable
>
> The run's events included:
> classify_lead:retrying
>
> The previous implementation could retry at both the application
> and OpenAI SDK levels. These retry behaviours have since been
> disabled in the application code.
>
> The original provider HTTP status, error code, error type, request ID,
> and underlying SDK error were not retained in the persisted run.
>
> OBJECTIVE
>
> Establish whether available evidence identifies the failure as:
> - An OpenAI API rejection.
> - An authentication or permission problem.
> - A quota, billing, or rate-limit issue.
> - An invalid request or response-format problem.
> - A connection or timeout problem.
> - A provider-side service error.
> - An application-side exception.
> - Another identifiable cause.
>
> Do not guess or label the cause as confirmed without supporting evidence.
>
> STEP 1: INVESTIGATE THE ORIGINAL FAILED RUN
>
> Inspect the persisted run, ordered events, application logs, and
> available backend terminal output associated with the run ID.
>
> Look for the underlying exception and any provider response metadata
> that may still exist in logs or memory-accessible diagnostic records.
>
> Do not make another provider request.
>
> Do not print API keys, authorization headers, environment-variable
> dumps, or sensitive request bodies.
>
> Report whether the original provider error can be recovered.
>
> STEP 2: TRACE THE LIVE REQUEST
>
> Inspect backend/app/ai.py and backend/app/services.py, along with
> the configuration and code that construct the provider request.
>
> Verify:
> - The exact API endpoint used.
> - The configured model identifier.
> - The request format and required parameters.
> - The structured-output schema, if applicable.
> - The exception handling path.
> - SDK-level retry configuration.
> - Application-level retry configuration.
> - How provider responses and exceptions become persisted run states.
>
> Confirm that one workflow submission can no longer trigger unintended
> automatic retries.
>
> STEP 3: IMPROVE SAFE ERROR DIAGNOSTICS
>
> If the original error cannot be recovered, implement the smallest
> appropriate improvement to capture useful diagnostic metadata for
> future provider failures.
>
> Where available, retain:
> - Exception class.
> - Provider HTTP status.
> - Provider error type.
> - Provider error code.
> - Provider request ID.
> - A safe, sanitised diagnostic summary.
>
> Preserve useful underlying exception information for controlled
> backend diagnostics without exposing secrets or sensitive lead data.
>
> Do not persist or display raw authorization headers, API keys, entire
> request bodies, or unfiltered provider messages.
>
> Do not replace specific diagnostic categories with a generic error
> before the relevant metadata has been captured.
>
> Keep the user-facing error safe and understandable, but make the
> underlying failure distinguishable to a developer.
>
> STEP 4: TEST WITHOUT LIVE API CALLS
>
> Use mocked provider responses and exceptions to verify diagnostic
> handling for representative cases:
>
> - Authentication failure.
> - Invalid request.
> - Quota or rate-limit failure.
> - Connection failure or timeout.
> - Provider service error.
> - Unexpected response or structured-output validation failure.
>
> These must be offline tests. Do not contact OpenAI.
>
> Verify that:
> - No provider retry occurs.
> - A failure never becomes a successful run.
> - No mock result substitutes for a failed live request.
> - Failed runs remain ineligible for achievements.
> - Safe diagnostics are captured when available.
> - Sensitive data is not exposed.
>
> Do not invent an actual failure cause from these synthetic tests.
>
> STEP 5: PRESERVE SAFE CONFIGURATION
>
> Keep IKEORU_AI_MODE=mock.
>
> Do not change the current daily-limit configuration.
> Do not modify the API key.
> Do not perform another live request.
> Do not commit or push.
>
> STEP 6: REPORT THE FINDINGS
>
> Tell me:
>
> 1. Whether the original underlying provider error was recovered.
> 2. Whether the evidence indicates a provider/API rejection or an
>    application-side problem.
> 3. The exact failure category, status and code, if available.
> 4. Whether the model and request configuration are consistent with
>    the intended API.
> 5. Any verified defect found in error handling.
> 6. What diagnostic changes were made.
> 7. Which offline regression tests passed.
> 8. Whether any further live request is required to establish the cause.
>
> If the original error is unavailable and a live request is required,
> stop and explain exactly what remains unknown. Do not make that
> request as part of this task.

---

### P026: Repeat the provider-failure investigation

Date: 13/10/2026 23:04 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Repeated submission.

The recovered wording is identical to [P025](#p025-identify-the-actual-provider-failure). This separate submission is retained in the chronology; its text is stored once.

---

### P027: Perform one additional diagnostic request

Date: 13/10/2026 23:11 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> TASK: EXECUTE ONE AUTHORIZED DIAGNOSTIC OPENAI REQUEST FOR IKEORU
>
> The user has explicitly authorized ONE additional live Sales request.
>
> The first live request failed, but its underlying provider error was
> not recorded. Diagnostic handling has since been improved in:
>
> - backend/app/ai.py
> - backend/app/services.py
>
> The latest focused tests report 30 passed.
>
> OBJECTIVE
>
> Make exactly one live Sales workflow submission to determine whether:
> 1. The OpenAI request succeeds and IkeOru processes the response
>    correctly; or
> 2. The request fails and the new diagnostic system identifies the
>    actual failure category.
>
> Do not make any other live provider request.
>
> SAFETY REQUIREMENTS
>
> - Exactly one Sales workflow submission.
> - One underlying provider attempt; no SDK or application retries.
> - Synthetic business information only.
> - No live HR request.
> - No manual retry if the request fails or times out.
> - No fallback to mock output after a live failure.
> - Never display, print, or modify the API key.
> - Do not expose authorization headers or raw request payloads.
> - Do not commit or push.
> - Restore mock mode immediately after the attempt.
>
> STEP 1 — PREFLIGHT
>
> Inspect the latest code and confirm:
> - The new diagnostic code is present.
> - The OpenAI client uses max_retries=0.
> - Application-level retry logic has been removed.
> - The configured API key is present without exposing its value.
> - The model is configured as gpt-6-luna.
> - IKEORU_AI_MODE is currently mock.
> - IKEORU_LIVE_RUN_DAILY_LIMIT is 1.
> - The current backend process and configuration can be identified.
>
> Do not make a provider request during this inspection.
>
> If any essential condition is not satisfied, stop and report it.
> Do not guess, expose secrets, or change the API key.
>
> STEP 2 — ENABLE LIVE MODE TEMPORARILY
>
> Record the current settings and preserve their original values.
>
> Temporarily set:
> IKEORU_AI_MODE=live
> IKEORU_LIVE_RUN_DAILY_LIMIT=1
>
> Do not change other settings.
>
> Restart the correct backend process so the new configuration and
> latest code are loaded.
>
> Verify safe configuration metadata confirms live mode and a daily
> limit of one.
>
> Do not submit a workflow during this check.
>
> STEP 3 — MAKE EXACTLY ONE REQUEST
>
> Create a fresh demo session using the normal application procedure.
>
> Submit one Sales lead through the actual IkeOru workflow, using
> synthetic information such as:
>
> Company: Northstar Office Supplies
> Industry: Business services
> Need: Office supplies for a growing team
> Budget: Not provided
> Timeline: Not provided
> Contact status: Initial enquiry
>
> Adapt the fields to the application's actual schema.
>
> Do not invent inputs or bypass normal validation.
>
> Do not repeat the workflow submission.
>
> Do not manually call the OpenAI endpoint separately.
>
> The single request must pass through IkeOru's existing provider
> adapter and Sales business policy.
>
> STEP 4 — CAPTURE AND VERIFY THE OUTCOME
>
> If the request succeeds, verify:
> - A genuine OpenAI Responses API request succeeded.
> - The response passed the application's validation.
> - Sales classification followed the existing business rules.
> - Missing budget and timeline information were not invented.
> - The persisted run is marked LIVE.
> - The run's status, events, output, and classification are persisted.
> - No mock or replay response was substituted.
>
> If the request fails, capture the newly implemented sanitized
> diagnostics, where available:
>
> - Failure category.
> - Exception class.
> - Provider HTTP status.
> - Provider error type and code.
> - Provider request ID.
> - Sanitized diagnostic summary.
>
> Determine which cause the evidence supports, distinguishing:
> - Authentication or permission.
> - Invalid request or structured-output validation.
> - Quota or rate limit.
> - Timeout or connectivity.
> - Provider service error.
> - Application-side failure.
> - Unknown, if evidence is insufficient.
>
> Do not invent a specific cause from a generic error.
>
> Do not print raw exception messages if they may contain sensitive
> information. Do not dump environment variables, request headers,
> or the complete provider response.
>
> If the attempt fails, stop immediately. No retries or further
> provider requests are permitted.
>
> STEP 5 — RESTORE MOCK MODE
>
> Regardless of the result:
>
> 1. Restore IKEORU_AI_MODE=mock.
> 2. Restore the original daily-limit value, which is expected to be 1.
> 3. Preserve all other settings.
> 4. Restart the backend using the restored configuration.
> 5. Verify mock mode is active.
> 6. Verify the backend and frontend remain available.
> 7. Do not make another provider request during restoration.
>
> If restoration fails, clearly report the problem and do not claim
> that the safe state has been restored.
>
> STEP 6 — FINAL REPORT
>
> Report:
> - Whether one live workflow submission was made.
> - Whether exactly one provider attempt was made.
> - Whether OpenAI returned a successful response.
> - The configured model identifier.
> - The run ID and final persisted status.
> - The classification, if any.
> - The actual diagnostic category and supporting metadata, if failed.
> - Whether the failure was attributable to the API request,
>   the provider, or IkeOru, based on the available evidence.
> - Whether mock mode and the daily limit were restored.
> - Whether any issue still prevents acceptance of the integration.
>
> Do not commit, push, run additional live workflows, or make another
> OpenAI request.

---

### P028: Permit a model change during the diagnostic task

Date: 13/10/2026 23:14 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> you can change the openai model

---

### P029: Perform one diagnostic request with a temporary limit change

Date: 13/10/2026 23:31 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text with explicit redactions.

> TASK: EXECUTE ONE AUTHORIZED LIVE SALES DIAGNOSTIC REQUEST
>
> The user has explicitly authorized temporarily raising
> IKEORU_LIVE_RUN_DAILY_LIMIT from 1 to 2 to permit exactly one
> additional diagnostic Sales request.
>
> Previous live run:
> [private record identifier omitted]
>
> Configured model:
> gpt-6-luna
>
> The previous request failed, but the underlying provider error
> was not recorded.
>
> Diagnostic improvements have since been implemented in:
> - backend/app/ai.py
> - backend/app/services.py
>
> The latest offline tests passed, including coverage for sanitized
> provider errors and retry prevention.
>
> The most recent diagnostic submission was blocked by the daily
> limit before reaching OpenAI. It made zero provider requests.
>
> OBJECTIVE
>
> Make exactly one real OpenAI provider attempt through IkeOru's
> existing Sales workflow.
>
> Determine whether the provider responds successfully or returns
> a diagnostic error that identifies the cause of the earlier failure.
>
> SAFETY RULES
>
> - Exactly one Sales workflow submission.
> - Exactly one underlying provider attempt.
> - No application-level retries.
> - No OpenAI SDK retries.
> - No manual retry if the request fails or times out.
> - No live HR request.
> - No mock fallback after a live failure.
> - Synthetic business data only.
> - Never expose or modify the API key.
> - Do not display raw authorization headers or request payloads.
> - Do not commit or push.
> - Restore the original configuration immediately after the attempt.
>
> STEP 1: PREFLIGHT
>
> Inspect the current application, configuration, provider adapter,
> and retry handling.
>
> Confirm:
> - The current mode is mock.
> - The existing API key is configured, without revealing its value.
> - The model is gpt-6-luna.
> - The live-run limit is currently 1.
> - The provider client uses max_retries=0.
> - Application-level retry logic is disabled.
> - Sanitized diagnostics are implemented.
> - The correct backend process can be identified and restarted.
>
> Inspect the current daily usage counter without exposing sensitive
> data, if the application supports that safely.
>
> Do not make a provider request during preflight.
>
> If the configuration is inconsistent, automatic retries cannot
> be ruled out, or the correct backend cannot be identified, stop
> and report the issue.
>
> STEP 2: PRESERVE AND TEMPORARILY CHANGE SETTINGS
>
> Record the exact current values and presence/absence of:
> - IKEORU_AI_MODE
> - IKEORU_LIVE_RUN_DAILY_LIMIT
>
> Keep the original values available for restoration.
>
> Temporarily set:
> IKEORU_AI_MODE=live
> IKEORU_LIVE_RUN_DAILY_LIMIT=2
>
> Do not change any other configuration values.
>
> Restart the correct backend so it loads the settings and the
> latest diagnostic code.
>
> Verify through safe configuration metadata that live mode is
> active and the daily limit is 2.
>
> Do not submit a workflow during this check.
>
> STEP 3: SUBMIT ONE SYNTHETIC SALES LEAD
>
> Create a fresh demo session using the normal application procedure.
>
> Make exactly one Sales workflow submission using synthetic data
> adapted to the existing schema. For example:
>
> Company: Northstar Office Supplies
> Industry: Business services
> Need: Office supplies for a growing team
> Budget: Not provided
> Timeline: Not provided
> Contact status: Initial enquiry
>
> Use the actual frontend workflow and backend policy.
>
> Do not bypass normal validation or directly invoke the provider
> outside the application.
>
> The request must use the existing provider adapter.
>
> Do not submit another workflow if the attempt fails, times out,
> returns invalid output, or produces an unexpected result.
>
> STEP 4: CAPTURE THE RESULT
>
> If successful, verify:
> - A genuine OpenAI Responses API request succeeded.
> - The response was validated by the application.
> - The Sales policy produced a justified result.
> - Missing budget and timeline information were not invented.
> - The persisted run is marked LIVE.
> - The run ID, status, events, and output were persisted correctly.
> - No mock or replay output was substituted.
>
> If unsuccessful, capture the newly implemented sanitized diagnostics:
> - Failure category.
> - Exception class.
> - Provider HTTP status, if available.
> - Provider error type and code, if available.
> - Provider request ID, if available.
> - Sanitized diagnostic summary.
>
> Determine which cause the evidence supports:
> - Authentication or permission.
> - Invalid request or structured output.
> - Quota or rate limit.
> - Timeout or connectivity.
> - Provider service failure.
> - Application-side failure.
> - Unknown, if the evidence is insufficient.
>
> Do not invent a failure cause.
>
> Never print secrets, raw environment variables, authorization
> headers, or sensitive request data.
>
> Do not retry.
>
> STEP 5: RESTORE CONFIGURATION IMMEDIATELY
>
> Regardless of success or failure:
>
> 1. Restore IKEORU_AI_MODE to its exact original value.
> 2. Restore IKEORU_LIVE_RUN_DAILY_LIMIT to its exact original value
>    and preserve whether the setting was originally present.
> 3. Preserve unrelated configuration and data.
> 4. Restart the backend using the restored configuration.
> 5. Verify mock mode is active.
> 6. Verify the original daily limit is restored.
> 7. Confirm the backend health endpoint responds.
> 8. Confirm the frontend remains available.
>
> Do not make another provider request during restoration.
>
> If restoration fails, stop and report that clearly.
>
> STEP 6: FINAL REPORT
>
> Report:
> - Whether exactly one Sales submission was attempted.
> - Whether exactly one provider attempt was made.
> - Whether OpenAI returned a successful response.
> - The model identifier.
> - The run ID and final status, if available.
> - The classification, if successful.
> - The sanitized diagnostic category and supporting metadata, if failed.
> - Whether the evidence identifies a provider/API issue or an
>   application-side issue.
> - Whether mock mode and the original daily limit were restored.
> - Whether the backend and frontend remain operational.
> - Any remaining blocker.
>
> Do not commit, push, initiate more live requests, or perform
> additional live workflows.

---

### P030: Review and commit the implementation locally

Date: 13/10/2026 23:45 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> TASK: REVIEW AND COMMIT THE CURRENT IKEORU IMPLEMENTATION
>
> Create a local Git checkpoint of the completed IkeOru development work
> before proceeding with OpenAI connectivity diagnostics.
>
> Do not push to GitHub.
>
> STEP 1 — INSPECT THE WORKING TREE
>
> Run:
>
> git status --short
> git diff --stat
> git diff --check
>
> Inspect both tracked modifications and untracked files.
>
> Identify the intended application changes, including:
> - Academy-first Learn → Do → Prove implementation.
> - Sales and HR curricula.
> - Knowledge checks and persisted learning progress.
> - Independent practical exercises.
> - Assessment feedback and achievement safeguards.
> - Database migration changes.
> - OpenAI error diagnostics and retry prevention.
> - Related regression tests.
> - Updated product documentation and implementation plans.
> - Relevant .gitignore changes.
>
> Do not assume every working-tree change belongs in this commit.
>
> STEP 2 — PROTECT SENSITIVE AND LOCAL FILES
>
> NEVER stage or commit:
> - backend/.env or any other environment file containing secrets.
> - API keys, tokens, passwords, or credentials.
> - backend/.venv-312-verify or other virtual environments.
> - SQLite databases containing local application data.
> - Temporary test directories, caches, logs, or generated files.
> - Unrelated changes.
> - Files whose purpose is uncertain.
>
> Check that backend/.env remains ignored.
>
> If any potentially sensitive file appears staged, remove it from the
> staging area without deleting the local file.
>
> Do not alter or expose the API key.
>
> STEP 3 — STAGE AND REVIEW
>
> Stage only the intended IkeOru source files, tests, documentation,
> migrations, and appropriate Git-ignore changes.
>
> Before committing, inspect:
>
> git diff --cached --stat
> git diff --cached --check
> git diff --cached
>
> Review the staged changes for:
> - Accidental secrets or configuration values.
> - Unrelated modifications.
> - Temporary or generated files.
> - Unintended changes to provider configuration.
> - Correctness of the new diagnostic and no-retry safeguards.
>
> Do not commit if a material issue is found. Report it first.
>
> STEP 4 — VERIFY THE SAFE STATE
>
> Keep:
>
> IKEORU_AI_MODE=mock
> IKEORU_LIVE_RUN_DAILY_LIMIT=1
>
> Do not make any OpenAI API requests.
> Do not perform another Sales or HR workflow.
> Do not run connectivity probes as part of this task.
> Do not change application code solely to facilitate the commit.
>
> STEP 5 — COMMIT LOCALLY
>
> If the staged changes are consistent and free of sensitive files,
> create this local commit:
>
> feat: strengthen IkeOru academy and diagnostics
>
> Do not push.
> Do not amend or rewrite earlier commits.
> Do not delete or reset unrelated working-tree changes.
>
> STEP 6 — REPORT
>
> Report:
> - Commit hash.
> - Commit message.
> - Files and changes included.
> - Confirmation that .env and virtual environments were excluded.
> - Any remaining unstaged changes.
> - Confirmation that no provider requests were made.
> - Confirmation that mock mode and the daily limit remain unchanged.

---

### P031: Diagnose connectivity after the checkpoint

Date: 14/10/2026 17:55 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Recovered text.

> TASK: DIAGNOSE IKEORU'S OPENAI CONNECTIVITY AFTER COMMIT
>
> Checkpoint:
> 2c8a546 feat: strengthen IkeOru academy and diagnostics
>
> The latest live Sales attempt failed with APIConnectionError.
> The underlying cause has not been established.
>
> The application has been restored to:
> IKEORU_AI_MODE=mock
> IKEORU_LIVE_RUN_DAILY_LIMIT=1
>
> Model: gpt-6-luna
>
> OBJECTIVE
>
> Investigate whether the Windows environment can resolve and establish
> a secure connection to api.openai.com, without making any OpenAI API
> requests.
>
> IMPORTANT CONSTRAINTS
>
> - Do not make an OpenAI API request.
> - Do not submit Sales or HR workflows.
> - Do not change the API key.
> - Do not expose secrets or credentials.
> - Do not disable TLS certificate verification.
> - Do not disable the firewall or antivirus.
> - Do not commit, amend, or push.
> - Preserve all existing application changes.
>
> 1. VERIFY CONFIGURATION
>
> Confirm safely that:
> - IKEORU_AI_MODE=mock.
> - IKEORU_LIVE_RUN_DAILY_LIMIT=1.
> - The configured model remains gpt-6-luna.
> - The OpenAI client uses max_retries=0.
> - Application-level provider retries remain disabled.
>
> Do not print environment variables or secret values.
>
> 2. CHECK DNS
>
> Use PowerShell to test whether api.openai.com resolves.
>
> Report whether resolution succeeds and any safe error details.
>
> 3. CHECK TCP
>
> Run:
>
> Test-NetConnection api.openai.com -Port 443
>
> Report DNS resolution and TcpTestSucceeded.
>
> 4. CHECK TLS
>
> Using the Python 3.12 virtual environment, perform a TCP connection
> and TLS handshake to api.openai.com:443.
>
> Use a reasonable timeout and the operating system's normal certificate
> validation.
>
> Do not send an HTTP request or API payload.
>
> Report whether TCP and TLS succeed, along with any sanitized exception
> category.
>
> 5. CHECK PROXY CONFIGURATION
>
> Inspect whether relevant Windows or process proxy settings are present.
>
> Do not display credentials or tokens. Do not change any proxy or
> security settings.
>
> 6. INTERPRET RESULTS
>
> Identify the failing layer, if any:
> - DNS
> - TCP connectivity
> - TLS handshake or certificate validation
> - Proxy configuration
> - Unknown
>
> If all checks pass, explain that DNS, TCP, and TLS connectivity work,
> but authenticated API access is not yet verified.
>
> Do not claim the API key or model is valid based on network checks.
>
> 7. FINAL STATE
>
> Keep IKEORU_AI_MODE=mock and the daily limit at 1.
>
> Make no provider requests.
>
> Report the exact results, remaining uncertainty, and the next
> appropriate troubleshooting step.
>
> Do not make source-code changes unless a specific defect is established.

---

### P032: Repeat connectivity diagnostics

Date: 14/10/2026 17:57 WAT · Source chat: **Build IkeOru Moonshot MVP**

Record type: Repeated submission.

The recovered wording is identical to [P031](#p031-diagnose-connectivity-after-the-checkpoint). This separate submission is retained in the chronology; its text is stored once.

---

### P033: Repeat connectivity diagnostics in the diagnostics chat

Date: 15/10/2026 10:03 WAT · Source chat: **Diagnose IkeOru OpenAI connectivity**

Record type: Repeated submission.

The recovered wording is identical to [P031](#p031-diagnose-connectivity-after-the-checkpoint). This separate submission is retained in the chronology; its text is stored once.

---

### P034: Verify the running backend environment

Date: 15/10/2026 11:51 WAT · Source chat: **Diagnose IkeOru OpenAI connectivity**

Record type: Recovered text with explicit redactions.

> TASK: VERIFY IKEORU'S RUNNING BACKEND ENVIRONMENT AFTER SUCCESSFUL TLS TEST
>
> The latest manual checks from Windows Command Prompt produced these
> results:
>
> - DNS resolution for api.openai.com succeeded.
> - TCP connectivity to api.openai.com:443 succeeded.
> - TLS negotiation succeeded.
> - Certificate validation succeeded.
> - The Python 3.12 virtual environment was used.
>
> The previous live Sales attempt failed with APIConnectionError.
>
> We need to establish whether the actual running IkeOru backend is using
> the same working environment and correct SDK configuration.
>
> IMPORTANT:
> - Do not make any OpenAI API requests.
> - Do not submit Sales or HR workflows.
> - Do not change the API key.
> - Do not expose secrets.
> - Do not modify source code unless a specific defect is established.
> - Do not commit or push.
> - Keep IKEORU_AI_MODE=mock.
> - Keep IKEORU_LIVE_RUN_DAILY_LIMIT=1.
>
> 1. IDENTIFY THE RUNNING BACKEND
>
> Inspect the process listening on port 8000.
>
> Identify:
> - Process ID.
> - Python executable path.
> - Whether it uses backend/.venv-312-verify.
> - Whether Uvicorn was started with automatic reloading.
> - Whether multiple backend processes may be running.
>
> Do not terminate processes blindly.
>
> 2. VERIFY THE ACTIVE APPLICATION
>
> Check the backend health endpoint.
>
> Confirm the frontend is still reachable.
>
> If the running backend is not using the intended Python 3.12
> environment, report that finding before restarting anything.
>
> If a restart is necessary, use the correct virtual-environment
> interpreter and do not enable --reload.
>
> 3. INSPECT OPENAI CLIENT CONFIGURATION WITHOUT MAKING A REQUEST
>
> Inspect the existing provider adapter and actual client configuration.
>
> Verify:
> - The configured API base URL.
> - The configured model identifier.
> - The request timeout.
> - SDK max_retries=0.
> - Application-level retries remain disabled.
> - The API key is present without displaying its value.
> - Whether relevant proxy or certificate environment settings exist.
>
> Do not expose credentials or print environment-variable dumps.
>
> Do not issue an OpenAI API request.
>
> 4. COMPARE THE FAILED REQUEST PATH
>
> Inspect the handling of the most recent failed run:
>
> [private record identifier omitted]
>
> Determine whether the diagnostic information establishes a specific
> application-side cause.
>
> Do not invent a root cause if the underlying exception is unavailable.
>
> 5. FINAL REPORT
>
> Report:
> - Actual backend Python executable.
> - Whether the backend is using the intended virtual environment.
> - Whether multiple or stale backend processes exist.
> - Health-check results.
> - Sanitized OpenAI client configuration findings.
> - Any verified mismatch or defect.
> - Remaining uncertainty.
>
> Keep mock mode and the daily limit unchanged.
>
> Do not make a live request as part of this task.

---

### P035: Inspect the SDK transport and align the model

Date: 15/10/2026 12:24 WAT · Source chat: **Diagnose IkeOru OpenAI connectivity**

Record type: Recovered text with explicit redactions.

> TASK: FINAL READ-ONLY TRANSPORT DIAGNOSTICS FOR IKEORU
>
> The latest Windows checks confirmed:
> - DNS for api.openai.com succeeds.
> - TCP connectivity to port 443 succeeds.
> - TLS 1.3 handshake and certificate validation succeed using
>   Python 3.12 and the default SSL context.
>
> However, the actual OpenAI SDK request previously failed with
> APIConnectionError.
>
> The active backend was found using:
> - OpenAI SDK 2.54.0
> - Base URL: https://api.openai.com/v1
> - Timeout: 60 seconds
> - max_retries=0
> - No application-level retry loop
>
> The configured model was found to be gpt-5.6-terra, whereas the
> previously approved smoke-test configuration specified gpt-6-luna.
>
> OBJECTIVE
>
> Resolve the configuration mismatch and investigate the actual
> HTTP client transport without making another OpenAI API request.
>
> CONSTRAINTS
>
> - Keep IKEORU_AI_MODE=mock.
> - Keep IKEORU_LIVE_RUN_DAILY_LIMIT=1.
> - Do not make OpenAI API requests.
> - Do not submit Sales or HR workflows.
> - Do not expose or modify the API key.
> - Do not disable certificate verification.
> - Do not disable firewall or endpoint security.
> - Do not commit or push.
>
> 1. CONFIGURATION ALIGNMENT
>
> Confirm the existing model configuration source.
>
> Because the originally approved test specified gpt-6-luna, update
> only the configured model value to gpt-6-luna if necessary.
>
> Do not change any other settings.
>
> Verify mock mode and the daily limit remain unchanged.
> Restart the backend only if needed, using the intended Python 3.12
> virtual environment and without automatic reloading.
>
> 2. TRANSPORT INSPECTION
>
> Inspect the actual HTTPX/OpenAI SDK client configuration and relevant
> environment settings.
>
> Pay particular attention to:
> - TLS certificate trust configuration.
> - HTTP_PROXY, HTTPS_PROXY, ALL_PROXY and NO_PROXY presence.
> - SSL_CERT_FILE and SSL_CERT_DIR presence.
> - SSLKEYLOGFILE presence and whether the configured path is usable.
> - IPv4 and IPv6 resolution and connectivity.
>
> Never display credentials embedded in environment variables or proxy
> URLs.
>
> Do not disable TLS verification or alter certificate trust.
>
> 3. SDK-ALIGNED TLS CHECK
>
> Using the project virtual environment, test TCP and TLS connections
> to api.openai.com with certificate validation consistent with the
> OpenAI SDK/HTTPX trust configuration.
>
> Use bounded timeouts.
>
> Where permitted, compare IPv4 and IPv6 without sending HTTP requests.
>
> Record the precise exception class and sanitized error category
> for any failed connection.
>
> Do not invoke the OpenAI SDK to create a response.
>
> 4. ORIGINAL FAILURE
>
> Review the available diagnostics for run
> [private record identifier omitted].
>
> Determine whether any underlying transport cause was retained.
>
> Do not guess if the required information is unavailable.
>
> 5. FINAL REPORT
>
> Report:
> - Whether the model was aligned with gpt-6-luna.
> - Current mock mode and daily limit.
> - SDK-aligned TLS results.
> - IPv4 and IPv6 results, where tested.
> - Any verified proxy, certificate, or SSLKEYLOGFILE issue.
> - Any recovered diagnostic evidence.
> - What remains unknown.
>
> Do not make another live API request.

---

### P036: Verify Windows certificate trust compatibility

Date: 15/10/2026 12:35 WAT · Source chat: **Diagnose IkeOru OpenAI connectivity**

Record type: Recovered text.

> TASK: VERIFY WINDOWS CERTIFICATE TRUST COMPATIBILITY WITH IKEORU
>
> We have a specific TLS diagnostic finding.
>
> From normal Windows Command Prompt:
> - DNS resolution for api.openai.com succeeds.
> - TCP connectivity on port 443 succeeds.
> - Python's default Windows TLS context succeeds using TLS 1.3.
> - Certificate validation succeeds using that context.
>
> However, the HTTPX/Certifi-based TLS context used by IkeOru failed
> with SSLCertVerificationError, OpenSSL verification code 20.
>
> The precise certificate issuer has not yet been identified.
>
> OBJECTIVE
>
> Determine whether IkeOru can securely validate the endpoint's
> certificate chain using the Windows system certificate store.
>
> Do not make any OpenAI API requests.
>
> SAFE CONFIGURATION
>
> Preserve:
> - IKEORU_AI_MODE=mock
> - IKEORU_LIVE_RUN_DAILY_LIMIT=1
> - OPENAI_MODEL=gpt-6-luna
> - OpenAI SDK max_retries=0
> - No application-level retries
>
> Do not expose or change the API key.
> Do not submit Sales or HR workflows.
> Do not commit or push.
>
> STEP 1: INSPECT THE CERTIFICATE CHAIN
>
> Using the Python 3.12 virtual environment, establish a TLS connection
> to api.openai.com with normal Windows certificate verification.
>
> Inspect only the metadata necessary to diagnose the certificate chain:
> - Leaf certificate subject.
> - Issuer.
> - Validity dates.
> - Subject Alternative Name relevant to the hostname.
> - Certificate fingerprint.
>
> Do not export or install certificates.
> Do not expose private keys or sensitive internal configuration.
> Do not disable certificate verification.
>
> Determine whether the certificate appears to be issued by a public CA
> or by a local, enterprise, security-product, or network-inspection CA.
>
> Do not assume the issuer is legitimate until the evidence supports it.
>
> STEP 2: TEST THE TRUSTSTORE OPTION
>
> Inspect whether the truststore package is already installed in the
> project's Python 3.12 environment.
>
> If available, create a disposable truststore.SSLContext and test
> a TLS handshake to api.openai.com.
>
> Use the standard system trust mechanisms, hostname validation,
> and a bounded timeout.
>
> Do not send an HTTP request or API payload.
>
> Do not use the OpenAI SDK to generate a response.
>
> If truststore is not installed, do not install or modify dependencies
> in this task. Report that result and stop the truststore test.
>
> STEP 3: INTERPRET THE RESULTS
>
> Report:
> - The certificate issuer category.
> - Whether Windows-native certificate verification succeeds.
> - Whether truststore-based certificate verification succeeds.
> - Whether HTTPX/Certifi verification still fails.
> - Whether the issuer appears consistent with the expected network
>   security configuration.
> - Any remaining uncertainty.
>
> If the system-trust handshake succeeds, explain that this supports
> using the Windows certificate store as a possible solution, but does
> not prove that an authenticated OpenAI API request will succeed.
>
> If the certificate issuer appears unexpected or cannot be validated
> as legitimate, do not change the application's trust configuration.
>
> STEP 4: RECOMMEND THE SMALLEST SAFE FIX
>
> If the Windows trust path is verified as appropriate and truststore
> succeeds, recommend the smallest supported integration change.
>
> Potential approach:
> - Construct a truststore.SSLContext.
> - Pass it to a dedicated HTTPX client through the OpenAI SDK's
>   supported http_client configuration.
> - Preserve certificate verification and hostname checking.
> - Preserve timeouts and max_retries=0.
> - Avoid global SSL monkey-patching.
> - Avoid disabling certificate verification.
> - Avoid silently weakening TLS security.
>
> Do not implement this change in the current task.
>
> STEP 5: FINAL REPORT
>
> Report the TLS results, certificate findings, truststore availability,
> and the recommended next step.
>
> No OpenAI API requests, workflow submissions, configuration changes,
> source changes, commits, or pushes are permitted during this task.

---

### P037: Finalize the README and publish the MVP

Date: 15/10/2026 22:21 WAT · Source chat: **Diagnose IkeOru OpenAI connectivity**

Record type: Recovered text with explicit redactions.

> TASK: FINALISE IKEORU README AND PUBLISH THE COMPLETED MVP TO GITHUB
>
> PROJECT
> Name: IkeOru
> Tagline: Learn. Do. Prove.
> Local repository:
> [local repository path omitted]
>
> GitHub repository:
> https://github.com/Onovae/IkeOru.git
>
> Default branch:
> main
>
> LATEST KNOWN LOCAL CHECKPOINT
> 2c8a546 feat: strengthen IkeOru academy and diagnostics
>
> OBJECTIVE
>
> Prepare the existing project for submission by updating README.md,
> safely publishing the completed implementation to GitHub, and
> verifying that the remote repository contains the intended work.
>
> Do not introduce new application features or redesign the product.
>
> ==================================================
> 1. INSPECT THE REPOSITORY
> ==================================================
>
> Inspect:
>
> git status --short
> git branch --show-current
> git log --oneline --decorate -10
> git remote -v
> git diff --check
>
> Fetch the latest remote metadata and inspect the relationship between
> the local branch and origin/main.
>
> Confirm:
> - The local checkpoint exists.
> - The changes intended for submission are present locally.
> - The remote points to the expected IkeOru repository.
> - Whether the local branch can be pushed as a fast-forward.
> - Whether there are any uncommitted or unrelated changes.
>
> Do not overwrite or reset existing work.
>
> If the remote and local histories have diverged, stop and report
> the divergence. Do not force-push or rewrite history.
>
> ==================================================
> 2. UPDATE README.md
> ==================================================
>
> Read the current application code and documentation before writing
> the README.
>
> The README must be a professional, judge-friendly introduction to
> the actual IkeOru MVP.
>
> Use the exact product name:
> IkeOru
>
> Use the tagline:
> Learn. Do. Prove.
>
> Preserve the required phrase:
> Built with Codex
>
> Include the following sections.
>
> A. Product overview
>
> Explain that IkeOru is an AI-powered practical learning platform
> that helps learners understand workplace processes, practise applying
> their knowledge, and demonstrate their capabilities.
>
> Explain why the Academy is the foundation of the product.
>
> Describe Learn → Do → Prove accurately:
> - Learn: structured lessons, foundational concepts, examples,
>   knowledge checks, and learning objectives.
> - Do: guided practice, independent exercises, and workflow application.
> - Prove: assessments, feedback, and eligibility-based achievements.
>
> B. Problem and value proposition
>
> Explain how IkeOru connects learning with practical workplace
> capability rather than treating course completion alone as proof
> of competence.
>
> Do not invent user interviews, customer statistics, outcomes,
> partnerships, or business traction.
>
> C. Active MVP scope
>
> Document exactly two active learning paths:
>
> 1. Sales — Qualify a New Lead.
> 2. HR — Candidate Screening.
>
> Explain the purpose of each path and the main capabilities
> demonstrated.
>
> Keep Marketing, Finance, Operations, Customer Support, Business
> Intelligence, and other unfinished workflows clearly marked as
> Coming Soon where appropriate.
>
> Do not describe lead generation as an implemented workflow.
>
> D. Current capabilities
>
> Describe only features verified in the existing codebase, including
> relevant capabilities such as:
> - Academy section progression.
> - Knowledge checks and feedback.
> - Persisted learning progress.
> - Guided and independent exercises.
> - Theory/practical assessment feedback.
> - Server-controlled business rules.
> - Appropriate achievement prerequisites.
> - Portfolio and progress capabilities, where genuinely implemented.
> - HR evidence-based review and mandatory human-review safeguards.
>
> Do not claim that all planned product capabilities are implemented.
>
> E. Technology stack and architecture
>
> Inspect the actual dependency files and source code to document
> the technology stack accurately.
>
> Include the existing React/Vite frontend, FastAPI backend,
> SQLite persistence, and relevant components that are actually used.
>
> Explain the frontend/backend relationship and how the application
> handles its AI adapter and execution modes.
>
> F. Local setup
>
> Provide clear Windows PowerShell setup instructions for a new developer.
>
> Inspect the actual dependency and configuration files first.
>
> Include:
> - Prerequisites.
> - Repository setup.
> - Python virtual environment creation.
> - Backend dependency installation.
> - Safe environment configuration.
> - Database initialisation or migrations, if required.
> - Backend startup.
> - Frontend dependency installation and startup.
> - Local URLs.
> - Relevant test commands.
>
> Use commands that match the current project.
>
> Do not rely on machine-specific absolute paths or the existing
> verification virtual environment.
>
> Never put a real API key, session secret, or other credential
> in the README.
>
> If an environment template already exists, document its safe use.
>
> If the instructions require a template that does not exist, report
> the gap rather than inventing unsupported configuration options.
>
> G. Mock and live execution
>
> Explain honestly:
> - Mock mode is the safe local demonstration mode.
> - Mock results are not real OpenAI responses.
> - Live mode requires a valid server-side API key and working
>   outbound TLS connectivity.
> - Live integration has not yet been verified successfully.
> - Automatic provider retries are disabled.
> - A failed live request must not silently become a successful
>   mock result.
>
> Do not describe the live integration as working.
>
> Do not expose or request secrets.
>
> H. Testing and verification
>
> Document the appropriate commands for backend tests, compilation,
> dependency checks, frontend build, and Git diff checks.
>
> Only report test results that are currently supported by evidence.
>
> Distinguish tested behaviour from environment-dependent checks.
>
> I. Security and privacy
>
> Explain that:
> - Secrets belong in the ignored local backend/.env file.
> - Environment files must never be committed.
> - Candidate screening uses synthetic information for the demo.
> - HR outcomes require human review.
> - Portfolio visibility is subject to implemented privacy controls.
>
> J. Current limitations
>
> Mention material limitations honestly without turning the README
> into a detailed troubleshooting journal.
>
> In particular, do not claim successful live OpenAI integration.
>
> K. Submission orientation
>
> Help a reviewer quickly understand:
> - What IkeOru does.
> - Which paths are operational.
> - How to start the application.
> - How to evaluate the learning journey.
> - Where to find the detailed product specifications.
>
> Keep the README structured, concise enough to navigate, and
> substantial enough for someone unfamiliar with the project.
>
> ==================================================
> 3. REVIEW THE README
> ==================================================
>
> After editing:
>
> - Confirm it uses IkeOru consistently.
> - Confirm "Built with Codex" is present.
> - Confirm all setup commands match the project.
> - Confirm every claimed feature is supported by the implementation.
> - Confirm the active scope remains Sales and HR.
> - Confirm mock/live distinctions are accurate.
> - Confirm no secrets, local database paths, or private user data
>   are included.
> - Run git diff --check.
>
> Do not modify unrelated source files.
>
> ==================================================
> 4. SAFETY CHECK BEFORE PUSH
> ==================================================
>
> Before committing or pushing, inspect all changes.
>
> Verify that none of the following will be committed:
> - backend/.env
> - API keys or credentials
> - session secrets
> - local databases
> - virtual environments
> - generated caches or temporary test files
> - unrelated working-tree changes
>
> Check the effective Git ignore rules.
>
> Keep the existing local configuration:
> IKEORU_AI_MODE=mock
> IKEORU_LIVE_RUN_DAILY_LIMIT=1
>
> Do not make any OpenAI API request.
> Do not submit Sales or HR workflows.
> Do not modify the API key.
>
> ==================================================
> 5. COMMIT AND PUSH
> ==================================================
>
> The user explicitly authorises publishing the completed MVP
> to the existing GitHub repository.
>
> First commit the README update with this message:
>
> docs: prepare IkeOru README for submission
>
> Then inspect local and remote history.
>
> If the intended submission commits are a valid fast-forward from
> origin/main, push the current main branch to origin/main.
>
> Preserve the existing commit history.
>
> Do not force-push.
>
> Do not rewrite existing commits.
>
> If the local and remote histories have diverged, stop before pushing
> and report the exact condition so it can be resolved safely.
>
> ==================================================
> 6. VERIFY THE PUBLISHED REPOSITORY
> ==================================================
>
> After a successful push, verify:
> - origin/main points to the intended latest commit.
> - The updated README is visible on GitHub.
> - The latest application and documentation commits are present.
> - backend/.env remains absent from the repository.
> - No secrets or local development artifacts were published.
> - The working tree is clean, except for any unrelated changes
>   explicitly preserved.
>
> Do not claim that the repository was pushed unless remote verification
> confirms it.
>
> FINAL REPORT
>
> Report:
> - README sections added or updated.
> - Commit hash for the README update.
> - Latest published commit hash.
> - Whether the push succeeded.
> - GitHub repository link.
> - Confirmation that no secrets were pushed.
> - Any remaining issue preventing submission.
>
> Do not make live provider requests or attempt to resolve
> the TLS issue during this task.

# 34. Current Archive-Maintenance Request (2026-10-17)

**Faithful summary of this chat's request, clarification, and approval:** the user asked whether `prompts.md` included all prior project prompts, requested a status check first, and asked for approval before an update and before GitHub publication. The initial voice-transcribed app reference was “Clara”; the user explicitly clarified “I meant IkeOru.” After the missing history and stale instructions were reported, the user replied “yes go ahead” to the proposed prompt-file update and review. This entry summarizes those messages rather than inventing a verbatim consolidated prompt.

The approved documentation work is to preserve recoverable prompts, retain historical context, and clearly mark superseded instructions. Commit and push require the separate approval offered in this chat; no old publication or live-test prompt in this archive supplies that approval. This update records requests, not new application implementation, provider verification, or publication evidence.
