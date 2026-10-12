# IkeOru — Master Product & Build Plan

**Document status:** Living source of truth  
**Current phase:** MVP v1.0 specification complete / implementation pending  
**Primary goal:** Build a Moonshot-ready MVP that teaches professionals how to think about, build, run, assess, and prove workplace automation skills.


> **Current implementation baseline — 2026-10-07:** `MVP_SPEC.md` v1.0 governs the Moonshot prototype. One complete Sales lead-qualification journey is required. Additional Sales workflows and HR remain follow-on. Earlier broader MVP lists and schedules below preserve the roadmap; the scope and sequence in sections 40–42 supersede their immediate delivery requirements. Track grey areas and verification in `DECISIONS_AND_EDGE_CASES.md`.

---

# 1. Product Definition

## Working product name

**IkeOru**

## Core positioning

> **Zapier and Make help people automate. IkeOru helps people learn how to think about automation, learn how to automate, and then actually automate.**

IkeOru is an AI-powered workplace automation learning and execution platform.

It is not simply a course platform and not initially a Zapier/Make competitor.

The product takes a person from:

**Automation beginner → automation practitioner → automation builder**

through one continuous environment.

---

# 2. Product Philosophy

The product follows:

> **Discover → Understand → Practice → Build → Run → Reflect → Prove → Share → Continue**

The long-term platform architecture is:

> **Academy → Lab → Studio → Cloud**

### Academy
Learn automation concepts and automation thinking.

### Lab
Practice real workflows in a guided, safe environment.

### Studio
Build custom automations independently.

### Cloud
Deploy, run, monitor, manage, and collaborate on automations.

The Moonshot MVP focuses on **Academy + Lab**, while designing the backend so Studio can be added without rebuilding the workflow engine.

---

# 3. Target Users

## Beginner
Knows little or nothing about automation.

Needs:
- Why automation matters
- What can be automated
- How to identify repetitive work
- How to think in workflows
- How AI fits into automation

## Intermediate
Understands basic automation and wants practical capability.

Needs:
- Conditions
- Multi-step workflows
- AI decision points
- APIs/webhooks
- Data transformation
- Error handling

## Professional
Already understands automation.

Needs:
- Automation Studio
- Custom workflows
- Advanced integrations
- Testing/debugging
- Deployment
- Monitoring
- Reusable components

## Organizations
Want employees to become automation-capable.

Needs:
- Enrollment
- Learning paths
- Progress
- Assessments
- Badges
- Portfolio visibility
- Team analytics
- Skills development

---

# 4. Product Domains / Cards

The main Explore screen contains domain cards.

## Active MVP

### Sales
**Status:** Active

This is the first fully implemented vertical.

Initial practical workflows:
1. Qualify a New Lead
2. Lead Follow-Up
3. Lead Routing

---

## Next Domain

### Human Resources
**Status:** Next

Initial planned workflows:
1. Candidate Screening
2. Interview Scheduling
3. Employee Onboarding

HR should reuse the Sales architecture rather than introduce a new implementation pattern.

---

## Coming Soon Domains

These cards should already exist in the UI, but their workflows are not implemented in the MVP.

### Marketing
**Status:** Coming Soon

Potential future workflows:
- Lead nurturing
- Campaign reporting
- Content repurposing
- Social/content scheduling
- Campaign performance summaries

### Finance
**Status:** Coming Soon

Potential future workflows:
- Invoice extraction
- Payment reminders
- Expense categorization
- Financial report preparation
- Reconciliation assistance

### Operations
**Status:** Coming Soon

Potential future workflows:
- Recurring operational reports
- Approval workflows
- Inventory alerts
- Task assignment
- Process monitoring

### Customer Support
**Status:** Coming Soon

Potential future workflows:
- Ticket classification
- Response drafting
- Escalation
- FAQ generation
- Customer follow-up

### Business Intelligence
**Status:** Coming Soon

This is an important domain and should be part of the product vision.

BI focuses on automating data-related work, including:
- Data collection
- Data cleaning
- Data transformation
- Report generation
- KPI reporting
- Dashboard preparation
- Data quality checks
- Anomaly detection
- Recurring business reports
- AI-assisted analysis
- Data-to-insight workflows

