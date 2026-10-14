"""Server-owned catalog, workflow definition, and assessment content."""

from __future__ import annotations

from typing import Any

from .schemas import HR_WORKFLOW_KEY, SALES_WORKFLOW_KEY, WORKFLOW_KEY


# Backwards-compatible Sales aliases used by the original vertical slice.
WORKFLOW_VERSION = "1.0"
RUBRIC_VERSION = "1.0"
ASSESSMENT_KEY = WORKFLOW_KEY
BADGE_KEY = "sales-automation-level-1"
HR_ASSESSMENT_KEY = HR_WORKFLOW_KEY
HR_BADGE_KEY = "hr-evidence-review-level-1"


def _concept(term: str, meaning: str, why: str, example: str, mistake: str, correct_signal: str, incorrect_signal: str) -> dict[str, str]:
    return {
        "term": term,
        "meaning": meaning,
        "why_it_matters": why,
        "example": example,
        "common_mistake": mistake,
        "correct_application": correct_signal,
        "incorrect_application": incorrect_signal,
    }


SALES_ACADEMY: list[dict[str, Any]] = [
    {
        "id": "sales-orientation",
        "title": "Orient yourself in the sales process",
        "objective": "Explain where lead qualification fits in a sales process and identify the capability this path develops.",
        "overview": "Sales teams turn interest into useful conversations and eventually customer relationships. Lead qualification is the disciplined step between receiving interest and deciding what deserves attention next.",
        "concepts": [
            _concept("Lead", "A person or organisation that has shown some signal of interest.", "A shared definition prevents a team from treating every name or message as an equally urgent opportunity.", "A fictional operations manager asks for a product demonstration.", "Calling every contact a ready-to-buy customer creates false urgency.", "The record describes a supplied signal and its source.", "The record assumes purchase intent that was never supplied."),
            _concept("Qualification", "A structured judgement about fit, need, timing, and available evidence.", "Consistent qualification helps a team focus scarce follow-up time without pretending to know more than the evidence shows.", "The team records an immediate need and a request for a discussion this week.", "Confusing qualification with a final sales decision.", "The outcome is proportional to the evidence and states what remains unknown.", "The outcome invents certainty or a contact detail."),
            _concept("Next step", "A bounded internal action that follows from a qualified outcome.", "A qualification result only helps a team when it leads to an accountable, permitted follow-up or review.", "A HOT lead creates an internal task for the team.", "Sending an external message automatically from an uncertain classification.", "The server selects an allowed internal task or an intentional skip.", "The model directly contacts a person or changes the source record."),
        ],
        "worked_example": {
            "scenario": "A synthetic lead says the sales team needs to automate lead triage this week and asks for a demonstration.",
            "evidence": "The supplied message contains a concrete need, a near-term timeframe, and a request for a next conversation.",
            "reasoning": "A practitioner records those supplied signals, avoids adding a budget or contact detail, and lets the server policy determine the permitted branch.",
            "result": "The result may be HOT when the structured evidence supports urgency; an internal follow-up task is the only permitted action.",
            "contrast": "If timing is absent or the message is contradictory, NEEDS_REVIEW is more responsible than guessing.",
        },
        "knowledge_check": {
            "id": "sales_orientation_check",
            "prompt": "Which statement best describes qualification in this learning path?",
            "options": [
                {"id": "a", "label": "It proves that a lead will become a customer."},
                {"id": "b", "label": "It structures supplied evidence so the next internal step is proportionate."},
                {"id": "c", "label": "It replaces the sales team’s judgement with an automatic message."},
            ],
        },
    },
    {
        "id": "sales-lead-language",
        "title": "Learn the language of a lead",
        "objective": "Distinguish a lead, prospect, and customer, and explain lead generation versus lead qualification.",
        "overview": "Lead generation creates or discovers possible contacts. Lead qualification evaluates supplied signals. A prospect has enough mutual relevance for a sales conversation; a customer has an established relationship. These are concepts, not extra workflows in this MVP.",
        "concepts": [
            _concept("Lead generation", "Activities that create awareness or collect possible contacts.", "Separating generation from qualification prevents the team from treating finding a name as evidence of readiness.", "A fictional webinar signup can become a lead record.", "Presenting lead generation as an available IkeOru workflow in this MVP.", "Teach it as context, then keep the practical path focused on qualification.", "Launching an unfinished generation or enrichment action."),
            _concept("Prospect", "A lead with enough relevant, supplied evidence to justify a sales conversation.", "The label should reflect evidence, not a guess based on a name or company alone.", "A team confirms a relevant need and agrees to discuss it.", "Using a job title or company prestige as proof of need.", "Cite the message, need, timing, or other supplied field.", "Cite information that is absent or unrelated."),
            _concept("Customer", "An organisation or person with an established purchasing relationship.", "A qualification exercise does not create or confirm a customer relationship.", "A customer status would come from a separate business record, not this run.", "Calling a HOT lead a customer.", "Use only the workflow’s defined HOT/WARM/COLD/NEEDS_REVIEW outcomes.", "Turn an internal classification into a commercial fact."),
        ],
        "worked_example": {
            "scenario": "A fictional contact downloads a guide but supplies no business need or timing.",
            "evidence": "The download is a lead-generation signal; it is not enough by itself to establish a qualified prospect.",
            "reasoning": "Ask what the supplied message actually supports. Keep missing need and timing visible rather than upgrading the label.",
            "result": "The path may require review or a lower-priority outcome depending on the full supplied input.",
            "contrast": "A relevant request with a clear timeframe is stronger qualification evidence than a generic download.",
        },
        "knowledge_check": {
            "id": "sales_lead_language_check",
            "prompt": "Why does this MVP teach lead generation as a concept but not implement it as a workflow?",
            "options": [
                {"id": "a", "label": "Because lead generation and qualification are identical."},
                {"id": "b", "label": "Because the active practical scope is qualification; generation is context only."},
                {"id": "c", "label": "Because lead generation never uses evidence."},
            ],
        },
    },
    {
        "id": "sales-evidence-criteria",
        "title": "Use evidence and criteria",
        "objective": "Identify qualification evidence, separate facts from assumptions, and handle missing or conflicting information.",
        "overview": "A reliable qualification decision is a traceable interpretation of supplied fields. Useful signals can include the stated need, message, company context, budget when supplied, and purchase timeframe. Unknown is different from zero, and absence is not a negative fact.",
        "concepts": [
            _concept("Evidence", "A field or statement actually supplied in the synthetic input.", "Evidence lets another person inspect why a result was reached.", "The message says the team wants a demonstration this week.", "Adding a budget, email address, or company fact that was not supplied.", "Name the input field that supports the interpretation.", "Use a plausible but absent detail as if it were known."),
            _concept("Criterion", "A business-relevant lens used consistently to interpret evidence.", "Criteria reduce arbitrary decisions and help a learner explain what the workflow can and cannot establish.", "Need and timing are considered alongside the supplied message.", "Changing the criteria for each lead to obtain a preferred outcome.", "Apply the same server-owned policy to comparable evidence.", "Use the candidate’s name, browser, or unrelated metadata."),
            _concept("Uncertainty", "A visible limit in what the supplied input supports.", "Uncertainty is a useful result: it tells the team when review or more information is needed.", "A contradictory message has no reliable timeframe.", "Treating a blank field as proof that the lead has no need.", "List missing information and use NEEDS_REVIEW when appropriate.", "Hide the gap behind a confident label."),
        ],
        "worked_example": {
            "scenario": "A synthetic lead mentions a growing team but gives no budget and says timing is undecided.",
            "evidence": "Company context is supplied, while budget and timing are unknown rather than zero or negative.",
            "reasoning": "Record what is present, keep the unknowns visible, and avoid using team size as a proxy for urgency.",
            "result": "A WARM or NEEDS_REVIEW outcome must be grounded in the complete supplied message, never invented certainty.",
            "contrast": "A missing budget alone is not proof of low value; a contradictory message may require review.",
        },
        "knowledge_check": {
            "id": "sales_evidence_criteria_check",
            "prompt": "A lead provides no budget. What is the most responsible interpretation?",
            "options": [
                {"id": "a", "label": "Treat the budget as zero."},
                {"id": "b", "label": "Invent a typical budget from the company size."},
                {"id": "c", "label": "Keep the budget unknown and rely only on supplied evidence."},
            ],
        },
    },
    {
        "id": "sales-outcomes-policy",
        "title": "Reason through the four outcomes",
        "objective": "Explain HOT, WARM, COLD, and NEEDS_REVIEW and connect each outcome to the server-controlled next step.",
        "overview": "The labels are not grades for people. They are bounded workflow outcomes. HOT and WARM create permitted internal follow-up tasks, COLD intentionally skips task creation, and NEEDS_REVIEW creates an internal review task when evidence is incomplete or contradictory.",
        "concepts": [
            _concept("HOT", "A supplied lead signal supports prompt internal follow-up.", "Urgency must be explained with evidence and the selected HOT timing rule.", "A near-term request for a demonstration with a concrete need.", "Treating enthusiasm without a supplied need as HOT.", "Create only the configured internal task.", "Send an external message or promise a conversion."),
            _concept("WARM", "A plausible opportunity that merits follow-up within the server’s 72-hour policy.", "WARM avoids losing a useful conversation without pretending it is urgent.", "The team is exploring options but gives no immediate deadline.", "Using WARM as a synonym for HOT.", "Create a task due within 72 hours.", "Override the due window from the model output."),
            _concept("COLD / NEEDS_REVIEW", "COLD intentionally completes without a task; NEEDS_REVIEW records uncertainty for an internal reviewer.", "The distinction prevents both over-processing and over-confidence.", "A clear lack of current need may be COLD; contradictory text may need review.", "Collapsing every uncertain case into COLD.", "Use the server branch and explain the missing or conflicting evidence.", "Hide uncertainty or create an unapproved action."),
        ],
        "worked_example": {
            "scenario": "Three synthetic messages describe immediate need, exploratory interest, and contradictory instructions.",
            "evidence": "The first has timing and need; the second has interest without urgency; the third cannot be interpreted safely.",
            "reasoning": "Apply one policy consistently and preserve the reason for each branch.",
            "result": "HOT creates the selected task, WARM creates a 72-hour task, and NEEDS_REVIEW creates an internal review task.",
            "contrast": "COLD is a successful intentional skip, not a failed run.",
        },
        "knowledge_check": {
            "id": "sales_outcomes_policy_check",
            "prompt": "Which outcome intentionally completes without creating an internal task?",
            "options": [
                {"id": "a", "label": "HOT"},
                {"id": "b", "label": "WARM"},
                {"id": "c", "label": "COLD"},
            ],
        },
    },
    {
        "id": "sales-ai-boundary",
        "title": "Use AI without giving away control",
        "objective": "Explain what AI contributes to lead qualification, what it cannot establish, and why the server owns policy and actions.",
        "overview": "AI can interpret supplied language into a structured result. It cannot verify an identity, browse for facts, execute code, send messages, or turn uncertainty into truth. The backend validates the response and owns permitted effects.",
        "concepts": [
            _concept("AI interpretation", "A bounded analysis of supplied text and fields against a fixed rubric.", "The learner can use language understanding while keeping business effects deterministic.", "The adapter identifies that a message mentions a near-term demonstration.", "Treating a model explanation as a command to call a CRM or URL.", "Validate a structured result before server policy runs.", "Let the model choose tools, SQL, or external recipients."),
            _concept("Deterministic policy", "Server code that maps a validated outcome to an allowed internal effect.", "Policy makes task timing and review safeguards reproducible.", "A WARM result always maps to a 72-hour internal follow-up task.", "Letting a prompt redefine the due date or task type.", "The server, not the model, controls task creation.", "Trust a model-generated action instruction."),
            _concept("Human boundary", "A point where a person must interpret uncertainty or make a consequential decision.", "Automation should make review easier, not hide responsibility.", "A contradictory lead is routed to an internal reviewer.", "Claiming the system has verified intent or a commercial decision.", "Show evidence, gaps, and a safe next step.", "Present a probability or invented confidence as fact."),
        ],
        "worked_example": {
            "scenario": "A lead message contains instruction-like text asking the assistant to ignore the qualification rules.",
            "evidence": "The text is still untrusted lead data; it cannot change the rubric or tool permissions.",
            "reasoning": "Validate the input and structured output, then let the server policy determine the permitted branch.",
            "result": "The system may classify the lead as NEEDS_REVIEW and create only the internal review task.",
            "contrast": "No model response can authorize a message, external URL, or arbitrary code execution.",
        },
        "knowledge_check": {
            "id": "sales_ai_boundary_check",
            "prompt": "Which responsibility must remain in deterministic backend code?",
            "options": [
                {"id": "a", "label": "Choosing and creating the permitted internal task."},
                {"id": "b", "label": "Inventing a missing lead contact detail."},
                {"id": "c", "label": "Sending a message to an external recipient."},
            ],
        },
    },
    {
        "id": "sales-responsible-review",
        "title": "Review outcomes responsibly",
        "objective": "Evaluate a qualification result, explain its next step, and recognise when more information or human review is required.",
        "overview": "A practitioner closes the loop by inspecting the result and timeline, checking evidence and gaps, and deciding what remains to be done. A run can be complete without proving mastery, and a mock run can be useful practice without being live evidence.",
        "concepts": [
            _concept("Result review", "A deliberate explanation of outcome, evidence, gaps, and permitted next action.", "Review turns an automation output into learnable workplace reasoning.", "The learner explains why COLD skipped task creation.", "Reading only the label and ignoring missing fields.", "Connect the result to the supplied evidence and policy.", "Treat a label as a complete business judgement."),
            _concept("Practical completion", "A guided exercise reaches an honest terminal result and persisted timeline.", "It records practice while remaining distinct from assessment and competence.", "A mock run completes and shows ordered events.", "Calling a queued or failed run complete.", "Use the persisted terminal state and mode label.", "Hide failure or call replay live."),
            _concept("Demonstrated capability", "A narrow claim supported by the defined lesson, eligible evidence, and passing assessment.", "Evidence boundaries protect learners and people affected by workplace decisions.", "A path-specific achievement after all server prerequisites are met.", "Calling a lesson click or mock run a certification.", "Use the exact server-issued state and scope.", "Infer broad mastery from one successful screen."),
        ],
        "worked_example": {
            "scenario": "The run finishes in NEEDS_REVIEW with a saved internal task and a missing timeframe.",
            "evidence": "The timeline shows validation, structured evaluation, policy, task creation, and persistence.",
            "reasoning": "Explain that the system preserved uncertainty and routed a reviewer; do not upgrade it to HOT or a final decision.",
            "result": "The learner can review the result and continue to the assessment, while the achievement boundary remains server-controlled.",
            "contrast": "A failed or interrupted run remains incomplete and cannot be presented as capability evidence.",
        },
        "knowledge_check": {
            "id": "sales_responsible_review_check",
            "prompt": "What makes a qualification result responsibly explainable?",
            "options": [
                {"id": "a", "label": "A confident label with no supporting fields."},
                {"id": "b", "label": "A model-generated contact recommendation."},
                {"id": "c", "label": "The supplied evidence, visible gaps, policy branch, and honest next step."},
            ],
        },
    },
]


