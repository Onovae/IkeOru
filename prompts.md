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