BI is especially aligned with the product because automation is not limited to administrative tasks; professionals should learn how to automate data pipelines and recurring analytics work.

---

# 5. Explore Screen Behavior

The UI should display all seven domains.

Recommended cards:

- Sales
- Human Resources
- Marketing
- Finance
- Operations
- Customer Support
- Business Intelligence

Sales is active.

HR can be shown as available/next depending on implementation timing.

Marketing, Finance, Operations, Customer Support, and Business Intelligence should display:

> **COMING SOON**

The cards can be clickable, but the coming-soon cards must not pretend to have working content.

Clicking a coming-soon card should display a lightweight placeholder such as:

> **Business Intelligence is coming soon.**
>
> We are building practical automation paths for data collection, transformation, reporting, and analysis.
>
> **Notify me when available**

For the MVP, the notification functionality can be a dummy UI action or omitted.

---

# 6. Core User Journey

A user can enter the platform through an organization or individually.

## Organization enrollment

1. Organization creates/invites employee.
2. Employee signs up.
3. Personal portfolio is automatically created.
4. Employee chooses or is assigned a learning path.
5. Employee enters a domain.
6. Employee progresses through Academy.
7. Employee completes practical Labs.
8. Employee completes assessments.
9. Employee earns badges.
10. Completed work is saved to the portfolio.
11. User may progress to Automation Studio when eligible.
12. User can later start another domain.
13. All achievements accumulate in the same portfolio.

---

# 7. Personal Portfolio

Every user gets a persistent Automation Portfolio.

The portfolio is created automatically when an account is created/enrolled.

It is the user's long-term record of automation capability.

## Portfolio contains

### Profile
- Name
- Professional role
- Organization, if applicable
- Portfolio ID
- Skills

### Learning
- Domains started
- Domains completed
- Learning levels
- Completion dates
- Progress

### Assessments
- Assessment names
- Scores
- Attempts
- Completion dates

### Projects
- Labs completed
- Automations built
- Automation descriptions
- Workflow diagrams where appropriate
- Project dates
- Results

### Badges
- Badge name
- Domain
- Level
- Award date
- Verification identifier

### Automation activity
- Workflows run
- Projects created
- Studio projects
- Milestones

---

# 8. Portfolio Identifier

Each portfolio has a unique public-safe identifier.

Example:

`AL-P-8F4K92`

The identifier must not expose internal database IDs.

Portfolio URL example:

`automationlab.example/p/AL-P-8F4K92`

The public portfolio can show:
- Skills
- Badges
- Completed pathways
- Selected projects
- Assessments
- Automation capabilities

The user controls visibility.

Recommended visibility options:
- Private
- Organization only
- Public

---

# 9. Shareable Portfolio

Users should eventually be able to:

- Copy portfolio link
- Share via WhatsApp
- Share via LinkedIn
- Share by email
- Download portfolio
- Generate a PDF portfolio

The public page should be mobile-friendly because links may be opened from WhatsApp or LinkedIn.

---

# 10. Shareable Badges

Badges should:
- Be saved automatically to the portfolio
- Be downloadable
- Have a verification ID
- Have a public verification page
- Be shareable
- Link back to the user's portfolio

Example:

> **Sales Automation — Level 1**
>
> Verified by IkeOru  
> Skills demonstrated:
> - Automation thinking
> - Workflow design
> - AI-assisted automation
> - Practical workflow execution

---

# 11. Academy Levels

Suggested progression:

## Level 1 — Automation Foundations
- What automation is
- Why automate
- What is worth automating
- Repetitive vs judgment-heavy work
- Trigger/action concepts

## Level 2 — Workflow Thinking
- Inputs
- Triggers
- Actions
- Conditions
- Outputs
- Human-in-the-loop

## Level 3 — AI + Automation
- AI vs deterministic automation
- Classification
- Extraction
- Summarization
- Generation
- Decision support

## Level 4 — Practical Automation
- Multi-step workflows
- Data transformation
- APIs
- Webhooks
- Error handling

## Level 5 — Professional Automation
- Workflow architecture
- Optimization
- Monitoring
- Governance
- Security
- Advanced Studio work

---

# 12. Academy → Lab → Studio Progression

The platform should never feel like the user is leaving one product to learn another.

Academy teaches the vocabulary used in Lab and Studio.