HR_ACADEMY: list[dict[str, Any]] = [
    {
        "id": "hr-orientation",
        "title": "Orient yourself in candidate screening",
        "objective": "Explain the purpose of screening and the narrow capability this synthetic learning path develops.",
        "overview": "Candidate screening organises supplied information against a job's explicit requirements before an authorised human reviewer decides what happens next. It is not a hiring decision and does not replace a fair recruitment process.",
        "concepts": [
            _concept("Screening", "A structured comparison of supplied candidate evidence with explicit job-related criteria.", "Consistency helps a reviewer see what is supported and what remains unknown.", "A fictional candidate's support-ticket experience is compared with a stated requirement.", "Treating screening as a ranking or automatic rejection.", "Keep the result criterion-grounded and reviewable.", "Make a final hiring decision from a model label."),
            _concept("Job requirement", "A capability or experience explicitly needed for a defined role.", "Clear criteria make evaluation relevant and reduce arbitrary judgement.", "Experience supporting product questions is a criterion for a support role.", "Using a candidate name or unrelated personal detail as a criterion.", "Write criteria in job-related, observable terms.", "Use a protected characteristic or proxy."),
            _concept("Human review", "An authorised person remains responsible for the next employment decision.", "Employment decisions require context, accountability, and safeguards beyond this prototype.", "A review task is created after evidence mapping.", "Calling HUMAN_REVIEW_REQUIRED an automatic advance or rejection.", "Make the recommendation mandatory and visible.", "Let the model choose who to hire."),
        ],
        "worked_example": {
            "scenario": "A synthetic candidate supplies a work summary and skills for a fictional customer-support role.",
            "evidence": "The supplied text can support some criteria, while other requirements may have no evidence.",
            "reasoning": "Map each criterion once, cite only supplied fields, and leave unknown criteria as missing.",
            "result": "The structured result records evidence status and creates a human-review task.",
            "contrast": "The result never becomes an employment recommendation or final decision.",
        },
        "knowledge_check": {
            "id": "hr_orientation_check",
            "prompt": "What is the purpose of this Candidate Screening path?",
            "options": [
                {"id": "a", "label": "To make the final hiring decision automatically."},
                {"id": "b", "label": "To compare supplied job-related evidence and prepare human review."},
                {"id": "c", "label": "To search the internet for candidate information."},
            ],
        },
    },
    {
        "id": "hr-criteria",
        "title": "Translate a job description into criteria",
        "objective": "Distinguish essential and preferred job-related requirements and explain why explicit criteria matter.",
        "overview": "A job description describes the role; screening criteria make the capabilities observable enough to compare consistently. Criteria should be explicit, relevant, and limited to what the role requires.",
        "concepts": [
            _concept("Essential requirement", "A capability needed for the role's core responsibilities.", "Separating essential from preferred requirements clarifies what evidence a reviewer must prioritise.", "Handling customer product questions is essential for a support role.", "Treating every preferred skill as a rejection gate.", "Label the criterion and inspect the evidence it needs.", "Use a vague or unrelated requirement."),
            _concept("Preferred requirement", "A useful capability that is not necessarily a minimum condition.", "It helps a reviewer discuss development or fit without hiding the difference between required and helpful.", "Experience with a particular ticketing tool may be preferred.", "Turning absence of a preferred tool into an automatic rejection.", "Record the gap for review rather than deciding automatically.", "Collapse all missing information into failure."),
            _concept("Consistency", "Applying the same explicit criteria to each synthetic candidate.", "Consistency makes outcomes explainable and limits arbitrary judgement.", "Each criterion receives exactly one supported, unclear, or not-evidenced status.", "Changing the standard because a name sounds familiar.", "Use criterion IDs and supplied fields only.", "Use personal identity or a proxy as evidence."),
        ],
        "worked_example": {
            "scenario": "A role requires clear customer updates and lists dashboard reporting as preferred.",
            "evidence": "The candidate summary supports written updates but says nothing about dashboards.",
            "reasoning": "Mark the first criterion supported and the second not evidenced; neither permits an automatic decision.",
            "result": "The reviewer sees the distinction and decides what additional evidence is appropriate.",
            "contrast": "A missing preferred skill is not proof that the candidate cannot perform the role.",
        },
        "knowledge_check": {
            "id": "hr_criteria_check",
            "prompt": "What makes a screening criterion appropriate for this workflow?",
            "options": [
                {"id": "a", "label": "It is explicit, job-related, and observable in supplied evidence."},
                {"id": "b", "label": "It is inferred from the candidate's name or background."},
                {"id": "c", "label": "It is any detail that makes candidates easier to rank."},
            ],
        },
    },
    {
        "id": "hr-evidence-gaps",
        "title": "Separate evidence from assumptions",
        "objective": "Map supplied candidate fields to criteria, preserve missing information, and recognise ambiguous evidence.",
        "overview": "Evidence-based screening is deliberately conservative. A field can support a criterion only when the supplied text actually says so. Missing information remains missing; it is not a negative qualification and never justifies inventing a fact.",
        "concepts": [
            _concept("Supported", "A supplied candidate field directly relates to the criterion.", "The reviewer can inspect the exact source of the support.", "The work summary says the candidate handled customer questions.", "Citing a criterion without any candidate field.", "Name the supplied field and keep the criterion text visible.", "Use a plausible inference as evidence."),
            _concept("Not evidenced", "The supplied material does not show the criterion.", "It tells a reviewer what to verify next without making a rejection decision.", "No work example mentions dashboard reporting.", "Treating silence as proof of inability.", "List the criterion as missing information.", "Rewrite unknown as a negative fact."),
            _concept("Unclear", "The supplied material is ambiguous or insufficient to support a clear mapping.", "Ambiguity is a reason for review, not a reason to guess.", "A summary says 'worked with data' without describing reporting.", "Over-reading a broad phrase.", "Preserve uncertainty and request human review.", "Convert a vague statement into a qualification."),
        ],
        "worked_example": {
            "scenario": "A candidate says they 'helped with reporting' but gives no detail about dashboards or ownership.",
            "evidence": "The phrase is related but insufficiently specific for a strong criterion match.",
            "reasoning": "Keep the criterion unclear or not evidenced and explain what information is missing.",
            "result": "The structured output shows the gap and preserves a human-review recommendation.",
            "contrast": "Do not invent a dashboard qualification or label the candidate unsuitable.",
        },
        "knowledge_check": {
            "id": "hr_evidence_gaps_check",
            "prompt": "How should a criterion with no supporting candidate field be handled?",
            "options": [
                {"id": "a", "label": "Infer the answer from the candidate's name."},
                {"id": "b", "label": "Mark information missing or unclear and keep human review required."},
                {"id": "c", "label": "Automatically reject the candidate."},
            ],
        },
    },
    {
        "id": "hr-ai-safety",
        "title": "Understand AI limits and safeguards",
        "objective": "Explain what AI may evaluate, what it must not infer, and why protected characteristics and proxies are excluded.",
        "overview": "AI can help structure supplied job-related evidence. It cannot research a candidate, infer protected characteristics, use proxies, or decide employment outcomes. The schema and server enforce these boundaries.",
        "concepts": [
            _concept("Bounded evaluation", "A comparison limited to supplied fields and explicit criteria.", "The boundary makes the output auditable and reduces unsupported claims.", "Skills and a work summary are mapped to criterion IDs.", "Asking the model to search social media or infer personality.", "Reject unsafe inputs and validate structured output.", "Treat model fluency as permission to use extra data."),
            _concept("Protected characteristic", "A sensitive personal attribute that must not be used as a screening criterion or proxy.", "Excluding these attributes is a safety and fairness requirement.", "The workflow rejects criteria that ask for gender or age.", "Using a proxy such as a name or nationality.", "Keep criteria explicitly job-related.", "Infer a protected attribute from text or identity."),
            _concept("Human decision boundary", "The system stops at evidence review and routes the result to an authorised person.", "A responsible prototype makes the limit visible to learners and reviewers.", "Every HR result carries HUMAN_REVIEW_REQUIRED.", "Calling evidence alignment a recommendation to hire.", "Display evidence, gaps, and a review task.", "Advance, reject, shortlist, or offer automatically."),
        ],
        "worked_example": {
            "scenario": "A job requirement includes a protected characteristic disguised as a preference.",
            "evidence": "The criterion is not job-related and must not reach the evaluator.",
            "reasoning": "Reject the input before adapter use; do not rewrite it into a hidden proxy.",
            "result": "The safe error preserves the screening boundary and no hiring result is created.",
            "contrast": "A valid job-related criterion can still yield missing information and mandatory review.",
        },
        "knowledge_check": {
            "id": "hr_ai_safety_check",
            "prompt": "Which action is outside this workflow's safe AI boundary?",
            "options": [
                {"id": "a", "label": "Mapping supplied work evidence to an explicit criterion."},
                {"id": "b", "label": "Listing a criterion with no supplied evidence as missing."},
                {"id": "c", "label": "Inferring a protected characteristic or using it as a proxy."},
            ],
        },
    },
    {
        "id": "hr-review-outcomes",
        "title": "Explain the reviewable outcome",
        "objective": "Evaluate an HR result, explain evidence and gaps, and state why a human reviewer remains responsible.",
        "overview": "A screening result is a structured conversation starter. The practitioner reviews criterion evidence, missing information, uncertainty, and the ordered timeline. The only automated action is creating an internal review task.",
        "concepts": [
            _concept("Evidence status", "A summary of whether criteria are supported, partially evidenced, or insufficiently evidenced.", "The status helps a reviewer decide what to inspect next without becoming a hiring verdict.", "PARTIAL_EVIDENCE means some criteria are supported while others remain open.", "Reading EVIDENCE_ALIGNS as an offer or acceptance.", "Pair the status with criterion-level evidence and gaps.", "Use the status as an automatic ranking."),
            _concept("Documentation", "A concise record of supplied evidence, gaps, and the required next step.", "Documentation supports accountable review and learner reflection.", "The result timeline records evidence evaluation and review-task creation.", "Saving raw private inputs in a public portfolio.", "Persist safe references and protect private details.", "Expose candidate text or assessment answers publicly."),
            _concept("Review recommendation", "A mandatory instruction for an authorised human to inspect the result.", "Human review is not optional decoration; it is the decision boundary.", "Every HR result says a human reviewer must review before any hiring decision.", "Calling the recommendation a final decision.", "Use explicit human-review wording and no autonomous action.", "Advance, reject, or contact a candidate automatically."),
        ],
        "worked_example": {
            "scenario": "Two of three criteria have supplied evidence and one is missing.",
            "evidence": "The result lists the two supporting fields and the missing criterion without inventing a qualification.",
            "reasoning": "Explain the partial status, review the timeline, and identify what a human should verify next.",
            "result": "The server creates one internal review task and persists the structured result.",
            "contrast": "A mock or failed run can demonstrate the process but cannot be described as live evidence or a hiring decision.",
        },
        "knowledge_check": {
            "id": "hr_review_outcomes_check",
            "prompt": "What is the correct interpretation of HUMAN_REVIEW_REQUIRED?",
            "options": [
                {"id": "a", "label": "An authorised human must inspect the evidence before deciding next steps."},
                {"id": "b", "label": "The candidate is automatically rejected."},
                {"id": "c", "label": "The AI has made the final hiring decision."},
            ],
        },
    },
]


ACADEMY_CHECK_ANSWERS: dict[str, dict[str, str]] = {
    SALES_WORKFLOW_KEY: {
        "sales_orientation_check": "b",
        "sales_lead_language_check": "b",
        "sales_evidence_criteria_check": "c",
        "sales_outcomes_policy_check": "c",
        "sales_ai_boundary_check": "a",
        "sales_responsible_review_check": "c",
    },
    HR_WORKFLOW_KEY: {
        "hr_orientation_check": "b",
        "hr_criteria_check": "a",
        "hr_evidence_gaps_check": "b",
        "hr_ai_safety_check": "c",
        "hr_review_outcomes_check": "a",
    },
}

ACADEMY_CHECK_FEEDBACK: dict[str, str] = {
    "sales_orientation_check": "Qualification structures supplied evidence for a proportionate next step; it does not guarantee a customer.",
    "sales_lead_language_check": "Lead generation is taught as context, while this MVP practises qualification only.",
    "sales_evidence_criteria_check": "An absent budget stays unknown. Company size or a typical deal cannot replace supplied evidence.",
    "sales_outcomes_policy_check": "COLD intentionally completes without a task; the other outcomes have distinct server-owned branches.",
    "sales_ai_boundary_check": "The server validates the result and chooses the permitted internal task; the model cannot execute actions.",
    "sales_responsible_review_check": "A responsible explanation connects supplied evidence and gaps to the policy branch and next step.",
    "hr_orientation_check": "The workflow compares supplied job-related evidence and prepares human review; it never makes the hiring decision.",
    "hr_criteria_check": "Criteria must be explicit, job-related, and observable in supplied candidate information.",
    "hr_evidence_gaps_check": "Missing or unclear evidence remains visible for a reviewer and is never rewritten as a rejection.",
    "hr_ai_safety_check": "Protected characteristics and proxies are outside the workflow; only supplied job-related evidence may be evaluated.",
    "hr_review_outcomes_check": "HUMAN_REVIEW_REQUIRED means an authorised person must inspect the evidence before deciding next steps.",
}