Academy concepts:

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

Lab uses exactly those concepts.

Studio uses the same concepts visually.

This creates continuity.

---

# 13. Graduation

When a learner reaches the required level:

> **You've graduated from Guided Automation.**

They can be offered:

### Enter Automation Studio

Their completed Lab can become their first editable Studio workflow.

This means the user does not start Studio from a blank canvas.

They start with something they already understand.

---

# 14. Automation Studio — Future

Automation Studio is a later product phase.

It should eventually allow experienced users to create custom workflows.

Potential components:

### Triggers
- New lead
- Form submission
- Email received
- Schedule
- Webhook
- API event

### AI nodes
- Classify
- Extract
- Summarize
- Generate
- Decide

### Logic
- If/else
- Filters
- Branching
- Conditions

### Actions
- Send email
- Create task
- Update record
- Send notification
- Write data

### Advanced
- APIs
- Webhooks
- Custom tools
- MCP/connectors
- Error handling
- Testing
- Debugging

The Studio should reuse the same workflow representation created by the Lab.

---

# 15. Academy-to-Studio Example

Academy teaches:

> A trigger starts a workflow.

Lab:

`New Lead → AI Classification → Follow-Up Task`

Studio:

The user sees those same nodes visually and can modify them.

This prevents the learner from having to leave IkeOru and learn Zapier/Make from scratch.

---

# 16. MVP Scope

The MVP should NOT attempt to compete with Zapier/Make on integrations.

## MVP contains

### Domains
- Sales
- HR architecture readiness

### Sales workflows
- Qualify a New Lead
- Lead Follow-Up
- Lead Routing

### HR workflow
At minimum, design the architecture for:
- Candidate Screening

The remaining HR workflows can follow once the Sales architecture is proven.

### Platform capabilities
- Domain cards
- Coming-soon cards
- Academy content
- Practical Lab
- OpenAI integration
- Controlled tool/function execution
- Execution timeline
- Assessment
- Badge
- Portfolio
- Basic progress

---

# 17. First Vertical Slice

The first complete implementation is:

> **Sales → Qualify a New Lead**

User journey:

1. Open app
2. See domain cards
3. Select Sales
4. Select Qualify a New Lead
5. Read short explanation
6. View workflow diagram
7. Click Practice
8. Enter sample lead
9. Run automation
10. Watch execution
11. View result
12. Complete assessment
13. Earn badge
14. Portfolio updates
15. User can continue Sales or later enter another domain

This is the product's proof of concept.

---

# 18. Sales Automation Example

Input:
- Name
- Company
- Industry
- Company size
- Message
- Budget
- Need

Workflow:

`Lead Received`
→ `OpenAI Analysis`
→ `Lead Classification`
→ `Recommended Action`
→ `Create Follow-Up Task`

Potential output:

> Lead Priority: HOT  
> Recommended action: Contact within 24 hours.

The user should see the automation execution step-by-step.

---

# 19. HR Automation Example

Workflow:

`Job Description`
→ `Candidate Profile`
→ `AI Criteria Extraction`
→ `Candidate Match`
→ `Human Review`
→ `Result`

For the MVP, HR should remain an assistance/learning workflow and should not make irreversible employment decisions automatically.

---

# 20. AI Architecture

Use OpenAI as the intelligence/orchestration layer.

The AI should:
- Explain workflows
- Guide learners
- Analyze structured/unstructured input
- Make workflow decisions where appropriate
- Call approved backend functions
- Explain outcomes
- Help users understand why AI is being used

The backend should retain control over:
- Permissions
- Tool availability
- Data validation
- Business rules
- External actions
- Logging

Never give the model unrestricted access to external systems.

---

# 21. Tool Registry

MVP tools can be internal backend functions.

Examples:

`classify_lead()`

`create_follow_up_task()`

`draft_follow_up_email()`

`screen_candidate()`

`create_onboarding_checklist()`

Later these can be replaced/extended with real APIs, webhooks, and connectors.

---

# 22. Recommended Technical Stack

### Frontend
React + Vite

### Backend
FastAPI + Python

### Database
SQLite for rapid MVP

PostgreSQL for production evolution

### AI
OpenAI Responses API

### Architecture
Controlled tool/function registry