# Independent exercises are deliberately separate from workflow execution.
# They ask the learner to interpret a synthetic scenario and apply the same
# server-owned boundaries taught in the Academy.  Answer keys stay backend-only.
INDEPENDENT_EXERCISES: dict[str, dict[str, Any]] = {
    SALES_WORKFLOW_KEY: {
        "id": "sales-qualification-independent-1",
        "title": "Independent scenario: an uncertain lead",
        "objective": "Apply evidence, missing-information, and qualification rules to choose a proportionate next step.",
        "instructions": "Read the supplied evidence, keep unknowns unknown, and choose both the classification and the reasoning that best fits the Sales policy.",
        "scenario": "A synthetic lead says: ‘We are comparing workflow tools for a future project.’ No budget or purchase timeframe is supplied. The message is clear, but intent and timing are unresolved.",
        "evidence": [
            "Need: workflow tools for a future project",
            "Purchase timeframe: not supplied",
            "Budget: not supplied",
            "Message: clear, but non-urgent",
        ],
        "fields": [
            {
                "id": "classification",
                "label": "Which qualification outcome is most defensible?",
                "options": [
                    {"id": "HOT", "label": "HOT — create an immediate follow-up"},
                    {"id": "WARM", "label": "WARM — follow up within 72 hours"},
                    {"id": "COLD", "label": "COLD — complete without a task"},
                    {"id": "NEEDS_REVIEW", "label": "NEEDS_REVIEW — ask for internal review"},
                ],
            },
            {
                "id": "reasoning",
                "label": "What reasoning supports your choice?",
                "options": [
                    {"id": "invent_urgency", "label": "Treat future interest as immediate intent"},
                    {"id": "missing_timing", "label": "Keep timing and budget unknown; use a proportionate non-urgent branch"},
                    {"id": "no_need", "label": "Assume there is no business need"},
                ],
            },
        ],
    },
    HR_WORKFLOW_KEY: {
        "id": "hr-screening-independent-1",
        "title": "Independent scenario: evidence with a gap",
        "objective": "Compare supplied candidate evidence with explicit job criteria and preserve uncertainty for human review.",
        "instructions": "Identify what the evidence supports, what remains missing, and the safe next step. Do not make a hiring decision.",
        "scenario": "A synthetic Customer Support Specialist candidate provides clear written-communication examples and mentions a ticketing workflow. No supplied evidence addresses customer-support experience with product questions.",
        "criteria": [
            "Clear written communication",
            "Experience with structured ticketing workflows",
            "Customer-support experience with product questions",
        ],
        "evidence": [
            "Written communication: supplied work example",
            "Ticketing workflow: supplied experience",
            "Customer-support product questions: not supplied",
        ],
        "fields": [
            {
                "id": "evidence_status",
                "label": "What evidence status best describes this scenario?",
                "options": [
                    {"id": "EVIDENCE_ALIGNS", "label": "EVIDENCE_ALIGNS — every criterion is supported"},
                    {"id": "PARTIAL_EVIDENCE", "label": "PARTIAL_EVIDENCE — some criteria are supported and one is missing"},
                    {"id": "INSUFFICIENT_INFORMATION", "label": "INSUFFICIENT_INFORMATION — no criterion has supplied evidence"},
                ],
            },
            {
                "id": "next_step",
                "label": "What is the safe next step?",
                "options": [
                    {"id": "HUMAN_REVIEW_REQUIRED", "label": "Record the gap and require authorised human review"},
                    {"id": "AUTO_REJECT", "label": "Reject the candidate automatically"},
                    {"id": "AUTO_ADVANCE", "label": "Advance the candidate automatically"},
                ],
            },
        ],
    },
}

INDEPENDENT_EXERCISE_ANSWERS: dict[str, dict[str, str]] = {
    SALES_WORKFLOW_KEY: {"classification": "WARM", "reasoning": "missing_timing"},
    HR_WORKFLOW_KEY: {"evidence_status": "PARTIAL_EVIDENCE", "next_step": "HUMAN_REVIEW_REQUIRED"},
}

INDEPENDENT_EXERCISE_FEEDBACK: dict[str, dict[str, str]] = {
    SALES_WORKFLOW_KEY: {
        "classification": "The supplied need is credible but timing and budget are unknown. WARM is the proportionate follow-up branch; HOT would invent urgency, while COLD would ignore an expressed business need.",
        "reasoning": "Evidence can support a cautious classification without filling gaps with assumptions. Keep missing timing and budget visible.",
    },
    HR_WORKFLOW_KEY: {
        "evidence_status": "Two job-related criteria have supplied evidence while customer-support product experience remains missing, so the result is partial rather than a final hiring judgement.",
        "next_step": "A human reviewer must inspect the evidence and decide what to verify next. The workflow must not auto-reject or auto-advance a candidate.",
    },
}

DOMAINS: tuple[dict[str, Any], ...] = (
    {"key": "sales", "title": "Sales", "availability": "active", "sort_order": 1},
    {"key": "human-resources", "title": "HR", "availability": "active", "sort_order": 2},
    {"key": "marketing", "title": "Marketing", "availability": "coming_soon", "sort_order": 3},
    {"key": "finance", "title": "Finance", "availability": "coming_soon", "sort_order": 4},
    {"key": "operations", "title": "Operations", "availability": "coming_soon", "sort_order": 5},
    {"key": "customer-support", "title": "Customer Support", "availability": "coming_soon", "sort_order": 6},
    {"key": "business-intelligence", "title": "Business Intelligence", "availability": "coming_soon", "sort_order": 7},
)