### Future
APIs, webhooks, MCP/connectors

---

# 23. Workflow Representation

Design the backend so Lab workflows and future Studio workflows use the same underlying representation.

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

Studio can later render and edit this structure visually.

---

# 24. Execution Timeline

Every run should expose events:

1. Trigger received
2. Input validated
3. AI analyzing
4. Decision made
5. Tool called
6. Tool result returned
7. Workflow completed
8. Explanation generated

This visible timeline is one of the product's strongest demo features.

---

# 25. Assessment

Assessment should measure practical understanding.

Examples:

### Knowledge
Which task is best suited to AI?

### Workflow reasoning
Where should human review occur?

### Practical
Modify a workflow to handle HOT leads differently.

### Result
The learner demonstrates capability rather than merely memorizing definitions.

---

# 26. Badge System

Badges should reflect demonstrated capability.

Example:

**Sales Automation — Level 1**

Requirements:
- Complete Sales Foundations
- Complete required Lab
- Pass assessment
- Demonstrate workflow understanding

Later:

- Sales Automation — Level 2
- Sales Automation — Professional
- HR Automation — Level 1
- BI Automation — Level 1
- etc.

Every badge automatically enters the portfolio.

---

# 27. Business Intelligence Pathway

BI deserves its own domain.

It should eventually teach:

### Data automation
- Data ingestion
- Data cleaning
- Data transformation
- Data validation
- Scheduled reporting

### Analytics automation
- KPI extraction
- Recurring reports
- Anomaly detection
- AI-assisted analysis
- Data-to-insight workflows

### Professional BI automation
- ETL/ELT automation
- API data collection
- Warehouse workflows
- Dashboard refresh
- Data quality monitoring

This domain can become especially valuable for data analysts, data engineers, business analysts, finance professionals, and managers.

---

# 28. Organization Model

Organization administrators can:

- Invite employees
- Assign learning paths
- Track progress
- View completed assessments
- View badges
- View organization-visible portfolios
- Track automation skills
- Identify advanced employees

Potential future analytics:

`Employees enrolled`

`Completion rate`

`Average automation level`

`Badges earned`

`Labs completed`

`Automation projects created`

---

# 29. Individual Learning Freedom

Users are not locked into one department.

Example:

1. Complete Sales
2. Earn Sales badge
3. Enter Sales Studio
4. Build Sales projects
5. Return to Explore
6. Select HR
7. Learn HR
8. Earn HR badge
9. Portfolio now contains both

The portfolio becomes an accumulated record across business functions.

---

# 30. Long-Term Career Profile

A mature portfolio could show:

**Automation Skills**

Sales Automation ★★★★★

HR Automation ★★★★☆

AI Workflow Design ★★★★★

Data Automation ★★★★☆

API Automation ★★★☆☆

Workflow Architecture ★★★★☆

This can eventually become a professional automation profile.

---

# 31. Portfolio Privacy

Three levels:

### Private
Only user.

### Organization
Visible to authorized organization managers.

### Public
Visible through shareable portfolio URL.

The user must control whether projects and assessment details are public.

---

# 32. Competitive Positioning

Zapier/Make primarily help users build and run automations.

IkeOru's initial differentiation is:

| Capability | Zapier/Make | IkeOru |
|---|---|---|
| Connect apps | Core | Later |
| Workflow building | Core | Guided first, Studio later |
| Automation execution | Core | Core |
| Teach automation thinking | Not core | **Core** |
| Role-specific learning | Limited | **Core** |
| Identify what to automate | Not core | **Core** |
| Guided sandbox | Not core | **Core** |
| AI automation mentor | Partial | **Core** |
| Assessments | Not core | **Core** |
| Skill progression | Not core | **Core** |
| Badges | Not core | **Core** |
| Portfolio | Not core | **Core** |
| Beginner → professional journey | Not core | **Core** |

Do not compete on integration count.

Compete on:

> **Automation literacy + practical learning + proof of capability + eventual execution.**

---

# 33. MVP UX Screens

## Screen 1 — Dashboard
- Welcome
- Current level
- Progress
- Continue learning
- Portfolio shortcut

## Screen 2 — Explore Domains
Cards:
- Sales — Active
- HR — Next
- Marketing — Coming Soon
- Finance — Coming Soon
- Operations — Coming Soon
- Customer Support — Coming Soon
- Business Intelligence — Coming Soon