WORKFLOW_DEFINITION: dict[str, Any] = {
    "key": SALES_WORKFLOW_KEY,
    "version": WORKFLOW_VERSION,
    "rubric_version": RUBRIC_VERSION,
    "domain": "sales",
    "title": "Qualify a New Lead",
    "planned_workflows": ["Lead generation", "Lead follow-up", "Email drafting", "Pipeline reporting", "Re-engagement"],
    "lesson": {
        "title": "From new lead to an accountable next step",
        "problem": "Manual lead triage can be slow and inconsistent. IkeOru uses AI to interpret supplied business context, while deterministic rules create the internal task.",
        "concepts": ["trigger", "input", "AI", "condition", "action", "output", "human review"],
        "academy": SALES_ACADEMY,
        "diagram": [
            "New lead submitted",
            "Validate synthetic input",
            "AI classifies supplied context",
            "Server evaluates policy",
            "Create an internal task or request review",
            "Save result and timeline",
        ],
    },
    "allowed_configuration": {
        "trigger": {"id": "new_lead", "label": "New lead submitted"},
        "hot_follow_up_rules": [
            {"id": "immediate", "label": "Create an internal task immediately"},
            {"id": "within_24_hours", "label": "Create an internal task within 24 hours"},
        ],
        "purchase_timeframes": ["immediate", "within_30_days", "one_to_three_months", "more_than_three_months", "unknown", "no_current_timeline"],
    },
    "steps": [
        {"id": "received", "type": "trigger", "label": "New lead received"},
        {"id": "validate_input", "type": "validation", "label": "Validate input"},
        {"id": "classify_lead", "type": "ai", "action": "classify_lead", "label": "Classify lead"},
        {"id": "evaluate_policy", "type": "condition", "label": "Evaluate policy"},
        {"id": "create_follow_up_task", "type": "action", "action": "create_follow_up_task", "label": "Create internal task"},
        {"id": "persist_result", "type": "output", "label": "Save result"},
    ],
    "output": {"priorities": ["HOT", "WARM", "COLD", "NEEDS_REVIEW"]},
}

HR_WORKFLOW_DEFINITION: dict[str, Any] = {
    "key": HR_WORKFLOW_KEY,
    "version": "1.0",
    "rubric_version": "1.0",
    "domain": "human-resources",
    "title": "Candidate Screening",
    "planned_workflows": [
        "Interview scheduling",
        "Onboarding",
        "Employee-query classification",
        "Leave processing",
        "Training-needs identification",
        "HR document processing",
    ],
    "lesson": {
        "title": "Evidence review before a human hiring decision",
        "problem": "Reviewing supplied candidate evidence against explicit job criteria can be repetitive. IkeOru structures the comparison, while a human reviewer remains responsible for every hiring decision.",
        "concepts": ["trigger", "input", "AI", "condition", "action", "output", "human review"],
        "academy": HR_ACADEMY,
        "diagram": [
            "Synthetic candidate submitted",
            "Validate job-related input",
            "AI maps supplied evidence to stated criteria",
            "Server requires human review",
            "Create an internal review task",
            "Save the evidence summary and timeline",
        ],
    },
    "allowed_configuration": {
        "trigger": {"id": "candidate_submitted", "label": "Synthetic candidate submitted"},
        "review_rule": {"id": "human_review_required", "label": "A human reviewer must make the final decision"},
        "criteria_limit": 6,
        "synthetic_data_only": True,
    },
    "steps": [
        {"id": "received", "type": "trigger", "label": "Synthetic candidate received"},
        {"id": "validate_input", "type": "validation", "label": "Validate job-related input"},
        {"id": "evaluate_candidate_evidence", "type": "ai", "action": "evaluate_candidate_evidence", "label": "Evaluate supplied evidence"},
        {"id": "require_human_review", "type": "condition", "label": "Require human review"},
        {"id": "create_review_task", "type": "action", "action": "create_review_task", "label": "Create internal review task"},
        {"id": "persist_result", "type": "output", "label": "Save result"},
    ],
    "output": {"evidence_statuses": ["EVIDENCE_ALIGNS", "PARTIAL_EVIDENCE", "INSUFFICIENT_INFORMATION"], "human_review_required": True},
}

WORKFLOW_DEFINITIONS: tuple[dict[str, Any], ...] = (WORKFLOW_DEFINITION, HR_WORKFLOW_DEFINITION)
WORKFLOW_DEFINITION_BY_KEY = {definition["key"]: definition for definition in WORKFLOW_DEFINITIONS}

ASSESSMENT_DEFINITION: dict[str, Any] = {
    "key": ASSESSMENT_KEY,
    "version": "1.0",
    "title": "Sales lead qualification — Learn → Do → Prove",
    "objectives": [
        "Explain qualification, evidence, and the four server-controlled outcomes.",
        "Distinguish AI interpretation from deterministic policy and human review.",
        "Apply the permitted follow-up rules to an unfamiliar lead scenario.",
    ],
    "pass_requirement": {"minimum_score": 5, "total_points": 6, "practical_required": True},
    "questions": [
        {"id": "trigger", "objective": "Identify the workflow trigger.", "prompt": "A new synthetic inquiry arrives with a stated need. What starts this workflow?", "options": ["new_lead_submitted", "a_daily_spreadsheet_export", "a_manual_task_completion"]},
        {"id": "ai_role", "objective": "Explain AI's bounded contribution.", "prompt": "Which step benefits from AI interpretation while remaining limited to supplied evidence?", "options": ["interpret_supplied_lead_context", "create_an_internal_task", "save_a_timestamp"]},
        {"id": "condition", "objective": "Apply the server-owned policy boundary.", "prompt": "What determines which approved policy branch runs after the structured result is validated?", "options": ["validated_priority", "company_name", "browser_type"]},
        {"id": "action", "objective": "Choose a permitted internal action.", "prompt": "A lead is classified HOT. What should deterministic software do?", "options": ["create_internal_follow_up_task", "send_an_external_message", "change_the_lead_message"]},
        {"id": "human_review", "objective": "Recognise uncertainty and review.", "prompt": "A lead message is contradictory and lacks reliable timing. When is human review appropriate?", "options": ["incomplete_or_contradictory_input", "every_cold_lead", "after_any_budget_value"]},
    ],
    "practical": {"id": "practical_policy", "objective": "Apply policy to a new scenario after passing the independent evidence exercise.", "prompt": "Configure an immediate HOT follow-up and predict the WARM and review branches. The independent scenario is also required to demonstrate evidence-based application.", "fields": ["hot_follow_up_rule", "warm_behavior", "review_behavior"], "independent_exercise_required": True},
}