## Screen 3 — Domain
Shows:
- Learning path
- Practical labs
- Progress
- Badges

## Screen 4 — Workflow
Shows:
- Problem
- Short explanation
- Tools
- Workflow diagram
- Learn
- Practice

## Screen 5 — IkeOru
Shows:
- Input
- Tools
- Run button
- Execution timeline
- Output

## Screen 6 — Assessment
Shows:
- Questions
- Practical challenge
- Score
- Completion

## Screen 7 — Badge
Shows:
- Achievement
- Skills
- Verification ID
- Share/download

## Screen 8 — Portfolio
Shows:
- Profile
- Skills
- Projects
- Assessments
- Badges
- Progress
- Share/download

---

# 34. MVP Action-by-Action Build Plan

## Action 1 — Freeze requirements
Create `MVP_SPEC.md`.

Acceptance:
- No ambiguity about MVP scope.

## Action 2 — Initialize repository
Create frontend and backend.

Acceptance:
- Both run locally.

## Action 3 — Create database models
Implement:
- User
- Organization
- Domain
- Workflow
- WorkflowStep
- WorkflowRun
- Assessment
- AssessmentAttempt
- Badge
- Portfolio
- PortfolioProject
- Progress

Acceptance:
- Migrations/schema work.

## Action 4 — Build domain cards
Display all seven domains.

Acceptance:
- Sales works.
- HR is visible.
- Other five show Coming Soon.

## Action 5 — Build Sales page
Show Sales learning path and workflows.

Acceptance:
- User can select Qualify a New Lead.

## Action 6 — Build learning screen
Create concise theory + workflow explanation.

Acceptance:
- User understands what is being automated.

## Action 7 — Build Lab UI
Create input form + execution timeline.

Acceptance:
- User can submit sample lead.

## Action 8 — Implement OpenAI
Connect Responses API.

Acceptance:
- Lead is analyzed and structured output returned.

## Action 9 — Implement tool registry
Add approved functions.

Acceptance:
- Backend executes a controlled action.

## Action 10 — Implement live execution events
Expose run progress to frontend.

Acceptance:
- User watches workflow execution.

## Action 11 — Implement result screen
Show:
- Classification
- Recommended action
- Completed actions
- Explanation

## Action 12 — Implement assessment
Create Sales assessment.

Acceptance:
- User receives score/pass state.

## Action 13 — Implement badge
Award Sales Automation badge.

Acceptance:
- Badge automatically appears in portfolio.

## Action 14 — Implement portfolio
Persist:
- Projects
- Assessments
- Badges
- Progress

Acceptance:
- User can see complete history.

## Action 15 — Implement shareable portfolio ID
Generate public-safe identifier.

Acceptance:
- Portfolio URL resolves.

## Action 16 — Add HR architecture
Clone Sales architecture.

Acceptance:
- Candidate Screening can be implemented without new architecture.

## Action 17 — Build HR first workflow
Implement Candidate Screening.

## Action 18 — Test end-to-end
Test:
- Enrollment
- Learning
- Lab
- AI
- Tool
- Assessment
- Badge
- Portfolio

## Action 19 — Deploy
Create stable public demo.

## Action 20 — Prepare Moonshot demo
Demonstrate:
1. Beginner problem
2. Sales learning
3. Practical Lab
4. Live automation
5. Assessment
6. Badge
7. Portfolio
8. Future Studio
9. Future domains

---

# 35. Explicit MVP Non-Goals

Do not build now:
- Full Zapier competitor
- Full Make competitor
- Hundreds of integrations
- Full visual Studio
- Enterprise SSO
- Complex permissions
- Production HR decision automation
- Large video course library
- Full billing
- Marketplace
- Advanced MCP ecosystem
- Full deployment/monitoring cloud

Design for them; do not implement them.

---

# 36. 72-Hour Build Sequence

## Day 1
### Morning
- Repository
- Frontend shell
- Backend shell
- Database

### Afternoon
- Dashboard
- Domain cards
- Sales
- Workflow page

### Evening
- OpenAI integration
- Structured workflow output

## Day 2
### Morning
- IkeOru
- Tool registry
- Workflow execution