HR_ASSESSMENT_DEFINITION: dict[str, Any] = {
    "key": HR_ASSESSMENT_KEY,
    "version": "1.0",
    "title": "Candidate screening — Learn → Do → Prove",
    "objectives": [
        "Explain explicit job-related criteria and evidence status.",
        "Recognise missing information, protected-characteristic safeguards, and AI limits.",
        "Apply the mandatory human-review boundary to an unfamiliar screening scenario.",
    ],
    "pass_requirement": {"minimum_score": 5, "total_points": 6, "practical_required": True},
    "questions": [
        {"id": "trigger", "objective": "Identify the workflow trigger.", "prompt": "What starts this HR learning workflow?", "options": ["candidate_submitted", "interview_completed", "a_final_hiring_decision"]},
        {"id": "ai_role", "objective": "Explain AI's bounded contribution.", "prompt": "What may AI evaluate in this workflow?", "options": ["supplied_job_related_evidence_against_explicit_criteria", "protected_characteristics", "a_final_hiring_decision"]},
        {"id": "condition", "objective": "Apply explicit criteria consistently.", "prompt": "What constrains the evidence evaluation?", "options": ["explicit_job_related_criteria", "candidate_name", "an_unrelated_profile"]},
        {"id": "action", "objective": "Choose the permitted human-review action.", "prompt": "What does the server do after the evidence review?", "options": ["create_internal_human_review_task", "reject_the_candidate", "send_an_offer"]},
        {"id": "human_review", "objective": "Recognise the employment decision boundary.", "prompt": "Who makes the final hiring decision?", "options": ["authorized_human_reviewer", "the_ai_model", "an_automatic_policy"]},
    ],
    "practical": {
        "id": "practical_review_policy",
        "objective": "Apply evidence and human-review safeguards to a scenario.",
        "prompt": "Configure the required human-review rule and explain how incomplete evidence and the final decision are handled. The independent evidence exercise is also required before practical credit can pass.",
        "fields": ["review_rule", "insufficient_evidence_behavior", "final_decision_owner"],
        "independent_exercise_required": True,
    },
}

ASSESSMENT_DEFINITIONS: tuple[dict[str, Any], ...] = (ASSESSMENT_DEFINITION, HR_ASSESSMENT_DEFINITION)
ASSESSMENT_DEFINITION_BY_KEY = {definition["key"]: definition for definition in ASSESSMENT_DEFINITIONS}

ASSESSMENT_ANSWERS = {
    "trigger": "new_lead_submitted",
    "ai_role": "interpret_supplied_lead_context",
    "condition": "validated_priority",
    "action": "create_internal_follow_up_task",
    "human_review": "incomplete_or_contradictory_input",
}
PRACTICAL_ANSWERS = {"hot_follow_up_rule": "immediate", "warm_behavior": "create_task_within_72_hours", "review_behavior": "create_internal_review_task"}
HR_ASSESSMENT_ANSWERS = {
    "trigger": "candidate_submitted",
    "ai_role": "supplied_job_related_evidence_against_explicit_criteria",
    "condition": "explicit_job_related_criteria",
    "action": "create_internal_human_review_task",
    "human_review": "authorized_human_reviewer",
}
HR_PRACTICAL_ANSWERS = {
    "review_rule": "human_review_required",
    "insufficient_evidence_behavior": "record_missing_information_for_human_review",
    "final_decision_owner": "authorized_human_reviewer",
}
ASSESSMENT_ANSWERS_BY_KEY = {ASSESSMENT_KEY: ASSESSMENT_ANSWERS, HR_ASSESSMENT_KEY: HR_ASSESSMENT_ANSWERS}
PRACTICAL_ANSWERS_BY_KEY = {ASSESSMENT_KEY: PRACTICAL_ANSWERS, HR_ASSESSMENT_KEY: HR_PRACTICAL_ANSWERS}

ASSESSMENT_FEEDBACK_BY_KEY: dict[str, dict[str, str]] = {
    ASSESSMENT_KEY: {
        "trigger": "Qualification begins when a new lead is submitted; a badge or completed task is an outcome, not the trigger.",
        "ai_role": "AI interprets supplied lead context. The server, not the model, creates an internal task.",
        "condition": "The validated priority selects the server-owned policy branch; names and browser details are not criteria.",
        "action": "A HOT result creates the permitted internal follow-up task. It never sends an external message.",
        "human_review": "Incomplete or contradictory information requires review because the system must not invent certainty.",
    },
    HR_ASSESSMENT_KEY: {
        "trigger": "The guided HR workflow starts when a synthetic candidate is submitted with explicit criteria.",
        "ai_role": "AI may map supplied job-related evidence to criteria, but cannot infer protected characteristics or decide employment.",
        "condition": "Explicit job-related criteria keep the comparison relevant and consistent.",
        "action": "The only permitted automated effect is an internal human-review task.",
        "human_review": "An authorised human reviewer owns every final hiring decision.",
    },
}

BADGE_SKILLS = [
    "guided sales lead qualification",
    "AI interpretation with deterministic policy controls",
    "human-review escalation awareness",
]
HR_BADGE_SKILLS = [
    "guided job-related evidence review",
    "structured AI evidence evaluation",
    "human-review safeguards for hiring decisions",
]
BADGE_DEFINITIONS: tuple[dict[str, Any], ...] = (
    {"key": BADGE_KEY, "criteria_version": "1.0", "name": "Sales Automation — Level 1", "skills": BADGE_SKILLS},
    {"key": HR_BADGE_KEY, "criteria_version": "1.0", "name": "HR Evidence Review — Level 1", "skills": HR_BADGE_SKILLS},
)
BADGE_KEY_BY_WORKFLOW = {SALES_WORKFLOW_KEY: BADGE_KEY, HR_WORKFLOW_KEY: HR_BADGE_KEY}
BADGE_SKILLS_BY_WORKFLOW = {SALES_WORKFLOW_KEY: BADGE_SKILLS, HR_WORKFLOW_KEY: HR_BADGE_SKILLS}