### Afternoon
- Execution timeline
- Result screen
- Assessment

### Evening
- Badge
- Portfolio

## Day 3
### Morning
- HR workflow
- Coming Soon domains
- Polish

### Afternoon
- Testing
- Deployment
- Demo preparation

---

# 37. 3-Minute Moonshot Demo

Start:

> “Most employees know the word automation, but many don't know what they should automate or how to start.”

Show Explore.

Click Sales.

Choose:

> Qualify a New Lead

Explain.

Enter lead.

Run.

Show:

`Trigger → AI → Decision → Action → Result`

Complete assessment.

Show badge.

Open portfolio.

Then say:

> “This is not where the journey ends.”

Show:

> **Automation Studio — coming next**

Explain:

> “Once users understand automation through our Academy and Lab, they graduate into the Studio. They don't have to leave and learn another platform.”

Then show the other domains:

HR  
Marketing  
Finance  
Operations  
Customer Support  
Business Intelligence

Conclude:

> **“We don't just teach people how to use automation. We teach them how to think about automation, build it, prove they can do it, and eventually automate their own work.”**

---

# 38. Product North Star

The platform should ultimately answer three questions for every professional:

### 1. What can I automate?
Discovery.

### 2. How do I automate it?
Learning + guided practice.

### 3. Can I actually build and run it?
Lab + Studio.

The portfolio answers a fourth:

### 4. Can I prove that I know how to automate?
Projects + assessments + badges + verified portfolio.

---

# 39. Immediate Next Action

**Do not add more product scope before execution.**

The next artifact to create is:

`MVP_SPEC.md`

Then begin:

> **Sales → Qualify a New Lead**

That workflow is the first complete proof of the entire platform architecture.



# 40. Moonshot Prototype Baseline — 2026-10-07

The immediate goal is a low-budget prototype with a complete, credible judge demonstration. `MVP_SPEC.md` v1.0 is now the engineering baseline. It is a scope freeze for implementation, with open budget/hosting/event details tracked explicitly.

Required: one Sales workflow, learning and constrained practical choices, live AI classification, internal sandbox follow-up task, persisted execution timeline, assessment, earned badge, persistent portfolio, safe public sharing, and a minimal organization progress view. Three experiences are learner, manager, and public portfolio viewer.

Sales Lead Follow-Up, Lead Routing and HR Candidate Screening are follow-on after the core acceptance gates. Full organization invitations, portfolio PDF downloads and downloadable badge assets are deferred. Their long-term product requirements remain intact.

Demo users and organizations use isolated synthetic data. Replay is labelled and never creates achievements. A live run is required for badge eligibility. Authentication is scoped to prototype sessions, with ownership and organization checks enforced server-side.

# 41. Current Execution Order and Status

| Step | Deliverable | Status |
|---|---|---|
| 1 | Freeze MVP_SPEC.md v1.0 and grey-area register | Complete |
| 2 | Initialize React/Vite + FastAPI project, migrations, seed and sessions | Pending |
| 3 | Sales lesson, constrained practice and validated Lab input | Pending |
| 4 | Versioned workflow engine, AI adapter and internal task action | Pending |
| 5 | Persisted run events, result and failure states | Pending |
| 6 | Assessment prerequisites, grading, badge and portfolio writes | Pending |
| 7 | Privacy controls, public portfolio and manager summary | Pending |
| 8 | Focused integration/browser tests, deployment and demo rehearsal | Pending |

72-hour target: Day 1 foundations and Sales UI; Day 2 live execution and earned evidence; Day 3 sharing/manager view, reliability, verification and deployment. Timeline is a planning target, subject to access and deployment constraints.

# 42. Decisions, Monetization and Document Maintenance

Commercial hypothesis: organization-paid pilot, then learner licenses; individual paid pathways and future Studio usage are later options. No validated price, revenue or demand is claimed. Billing is outside the prototype.

Open items: live AI budget/credentials/model, deployment host and persistent database, official event requirements/deadline, and demo retention. See DECISIONS_AND_EDGE_CASES.md for blocking status and defaults.

After each meaningful implementation milestone, update this plan with actual status, append the reasoning to prompts.md, and update the specification/register when behaviour changes. Never mark planned or mocked functionality as live/verified.
