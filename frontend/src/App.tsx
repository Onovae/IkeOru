import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { api, API_BASE_URL, readableApiError } from "./api";
import type {
  AppView,
  AcademyLesson,
  AcademyProgress,
  AcademySection,
  AssessmentDefinition,
  AssessmentResult,
  BadgeAward,
  CurrentIdentity,
  DemoRole,
  Domain,
  FollowUpPolicy,
  HrWorkflowRunRequest,
  IndependentExercise,
  IndependentExerciseResult,
  LeadInput,
  ManagerSummary,
  PortfolioData,
  RunEvent,
  RunMode,
  RunResult,
} from "./types";

const WORKFLOW_KEY = "sales-qualify-new-lead";
const WORKFLOW_TITLE = "Qualify a New Lead";
const HR_WORKFLOW_KEY = "hr-candidate-screening";
const HR_WORKFLOW_TITLE = "Candidate Screening";

const DOMAIN_CARDS: Domain[] = [
  {
    key: "sales",
    title: "Sales",
    availability: "active",
    description: "Learn one practical workflow: qualify a new lead.",
  },
  {
    key: "human-resources",
    title: "HR",
    availability: "active",
    description: "Learn one practical workflow: screen a candidate against explicit job criteria.",
  },
  { key: "marketing", title: "Marketing", availability: "coming_soon", description: "Coming Soon" },
  { key: "finance", title: "Finance", availability: "coming_soon", description: "Coming Soon" },
  { key: "operations", title: "Operations", availability: "coming_soon", description: "Coming Soon" },
  {
    key: "customer-support",
    title: "Customer Support",
    availability: "coming_soon",
    description: "Coming Soon",
  },
  {
    key: "business-intelligence",
    title: "Business Intelligence",
    availability: "coming_soon",
    description: "Coming Soon",
  },
];

const DEFAULT_ASSESSMENT: AssessmentDefinition = {
  key: WORKFLOW_KEY,
  title: "Sales Automation — Level 1 assessment",
  practical_prompt:
    "Configure a HOT follow-up and predict the correct action for a WARM lead. Your server checks the practical response.",
  questions: [
    {
      id: "trigger",
      prompt: "Which event begins this guided workflow?",
      options: [
        { id: "a", label: "A new lead is submitted" },
        { id: "b", label: "A badge is published" },
        { id: "c", label: "A task is completed" },
      ],
    },
    {
      id: "ai-role",
      prompt: "What is the AI step asked to do with the lead message?",
      options: [
        { id: "a", label: "Classify the supplied message against the rubric" },
        { id: "b", label: "Send a message to the lead" },
        { id: "c", label: "Run arbitrary web searches" },
      ],
    },
    {
      id: "condition",
      prompt: "What does the condition step decide?",
      options: [
        { id: "a", label: "The approved action for the returned priority" },
        { id: "b", label: "Whether to reveal a private answer" },
        { id: "c", label: "The learner's password" },
      ],
    },
    {
      id: "cold",
      prompt: "What happens when a lead is classified as COLD?",
      options: [
        { id: "a", label: "The run succeeds without a follow-up task" },
        { id: "b", label: "An immediate HOT task is created" },
        { id: "c", label: "The system invents missing details" },
      ],
    },
    {
      id: "review",
      prompt: "When should the workflow ask for human review?",
      options: [
        { id: "a", label: "When the input is inadequate, contradictory, or unsafe to interpret" },
        { id: "b", label: "Whenever a user opens the portfolio" },
        { id: "c", label: "Only after an email is sent" },
      ],
    },
  ],
};

const DEFAULT_HR_ASSESSMENT: AssessmentDefinition = {
  key: HR_WORKFLOW_KEY,
  title: "HR Candidate Screening — Level 1 assessment",
  practical_prompt:
    "Choose the required human-review control and identify what happens when evidence is insufficient. Your server checks the practical response.",
  questions: [
    {
      id: "trigger",
      prompt: "What starts this guided screening workflow?",
      options: [
        { id: "candidate_submitted", label: "A synthetic candidate profile is submitted" },
        { id: "offer_signed", label: "An offer is signed" },
        { id: "employee_onboarded", label: "An employee is onboarded" },
      ],
    },
    {
      id: "criteria",
      prompt: "Which information may guide this workflow?",
      options: [
        { id: "explicit_job_criteria", label: "Explicit, job-related criteria" },
        { id: "protected_characteristics", label: "Protected characteristics" },
        { id: "social_media_inference", label: "Inferences from unrelated personal information" },
      ],
    },
    {
      id: "ai_role",
      prompt: "What is the AI step asked to do?",
      options: [
        { id: "evaluate_supplied_evidence", label: "Compare supplied evidence with explicit criteria" },
        { id: "make_hiring_decision", label: "Make a final hiring decision" },
        { id: "research_candidate", label: "Search for personal information" },
      ],
    },
    {
      id: "missing_information",
      prompt: "What should happen when evidence for a criterion is missing?",
      options: [
        { id: "record_missing_information", label: "Record it as missing for a human reviewer" },
        { id: "assume_not_qualified", label: "Assume the candidate is not qualified" },
        { id: "invent_evidence", label: "Invent supporting evidence" },
      ],
    },
    {
      id: "decision_boundary",
      prompt: "Who makes the final hiring decision?",
      options: [
        { id: "human_reviewer", label: "An authorized human reviewer" },
        { id: "ai_model", label: "The AI model" },
        { id: "workflow", label: "The automated workflow" },
      ],
    },
  ],
};

const REPLAY_RESULT: RunResult = {
  id: "replay-example",
  status: "completed",
  mode: "replay",
  priority: "HOT",
  explanation:
    "This fixed replay shows a near-term request for the fictional team software service. It is not a live classification and creates no task or learner progress.",
  evidence: ["Asked for a team workflow demo", "Requested a discussion this week"],
  missing_fields: ["No budget was supplied"],
  suggested_next_step: "Example only: a server-backed HOT run would create an internal follow-up task.",
  task: null,
  eligible_for_progress: false,
  events: [
    { sequence: 1, step_id: "received", status: "completed", message: "Synthetic replay input loaded." },
    { sequence: 2, step_id: "validated", status: "completed", message: "Required example fields were valid." },
    { sequence: 3, step_id: "classify_lead", status: "completed", message: "Fixed replay classification returned." },
    { sequence: 4, step_id: "policy", status: "completed", message: "Replay does not execute a task action." },
  ],
};

const HR_REPLAY_RESULT: RunResult = {
  id: "hr-replay-example",
  status: "needs_review",
  mode: "replay",
  recommendation: "HUMAN_REVIEW_REQUIRED",
  human_review_required: true,
  explanation:
    "This fixed replay compares only the supplied synthetic candidate information with listed job-related criteria. It is not a live evaluation and does not make a hiring decision.",
  evidence: ["written_communication", "ticketing_workflow"],
  missing_fields: ["customer_support_experience"],
  suggested_next_step: "A human reviewer should inspect the evidence and any missing information before deciding what to do next.",
  eligible_for_progress: false,
  events: [
    { sequence: 1, step_id: "received", status: "completed", message: "Synthetic replay candidate and job criteria loaded." },
    { sequence: 2, step_id: "validated", status: "completed", message: "The replay contains only job-related criteria." },
    { sequence: 3, step_id: "evaluate_candidate", status: "completed", message: "Fixed replay evidence evaluation returned." },
    { sequence: 4, step_id: "human_review", status: "completed", message: "Replay recommends human review; no hiring action is taken." },
  ],
};

const INITIAL_LEAD = {
  name: "",
  company: "",
  message: "",
  industry: "",
  company_size: "",
  budget_amount: "",
  currency: "USD",
  need: "",
  purchase_timeframe: "",
};

const HR_CRITERIA_IDS = ["customer_support_experience", "written_communication", "ticketing_workflow"] as const;
const ONBOARDING_STORAGE_KEY = "ikeoru-onboarding-complete-v1";

const FALLBACK_SALES_LESSON: AcademyLesson = {
  workflow_key: WORKFLOW_KEY,
  title: "From new lead to an accountable next step",
  problem: "Lead qualification turns supplied interest into an evidence-based internal next step.",
  sections: [
    { id: "orientation", title: "Orient yourself in qualification", objective: "Explain where qualification fits in the sales process.", overview: "A lead is a signal of interest; qualification evaluates the supplied signal without pretending it is a customer or a guaranteed deal.", concepts: [{ term: "Qualification", meaning: "A structured judgement about fit, need, timing, and available evidence.", why_it_matters: "It helps a team focus attention consistently.", example: "A fictional team asks for a demonstration this week.", common_mistake: "Calling a HOT lead a customer.", correct_application: "State the evidence and the next internal step.", incorrect_application: "Invent a conversion or contact detail." }], worked_example: { scenario: "A team requests a demonstration this week.", evidence: "The message supplies a need and timeframe.", reasoning: "Record only those supplied signals.", result: "The server can apply its policy.", contrast: "Missing timing may require review." }, knowledge_check: { id: "orientation_check", prompt: "What does qualification do?", options: [{ id: "a", label: "Guarantee a customer" }, { id: "b", label: "Structure supplied evidence for a proportionate next step" }, { id: "c", label: "Send an automatic message" }] } },
    { id: "evidence", title: "Separate evidence from assumptions", objective: "Identify supplied evidence and preserve unknown information.", overview: "A missing budget is unknown, not zero. A plausible assumption is not evidence.", concepts: [{ term: "Evidence", meaning: "A field actually supplied in the synthetic lead.", why_it_matters: "Another person can inspect the reasoning.", example: "The message says the need is lead triage.", common_mistake: "Guessing a budget from company size.", correct_application: "Name the supplied field.", incorrect_application: "Use an absent detail as fact." }], worked_example: { scenario: "A lead has a need but no budget.", evidence: "Need is supplied; budget is absent.", reasoning: "Keep budget unknown.", result: "Use only supported criteria.", contrast: "Do not infer zero." }, knowledge_check: { id: "evidence_check", prompt: "How should a missing budget be treated?", options: [{ id: "a", label: "As zero" }, { id: "b", label: "As a typical budget" }, { id: "c", label: "As unknown" }] } },
    { id: "policy", title: "Apply outcomes and review", objective: "Explain HOT, WARM, COLD, and NEEDS_REVIEW and the server boundary.", overview: "HOT and WARM create permitted internal tasks; COLD intentionally skips a task; NEEDS_REVIEW preserves uncertainty for a reviewer. AI interprets supplied text, while server policy owns actions.", concepts: [{ term: "Human review", meaning: "A person inspects uncertainty before a consequential next step.", why_it_matters: "Automation should make responsibility visible.", example: "Contradictory timing goes to review.", common_mistake: "Treating confidence as proof.", correct_application: "Show evidence, gaps, and policy.", incorrect_application: "Let the model contact someone." }], worked_example: { scenario: "A contradictory message lacks reliable timing.", evidence: "The supplied input is insufficient.", reasoning: "Do not guess a priority.", result: "Create an internal review task.", contrast: "COLD is an intentional successful skip." }, knowledge_check: { id: "policy_check", prompt: "Which outcome intentionally creates no task?", options: [{ id: "a", label: "HOT" }, { id: "b", label: "WARM" }, { id: "c", label: "COLD" }] } },
  ],
  progress: { completed_sections: [], completed_knowledge_checks: [], knowledge_checks: {}, current_section: 0, section_count: 3, complete: false },
};

const FALLBACK_HR_LESSON: AcademyLesson = {
  workflow_key: HR_WORKFLOW_KEY,
  title: "Evidence review before a human hiring decision",
  problem: "Candidate screening compares supplied information with explicit, job-related criteria before human review.",
  sections: [
    { id: "orientation", title: "Orient yourself in screening", objective: "Explain the purpose and decision boundary of screening.", overview: "Screening organises evidence for a reviewer. It never makes a final hiring decision.", concepts: [{ term: "Screening", meaning: "A structured comparison with explicit criteria.", why_it_matters: "It makes gaps visible.", example: "A support summary is compared with role requirements.", common_mistake: "Calling alignment an offer.", correct_application: "Prepare human review.", incorrect_application: "Advance or reject automatically." }], worked_example: { scenario: "A candidate supplies support experience.", evidence: "The work summary supports some criteria.", reasoning: "Map each criterion once.", result: "Create a review task.", contrast: "No outcome is a hiring decision." }, knowledge_check: { id: "orientation_check", prompt: "What is this workflow for?", options: [{ id: "a", label: "Automatic hiring" }, { id: "b", label: "Evidence review for a human" }, { id: "c", label: "Internet research" }] } },
    { id: "criteria", title: "Use explicit job-related criteria", objective: "Distinguish relevant criteria from personal characteristics and proxies.", overview: "Criteria should be observable, role-related, and consistently applied. Candidate names are display labels, not evidence.", concepts: [{ term: "Criterion", meaning: "A capability explicitly needed for the role.", why_it_matters: "Clear criteria reduce arbitrary judgement.", example: "Clear written updates for customers.", common_mistake: "Using a name or unrelated detail.", correct_application: "Compare supplied fields only.", incorrect_application: "Infer suitability from identity." }], worked_example: { scenario: "A role requires customer updates.", evidence: "The work summary describes written updates.", reasoning: "Cite that field.", result: "Mark the criterion supported.", contrast: "Do not use protected characteristics." }, knowledge_check: { id: "criteria_check", prompt: "What makes a criterion appropriate?", options: [{ id: "a", label: "Explicit, job-related, observable" }, { id: "b", label: "Inferred from a name" }, { id: "c", label: "Any ranking detail" }] } },
    { id: "gaps-review", title: "Preserve gaps and human review", objective: "Explain missing information, AI limits, and mandatory human review.", overview: "Not evidenced is not the same as not qualified. AI may structure supplied evidence but cannot infer protected characteristics or decide employment.", concepts: [{ term: "Missing information", meaning: "A criterion has no supporting supplied field.", why_it_matters: "A reviewer knows what to verify next.", example: "No dashboard example is supplied.", common_mistake: "Turning silence into rejection.", correct_application: "Record the gap and require review.", incorrect_application: "Invent evidence or a decision." }], worked_example: { scenario: "Two criteria are supported and one is missing.", evidence: "The result lists both evidence and gap.", reasoning: "Keep uncertainty visible.", result: "HUMAN_REVIEW_REQUIRED.", contrast: "Alignment is not an offer." }, knowledge_check: { id: "review_check", prompt: "What does HUMAN_REVIEW_REQUIRED mean?", options: [{ id: "a", label: "An authorised human reviews before deciding" }, { id: "b", label: "Automatic rejection" }, { id: "c", label: "AI final decision" }] } },
  ],
  progress: { completed_sections: [], completed_knowledge_checks: [], knowledge_checks: {}, current_section: 0, section_count: 3, complete: false },
};

const ONBOARDING_STEPS = [
  {
    eyebrow: "Welcome to IkeOru",
    title: "Learn. Do. Prove.",
    body: "IkeOru turns a practical workplace task into evidence of capability. You will learn a concept, try a bounded synthetic scenario, and see what the server recorded.",
  },
  {
    eyebrow: "Choose your workspace",
    title: "Learner or Manager",
    body: "Learners complete the active Sales and HR paths. Managers see an authorized, limited organization summary without private inputs or assessment answers.",
  },
  {
    eyebrow: "Your active paths",
    title: "Start with Sales or HR",
    body: "Sales teaches lead qualification. HR teaches evidence-based candidate screening. The other domains are visible as Coming Soon and are not launchable in this MVP.",
  },
  {
    eyebrow: "The learning loop",
    title: "Learn → Do → Prove",
    body: "Learn explains the task. Do guides a safe practice and server-backed run. Prove checks your understanding with a server-graded assessment.",
  },
  {
    eyebrow: "Your capability record",
    title: "Build evidence you can control",
    body: "Passed assessments can unlock server-issued achievements and portfolio projects. Your portfolio is private by default, and only selected safe fields can be shared.",
  },
];

const INITIAL_HR_CANDIDATE = {
  name: "",
  experience_summary: "",
  skills_text: "",
  work_examples: "",
  job_title: "Customer Support Specialist",
  customer_support_experience: "Relevant customer-support experience with business users.",
  written_communication: "Clear written communication for customer updates and internal notes.",
  ticketing_workflow: "Experience working with structured ticketing or case-management workflows.",
};

type LeadForm = typeof INITIAL_LEAD;
type HrCandidateForm = typeof INITIAL_HR_CANDIDATE;
type SessionMode = "unstarted" | "server" | "preview";
type AssessmentSource = "server" | "preview";

function enforceMvpDomains(serverDomains: Domain[]): Domain[] {
  const byKey = new Map(serverDomains.map((domain) => [domain.key, domain]));
  return DOMAIN_CARDS.map((localDomain) => {
    const serverDomain = localDomain.key ? byKey.get(localDomain.key) : undefined;
    return {
      ...localDomain,
      // Availability is scoped by this two-path MVP, not an older server catalog.
      availability: localDomain.key === "sales" || localDomain.key === "human-resources" ? "active" : "coming_soon",
      ...(serverDomain?.title && localDomain.key !== "human-resources" ? { title: serverDomain.title } : {}),
    };
  });
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function asText(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function normalizeRun(run: RunResult): RunResult {
  const record = asRecord(run);
  const nested = record ? asRecord(record.run) ?? asRecord(record.result) : undefined;
  const source = nested ? { ...record, ...nested } : record ?? {};
  const result = asRecord(source.result);
  const classification = asRecord(result?.classification);
  const screening = asRecord(result?.screening);
  const task = asRecord(result?.task) ?? asRecord(source.task);
  const failure = asRecord(result?.failure);
  const rawCriteria = Array.isArray(source.criteria_evidence)
    ? source.criteria_evidence
    : Array.isArray(result?.criteria_evidence)
      ? result.criteria_evidence
      : Array.isArray(source.criteria_evaluation)
        ? source.criteria_evaluation
        : Array.isArray(result?.criteria_evaluation)
          ? result.criteria_evaluation
          : Array.isArray(screening?.criteria_evidence)
            ? screening.criteria_evidence
          : [];
  const criteriaEvidence = rawCriteria.flatMap((item) => {
    const criterion = asRecord(item);
    if (!criterion) return [];
    const evidence = Array.isArray(criterion.evidence)
      ? criterion.evidence.filter((entry): entry is string => typeof entry === "string")
      : [];
    return [{
      criterion_id: asText(criterion.criterion_id) ?? asText(criterion.id),
      criterion: asText(criterion.criterion) ?? asText(criterion.description),
      evidence,
      status: asText(criterion.status),
    }];
  });
  return {
    ...run,
    ...source,
    id: asText(source.id) ?? asText(source.run_id) ?? run.id ?? run.run_id,
    run_id: asText(source.run_id) ?? asText(source.id) ?? run.run_id ?? run.id,
    status: asText(source.status) ?? asText(source.state) ?? run.status,
    mode: asText(source.mode) ?? asText(result?.mode) ?? run.mode,
    priority: asText(source.priority) ?? asText(classification?.priority) ?? run.priority,
    explanation: asText(source.explanation) ?? asText(classification?.explanation) ?? asText(screening?.explanation) ?? asText(screening?.summary) ?? asText(failure?.message) ?? run.explanation,
    evidence: Array.isArray(source.evidence)
      ? source.evidence.filter((item): item is string => typeof item === "string")
      : Array.isArray(classification?.evidence)
        ? classification.evidence.filter((item): item is string => typeof item === "string")
        : Array.isArray(screening?.evidence)
          ? screening.evidence.filter((item): item is string => typeof item === "string")
          : run.evidence,
    missing_fields: Array.isArray(source.missing_fields)
      ? source.missing_fields.filter((item): item is string => typeof item === "string")
      : Array.isArray(classification?.missing_fields)
        ? classification.missing_fields.filter((item): item is string => typeof item === "string")
        : Array.isArray(screening?.missing_fields)
          ? screening.missing_fields.filter((item): item is string => typeof item === "string")
          : run.missing_fields,
    suggested_next_step:
      asText(source.suggested_next_step) ?? asText(classification?.suggested_next_step) ?? asText(screening?.suggested_next_step) ?? asText(result?.next_learning_step) ?? run.suggested_next_step,
    recommendation:
      asText(source.recommendation) ?? asText(result?.recommendation) ?? asText(screening?.recommendation) ?? asText(classification?.recommendation) ?? run.recommendation,
    human_review_required:
      typeof source.human_review_required === "boolean"
        ? source.human_review_required
        : typeof result?.human_review_required === "boolean"
          ? result.human_review_required
          : typeof screening?.human_review_required === "boolean"
            ? screening.human_review_required
            : run.human_review_required,
    criteria_evidence: criteriaEvidence.length ? criteriaEvidence : run.criteria_evidence,
    task: task
      ? {
          status: asText(task.status),
          kind: asText(task.kind) ?? asText(task.task_kind),
          due_at: asText(task.due_at),
          summary: asText(task.summary),
        }
      : null,
    eligible_for_progress:
      typeof source.eligible_for_progress === "boolean"
        ? source.eligible_for_progress
        : typeof source.eligible_for_achievement === "boolean"
          ? source.eligible_for_achievement
          : run.eligible_for_progress,
  };
}

function readEvents(value: unknown): RunEvent[] {
  const record = asRecord(value);
  const candidates = Array.isArray(value)
    ? value
    : Array.isArray(record?.events)
      ? record.events
      : Array.isArray(record?.items)
        ? record.items
        : [];

  return candidates.flatMap((candidate) => {
    const event = asRecord(candidate);
    if (!event) return [];
    return [
      {
        sequence: typeof event.sequence === "number" ? event.sequence : undefined,
        step_id: asText(event.step_id),
        status: asText(event.status),
        message: asText(event.message) ?? asText(event.safe_message),
        timestamp: asText(event.timestamp) ?? asText(event.created_at),
        result_reference: asText(event.result_reference),
      },
    ];
  });
}

function mergeEvents(existing: RunEvent[], incoming: RunEvent[]): RunEvent[] {
  const keyed = new Map<string, RunEvent>();
  [...existing, ...incoming].forEach((event, index) => {
    keyed.set(String(event.sequence ?? `${event.timestamp ?? ""}-${event.step_id ?? "event"}-${index}`), event);
  });
  return [...keyed.values()].sort((left, right) => (left.sequence ?? 0) - (right.sequence ?? 0));
}

function resolveRunMode(run?: RunResult | null): RunMode {
  const candidate = String(run?.ai_mode ?? run?.mode ?? "").toLowerCase();
  if (candidate === "live") return "live";
  if (candidate === "mock") return "mock";
  if (candidate === "replay") return "replay";
  return "unknown";
}

function modeCopy(mode: RunMode): string {
  if (mode === "live") return "Live provider result — server-backed action";
  if (mode === "mock") return "Mock adapter result — deterministic server-side development mode";
  if (mode === "replay") return "Replay example — fixed, non-qualifying and no action is created";
  return "Server result — provider mode was not identified";
}

function isTerminal(status?: string): boolean {
  return ["completed", "needs_review", "failed"].includes(status ?? "");
}

function formatDate(value?: string): string {
  if (!value) return "Not supplied";
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf())
    ? value
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(parsed);
}

function makeIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `ikeoru-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function publicIdFromPath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const match = window.location.pathname.match(/^\/p\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

function toOptionalNumber(value: string): number | undefined {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function toLeadPayload(lead: LeadForm): LeadInput {
  const companySize = toOptionalNumber(lead.company_size);
  const budgetAmount = toOptionalNumber(lead.budget_amount);
  return {
    name: lead.name.trim(),
    company: lead.company.trim(),
    message: lead.message.trim(),
    ...(lead.industry.trim() ? { industry: lead.industry.trim() } : {}),
    ...(companySize !== undefined ? { company_size: companySize } : {}),
    ...(budgetAmount !== undefined ? { budget_amount: budgetAmount, currency: lead.currency } : {}),
    ...(lead.need.trim() ? { need: lead.need.trim() } : {}),
    ...(lead.purchase_timeframe ? { purchase_timeframe: lead.purchase_timeframe } : {}),
  };
}

function validateLead(lead: LeadForm): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = lead.name.trim();
  const company = lead.company.trim();
  const message = lead.message.trim();
  const companySize = toOptionalNumber(lead.company_size);
  const budgetAmount = toOptionalNumber(lead.budget_amount);

  if (!name || name.length > 100) errors.name = "Enter a synthetic lead name of up to 100 characters.";
  if (!company || company.length > 150) errors.company = "Enter a company of up to 150 characters.";
  if (message.length < 20 || message.length > 2000) errors.message = "Use 20–2,000 characters so the classification has enough context.";
  if (lead.company_size.trim() && (companySize === undefined || companySize <= 0)) {
    errors.company_size = "Company size must be a positive number when provided.";
  }
  if (lead.budget_amount.trim() && (budgetAmount === undefined || budgetAmount < 0)) {
    errors.budget_amount = "Budget must be zero or a positive number.";
  }
  if (budgetAmount !== undefined && !lead.currency) errors.currency = "Choose a currency when an amount is entered.";
  return errors;
}

function splitSkills(value: string): string[] {
  return [...new Set(value.split(",").map((skill) => skill.trim()).filter(Boolean))];
}

function toHrPayload(candidate: HrCandidateForm): HrWorkflowRunRequest {
  return {
    configuration: { trigger: "candidate_submitted", review_rule: "human_review_required" },
    candidate: {
      name: candidate.name.trim(),
      experience_summary: candidate.experience_summary.trim(),
      skills: splitSkills(candidate.skills_text),
      ...(candidate.work_examples.trim() ? { work_examples: candidate.work_examples.trim() } : {}),
    },
    job_requirements: {
      title: candidate.job_title.trim(),
      criteria: HR_CRITERIA_IDS.map((id) => ({ id, description: candidate[id].trim() })),
    },
  };
}

function validateHrCandidate(candidate: HrCandidateForm): Record<string, string> {
  const errors: Record<string, string> = {};
  const skills = splitSkills(candidate.skills_text);
  const protectedTerms = /\b(age|gender|sex|race|ethnicity|religion|disability|pregnan(?:t|cy)|marital|nationality)\b/i;

  if (!candidate.name.trim() || candidate.name.trim().length > 100) {
    errors.name = "Enter a synthetic candidate name of up to 100 characters.";
  }
  if (candidate.experience_summary.trim().length < 20 || candidate.experience_summary.trim().length > 2000) {
    errors.experience_summary = "Use 20–2,000 characters of supplied, job-relevant experience.";
  } else if (protectedTerms.test(candidate.experience_summary)) {
    errors.experience_summary = "Use job-related evidence only; protected characteristics are not permitted.";
  }
  if (!skills.length || skills.length > 12 || skills.some((skill) => skill.length > 80)) {
    errors.skills_text = "Enter 1–12 comma-separated skills, each up to 80 characters.";
  } else if (skills.some((skill) => protectedTerms.test(skill))) {
    errors.skills_text = "Use job-related skills only; protected characteristics are not permitted.";
  }
  if (candidate.work_examples.length > 1000) {
    errors.work_examples = "Keep optional work examples to 1,000 characters or fewer.";
  }
  if (!candidate.job_title.trim() || candidate.job_title.trim().length > 120) {
    errors.job_title = "Enter a job title of up to 120 characters.";
  } else if (protectedTerms.test(candidate.job_title)) {
    errors.job_title = "Use a job-related title only; protected characteristics are not permitted.";
  }
  HR_CRITERIA_IDS.forEach((id) => {
    const description = candidate[id].trim();
    if (description.length < 5 || description.length > 300) {
      errors[id] = "Use 5–300 characters for this job-related criterion.";
    } else if (protectedTerms.test(description)) {
      errors[id] = "Use only job-related criteria; protected characteristics are not permitted.";
    }
  });
  return errors;
}

function StatusPill({ children, tone = "neutral", title }: { children: string; tone?: "neutral" | "good" | "warning" | "danger" | "accent"; title?: string }) {
  return <span className={`status-pill ${tone}`} title={title} aria-label={title || children}>{children}</span>;
}

function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: string }) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </header>
  );
}

function OnboardingTour({ step, onStepChange, onDismiss }: { step: number; onStepChange: (step: number) => void; onDismiss: () => void }) {
  const current = ONBOARDING_STEPS[step] || ONBOARDING_STEPS[0];
  const isLast = step === ONBOARDING_STEPS.length - 1;
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onDismiss]);
  return (
    <div className="tour-backdrop" role="presentation">
      <section className="tour-dialog" role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-body">
        <div className="tour-dialog-topline">
          <p className="eyebrow">{current.eyebrow}</p>
          <button className="tour-close" type="button" onClick={onDismiss} aria-label="Close help and tour">×</button>
        </div>
        <div className="tour-progress" aria-label={`Tour step ${step + 1} of ${ONBOARDING_STEPS.length}`}>
          {ONBOARDING_STEPS.map((item, index) => <span key={item.title} className={index === step ? "active" : index < step ? "complete" : ""} />)}
        </div>
        <h2 id="tour-title">{current.title}</h2>
        <p id="tour-body">{current.body}</p>
        <div className="tour-actions">
          <button className="text-button" type="button" onClick={onDismiss}>Skip tour</button>
          <div className="button-row">
            {step > 0 ? <button className="button ghost" type="button" onClick={() => onStepChange(step - 1)}>Back</button> : null}
            <button className="button primary" type="button" onClick={() => isLast ? onDismiss() : onStepChange(step + 1)}>{isLast ? "Finish tour" : "Next"}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgressRail({ lessonComplete, runEligible, assessmentPassed, badgeAward }: { lessonComplete: boolean; runEligible: boolean; assessmentPassed: boolean; badgeAward?: BadgeAward | null }) {
  const stages = [
    ["Learn", lessonComplete],
    ["Practice", false],
    ["Run", runEligible],
    ["Assess", assessmentPassed],
    ["Prove", Boolean(badgeAward)],
  ];
  return (
    <ol className="progress-rail" aria-label="Learner progress">
      {stages.map(([label, done], index) => (
        <li key={String(label)} className={done ? "complete" : ""}>
          <span>{done ? "✓" : index + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  );
}

function EntryScreen({ busy, onEnter, error }: { busy: boolean; onEnter: (role: DemoRole, profile?: "fresh" | "seeded") => void; error?: string }) {
  return (
    <main className="entry-screen">
      <section className="entry-hero" aria-labelledby="welcome-heading">
        <div className="brand-lockup large">
          <span className="brand-mark" aria-hidden="true">I</span>
          <div>
            <strong>IkeOru</strong>
            <span>Learn. Do. Prove.</span>
          </div>
        </div>
        <p className="eyebrow">Capability, not just completion</p>
        <h1 id="welcome-heading">Turn a workplace workflow into evidence of skill.</h1>
        <p className="entry-copy">
          This guided MVP teaches one Sales workflow and one HR workflow using synthetic data only. Choose a demo session to explore the learner or manager experience.
        </p>
        <div className="notice inline-notice" role="note">
          <strong>Demo safety:</strong> Do not enter real leads, customer details, or secrets. IkeOru uses fictional sample data in this prototype.
        </div>
        {error ? <p className="error-banner" role="alert">{error}</p> : null}
      </section>
      <section className="role-grid" aria-label="Choose a demo role">
        <article className="role-card learner-card">
          <span className="card-icon" aria-hidden="true">↗</span>
          <p className="eyebrow">Learner demo</p>
          <h2>Build practical Sales and HR capabilities</h2>
          <p>Learn a workflow, configure a bounded decision, inspect a result, and see how earned evidence belongs in a portfolio.</p>
          <button className="button primary" type="button" onClick={() => onEnter("learner")} disabled={busy}>
            {busy ? "Creating session…" : "Start learner demo"}
          </button>
          <button className="text-button prepared-demo-link" type="button" onClick={() => onEnter("learner", "seeded")} disabled={busy}>
            View prepared learner evidence <span aria-hidden="true">→</span>
          </button>
          <small className="prepared-demo-note">Prepared sample only — it is not a newly earned achievement.</small>
        </article>
        <article className="role-card manager-card">
          <span className="card-icon" aria-hidden="true">⌁</span>
          <p className="eyebrow">Manager demo</p>
          <h2>See organization-ready progress</h2>
          <p>Review a deliberately limited organization summary. Raw lead inputs and assessment answers are never included.</p>
          <button className="button secondary" type="button" onClick={() => onEnter("manager")} disabled={busy}>
            {busy ? "Creating session…" : "Start manager demo"}
          </button>
        </article>
      </section>
    </main>
  );
}

function DashboardScreen({
  identity,
  sessionMode,
  lessonComplete,
  hrLessonComplete,
  portfolio,
  prepared,
  onNavigate,
}: {
  identity?: CurrentIdentity;
  sessionMode: SessionMode;
  lessonComplete: boolean;
  hrLessonComplete: boolean;
  portfolio?: PortfolioData | null;
  prepared: boolean;
  onNavigate: (view: AppView) => void;
}) {
  const progressByWorkflow = portfolio?.progress?.by_workflow || {};
  const salesProgress = progressByWorkflow[WORKFLOW_KEY] || {};
  const hrProgress = progressByWorkflow[HR_WORKFLOW_KEY] || {};
  const statusFor = (lessonDone: boolean, workflowProgress: { lesson_completed?: boolean; eligible_live_lab_completed?: boolean; assessment_passed?: boolean }) => {
    if (sessionMode !== "server") return "Preview only";
    if (workflowProgress.assessment_passed) return "Assessment passed";
    if (workflowProgress.eligible_live_lab_completed) return "Lab evidence recorded";
    if (workflowProgress.lesson_completed || lessonDone) return "Lesson complete";
    return "Ready to begin";
  };
  return (
    <main className="page-shell">
      <PageIntro eyebrow={identity?.display_name ? `Welcome, ${identity.display_name}` : "Learner dashboard"} title="Build skills that show up at work.">
        Learn a practical workplace task, practise a synthetic scenario, and keep verified capability evidence in your private record.
      </PageIntro>
      {sessionMode === "preview" ? (
        <div className="notice warning" role="status">
          Local interface preview only. No activity, score, badge, or portfolio change is being saved until the FastAPI service is available.
        </div>
      ) : null}
      {prepared ? <div className="notice warning" role="status">Prepared sample evidence is shown for demo rehearsal. It was seeded by the server and is not a newly earned learner achievement.</div> : null}
      <section className="dashboard-heading">
        <div>
          <p className="eyebrow">Active learning paths</p>
          <h2>Choose what to practise next.</h2>
        </div>
        <p>Both paths share the same honest loop: Learn → Practice → Run → Assess → Prove.</p>
      </section>
      <section className="dashboard-grid" aria-label="Active learning paths">
        <article className="hero-card path-card">
          <div>
            <StatusPill tone="accent">Beginner pathway</StatusPill>
            <h2>Sales → {WORKFLOW_TITLE}</h2>
            <p>Understand the workflow, choose the HOT follow-up rule, and run a validated synthetic lead.</p>
            <span className="path-status">{statusFor(lessonComplete, salesProgress)}</span>
          </div>
          <button className="button primary" type="button" onClick={() => onNavigate(lessonComplete ? "lab" : "sales")}>
            {lessonComplete ? "Continue to Lab" : "Continue learning"}
          </button>
        </article>
        <article className="hero-card hr-hero-card path-card">
          <div>
            <StatusPill tone="accent">Beginner pathway</StatusPill>
            <h2>HR → {HR_WORKFLOW_TITLE}</h2>
            <p>Compare supplied synthetic candidate evidence with explicit job-related criteria, then require human review.</p>
            <span className="path-status">{statusFor(hrLessonComplete, hrProgress)}</span>
          </div>
          <button className="button primary" type="button" onClick={() => onNavigate(hrLessonComplete ? "hr-lab" : "hr")}>
            {hrLessonComplete ? "Continue to Lab" : "Explore HR pathway"}
          </button>
        </article>
      </section>
      <section className="dashboard-record" aria-label="Capability record">
        <div>
          <p className="eyebrow">What you have achieved</p>
          <h2>{portfolio?.badges?.length ? `${portfolio.badges.length} server-issued achievement${portfolio.badges.length === 1 ? "" : "s"}` : sessionMode === "server" ? "Your capability record is ready." : "Build your capability record."}</h2>
          <p>{portfolio?.badges?.length ? "Keep the evidence private or select safe items to share." : sessionMode === "server" ? "Complete a path to add verified work." : "Connect the FastAPI service to save progress and achievements."}</p>
        </div>
        <button className="button ghost" type="button" onClick={() => onNavigate("portfolio")}>Open private portfolio</button>
      </section>
      <section className="section-block split-section">
        <div>
          <p className="eyebrow">How it works</p>
          <h2>Academy → Lab → Studio → Cloud</h2>
          <p>Today’s MVP focuses on Academy and Lab: guided understanding followed by a real, bounded run.</p>
        </div>
        <div className="pathway" aria-label="IkeOru learning architecture">
          <span className="active">Academy</span><span>→</span><span className="active">Lab</span><span>→</span><span>Studio</span><span>→</span><span>Cloud</span>
        </div>
      </section>
      <section className="section-block action-row">
        <div>
          <p className="eyebrow">Explore domains</p>
          <h2>Sales and HR are active. The rest are clearly staged.</h2>
        </div>
        <button className="button ghost" type="button" onClick={() => onNavigate("explore")}>Explore capability areas</button>
      </section>
    </main>
  );
}

function ExploreScreen({ domains, onNavigate }: { domains: Domain[]; onNavigate: (view: AppView) => void }) {
  return (
    <main className="page-shell">
      <PageIntro eyebrow="Explore IkeOru" title="Learn capabilities that show up at work.">
        The Moonshot MVP enables two truthful learning paths. Other domains remain visible only as planned capability areas.
      </PageIntro>
      <section className="domain-grid" aria-label="IkeOru capability domains">
        {domains.map((domain) => {
          const available = domain.availability === "active";
          return (
            <article className={`domain-card ${available ? "active" : ""}`} key={domain.key ?? domain.title}>
              <div className="domain-card-heading">
                <h2>{domain.title}</h2>
                <StatusPill tone={available ? "good" : "neutral"}>
                  {available ? "Active" : "Coming Soon"}
                </StatusPill>
              </div>
              <p>{domain.description || (available ? "Available now." : "Coming Soon")}</p>
              {available ? (
                <button className="text-button" type="button" onClick={() => onNavigate(domain.key === "human-resources" ? "hr" : "sales")}>
                  Open {domain.title} <span aria-hidden="true">→</span>
                </button>
              ) : (
                <span className="unavailable-copy">Not available in this MVP</span>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}

function SalesScreen({ lessonComplete, onNavigate }: { lessonComplete: boolean; onNavigate: (view: AppView) => void }) {
  return (
    <main className="page-shell">
      <PageIntro eyebrow="Sales · Active domain" title={WORKFLOW_TITLE}>
        Learn the difference between AI interpretation and a controlled business action—then prove you can configure the workflow safely.
      </PageIntro>
      <section className="workflow-overview">
        <article className="workflow-card featured">
          <div className="workflow-card-topline">
            <StatusPill tone="good">Available Lab</StatusPill>
            <span>~12 minutes</span>
          </div>
          <h2>Qualify a New Lead</h2>
          <p>Use a fictional business-software inquiry. The server validates input, classifies it, applies its policy, and records a safe internal result.</p>
          <div className="workflow-actions">
            <button className="button primary" type="button" onClick={() => onNavigate("lesson")}>
              {lessonComplete ? "Review lesson" : "Start lesson"}
            </button>
            <button className="button ghost" type="button" onClick={() => onNavigate("lab")}>Open Lab</button>
          </div>
        </article>
        <aside className="requirements-card">
          <p className="eyebrow">Badge requirements</p>
          <h2>Sales Automation — Level 1</h2>
          <ul>
            <li>Explicitly complete the lesson</li>
            <li>Complete one eligible server-backed Lab run</li>
            <li>Pass the practical assessment on the server</li>
          </ul>
          <p>Replay and failed runs never award a badge.</p>
        </aside>
      </section>
      <section className="planned-list" aria-label="Planned Sales workflows">
        <div>
          <p className="eyebrow">Planned, not enabled</p>
          <h2>More Sales workflows are on the roadmap.</h2>
        </div>
        <div className="planned-pills">
          <span>Lead Follow-Up · Coming Soon</span>
          <span>Lead Generation · Coming Soon</span>
          <span>Email Drafting · Coming Soon</span>
          <span>Pipeline Reporting · Coming Soon</span>
          <span>Re-engagement · Coming Soon</span>
        </div>
      </section>
    </main>
  );
}

function HrScreen({ lessonComplete, onNavigate }: { lessonComplete: boolean; onNavigate: (view: AppView) => void }) {
  return (
    <main className="page-shell">
      <PageIntro eyebrow="HR · Active domain" title={HR_WORKFLOW_TITLE}>
        Compare synthetic candidate evidence with explicit job-related criteria, record what is missing, and require human review for every recommendation.
      </PageIntro>
      <section className="workflow-overview">
        <article className="workflow-card featured">
          <div className="workflow-card-topline">
            <StatusPill tone="good">Available Lab</StatusPill>
            <span>~12 minutes</span>
          </div>
          <h2>Candidate Screening</h2>
          <p>Use synthetic information only. The server evaluates supplied evidence against criteria you can inspect; it does not infer protected characteristics, reject a candidate, or make a final hiring decision.</p>
          <div className="workflow-actions">
            <button className="button primary" type="button" onClick={() => onNavigate("hr-lesson")}>
              {lessonComplete ? "Review lesson" : "Start lesson"}
            </button>
            <button className="button ghost" type="button" onClick={() => onNavigate("hr-lab")}>Open Lab</button>
          </div>
        </article>
        <aside className="requirements-card">
          <p className="eyebrow">Badge requirements</p>
          <h2>HR Candidate Screening — Level 1</h2>
          <ul>
            <li>Explicitly complete the lesson</li>
            <li>Complete one eligible server-backed Lab run</li>
            <li>Pass the practical assessment on the server</li>
          </ul>
          <p>Every result requires human review. Replay and failed runs never award a badge.</p>
        </aside>
      </section>
      <section className="human-review-callout">
        <div>
          <p className="eyebrow">Decision boundary</p>
          <h2>The workflow informs a reviewer; it never decides who to hire.</h2>
          <p>Only explicit job-related criteria and supplied synthetic evidence are considered. Missing information stays visible rather than being inferred.</p>
        </div>
        <span aria-hidden="true">◎</span>
      </section>
      <section className="planned-list" aria-label="Planned HR workflows">
        <div>
          <p className="eyebrow">Planned, not enabled</p>
          <h2>More HR workflows are on the roadmap.</h2>
        </div>
        <div className="planned-pills">
          <span>Interview Scheduling · Coming Soon</span>
          <span>Onboarding · Coming Soon</span>
          <span>Employee-query Classification · Coming Soon</span>
          <span>Leave Processing · Coming Soon</span>
          <span>Training-needs Identification · Coming Soon</span>
          <span>HR Document Processing · Coming Soon</span>
        </div>
      </section>
    </main>
  );
}

function AcademyLessonScreen({
  lesson,
  complete,
  busy,
  message,
  onRecordProgress,
  onComplete,
  onNavigate,
  backView,
  nextView,
  label,
}: {
  lesson: AcademyLesson;
  complete: boolean;
  busy: boolean;
  message?: string;
  onRecordProgress: (sectionId: string, checkId?: string, answer?: string) => Promise<{ correct?: boolean; feedback?: string }>;
  onComplete: (sectionIds: string[], checkIds: string[]) => Promise<void>;
  onNavigate: (view: AppView) => void;
  backView: AppView;
  nextView: AppView;
  label: string;
}) {
  const sections = lesson.sections || [];
  const initialIndex = Math.min(lesson.progress?.current_section || 0, Math.max(0, sections.length - 1));
  const [sectionIndex, setSectionIndex] = useState(initialIndex);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [localSections, setLocalSections] = useState<string[]>([]);
  const [localChecks, setLocalChecks] = useState<string[]>([]);
  const completedSections = new Set([...(lesson.progress?.completed_sections || []), ...localSections]);
  const completedChecks = new Set([...(lesson.progress?.completed_knowledge_checks || []), ...localChecks]);
  const section = sections[sectionIndex];
  useEffect(() => {
    setSectionIndex(Math.min(lesson.progress?.current_section || 0, Math.max(0, sections.length - 1)));
  }, [lesson.progress?.current_section, sections.length]);
  useEffect(() => {
    setAnswer("");
    setFeedback(undefined);
  }, [section?.id]);

  async function continueSection() {
    if (!section || saving) return;
    const check = section.knowledge_check;
    if (completedSections.has(section.id)) {
      if (sectionIndex < sections.length - 1) setSectionIndex((current) => current + 1);
      else await onComplete([...completedSections], [...completedChecks]);
      return;
    }
    if (check && !answer) {
      setFeedback("Choose an answer before continuing.");
      return;
    }
    setSaving(true);
    setFeedback(undefined);
    try {
      const result = await onRecordProgress(section.id, check?.id, answer || undefined);
      if (result.correct === false) {
        setFeedback(result.feedback || "Not yet. Re-read this section and try again.");
        return;
      }
      setLocalSections((current) => [...new Set([...current, section.id])]);
      if (check) setLocalChecks((current) => [...new Set([...current, check.id])]);
      const nextSections = [...new Set([...completedSections, section.id])];
      const nextChecks = check ? [...new Set([...completedChecks, check.id])] : [...completedChecks];
      if (sectionIndex === sections.length - 1) {
        await onComplete(nextSections, nextChecks);
      } else {
        setSectionIndex((current) => current + 1);
      }
      setFeedback(result.feedback || "Section complete. Continue when you are ready.");
    } finally {
      setSaving(false);
    }
  }

  if (!section) {
    return <main className="page-shell"><div className="notice warning" role="status">This Academy lesson is not available yet.</div></main>;
  }
  const progressPercent = Math.round((completedSections.size / sections.length) * 100);
  return (
    <main className="page-shell academy-page">
      <PageIntro eyebrow={`Academy · ${label}`} title={lesson.title || "Build understanding before practice."}>
        {lesson.problem || "Learn the concepts, practise a bounded scenario, and prove what you can apply."}
      </PageIntro>
      <section className="academy-summary" aria-label="Academy progress">
        <div><span className="eyebrow">Learn</span><strong>{completedSections.size} of {sections.length} sections complete</strong><small>Understand the reasoning before you configure the Lab.</small></div>
        <div className="progress-track" aria-label={`${progressPercent}% of Academy sections complete`}><span style={{ width: `${progressPercent}%` }} /></div>
      </section>
      <nav className="academy-stepper" aria-label={`${label} Academy sections`}>
        {sections.map((item, index) => <button key={item.id} type="button" className={`academy-step ${index === sectionIndex ? "active" : ""} ${completedSections.has(item.id) ? "complete" : ""}`} onClick={() => index <= completedSections.size ? setSectionIndex(index) : undefined} disabled={index > completedSections.size} aria-current={index === sectionIndex ? "step" : undefined}><span>{completedSections.has(item.id) ? "✓" : index + 1}</span>{item.title}</button>)}
      </nav>
      <article className="academy-section-card">
        <p className="eyebrow">Section {sectionIndex + 1} of {sections.length}</p>
        <h2>{section.title}</h2>
        <p className="academy-objective"><strong>By the end of this section you can:</strong> {section.objective}</p>
        <p>{section.overview}</p>
        <div className="academy-concept-list">
          {section.concepts.map((concept, index) => <details className="academy-concept" open={index === 0} key={`${section.id}-${concept.term || index}`}><summary>{concept.term || "Concept"}</summary><div><p>{concept.meaning}</p>{concept.why_it_matters ? <p><strong>Why it matters:</strong> {concept.why_it_matters}</p> : null}{concept.example ? <p><strong>Example:</strong> {concept.example}</p> : null}{concept.common_mistake ? <p><strong>Common mistake:</strong> {concept.common_mistake}</p> : null}{concept.correct_application ? <p><strong>Recognise it:</strong> {concept.correct_application}</p> : null}</div></details>)}
        </div>
        {section.worked_example ? <section className="worked-example"><p className="eyebrow">Worked example</p><h3>Follow the reasoning</h3><dl>{Object.entries(section.worked_example).map(([key, value]) => value ? <div key={key}><dt>{key.replaceAll("_", " ")}</dt><dd>{value}</dd></div> : null)}</dl></section> : null}
        {section.knowledge_check ? <fieldset className="knowledge-check"><legend>Knowledge check</legend><p>{section.knowledge_check.prompt}</p>{section.knowledge_check.options.map((option) => <label className={`choice ${answer === option.id ? "selected" : ""}`} key={option.id}><input type="radio" name={`check-${section.id}`} value={option.id} checked={answer === option.id} onChange={() => setAnswer(option.id)} disabled={completedSections.has(section.id)} /><span>{option.label}</span></label>)}</fieldset> : null}
        {feedback ? <p className={`status-message ${feedback.startsWith("Not yet") || feedback.startsWith("Choose") ? "warning-text" : ""}`} role="status">{feedback}</p> : null}
      </article>
      {message ? <p className="status-message" role="status">{message}</p> : null}
      <section className="lesson-footer">
        <p>{complete ? "Academy completion is recorded. The Lab now lets you apply this reasoning." : "Complete each section and its knowledge check before entering the Lab."}</p>
        <div className="button-row">
          <button className="button ghost" type="button" onClick={() => sectionIndex > 0 ? setSectionIndex((current) => current - 1) : onNavigate(backView)}>Back</button>
          {complete ? <button className="button primary" type="button" onClick={() => onNavigate(nextView)}>Continue to Lab</button> : <button className="button primary" type="button" onClick={() => void continueSection()} disabled={saving || busy}>{saving || busy ? "Saving…" : sectionIndex === sections.length - 1 ? "Complete Academy" : completedSections.has(section.id) ? "Next section" : "Complete section"}</button>}
        </div>
      </section>
    </main>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="field-error" role="alert">{message}</p> : null;
}

function IndependentExerciseCard({
  exercise,
  result,
  busy,
  serverAvailable,
  onSubmit,
}: {
  exercise?: IndependentExercise | null;
  result?: IndependentExerciseResult | null;
  busy: boolean;
  serverAvailable: boolean;
  onSubmit: (answers: Record<string, string>) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  useEffect(() => setAnswers({}), [exercise?.id]);
  if (!exercise) return null;
  const fields = exercise.fields || [];
  const complete = fields.length > 0 && fields.every((field) => Boolean(answers[field.id]));
  return (
    <section className="independent-exercise" aria-label="Independent scenario exercise">
      <div className="section-heading-row"><div><p className="eyebrow">Independent exercise · Apply</p><h2>{exercise.title || "Independent scenario"}</h2></div><StatusPill tone={result?.passed || exercise.progress?.passed ? "good" : "neutral"}>{result?.passed || exercise.progress?.passed ? "Passed" : `${exercise.progress?.attempt_count || 0} attempts`}</StatusPill></div>
      <p className="academy-objective"><strong>Objective:</strong> {exercise.objective}</p>
      <p>{exercise.instructions}</p>
      <article className="scenario-panel"><p className="eyebrow">Scenario</p><p>{exercise.scenario}</p>{exercise.criteria?.length ? <><strong>Explicit criteria</strong><ul>{exercise.criteria.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul></> : null}<strong>Supplied evidence</strong><ul>{(exercise.evidence || []).map((item) => <li key={item}>{item}</li>)}</ul></article>
      <form className="exercise-form" onSubmit={(event) => { event.preventDefault(); onSubmit(answers); }}>
        {fields.map((field) => <fieldset key={field.id}><legend>{field.label}</legend><div className="choice-stack compact">{field.options.map((option) => { const fieldResult = result?.field_results?.[field.id]; return <label className={`choice ${answers[field.id] === option.id ? "selected" : ""}`} key={option.id}><input type="radio" name={`exercise-${exercise.id}-${field.id}`} value={option.id} checked={answers[field.id] === option.id} onChange={() => setAnswers((current) => ({ ...current, [field.id]: option.id }))} disabled={busy || result?.passed === true} /><span>{option.label}{fieldResult && answers[field.id] === option.id ? <small className={fieldResult.correct ? "success-text" : "warning-text"}>{fieldResult.feedback}</small> : null}</span></label>; })}</div></fieldset>)}
        {result?.feedback ? <p className={`status-message ${result.passed ? "success-text" : "warning-text"}`} role="status">{result.feedback}</p> : null}
        <button className="button primary" type="submit" disabled={!serverAvailable || busy || !complete || result?.passed === true}>{busy ? "Checking…" : result?.passed ? "Independent exercise passed" : "Submit independent decision"}</button>
      </form>
    </section>
  );
}

function LabScreen({
  lead,
  errors,
  trigger,
  policy,
  busy,
  serverAvailable,
  error,
  onLeadChange,
  onTriggerChange,
  onPolicyChange,
  onLoadSample,
  onRun,
  onReplay,
  exercise,
  exerciseResult,
  exerciseBusy,
  onExerciseSubmit,
}: {
  lead: LeadForm;
  errors: Record<string, string>;
  trigger: string;
  policy: FollowUpPolicy;
  busy: boolean;
  serverAvailable: boolean;
  error?: string;
  onLeadChange: (field: keyof LeadForm, value: string) => void;
  onTriggerChange: (value: string) => void;
  onPolicyChange: (value: FollowUpPolicy) => void;
  onLoadSample: () => void;
  onRun: () => void;
  onReplay: () => void;
  exercise?: IndependentExercise | null;
  exerciseResult?: IndependentExerciseResult | null;
  exerciseBusy: boolean;
  onExerciseSubmit: (answers: Record<string, string>) => void;
}) {
  return (
    <main className="page-shell">
      <PageIntro eyebrow="Lab · Guided practice" title="Configure one bounded workflow decision.">
        There is no visual editor here. Select from the approved options, use synthetic data, and let the server apply its policy.
      </PageIntro>
      {!serverAvailable ? (
        <div className="notice warning" role="status">
          FastAPI is unavailable. You can inspect the form and explicitly open a labelled replay, but no live run, task, progress, badge, or portfolio update can occur.
        </div>
      ) : null}
      <section className="practice-coach" aria-label="Sales guided practice">
        <div><p className="eyebrow">Demonstration → guided practice → supported exercise</p><h2>Think like the practitioner before you run.</h2><p>First identify the trigger and supplied evidence. Then predict the policy branch. AI interprets language; the server decides the permitted internal action.</p></div>
        <details><summary>Scenario challenge</summary><p>Imagine the message says “we are exploring options” with no timeframe. Which information would you keep unknown, and why would WARM or NEEDS_REVIEW be safer than inventing urgency?</p></details>
      </section>
      <section className="lab-layout">
        <form className="lab-form" onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onRun(); }} noValidate>
          <fieldset>
            <legend><span className="step-number">1</span> Choose the trigger</legend>
            <p className="field-help">Only the correct trigger is accepted by the server. IkeOru explains the other choices instead of treating them as a workflow editor.</p>
            <div className="choice-stack">
              <label className={`choice ${trigger === "new_lead_submitted" ? "selected" : ""}`}>
                <input type="radio" name="trigger" value="new_lead_submitted" checked={trigger === "new_lead_submitted"} onChange={(event) => onTriggerChange(event.target.value)} />
                <span><strong>New lead submitted</strong><small>Starts this Sales workflow</small></span>
              </label>
              <label className={`choice ${trigger === "new_badge_published" ? "selected" : ""}`}>
                <input type="radio" name="trigger" value="new_badge_published" checked={trigger === "new_badge_published"} onChange={(event) => onTriggerChange(event.target.value)} />
                <span><strong>New badge published</strong><small>Incorrect: that happens after an earned achievement</small></span>
              </label>
              <label className={`choice ${trigger === "task_completed" ? "selected" : ""}`}>
                <input type="radio" name="trigger" value="task_completed" checked={trigger === "task_completed"} onChange={(event) => onTriggerChange(event.target.value)} />
                <span><strong>Task completed</strong><small>Incorrect: a task may be one possible outcome</small></span>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend><span className="step-number">2</span> Set the HOT follow-up policy</legend>
            <div className="choice-inline">
              <label className={`choice ${policy === "immediate" ? "selected" : ""}`}>
                <input type="radio" name="hot-policy" value="immediate" checked={policy === "immediate"} onChange={() => onPolicyChange("immediate")} />
                <span><strong>Immediate</strong><small>Create a HOT task due now</small></span>
              </label>
              <label className={`choice ${policy === "within_24_hours" ? "selected" : ""}`}>
                <input type="radio" name="hot-policy" value="within_24_hours" checked={policy === "within_24_hours"} onChange={() => onPolicyChange("within_24_hours")} />
                <span><strong>Within 24 hours</strong><small>Create a HOT task within a day</small></span>
              </label>
            </div>
            <p className="field-help">WARM always receives a follow-up task within 72 hours. COLD creates no task. NEEDS_REVIEW creates an internal review task.</p>
          </fieldset>
          <fieldset>
            <div className="fieldset-heading">
              <legend><span className="step-number">3</span> Add synthetic lead input</legend>
              <button className="text-button" type="button" onClick={onLoadSample}>Load labelled sample</button>
            </div>
            <div className="synthetic-label">Synthetic data only — never paste real customer or contact details.</div>
            <div className="form-grid">
              <label>
                Lead name <span aria-hidden="true">*</span>
                <input value={lead.name} maxLength={100} onChange={(event) => onLeadChange("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "lead-name-error" : undefined} />
                <FieldError message={errors.name} />
              </label>
              <label>
                Company <span aria-hidden="true">*</span>
                <input value={lead.company} maxLength={150} onChange={(event) => onLeadChange("company", event.target.value)} aria-invalid={Boolean(errors.company)} />
                <FieldError message={errors.company} />
              </label>
              <label className="full-width">
                Message <span aria-hidden="true">*</span>
                <textarea value={lead.message} maxLength={2000} rows={5} onChange={(event) => onLeadChange("message", event.target.value)} aria-invalid={Boolean(errors.message)} />
                <small>{lead.message.trim().length}/20 minimum characters</small>
                <FieldError message={errors.message} />
              </label>
              <label>
                Industry
                <input value={lead.industry} maxLength={100} onChange={(event) => onLeadChange("industry", event.target.value)} />
              </label>
              <label>
                Company size
                <input value={lead.company_size} inputMode="numeric" onChange={(event) => onLeadChange("company_size", event.target.value)} aria-invalid={Boolean(errors.company_size)} />
                <FieldError message={errors.company_size} />
              </label>
              <label>
                Budget amount
                <input value={lead.budget_amount} inputMode="decimal" onChange={(event) => onLeadChange("budget_amount", event.target.value)} aria-invalid={Boolean(errors.budget_amount)} />
                <FieldError message={errors.budget_amount} />
              </label>
              <label>
                Currency
                <select value={lead.currency} onChange={(event) => onLeadChange("currency", event.target.value)} aria-invalid={Boolean(errors.currency)}>
                  <option value="USD">USD</option>
                  <option value="NGN">NGN</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                  <option value="ZAR">ZAR</option>
                </select>
                <FieldError message={errors.currency} />
              </label>
              <label>
                Stated need
                <input value={lead.need} maxLength={500} onChange={(event) => onLeadChange("need", event.target.value)} />
              </label>
              <label>
                Purchase timeframe
                <select value={lead.purchase_timeframe} onChange={(event) => onLeadChange("purchase_timeframe", event.target.value)}>
                  <option value="">Not stated</option>
                  <option value="immediate">Immediate</option>
                  <option value="within_30_days">Within 30 days</option>
                  <option value="one_to_three_months">One to three months</option>
                  <option value="more_than_three_months">More than three months</option>
                  <option value="unknown">Unknown</option>
                  <option value="no_current_timeline">No current timeline</option>
                </select>
              </label>
            </div>
          </fieldset>
          {error ? <p className="error-banner" role="alert">{error}</p> : null}
          <div className="run-actions">
            <button className="button primary" type="submit" disabled={busy || !serverAvailable}>{busy ? "Running…" : "Run workflow"}</button>
            <button className="button ghost" type="button" onClick={onReplay} disabled={busy}>View labelled replay instead</button>
          </div>
        </form>
        <aside className="timeline-preview">
          <p className="eyebrow">Server-owned execution</p>
          <h2>What you will inspect</h2>
          <ol>
            <li>Receive & validate input</li>
            <li>Classify supplied text with AI</li>
            <li>Evaluate the allowed policy</li>
            <li>Create, skip, or review an internal task</li>
            <li>Persist a safe result and timeline</li>
          </ol>
          <p>The model cannot take arbitrary external actions. It returns structured information; the backend controls permitted tools.</p>
        </aside>
      </section>
      <IndependentExerciseCard exercise={exercise} result={exerciseResult} busy={exerciseBusy} serverAvailable={serverAvailable} onSubmit={onExerciseSubmit} />
    </main>
  );
}

function HrLabScreen({
  candidate,
  errors,
  trigger,
  busy,
  serverAvailable,
  error,
  onCandidateChange,
  onTriggerChange,
  onLoadSample,
  onRun,
  onReplay,
  exercise,
  exerciseResult,
  exerciseBusy,
  onExerciseSubmit,
}: {
  candidate: HrCandidateForm;
  errors: Record<string, string>;
  trigger: string;
  busy: boolean;
  serverAvailable: boolean;
  error?: string;
  onCandidateChange: (field: keyof HrCandidateForm, value: string) => void;
  onTriggerChange: (value: string) => void;
  onLoadSample: () => void;
  onRun: () => void;
  onReplay: () => void;
  exercise?: IndependentExercise | null;
  exerciseResult?: IndependentExerciseResult | null;
  exerciseBusy: boolean;
  onExerciseSubmit: (answers: Record<string, string>) => void;
}) {
  return (
    <main className="page-shell">
      <PageIntro eyebrow="Lab · Guided HR practice" title="Compare evidence with explicit job-related criteria.">
        There is no autonomous screening decision here. Use synthetic data, define only job-related criteria, and inspect a required human-review recommendation.
      </PageIntro>
      {!serverAvailable ? (
        <div className="notice warning" role="status">
          FastAPI is unavailable. You can inspect the form and explicitly open a labelled replay, but no run, progress, badge, or portfolio update can occur.
        </div>
      ) : null}
      <section className="practice-coach" aria-label="HR guided practice">
        <div><p className="eyebrow">Demonstration → guided practice → supported exercise</p><h2>Compare evidence before you interpret it.</h2><p>Read each explicit criterion, find the supplied candidate field that supports it, and leave gaps visible. The result prepares a human review; it never decides who to hire.</p></div>
        <details><summary>Scenario challenge</summary><p>A criterion has no supporting work example. Should it be marked supported, treated as a rejection, or recorded as missing for review?</p></details>
      </section>
      <section className="lab-layout">
        <form className="lab-form" onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onRun(); }} noValidate>
          <fieldset>
            <legend><span className="step-number">1</span> Choose the trigger</legend>
            <p className="field-help">Only the correct trigger is accepted by the server. This is a constrained learning exercise, not a general HR automation builder.</p>
            <div className="choice-stack">
              <label className={`choice ${trigger === "candidate_submitted" ? "selected" : ""}`}>
                <input type="radio" name="hr-trigger" value="candidate_submitted" checked={trigger === "candidate_submitted"} onChange={(event) => onTriggerChange(event.target.value)} />
                <span><strong>Synthetic candidate submitted</strong><small>Starts this HR evidence-evaluation workflow</small></span>
              </label>
              <label className={`choice ${trigger === "offer_signed" ? "selected" : ""}`}>
                <input type="radio" name="hr-trigger" value="offer_signed" checked={trigger === "offer_signed"} onChange={(event) => onTriggerChange(event.target.value)} />
                <span><strong>Offer signed</strong><small>Incorrect: this workflow does not create or approve offers</small></span>
              </label>
              <label className={`choice ${trigger === "interview_complete" ? "selected" : ""}`}>
                <input type="radio" name="hr-trigger" value="interview_complete" checked={trigger === "interview_complete"} onChange={(event) => onTriggerChange(event.target.value)} />
                <span><strong>Interview complete</strong><small>Incorrect: scheduling and interview automation are Coming Soon</small></span>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend><span className="step-number">2</span> Confirm the safety boundary</legend>
            <div className="choice selected" aria-live="polite">
              <span><strong>Human review is required</strong><small>The server will return a recommendation and evidence summary only. It never accepts, rejects, ranks, or makes a final hiring decision.</small></span>
            </div>
          </fieldset>
          <fieldset>
            <div className="fieldset-heading">
              <legend><span className="step-number">3</span> Add synthetic candidate evidence</legend>
              <button className="text-button" type="button" onClick={onLoadSample}>Load labelled sample</button>
            </div>
            <div className="synthetic-label">Synthetic data only — do not enter real candidate details, protected characteristics, or sensitive personal information.</div>
            <div className="form-grid">
              <label>
                Candidate name <span aria-hidden="true">*</span>
                <input value={candidate.name} maxLength={100} onChange={(event) => onCandidateChange("name", event.target.value)} aria-invalid={Boolean(errors.name)} />
                <FieldError message={errors.name} />
              </label>
              <label>
                Skills <span aria-hidden="true">*</span>
                <input value={candidate.skills_text} maxLength={960} placeholder="For example: customer support, writing, Zendesk" onChange={(event) => onCandidateChange("skills_text", event.target.value)} aria-invalid={Boolean(errors.skills_text)} />
                <small>Comma-separated, supplied skills only</small>
                <FieldError message={errors.skills_text} />
              </label>
              <label className="full-width">
                Experience summary <span aria-hidden="true">*</span>
                <textarea value={candidate.experience_summary} maxLength={2000} rows={5} onChange={(event) => onCandidateChange("experience_summary", event.target.value)} aria-invalid={Boolean(errors.experience_summary)} />
                <small>{candidate.experience_summary.trim().length}/20 minimum characters</small>
                <FieldError message={errors.experience_summary} />
              </label>
              <label className="full-width">
                Optional work examples
                <textarea value={candidate.work_examples} maxLength={1000} rows={3} onChange={(event) => onCandidateChange("work_examples", event.target.value)} aria-invalid={Boolean(errors.work_examples)} />
                <FieldError message={errors.work_examples} />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend><span className="step-number">4</span> Set explicit job-related criteria</legend>
            <p className="field-help">The server rejects protected-characteristic criteria. Evidence is compared only with the criteria you state here; missing evidence stays missing.</p>
            <div className="form-grid">
              <label className="full-width">
                Job title <span aria-hidden="true">*</span>
                <input value={candidate.job_title} maxLength={120} onChange={(event) => onCandidateChange("job_title", event.target.value)} aria-invalid={Boolean(errors.job_title)} />
                <FieldError message={errors.job_title} />
              </label>
              {HR_CRITERIA_IDS.map((id, index) => (
                <label className="full-width" key={id}>
                  Criterion {index + 1} <span aria-hidden="true">*</span>
                  <input value={candidate[id]} maxLength={300} onChange={(event) => onCandidateChange(id, event.target.value)} aria-invalid={Boolean(errors[id])} />
                  <FieldError message={errors[id]} />
                </label>
              ))}
            </div>
          </fieldset>
          {error ? <p className="error-banner" role="alert">{error}</p> : null}
          <div className="run-actions">
            <button className="button primary" type="submit" disabled={busy || !serverAvailable}>{busy ? "Running…" : "Run workflow"}</button>
            <button className="button ghost" type="button" onClick={onReplay} disabled={busy}>View labelled replay instead</button>
          </div>
        </form>
        <aside className="timeline-preview">
          <p className="eyebrow">Server-owned execution</p>
          <h2>What you will inspect</h2>
          <ol>
            <li>Receive & validate synthetic input</li>
            <li>Validate explicit job-related criteria</li>
            <li>Evaluate supplied evidence with AI</li>
            <li>Record evidence and missing information</li>
            <li>Require a human reviewer for the next step</li>
          </ol>
          <p>The model cannot search the web, infer protected characteristics, or decide whether to hire someone. It returns structured evidence; the backend owns the decision boundary.</p>
        </aside>
      </section>
      <IndependentExerciseCard exercise={exercise} result={exerciseResult} busy={exerciseBusy} serverAvailable={serverAvailable} onSubmit={onExerciseSubmit} />
    </main>
  );
}

function ResultScreen({ run, error, busy, onRefresh, onNavigate, onRestartSession, workflow = "sales" }: { run?: RunResult | null; error?: string; busy: boolean; onRefresh: () => void; onNavigate: (view: AppView) => void; onRestartSession?: () => void; workflow?: "sales" | "hr" }) {
  const mode = resolveRunMode(run);
  const events = run?.events || [];
  const status = run?.status || "queued";
  const successful = status === "completed" || status === "needs_review";
  const isHr = workflow === "hr";
  const reviewRequired = isHr && (run?.human_review_required === true || run?.recommendation === "HUMAN_REVIEW_REQUIRED");
  const sessionNeedsRefresh = Boolean(error && /session|csrf|refresh your demo session/i.test(error));
  return (
    <main className="page-shell">
      <PageIntro eyebrow={`Lab · ${isHr ? "HR evidence result" : "Result"}`} title={isHr ? "Inspect the evidence and human-review recommendation." : "Inspect what actually happened."}>
        {isHr ? "This workflow records supplied evidence and missing information only. It never makes a final hiring decision." : "A finished animation is not treated as a completed run. IkeOru only reports the persisted server state."}
      </PageIntro>
      {error ? <div className="error-banner" role="alert"><p>{error}</p>{sessionNeedsRefresh && onRestartSession ? <button className="button ghost" type="button" onClick={onRestartSession}>Start a fresh demo session</button> : null}</div> : null}
      {!run ? (
        <section className="empty-state"><h2>No run has started</h2><p>Return to the Lab to submit {isHr ? "a validated synthetic candidate and job criteria" : "a validated synthetic lead"}.</p><button className="button primary" type="button" onClick={() => onNavigate(isHr ? "hr-lab" : "lab")}>Open Lab</button></section>
      ) : (
        <>
          <section className="result-summary">
            <article>
              <div className="result-status-row">
                <StatusPill tone={status === "failed" ? "danger" : status === "needs_review" ? "warning" : successful ? "good" : "accent"}>{status.replaceAll("_", " ")}</StatusPill>
                <StatusPill title={modeCopy(mode)} tone={mode === "live" ? "good" : mode === "replay" ? "warning" : "neutral"}>{mode === "unknown" ? "STATUS UNAVAILABLE" : mode.toUpperCase()}</StatusPill>
              </div>
              <p className="eyebrow">{isHr ? "Evidence evaluation" : "Classification outcome"}</p>
              <h2 className={`priority ${status === "failed" ? "unknown" : isHr ? "needs_review" : String(run.priority || "unknown").toLowerCase()}`}>{status === "failed" ? "Run did not complete" : isHr ? (run.recommendation?.replaceAll("_", " ") || "HUMAN REVIEW REQUIRED") : (run.priority || "Pending server result")}</h2>
              <p>{status === "failed" ? "No workflow outcome was recorded. Resolve the message above and try again." : run.explanation || (isHr ? "The supplied job-related evidence was compared with the listed criteria; missing information remains visible for human review." : "The server has not returned an explanation yet.")}</p>
              {reviewRequired ? <p className="qualification-note warning-text">Human review is required. This result is not a final screening or hiring decision.</p> : null}
              {run.eligible_for_progress === true ? <p className="qualification-note">This server result is marked as eligible learning evidence.</p> : null}
              {mode === "replay" ? <p className="qualification-note warning-text">Replay examples never count toward progress, assessment eligibility, badges, or portfolio projects.</p> : null}
            </article>
            <article className="task-outcome">
              <p className="eyebrow">{isHr ? "Human-review action" : "Approved internal action"}</p>
              {status === "failed" ? (
                <>
                  <h2>No action was taken</h2>
                  <p>The workflow stopped before a permitted internal action could be recorded.</p>
                </>
              ) : mode === "replay" ? (
                <>
                  <h2>Illustrative policy action</h2>
                  <p>No task was created. This fixed replay only demonstrates the approved policy shape.</p>
                </>
              ) : run.task ? (
                <>
                  <h2>{run.task.kind || "Follow-up task"}</h2>
                  <p>{run.task.summary || "A server-created internal task is recorded."}</p>
                  <strong>Due: {formatDate(run.task.due_at)}</strong>
                </>
              ) : (
                <>
                  <h2>{isHr ? "No autonomous hiring action" : run.priority === "COLD" ? "No task created" : "No task record returned"}</h2>
                  <p>{isHr ? "The result remains a recommendation for a human reviewer; it does not accept, reject, or advance a candidate." : run.priority === "COLD" ? "This is the expected policy branch for a completed cold lead." : "The result does not expose an internal task."}</p>
                </>
              )}
            </article>
          </section>
          <section className="result-details">
            <article>
              <h2>Missing or uncertain information</h2>
              {run.missing_fields?.length ? <ul>{run.missing_fields.map((item) => <li key={item}>{item}</li>)}</ul> : <p>No missing fields were reported.</p>}
            </article>
            <article className="next-step-card">
              <h2>{isHr ? "Human-review recommendation" : "Suggested next step"}</h2>
              <p>{run.suggested_next_step || (isHr ? "A human reviewer must inspect the supplied evidence before deciding what to do next." : "No suggested next step was returned.")}</p>
            </article>
          </section>
          <details className="result-supporting-details">
            <summary><span><span className="eyebrow">Supporting details</span><strong>View evidence and criterion checks</strong></span><span className="timeline-count">Optional detail</span></summary>
            <section className="result-details result-details-secondary">
              <article>
                <h2>{isHr ? "Evidence against criteria" : "Evidence from the input"}</h2>
                {run.evidence?.length ? <ul>{run.evidence.map((item) => <li key={item}>{item}</li>)}</ul> : <p>No evidence list was returned.</p>}
              </article>
            </section>
            {isHr && run.criteria_evidence?.length ? (
              <section className="criteria-evidence" aria-label="Criterion-by-criterion evidence">
                <div className="section-heading-row"><div><p className="eyebrow">Structured output</p><h2>Criterion-by-criterion evidence</h2></div></div>
                <div className="criteria-grid">
                  {run.criteria_evidence.map((item, index) => (
                    <article key={`${item.criterion_id || item.criterion || "criterion"}-${index}`}>
                      <StatusPill tone={item.status === "supported" ? "good" : "warning"}>{item.status?.replaceAll("_", " ") || "Review"}</StatusPill>
                      <h3>{item.criterion || item.criterion_id?.replaceAll("_", " ") || "Job criterion"}</h3>
                      {item.evidence?.length ? <ul>{item.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}</ul> : <p>No supplied evidence was returned for this criterion.</p>}
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </details>
          <section className="timeline-section">
            <details open={!isTerminal(status)}>
              <summary>
                <span><span className="eyebrow">Ordered run timeline</span><strong>View activity history</strong></span>
                <span className="timeline-count">{events.length} event{events.length === 1 ? "" : "s"}</span>
              </summary>
              <div className="section-heading-row timeline-heading"><div><p className="eyebrow">Persisted execution events</p><h2>What the server recorded</h2></div>{!isTerminal(status) ? <button className="button ghost" type="button" onClick={onRefresh} disabled={busy}>{busy ? "Checking…" : "Check status"}</button> : null}</div>
              {events.length ? (
                <ol className="event-timeline">
                  {events.map((event, index) => <li key={`${event.sequence ?? index}-${event.step_id ?? "event"}`}><span>{event.sequence ?? index + 1}</span><div><strong>{event.step_id?.replaceAll("_", " ") || "Workflow event"}</strong><p>{event.message || "No safe event message was supplied."}</p><small>{event.timestamp ? formatDate(event.timestamp) : event.status || "Recorded"}</small></div></li>)}
                </ol>
              ) : <p className="empty-inline">The server has not returned ordered events yet.</p>}
            </details>
          </section>
          <div className="button-row result-footer">
            <button className="button ghost" type="button" onClick={() => onNavigate(isHr ? "hr-lab" : "lab")}>{status === "failed" ? "Return to Lab" : "Run another synthetic example"}</button>
            {status !== "failed" ? <button className="button primary" type="button" onClick={() => onNavigate(isHr ? "hr-assessment" : "assessment")}>Continue to assessment</button> : null}
          </div>
        </>
      )}
    </main>
  );
}

function AssessmentScreen({
  definition,
  source,
  answers,
  practicalPolicy,
  warmBehavior,
  reviewBehavior,
  busy,
  error,
  result,
  onAnswer,
  onPolicyChange,
  onWarmChange,
  onReviewChange,
  onSubmit,
  onNavigate,
}: {
  definition: AssessmentDefinition;
  source: AssessmentSource;
  answers: Record<string, string>;
  practicalPolicy: FollowUpPolicy;
  warmBehavior: string;
  reviewBehavior: string;
  busy: boolean;
  error?: string;
  result?: AssessmentResult | null;
  onAnswer: (questionId: string, answer: string) => void;
  onPolicyChange: (policy: FollowUpPolicy) => void;
  onWarmChange: (prediction: string) => void;
  onReviewChange: (prediction: string) => void;
  onSubmit: () => void;
  onNavigate: (view: AppView) => void;
}) {
  const questions = definition.questions?.length ? definition.questions : DEFAULT_ASSESSMENT.questions || [];
  return (
    <main className="page-shell">
      <PageIntro eyebrow="Assessment · Server graded" title="Show what you understand.">
        Five concepts plus one practical rule exercise. Answers are graded by the backend; answer keys are not sent to the client.
      </PageIntro>
      {definition.objectives?.length ? <section className="assessment-objectives"><p className="eyebrow">Learning objectives</p><ul>{definition.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></section> : null}
      {source === "preview" ? <div className="notice warning" role="status">Assessment questions are shown as a local preview. Start or restore a server demo session before submitting an attempt.</div> : null}
      {error ? <p className="error-banner" role="alert">{error}</p> : null}
      <form className="assessment-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
        {questions.map((question, index) => (
          <fieldset className="question-card" key={question.id}>
            <legend><span>{index + 1}</span>{question.prompt}</legend>
            {question.objective ? <p className="field-help">Objective: {question.objective}</p> : null}
            <div className="choice-stack compact">
              {question.options.map((option) => (
                <label className={`choice ${answers[question.id] === option.id ? "selected" : ""}`} key={option.id}>
                  <input type="radio" name={question.id} value={option.id} checked={answers[question.id] === option.id} onChange={() => onAnswer(question.id, option.id)} />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <fieldset className="practical-card">
          <legend><span>6</span>Practical rule exercise</legend>
          <p>{definition.practical_prompt || DEFAULT_ASSESSMENT.practical_prompt}</p>
          <label>Choose the HOT follow-up policy
            <select value={practicalPolicy} onChange={(event) => onPolicyChange(event.target.value as FollowUpPolicy)}>
              <option value="immediate">Immediate</option>
              <option value="within_24_hours">Within 24 hours</option>
            </select>
          </label>
          <label>For a WARM lead, what should happen?
            <select value={warmBehavior} onChange={(event) => onWarmChange(event.target.value)}>
              <option value="">Choose an outcome</option>
              <option value="create_task_within_72_hours">Create a follow-up task within 72 hours</option>
              <option value="skip_task">Create no task</option>
              <option value="create_immediate_hot_task">Create an immediate HOT task</option>
            </select>
          </label>
          <label>For a NEEDS_REVIEW lead, what should happen?
            <select value={reviewBehavior} onChange={(event) => onReviewChange(event.target.value)}>
              <option value="">Choose an outcome</option>
              <option value="create_internal_review_task">Create an internal review task</option>
              <option value="skip_task">Create no task</option>
              <option value="send_external_message">Send an external message</option>
            </select>
          </label>
        </fieldset>
        <div className="button-row assessment-actions">
          <button className="button ghost" type="button" onClick={() => onNavigate("result")}>Back to result</button>
          <button className="button primary" type="submit" disabled={busy || source !== "server"}>{busy ? "Submitting…" : "Submit server assessment"}</button>
        </div>
      </form>
      {result ? (
        <section className={`assessment-result ${result.overall_pass ? "passed" : "not-passed"}`} aria-live="polite">
          <p className="eyebrow">Server result</p>
          <h2>{result.overall_pass ? "Assessment passed" : "Assessment not yet passed"}</h2>
          <p>{typeof result.score === "number" ? `${result.score}/${result.max_score ?? 6} points` : "The server did not return a numeric score."} {result.practical_pass === true ? "Practical requirement passed." : result.practical_pass === false ? "Practical requirement still needs work." : ""}</p>
          {result.score_breakdown ? <p className="qualification-note">Theory: {result.score_breakdown.theory_points ?? 0}/{result.score_breakdown.theory_total ?? 0} · Practical: {result.score_breakdown.practical_points ?? 0}/{result.score_breakdown.practical_total ?? 1}</p> : null}
          {result.feedback ? <p>{Array.isArray(result.feedback) ? result.feedback.join(" ") : result.feedback}</p> : null}
          {result.question_feedback?.length ? <ul className="assessment-feedback">{result.question_feedback.map((item) => <li key={item.question_id}><strong>{item.correct ? "Demonstrated" : "Needs practice"}:</strong> {item.feedback}</li>)}</ul> : null}
          {result.badge ? <button className="button primary" type="button" onClick={() => onNavigate("badge")}>View earned badge</button> : <button className="button ghost" type="button" onClick={() => onNavigate("lab")}>Review the Lab and retry</button>}
        </section>
      ) : null}
    </main>
  );
}

function HrAssessmentScreen({
  definition,
  source,
  answers,
  reviewRule,
  insufficientEvidenceBehavior,
  finalDecisionOwner,
  busy,
  error,
  result,
  onAnswer,
  onReviewRuleChange,
  onInsufficientEvidenceChange,
  onFinalDecisionOwnerChange,
  onSubmit,
  onNavigate,
}: {
  definition: AssessmentDefinition;
  source: AssessmentSource;
  answers: Record<string, string>;
  reviewRule: string;
  insufficientEvidenceBehavior: string;
  finalDecisionOwner: string;
  busy: boolean;
  error?: string;
  result?: AssessmentResult | null;
  onAnswer: (questionId: string, answer: string) => void;
  onReviewRuleChange: (value: string) => void;
  onInsufficientEvidenceChange: (value: string) => void;
  onFinalDecisionOwnerChange: (value: string) => void;
  onSubmit: () => void;
  onNavigate: (view: AppView) => void;
}) {
  const questions = definition.questions?.length ? definition.questions : DEFAULT_HR_ASSESSMENT.questions || [];
  return (
    <main className="page-shell">
      <PageIntro eyebrow="Assessment · Server graded" title="Show that you understand the human-review boundary.">
        Five concepts plus one practical safety exercise. The backend grades answers; this workflow never treats an automated result as a hiring decision.
      </PageIntro>
      {definition.objectives?.length ? <section className="assessment-objectives"><p className="eyebrow">Learning objectives</p><ul>{definition.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></section> : null}
      {source === "preview" ? <div className="notice warning" role="status">Assessment questions are shown as a local preview. Start or restore a server demo session before submitting an attempt.</div> : null}
      {error ? <p className="error-banner" role="alert">{error}</p> : null}
      <form className="assessment-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
        {questions.map((question, index) => (
          <fieldset className="question-card" key={question.id}>
            <legend><span>{index + 1}</span>{question.prompt}</legend>
            {question.objective ? <p className="field-help">Objective: {question.objective}</p> : null}
            <div className="choice-stack compact">
              {question.options.map((option) => (
                <label className={`choice ${answers[question.id] === option.id ? "selected" : ""}`} key={option.id}>
                  <input type="radio" name={`hr-${question.id}`} value={option.id} checked={answers[question.id] === option.id} onChange={() => onAnswer(question.id, option.id)} />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <fieldset className="practical-card">
          <legend><span>6</span>Practical safety exercise</legend>
          <p>{definition.practical_prompt || DEFAULT_HR_ASSESSMENT.practical_prompt}</p>
          <label>What review rule must the workflow use?
            <select value={reviewRule} onChange={(event) => onReviewRuleChange(event.target.value)}>
              <option value="">Choose a rule</option>
              <option value="human_review_required">Require human review for every recommendation</option>
              <option value="auto_advance">Automatically advance a candidate</option>
              <option value="auto_reject">Automatically reject a candidate</option>
            </select>
          </label>
          <label>What should happen when evidence is insufficient?
            <select value={insufficientEvidenceBehavior} onChange={(event) => onInsufficientEvidenceChange(event.target.value)}>
              <option value="">Choose an outcome</option>
              <option value="record_missing_information_for_human_review">Record missing information and require human review</option>
              <option value="assume_not_met">Assume the criterion is not met</option>
              <option value="invent_evidence">Invent supporting evidence</option>
            </select>
          </label>
          <label>Who owns the final decision?
            <select value={finalDecisionOwner} onChange={(event) => onFinalDecisionOwnerChange(event.target.value)}>
              <option value="">Choose an owner</option>
              <option value="authorized_human_reviewer">An authorized human reviewer</option>
              <option value="ai_model">The AI model</option>
              <option value="workflow">The automated workflow</option>
            </select>
          </label>
        </fieldset>
        <div className="button-row assessment-actions">
          <button className="button ghost" type="button" onClick={() => onNavigate("hr-result")}>Back to result</button>
          <button className="button primary" type="submit" disabled={busy || source !== "server"}>{busy ? "Submitting…" : "Submit server assessment"}</button>
        </div>
      </form>
      {result ? (
        <section className={`assessment-result ${result.overall_pass ? "passed" : "not-passed"}`} aria-live="polite">
          <p className="eyebrow">Server result</p>
          <h2>{result.overall_pass ? "Assessment passed" : "Assessment not yet passed"}</h2>
          <p>{typeof result.score === "number" ? `${result.score}/${result.max_score ?? 6} points` : "The server did not return a numeric score."} {result.practical_pass === true ? "Practical requirement passed." : result.practical_pass === false ? "Practical requirement still needs work." : ""}</p>
          {result.score_breakdown ? <p className="qualification-note">Theory: {result.score_breakdown.theory_points ?? 0}/{result.score_breakdown.theory_total ?? 0} · Practical: {result.score_breakdown.practical_points ?? 0}/{result.score_breakdown.practical_total ?? 1}</p> : null}
          {result.feedback ? <p>{Array.isArray(result.feedback) ? result.feedback.join(" ") : result.feedback}</p> : null}
          {result.question_feedback?.length ? <ul className="assessment-feedback">{result.question_feedback.map((item) => <li key={item.question_id}><strong>{item.correct ? "Demonstrated" : "Needs practice"}:</strong> {item.feedback}</li>)}</ul> : null}
          {result.badge ? <button className="button primary" type="button" onClick={() => onNavigate("hr-badge")}>View earned badge</button> : <button className="button ghost" type="button" onClick={() => onNavigate("hr-lab")}>Review the Lab and retry</button>}
        </section>
      ) : null}
    </main>
  );
}

function BadgeScreen({ badge, onNavigate, workflow = "sales" }: { badge?: BadgeAward | null; onNavigate: (view: AppView) => void; workflow?: "sales" | "hr" }) {
  const isHr = workflow === "hr";
  const fallbackTitle = isHr ? "HR Candidate Screening — Level 1" : "Sales Automation — Level 1";
  return (
    <main className="page-shell">
      <PageIntro eyebrow="Recognition" title="Evidence comes after verified practice.">
        IkeOru awards one badge only after the backend verifies lesson completion, an eligible run, and a passing practical assessment.
      </PageIntro>
      {badge ? (
        <section className="badge-card earned">
          <div className="badge-emblem" aria-hidden="true">✓</div>
          <div>
            <StatusPill tone="good">Earned</StatusPill>
            <h2>{badge.name || fallbackTitle}</h2>
            <p>Awarded {formatDate(badge.awarded_at)}</p>
            <p>Verification ID: <code>{badge.verification_id || "Server-issued ID not returned"}</code></p>
            {badge.skills?.length ? <p>Skills: {badge.skills.join(", ")}</p> : <p>{isHr ? "Introductory guided evidence evaluation with a required human-review boundary." : "Introductory guided lead-qualification capability."}</p>}
          </div>
        </section>
      ) : (
        <section className="badge-card locked">
          <div className="badge-emblem" aria-hidden="true">⌁</div>
          <div>
            <StatusPill tone="neutral">Locked</StatusPill>
            <h2>{fallbackTitle}</h2>
            <p>There is no local shortcut to an earned badge. Complete the server-checked prerequisites first.</p>
          </div>
        </section>
      )}
      <div className="button-row result-footer">
        <button className="button ghost" type="button" onClick={() => onNavigate(isHr ? "hr-assessment" : "assessment")}>Back to assessment</button>
        <button className="button primary" type="button" onClick={() => onNavigate("portfolio")}>Open private portfolio</button>
      </div>
    </main>
  );
}

function PortfolioScreen({
  portfolio,
  loading,
  error,
  saving,
  onVisibilityChange,
  onPublicItemChange,
  onPreview,
}: {
  portfolio?: PortfolioData | null;
  loading: boolean;
  error?: string;
  saving: boolean;
  onVisibilityChange: (visibility: string) => void;
  onPublicItemChange: (verificationId: string, checked: boolean) => void;
  onPreview: () => void;
}) {
  const selected = portfolio?.selected_public_items || [];
  const publicLink = portfolio?.public_id && typeof window !== "undefined"
    ? `${window.location.origin}/p/${encodeURIComponent(portfolio.public_id)}`
    : undefined;
  return (
    <main className="page-shell">
      <PageIntro eyebrow="Private portfolio" title="Keep the work. Share only what you choose.">
        Raw lead or candidate inputs, task content, private assessment answers, and email addresses are never public portfolio fields.
      </PageIntro>
      {error ? <p className="error-banner" role="alert">{error}</p> : null}
      {loading ? <section className="empty-state"><h2>Loading private record…</h2><p>Retrieving only the authenticated learner's server-backed portfolio.</p></section> : null}
      {!loading && !portfolio ? (
        <section className="empty-state"><h2>No server-backed portfolio loaded</h2><p>Start a live demo session to view saved progress, projects, attempts, and badges.</p></section>
      ) : null}
      {!loading && portfolio ? (
        <>
          <section className="portfolio-summary">
            <article><span>Visibility</span><strong>{portfolio.visibility || "private"}</strong><small>Private by default</small></article>
            <article><span>Workflow projects</span><strong>{portfolio.projects?.length || 0}</strong><small>Reruns stay grouped in the same workflow project</small></article>
            <article><span>Badges</span><strong>{portfolio.badges?.length || 0}</strong><small>Server-issued achievements only</small></article>
            <article><span>Attempts</span><strong>{portfolio.attempts?.length || 0}</strong><small>Private assessment history</small></article>
          </section>
          <section className="portfolio-grid">
            <article className="portfolio-card">
              <p className="eyebrow">Visibility controls</p>
              <h2>Choose who can see selected achievements.</h2>
              <label>Portfolio visibility
                <select value={portfolio.visibility || "private"} onChange={(event) => onVisibilityChange(event.target.value)} disabled={saving}>
                  <option value="private">Private</option>
                  <option value="organization">Organization only</option>
                  <option value="public">Public</option>
                </select>
              </label>
              <p className="field-help">Changing visibility is a server-side action. A public link only shows explicitly selected safe fields.</p>
              <button className="button ghost" type="button" onClick={onPreview} disabled={saving || !portfolio.public_id}>Preview public-safe portfolio</button>
              {!portfolio.public_id ? <p className="field-help">A public preview appears after the server creates an opaque public identifier.</p> : null}
              {publicLink ? <a className="text-button public-link" href={publicLink}>Open shareable public link <span aria-hidden="true">↗</span></a> : null}
            </article>
            <article className="portfolio-card">
              <p className="eyebrow">Select public achievements</p>
              <h2>Choose badges or safe project summaries.</h2>
              {portfolio.badges?.length ? portfolio.badges.map((badge, index) => {
                const identifier = badge.verification_id || `pending-${index}`;
                const selectionKey = `badge:${identifier}`;
                return <label className="public-item" key={identifier}><input type="checkbox" checked={selected.includes(selectionKey)} onChange={(event) => onPublicItemChange(selectionKey, event.target.checked)} disabled={saving || !badge.verification_id} /><span><strong>{badge.name || "IkeOru workflow achievement"}</strong><small>{badge.verification_id || "Verification pending"}</small></span></label>;
              }) : <p>No server-issued badges are available to select yet.</p>}
              {portfolio.projects?.length ? portfolio.projects.map((project, index) => {
                const workflowKey = project.workflow_key;
                const selectionKey = workflowKey ? `project:${workflowKey}` : `pending-project-${index}`;
                return <label className="public-item" key={selectionKey}><input type="checkbox" checked={selected.includes(selectionKey)} onChange={(event) => onPublicItemChange(selectionKey, event.target.checked)} disabled={saving || !workflowKey} /><span><strong>{project.title || "IkeOru workflow project"}</strong><small>{workflowKey ? "Safe project summary only" : "Project identifier unavailable"}</small></span></label>;
              }) : null}
            </article>
          </section>
          <section className="portfolio-history">
            <article>
              <h2>Workflow projects</h2>
              {portfolio.projects?.length ? <ul>{portfolio.projects.map((project, index) => <li key={`${project.title}-${index}`}><strong>{project.title || "IkeOru workflow project"}</strong><span>{project.skills?.join(", ") || "Skills not returned"}</span><small>Last activity: {formatDate(project.last_activity_at || project.last_activity)}</small></li>)}</ul> : <p>No saved projects yet.</p>}
            </article>
            <article>
              <h2>Private assessment history</h2>
              {portfolio.attempts?.length ? <ul>{portfolio.attempts.map((attempt, index) => <li key={`${attempt.submitted_at}-${index}`}><strong>{attempt.overall_pass ? "Passed" : "Attempt"}</strong><span>{typeof attempt.score === "number" ? `${attempt.score}/6` : "Score not returned"}</span><small>{formatDate(attempt.submitted_at)}</small></li>)}</ul> : <p>No saved attempts yet.</p>}
            </article>
          </section>
        </>
      ) : null}
    </main>
  );
}

function PublicScreen({ portfolio, loading, error, onBack }: { portfolio?: PortfolioData | null; loading: boolean; error?: string; onBack: () => void }) {
  return (
    <main className="public-page-shell">
      <header className="public-header"><div className="brand-lockup"><span className="brand-mark" aria-hidden="true">I</span><div><strong>IkeOru</strong><span>Learn. Do. Prove.</span></div></div><StatusPill tone="neutral">Public-safe preview</StatusPill></header>
      {loading ? <section className="empty-state"><h1>Loading public portfolio…</h1><p>Only the server's public allowlist is requested.</p></section> : null}
      {error ? <section className="empty-state unavailable"><h1>Portfolio unavailable</h1><p>This public portfolio is unavailable or not authorized for viewing.</p></section> : null}
      {!loading && !error && portfolio ? (
        <section className="public-portfolio-card">
          <p className="eyebrow">IkeOru capability record</p>
          <h1>Selected achievements</h1>
          <p>This view intentionally excludes private lead and candidate inputs, tasks, answers, and internal identifiers.</p>
          <div className="public-achievement-grid">
            {portfolio.badges?.length ? portfolio.badges.map((badge, index) => <article key={`${badge.verification_id}-${index}`}><span aria-hidden="true">✓</span><h2>{badge.name || "IkeOru workflow achievement"}</h2><p>{badge.skills?.join(", ") || "Verified guided workflow capability"}</p><small>Verification: {badge.verification_id || "Not returned"}</small></article>) : <p>No public achievements are selected.</p>}
            {portfolio.projects?.map((project, index) => <article key={`${project.workflow_key || project.title}-${index}`}><span aria-hidden="true">◌</span><h2>{project.title || "IkeOru workflow project"}</h2><p>{project.skills?.join(", ") || "Safe workflow summary"}</p><small>Selected project summary</small></article>)}
          </div>
        </section>
      ) : null}
      <button className="button ghost public-back" type="button" onClick={onBack}>Back to private portfolio</button>
    </main>
  );
}

function ManagerScreen({ summary, identity, loading, error, sessionMode, onNavigate }: { summary?: ManagerSummary | null; identity?: CurrentIdentity; loading: boolean; error?: string; sessionMode: SessionMode; onNavigate: (view: AppView) => void }) {
  return (
    <main className="page-shell">
      <PageIntro eyebrow="Manager view · Sample organization" title="See capability progress without exposing private work.">
        This limited summary is organization-scoped. It does not expose raw lead inputs, private assessment answers, task content, or private portfolios.
      </PageIntro>
      {sessionMode === "preview" ? <div className="notice warning" role="status">Local interface preview only. Connect the FastAPI service to retrieve an authorized sample organization summary.</div> : null}
      {error ? <p className="error-banner" role="alert">{error}</p> : null}
      {loading ? <section className="empty-state"><h2>Loading authorized progress…</h2><p>Checking organization membership and allowed summary fields.</p></section> : null}
      {!loading && summary ? (
        <>
          <section className="manager-heading"><div><p className="eyebrow">Organization</p><h2>{summary.organization_name || identity?.organization_name || "Sample organization"}</h2></div><StatusPill tone="accent">Synthetic demo data</StatusPill></section>
          <section className="portfolio-summary manager-stats"><article><span>Learners</span><strong>{summary.learner_count ?? 0}</strong><small>In this sample organization</small></article><article><span>Workflow completion</span><strong>{summary.required_workflow_completion ?? 0}</strong><small>Required workflow complete</small></article><article><span>Assessment passes</span><strong>{summary.assessment_pass_count ?? 0}</strong><small>Allowed aggregate state</small></article><article><span>Badges</span><strong>{summary.badge_count ?? 0}</strong><small>Server-issued evidence</small></article></section>
          <section className="manager-roster"><h2>Permitted learner summary</h2>{summary.learners?.length ? <div className="roster-table" role="table" aria-label="Permitted learner summary"><div role="row" className="roster-row roster-head"><span role="columnheader">Learner</span><span role="columnheader">Workflow</span><span role="columnheader">Assessment</span><span role="columnheader">Badges</span></div>{summary.learners.map((learner, index) => <div role="row" className="roster-row" key={`${learner.display_name}-${index}`}><span role="cell">{learner.display_name || "Learner"}</span><span role="cell">{learner.workflow_complete ? "Complete" : "In progress"}</span><span role="cell">{learner.assessment_passed ? "Passed" : "Not yet passed"}</span><span role="cell">{learner.badges?.length || 0}</span></div>)}</div> : <p>No permitted learner summaries were returned.</p>}</section>
        </>
      ) : null}
      {!loading && !summary ? <section className="empty-state"><h2>Summary not loaded</h2><p>{identity?.organization_id ? "The server did not return an authorized summary." : "This demo session has no organization identifier to query."}</p></section> : null}
      <button className="button ghost" type="button" onClick={() => onNavigate("entry")}>Switch demo role</button>
    </main>
  );
}

function App() {
  const [view, setView] = useState<AppView>(() => (publicIdFromPath() ? "public" : "entry"));
  const [role, setRole] = useState<DemoRole | null>(null);
  const [preparedDemo, setPreparedDemo] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(() => !publicIdFromPath());
  const [sessionMode, setSessionMode] = useState<SessionMode>("unstarted");
  const [identity, setIdentity] = useState<CurrentIdentity>();
  const [domains, setDomains] = useState<Domain[]>(DOMAIN_CARDS);
  const [entryBusy, setEntryBusy] = useState(false);
  const [entryError, setEntryError] = useState<string>();
  const [lessonComplete, setLessonComplete] = useState(false);
  const [salesLesson, setSalesLesson] = useState<AcademyLesson>(FALLBACK_SALES_LESSON);
  const [lessonBusy, setLessonBusy] = useState(false);
  const [lessonMessage, setLessonMessage] = useState<string>();
  const [salesExercise, setSalesExercise] = useState<IndependentExercise | null>();
  const [salesExerciseResult, setSalesExerciseResult] = useState<IndependentExerciseResult | null>();
  const [salesExerciseBusy, setSalesExerciseBusy] = useState(false);
  const [hrLessonComplete, setHrLessonComplete] = useState(false);
  const [hrLesson, setHrLesson] = useState<AcademyLesson>(FALLBACK_HR_LESSON);
  const [hrLessonBusy, setHrLessonBusy] = useState(false);
  const [hrLessonMessage, setHrLessonMessage] = useState<string>();
  const [hrExercise, setHrExercise] = useState<IndependentExercise | null>();
  const [hrExerciseResult, setHrExerciseResult] = useState<IndependentExerciseResult | null>();
  const [hrExerciseBusy, setHrExerciseBusy] = useState(false);
  const [lead, setLead] = useState<LeadForm>(INITIAL_LEAD);
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({});
  const [trigger, setTrigger] = useState("new_lead_submitted");
  const [policy, setPolicy] = useState<FollowUpPolicy>("immediate");
  const [run, setRun] = useState<RunResult | null>();
  const [runEventCursor, setRunEventCursor] = useState(0);
  const [runBusy, setRunBusy] = useState(false);
  const [runError, setRunError] = useState<string>();
  const [hrCandidate, setHrCandidate] = useState<HrCandidateForm>(INITIAL_HR_CANDIDATE);
  const [hrCandidateErrors, setHrCandidateErrors] = useState<Record<string, string>>({});
  const [hrTrigger, setHrTrigger] = useState("candidate_submitted");
  const [hrRun, setHrRun] = useState<RunResult | null>();
  const [hrRunEventCursor, setHrRunEventCursor] = useState(0);
  const [hrRunBusy, setHrRunBusy] = useState(false);
  const [hrRunError, setHrRunError] = useState<string>();
  const [assessment, setAssessment] = useState<AssessmentDefinition>(DEFAULT_ASSESSMENT);
  const [assessmentSource, setAssessmentSource] = useState<AssessmentSource>("preview");
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});
  const [practicalPolicy, setPracticalPolicy] = useState<FollowUpPolicy>("immediate");
  const [warmBehavior, setWarmBehavior] = useState("");
  const [reviewBehavior, setReviewBehavior] = useState("");
  const [assessmentBusy, setAssessmentBusy] = useState(false);
  const [assessmentError, setAssessmentError] = useState<string>();
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>();
  const [hrAssessment, setHrAssessment] = useState<AssessmentDefinition>(DEFAULT_HR_ASSESSMENT);
  const [hrAssessmentSource, setHrAssessmentSource] = useState<AssessmentSource>("preview");
  const [hrAssessmentAnswers, setHrAssessmentAnswers] = useState<Record<string, string>>({});
  const [hrReviewRule, setHrReviewRule] = useState("");
  const [hrInsufficientEvidenceBehavior, setHrInsufficientEvidenceBehavior] = useState("");
  const [hrFinalDecisionOwner, setHrFinalDecisionOwner] = useState("");
  const [hrAssessmentBusy, setHrAssessmentBusy] = useState(false);
  const [hrAssessmentError, setHrAssessmentError] = useState<string>();
  const [hrAssessmentResult, setHrAssessmentResult] = useState<AssessmentResult | null>();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>();
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [portfolioSaving, setPortfolioSaving] = useState(false);
  const [portfolioError, setPortfolioError] = useState<string>();
  const [publicPortfolio, setPublicPortfolio] = useState<PortfolioData | null>();
  const [publicLoading, setPublicLoading] = useState(false);
  const [publicError, setPublicError] = useState<string>();
  const [publicRouteId, setPublicRouteId] = useState<string | undefined>(() => publicIdFromPath());
  const [managerSummary, setManagerSummary] = useState<ManagerSummary | null>();
  const [managerLoading, setManagerLoading] = useState(false);
  const [managerError, setManagerError] = useState<string>();
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [tourAutoStarted, setTourAutoStarted] = useState(false);

  const award = useMemo(
    () => assessmentResult?.badge || portfolio?.badges?.[0] || null,
    [assessmentResult?.badge, portfolio?.badges],
  );
  const hrAward = useMemo(
    () => hrAssessmentResult?.badge || portfolio?.badges?.find((badge) => badge.key === "hr-evidence-review-level-1") || null,
    [hrAssessmentResult?.badge, portfolio?.badges],
  );
  const runEligible = run?.eligible_for_progress === true;
  const assessmentPassed = assessmentResult?.overall_pass === true || portfolio?.progress?.assessment_passed === true;

  useEffect(() => {
    if (portfolio?.progress?.lesson_complete) setLessonComplete(true);
    if (portfolio?.progress?.by_workflow?.[HR_WORKFLOW_KEY]?.lesson_completed) setHrLessonComplete(true);
  }, [portfolio?.progress?.lesson_complete, portfolio?.progress?.by_workflow]);

  useEffect(() => {
    if (bootstrapping || !role || view === "entry" || view === "public" || tourAutoStarted) return;
    setTourAutoStarted(true);
    try {
      if (window.localStorage.getItem(ONBOARDING_STORAGE_KEY) !== "complete") setTourOpen(true);
    } catch {
      setTourOpen(true);
    }
  }, [bootstrapping, role, tourAutoStarted, view]);

  useEffect(() => {
    if (publicIdFromPath()) {
      setBootstrapping(false);
      return;
    }
    let active = true;
    void (async () => {
      try {
        const currentIdentity = await api.getCurrentIdentity();
        if (!active || !currentIdentity.role) return;
        setIdentity(currentIdentity);
        setRole(currentIdentity.role);
        setPreparedDemo(currentIdentity.is_seeded_sample === true);
        setSessionMode("server");
        const [domainResult, portfolioResult] = await Promise.allSettled([api.getDomains(), api.getPortfolio()]);
        if (!active) return;
        if (domainResult.status === "fulfilled" && domainResult.value.length) setDomains(enforceMvpDomains(domainResult.value));
        if (portfolioResult.status === "fulfilled") setPortfolio(portfolioResult.value);
        if (currentIdentity.role === "manager" && currentIdentity.organization_id) {
          setManagerLoading(true);
          try {
            const summary = await api.getManagerSummary(currentIdentity.organization_id);
            if (active) setManagerSummary(summary);
          } catch (error) {
            if (active) setManagerError(readableApiError(error));
          } finally {
            if (active) setManagerLoading(false);
          }
          if (active) setView("manager");
        } else if (active) {
          setView("dashboard");
        }
      } catch {
        // No valid same-browser demo session is expected on a first visit.
      } finally {
        if (active) setBootstrapping(false);
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (sessionMode !== "server") return;
    void loadAcademyLesson(WORKFLOW_KEY);
    void loadAcademyLesson(HR_WORKFLOW_KEY);
    void loadIndependentExercise(WORKFLOW_KEY);
    void loadIndependentExercise(HR_WORKFLOW_KEY);
  }, [sessionMode]);

  useEffect(() => {
    if (!publicRouteId) return;
    let active = true;
    setPublicLoading(true);
    setPublicError(undefined);
    void api.getPublicPortfolio(publicRouteId)
      .then((response) => {
        if (active) setPublicPortfolio(response);
      })
      .catch(() => {
        if (active) {
          setPublicPortfolio(null);
          setPublicError("Portfolio unavailable");
        }
      })
      .finally(() => {
        if (active) setPublicLoading(false);
      });
    return () => { active = false; };
  }, [publicRouteId]);

  async function loadPortfolio(force = false) {
    if (!force && sessionMode !== "server") return;
    setPortfolioLoading(true);
    setPortfolioError(undefined);
    try {
      setPortfolio(await api.getPortfolio());
    } catch (error) {
      setPortfolioError(readableApiError(error));
    } finally {
      setPortfolioLoading(false);
    }
  }

  async function loadAcademyLesson(workflowKey: string) {
    const fallback = workflowKey === HR_WORKFLOW_KEY ? FALLBACK_HR_LESSON : FALLBACK_SALES_LESSON;
    if (sessionMode !== "server") {
      if (workflowKey === HR_WORKFLOW_KEY) setHrLesson(fallback);
      else setSalesLesson(fallback);
      return;
    }
    try {
      const lesson = await api.getLesson(workflowKey);
      if (workflowKey === HR_WORKFLOW_KEY) {
        setHrLesson(lesson);
        setHrLessonComplete(lesson.progress?.complete === true);
      } else {
        setSalesLesson(lesson);
        setLessonComplete(lesson.progress?.complete === true);
      }
    } catch (error) {
      if (workflowKey === HR_WORKFLOW_KEY) setHrLesson(fallback);
      else setSalesLesson(fallback);
      if (workflowKey === HR_WORKFLOW_KEY) setHrLessonMessage(`${readableApiError(error)} Showing the local Academy preview; completion will not be saved until the service is available.`);
      else setLessonMessage(`${readableApiError(error)} Showing the local Academy preview; completion will not be saved until the service is available.`);
    }
  }

  async function loadIndependentExercise(workflowKey: string) {
    if (sessionMode !== "server") return;
    try {
      const exercise = await api.getIndependentExercise(workflowKey);
      if (workflowKey === HR_WORKFLOW_KEY) {
        setHrExercise(exercise);
        setHrExerciseResult(exercise.progress?.passed ? { passed: true, progress: exercise.progress } : null);
      } else {
        setSalesExercise(exercise);
        setSalesExerciseResult(exercise.progress?.passed ? { passed: true, progress: exercise.progress } : null);
      }
    } catch (error) {
      if (workflowKey === HR_WORKFLOW_KEY) setHrRunError(readableApiError(error));
      else setRunError(readableApiError(error));
    }
  }

  async function submitIndependentExercise(workflowKey: string, answers: Record<string, string>) {
    if (sessionMode !== "server") return;
    const isHr = workflowKey === HR_WORKFLOW_KEY;
    if (isHr) setHrExerciseBusy(true); else setSalesExerciseBusy(true);
    try {
      const result = await api.submitIndependentExercise(workflowKey, answers);
      if (isHr) setHrExerciseResult(result); else setSalesExerciseResult(result);
      if (result.passed) await loadPortfolio(true);
    } catch (error) {
      const message = readableApiError(error);
      if (isHr) setHrRunError(message); else setRunError(message);
    } finally {
      if (isHr) setHrExerciseBusy(false); else setSalesExerciseBusy(false);
    }
  }

  async function recordAcademyProgress(workflowKey: string, sectionId: string, checkId?: string, answer?: string) {
    if (sessionMode !== "server") {
      return { correct: true, feedback: "Local preview only. Connect the FastAPI service to save this section." };
    }
    try {
      const result = await api.recordLessonProgress(workflowKey, sectionId, checkId, answer);
      if (workflowKey === HR_WORKFLOW_KEY) setHrLesson((current) => ({ ...current, progress: result.progress }));
      else setSalesLesson((current) => ({ ...current, progress: result.progress }));
      return result;
    } catch (error) {
      const message = readableApiError(error);
      if (workflowKey === HR_WORKFLOW_KEY) setHrLessonMessage(message);
      else setLessonMessage(message);
      return { correct: false, feedback: message };
    }
  }

  async function loadAssessment() {
    setAssessmentError(undefined);
    if (sessionMode !== "server") {
      setAssessment(DEFAULT_ASSESSMENT);
      setAssessmentSource("preview");
      return;
    }
    try {
      const fetched = await api.getAssessment(WORKFLOW_KEY);
      if (!fetched.questions?.length) throw new Error("No assessment questions were returned.");
      setAssessment(fetched);
      setAssessmentSource("server");
    } catch (error) {
      setAssessment(DEFAULT_ASSESSMENT);
      setAssessmentSource("preview");
      setAssessmentError(`${readableApiError(error)} The displayed questions are not submittable until the server assessment loads.`);
    }
  }

  async function loadHrAssessment() {
    setHrAssessmentError(undefined);
    if (sessionMode !== "server") {
      setHrAssessment(DEFAULT_HR_ASSESSMENT);
      setHrAssessmentSource("preview");
      return;
    }
    try {
      const fetched = await api.getAssessment(HR_WORKFLOW_KEY);
      if (!fetched.questions?.length) throw new Error("No HR assessment questions were returned.");
      setHrAssessment(fetched);
      setHrAssessmentSource("server");
    } catch (error) {
      setHrAssessment(DEFAULT_HR_ASSESSMENT);
      setHrAssessmentSource("preview");
      setHrAssessmentError(`${readableApiError(error)} The displayed questions are not submittable until the server assessment loads.`);
    }
  }

  async function loadManagerSummary(currentIdentity?: CurrentIdentity, force = false) {
    const organizationId = currentIdentity?.organization_id || identity?.organization_id;
    if ((!force && sessionMode !== "server") || !organizationId) return;
    setManagerLoading(true);
    setManagerError(undefined);
    try {
      setManagerSummary(await api.getManagerSummary(organizationId));
    } catch (error) {
      setManagerError(readableApiError(error));
    } finally {
      setManagerLoading(false);
    }
  }

  async function enterDemo(selectedRole: DemoRole, profile?: "fresh" | "seeded") {
    setEntryBusy(true);
    setEntryError(undefined);
    setRole(selectedRole);
    setPreparedDemo(profile === "seeded");
    setManagerSummary(null);
    try {
      await api.createDemoSession(selectedRole, profile);
      const currentIdentity = await api.getCurrentIdentity();
      setIdentity(currentIdentity);
      setSessionMode("server");
      try {
        const serverDomains = await api.getDomains();
        if (serverDomains.length) setDomains(enforceMvpDomains(serverDomains));
      } catch {
        setDomains(DOMAIN_CARDS);
      }
      if (selectedRole === "manager") {
        setView("manager");
        await loadManagerSummary(currentIdentity, true);
      } else {
        setView("dashboard");
        await loadPortfolio(true);
      }
    } catch (error) {
      setSessionMode("preview");
      setIdentity({ role: selectedRole, demo: true });
      setEntryError(`${readableApiError(error)} You can explore an explicitly labelled local interface preview or open a replay; no activity will be saved.`);
      setView(selectedRole === "manager" ? "manager" : "dashboard");
    } finally {
      setEntryBusy(false);
    }
  }

  function navigate(nextView: AppView) {
    setView(nextView);
    if (nextView === "portfolio") void loadPortfolio();
    if (nextView === "assessment") void loadAssessment();
    if (nextView === "hr-assessment") void loadHrAssessment();
    if (nextView === "manager") void loadManagerSummary();
  }

  function restartDemoSession() {
    setEntryError(undefined);
    setRole(null);
    setIdentity(undefined);
    setPreparedDemo(false);
    setSessionMode("unstarted");
    setPortfolio(null);
    setLessonComplete(false);
    setSalesLesson(FALLBACK_SALES_LESSON);
    setSalesExercise(null);
    setSalesExerciseResult(null);
    setHrLessonComplete(false);
    setHrLesson(FALLBACK_HR_LESSON);
    setHrExercise(null);
    setHrExerciseResult(null);
    setRun(undefined);
    setHrRun(undefined);
    setAssessmentResult(null);
    setHrAssessmentResult(null);
    setAssessmentAnswers({});
    setHrAssessmentAnswers({});
    setRunError(undefined);
    setHrRunError(undefined);
    setView("entry");
  }

  function openTour() {
    setTourStep(0);
    setTourOpen(true);
  }

  function dismissTour() {
    setTourOpen(false);
    setTourStep(0);
    try {
      window.localStorage.setItem(ONBOARDING_STORAGE_KEY, "complete");
    } catch {
      // A storage-restricted browser can still dismiss the local-only tour.
    }
  }

  async function completeLesson(sectionIds: string[] = [], knowledgeCheckIds: string[] = []) {
    setLessonBusy(true);
    setLessonMessage(undefined);
    try {
      if (sessionMode !== "server") {
        setLessonComplete(true);
        setLessonMessage("Local interface preview: this completion is not saved and does not count toward badge eligibility.");
        return;
      }
      await api.completeLesson(WORKFLOW_KEY, sectionIds, knowledgeCheckIds);
      setLessonComplete(true);
      setSalesLesson((current) => ({ ...current, progress: { ...current.progress, complete: true, completed_sections: sectionIds, completed_knowledge_checks: knowledgeCheckIds, current_section: sectionIds.length } }));
      setLessonMessage("Lesson completion has been recorded by the server. Continue to the Lab when ready.");
    } catch (error) {
      setLessonMessage(readableApiError(error));
    } finally {
      setLessonBusy(false);
    }
  }

  async function completeHrLesson(sectionIds: string[] = [], knowledgeCheckIds: string[] = []) {
    setHrLessonBusy(true);
    setHrLessonMessage(undefined);
    try {
      if (sessionMode !== "server") {
        setHrLessonComplete(true);
        setHrLessonMessage("Local interface preview: this completion is not saved and does not count toward badge eligibility.");
        return;
      }
      await api.completeLesson(HR_WORKFLOW_KEY, sectionIds, knowledgeCheckIds);
      setHrLessonComplete(true);
      setHrLesson((current) => ({ ...current, progress: { ...current.progress, complete: true, completed_sections: sectionIds, completed_knowledge_checks: knowledgeCheckIds, current_section: sectionIds.length } }));
      setHrLessonMessage("HR lesson completion has been recorded by the server. Continue to the Lab when ready.");
    } catch (error) {
      setHrLessonMessage(readableApiError(error));
    } finally {
      setHrLessonBusy(false);
    }
  }

  function changeLead(field: keyof LeadForm, value: string) {
    setLead((current) => ({ ...current, [field]: value }));
    setLeadErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function changeHrCandidate(field: keyof HrCandidateForm, value: string) {
    setHrCandidate((current) => ({ ...current, [field]: value }));
    setHrCandidateErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function loadSample() {
    setLead({
      name: "Jordan Example",
      company: "Northstar Workspace (synthetic)",
      message: "We are evaluating a team workflow tool and would like a demonstration this week for our operations group.",
      industry: "Professional services",
      company_size: "38",
      budget_amount: "",
      currency: "USD",
      need: "Coordinate team workflows",
      purchase_timeframe: "immediate",
    });
    setLeadErrors({});
  }

  function loadHrSample() {
    setHrCandidate({
      name: "Taylor Example (synthetic)",
      experience_summary: "Supported customer questions, wrote clear status updates, and worked with a structured ticket queue for a fictional product team.",
      skills_text: "customer support, written communication, Zendesk",
      work_examples: "Synthetic example: documented ticket handoffs and drafted customer-facing updates.",
      job_title: "Customer Support Specialist",
      customer_support_experience: "Experience supporting customers with product questions.",
      written_communication: "Clear written communication for customer updates.",
      ticketing_workflow: "Experience working with structured ticketing or case-management workflows.",
    });
    setHrCandidateErrors({});
  }

  async function pollRun(runId: string, initialAfter = runEventCursor) {
    let events: RunEvent[] = [];
    let after = initialAfter;
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const latest = normalizeRun(await api.getRun(runId));
      try {
        const eventPage = await api.getRunEvents(runId, after);
        events = mergeEvents(events, readEvents(eventPage));
        if (typeof eventPage.next_after === "number") {
          after = eventPage.next_after;
          setRunEventCursor(after);
        }
      } catch {
        // The result itself is still authoritative; event retrieval may be temporarily unavailable.
      }
      const nextRun = { ...latest, events: mergeEvents(latest.events || [], events) };
      setRun(nextRun);
      if (isTerminal(nextRun.status)) return;
      await new Promise((resolve) => window.setTimeout(resolve, 800));
    }
    setRunError("The run is still processing. Its current persisted status is shown; use Check status to refresh it.");
  }

  async function runWorkflow() {
    const errors = validateLead(lead);
    setLeadErrors(errors);
    if (Object.keys(errors).length) return;
    if (trigger !== "new_lead_submitted") {
      setRunError("Select “New lead submitted” as the trigger before running this guided workflow.");
      return;
    }
    if (sessionMode !== "server") {
      setRunError("A live workflow requires the FastAPI service. Use the explicitly labelled replay while the service is unavailable.");
      return;
    }
    setRunBusy(true);
    setRunError(undefined);
    setRunEventCursor(0);
    setRun({ status: "queued", mode: "unknown", events: [] });
    setView("result");
    try {
      const started = await api.startRun(
        WORKFLOW_KEY,
        {
          configuration: { trigger: "new_lead_submitted", hot_follow_up_policy: policy },
          lead: toLeadPayload(lead),
        },
        makeIdempotencyKey(),
      );
      const runId = started.run_id || started.id;
      if (!runId) throw new Error("The server did not return a run identifier.");
      setRun((current) => ({ ...current, id: runId, run_id: runId, status: "queued" }));
      await pollRun(runId, 0);
    } catch (error) {
      setRunError(readableApiError(error));
      setRun((current) => ({ ...current, status: current?.status === "queued" ? "failed" : current?.status }));
    } finally {
      setRunBusy(false);
    }
  }

  async function pollHrRun(runId: string, initialAfter = hrRunEventCursor) {
    let events: RunEvent[] = [];
    let after = initialAfter;
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const latest = normalizeRun(await api.getRun(runId));
      try {
        const eventPage = await api.getRunEvents(runId, after);
        events = mergeEvents(events, readEvents(eventPage));
        if (typeof eventPage.next_after === "number") {
          after = eventPage.next_after;
          setHrRunEventCursor(after);
        }
      } catch {
        // The persisted result remains authoritative if event polling is delayed.
      }
      const nextRun = { ...latest, events: mergeEvents(latest.events || [], events) };
      setHrRun(nextRun);
      if (isTerminal(nextRun.status)) return;
      await new Promise((resolve) => window.setTimeout(resolve, 800));
    }
    setHrRunError("The HR run is still processing. Its persisted status is shown; use Check status to refresh it.");
  }

  async function runHrWorkflow() {
    const errors = validateHrCandidate(hrCandidate);
    setHrCandidateErrors(errors);
    if (Object.keys(errors).length) return;
    if (hrTrigger !== "candidate_submitted") {
      setHrRunError("Select “Synthetic candidate submitted” as the trigger before running this guided workflow.");
      return;
    }
    if (sessionMode !== "server") {
      setHrRunError("A server-backed workflow requires the FastAPI service. Use the explicitly labelled replay while the service is unavailable.");
      return;
    }
    setHrRunBusy(true);
    setHrRunError(undefined);
    setHrRunEventCursor(0);
    setHrRun({ status: "queued", mode: "unknown", events: [] });
    setView("hr-result");
    try {
      const started = await api.startRun(HR_WORKFLOW_KEY, toHrPayload(hrCandidate), makeIdempotencyKey());
      const runId = started.run_id || started.id;
      if (!runId) throw new Error("The server did not return a run identifier.");
      setHrRun((current) => ({ ...current, id: runId, run_id: runId, status: "queued" }));
      await pollHrRun(runId, 0);
    } catch (error) {
      setHrRunError(readableApiError(error));
      setHrRun((current) => ({ ...current, status: current?.status === "queued" ? "failed" : current?.status }));
    } finally {
      setHrRunBusy(false);
    }
  }

  async function refreshRun() {
    const runId = run?.id || run?.run_id;
    if (!runId || resolveRunMode(run) === "replay") return;
    setRunBusy(true);
    setRunError(undefined);
    try {
      await pollRun(runId);
    } catch (error) {
      setRunError(readableApiError(error));
    } finally {
      setRunBusy(false);
    }
  }

  async function refreshHrRun() {
    const runId = hrRun?.id || hrRun?.run_id;
    if (!runId || resolveRunMode(hrRun) === "replay") return;
    setHrRunBusy(true);
    setHrRunError(undefined);
    try {
      await pollHrRun(runId);
    } catch (error) {
      setHrRunError(readableApiError(error));
    } finally {
      setHrRunBusy(false);
    }
  }

  async function showReplay() {
    setRunBusy(true);
    setRunError(undefined);
    try {
      if (sessionMode === "server") {
        const fetched = await api.getReplay(WORKFLOW_KEY);
        setRun({ ...normalizeRun(fetched), status: "completed", mode: "replay", eligible_for_progress: false });
      } else {
        setRun(REPLAY_RESULT);
      }
    } catch (error) {
      setRun(REPLAY_RESULT);
      setRunError(`${readableApiError(error)} Showing a fixed local replay instead. It creates no activity or achievement.`);
    } finally {
      setRunBusy(false);
      setView("result");
    }
  }

  async function showHrReplay() {
    setHrRunBusy(true);
    setHrRunError(undefined);
    try {
      if (sessionMode === "server") {
        const fetched = await api.getReplay(HR_WORKFLOW_KEY);
        setHrRun({ ...normalizeRun(fetched), status: "needs_review", mode: "replay", eligible_for_progress: false });
      } else {
        setHrRun(HR_REPLAY_RESULT);
      }
    } catch (error) {
      setHrRun(HR_REPLAY_RESULT);
      setHrRunError(`${readableApiError(error)} Showing a fixed local replay instead. It creates no activity or achievement.`);
    } finally {
      setHrRunBusy(false);
      setView("hr-result");
    }
  }

  async function submitAssessment() {
    const questions = assessment.questions?.length ? assessment.questions : [];
    if (assessmentSource !== "server") {
      setAssessmentError("The assessment cannot be graded in preview mode. Restore a server-backed demo session and load the server assessment.");
      return;
    }
    if (questions.some((question) => !assessmentAnswers[question.id]) || !warmBehavior || !reviewBehavior) {
      setAssessmentError("Answer all five questions and complete the practical rule exercise before submitting.");
      return;
    }
    setAssessmentBusy(true);
    setAssessmentError(undefined);
    try {
      const result = await api.submitAssessment(WORKFLOW_KEY, assessmentAnswers, {
        hot_follow_up_rule: practicalPolicy,
        warm_behavior: warmBehavior,
        review_behavior: reviewBehavior,
      });
      setAssessmentResult(result);
      if (result.badge) await loadPortfolio();
    } catch (error) {
      setAssessmentError(readableApiError(error));
    } finally {
      setAssessmentBusy(false);
    }
  }

  async function submitHrAssessment() {
    const questions = hrAssessment.questions?.length ? hrAssessment.questions : [];
    if (hrAssessmentSource !== "server") {
      setHrAssessmentError("The HR assessment cannot be graded in preview mode. Restore a server-backed demo session and load the server assessment.");
      return;
    }
    if (
      questions.some((question) => !hrAssessmentAnswers[question.id]) ||
      !hrReviewRule ||
      !hrInsufficientEvidenceBehavior ||
      !hrFinalDecisionOwner
    ) {
      setHrAssessmentError("Answer all five questions and complete the practical safety exercise before submitting.");
      return;
    }
    setHrAssessmentBusy(true);
    setHrAssessmentError(undefined);
    try {
      const result = await api.submitAssessment(HR_WORKFLOW_KEY, hrAssessmentAnswers, {
        review_rule: hrReviewRule,
        insufficient_evidence_behavior: hrInsufficientEvidenceBehavior,
        final_decision_owner: hrFinalDecisionOwner,
      });
      setHrAssessmentResult(result);
      if (result.badge) await loadPortfolio();
    } catch (error) {
      setHrAssessmentError(readableApiError(error));
    } finally {
      setHrAssessmentBusy(false);
    }
  }

  async function changePortfolioVisibility(visibility: string) {
    if (sessionMode !== "server" || !portfolio) {
      setPortfolioError("A live server-backed portfolio is required to change visibility.");
      return;
    }
    setPortfolioSaving(true);
    setPortfolioError(undefined);
    try {
      setPortfolio(await api.updatePortfolio({ visibility }));
    } catch (error) {
      setPortfolioError(readableApiError(error));
    } finally {
      setPortfolioSaving(false);
    }
  }

  async function changePublicItem(verificationId: string, checked: boolean) {
    if (sessionMode !== "server" || !portfolio) {
      setPortfolioError("A live server-backed portfolio is required to choose public achievements.");
      return;
    }
    const current = portfolio.selected_public_items || [];
    const selected = checked ? [...new Set([...current, verificationId])] : current.filter((value) => value !== verificationId);
    setPortfolioSaving(true);
    setPortfolioError(undefined);
    try {
      setPortfolio(await api.updatePortfolio({ selected_public_items: selected }));
    } catch (error) {
      setPortfolioError(readableApiError(error));
    } finally {
      setPortfolioSaving(false);
    }
  }

  async function openPublicPreview() {
    if (!portfolio?.public_id) {
      setPortfolioError("No public identifier is available yet. Publish a selected safe achievement through the server first.");
      return;
    }
    if (typeof window !== "undefined") window.history.pushState({}, "", `/p/${encodeURIComponent(portfolio.public_id)}`);
    setPublicRouteId(portfolio.public_id);
    setView("public");
  }

  function closePublicPreview() {
    if (typeof window !== "undefined") window.history.pushState({}, "", "/");
    setPublicRouteId(undefined);
    setView(portfolio ? "portfolio" : "entry");
  }

  const screen = (() => {
    switch (view) {
      case "dashboard":
        return <DashboardScreen identity={identity} sessionMode={sessionMode} lessonComplete={lessonComplete} hrLessonComplete={hrLessonComplete} portfolio={portfolio} prepared={preparedDemo} onNavigate={navigate} />;
      case "explore":
        return <ExploreScreen domains={domains} onNavigate={navigate} />;
      case "sales":
        return <SalesScreen lessonComplete={lessonComplete} onNavigate={navigate} />;
      case "hr":
        return <HrScreen lessonComplete={hrLessonComplete} onNavigate={navigate} />;
      case "lesson":
        return <AcademyLessonScreen lesson={salesLesson} complete={lessonComplete} busy={lessonBusy} message={lessonMessage} onRecordProgress={(sectionId, checkId, answer) => recordAcademyProgress(WORKFLOW_KEY, sectionId, checkId, answer)} onComplete={(sections, checks) => completeLesson(sections, checks)} onNavigate={navigate} backView="sales" nextView="lab" label="Sales foundations" />;
      case "hr-lesson":
        return <AcademyLessonScreen lesson={hrLesson} complete={hrLessonComplete} busy={hrLessonBusy} message={hrLessonMessage} onRecordProgress={(sectionId, checkId, answer) => recordAcademyProgress(HR_WORKFLOW_KEY, sectionId, checkId, answer)} onComplete={(sections, checks) => completeHrLesson(sections, checks)} onNavigate={navigate} backView="hr" nextView="hr-lab" label="HR foundations" />;
      case "lab":
        return <LabScreen lead={lead} errors={leadErrors} trigger={trigger} policy={policy} busy={runBusy} serverAvailable={sessionMode === "server"} error={runError} onLeadChange={changeLead} onTriggerChange={setTrigger} onPolicyChange={setPolicy} onLoadSample={loadSample} onRun={() => void runWorkflow()} onReplay={() => void showReplay()} exercise={salesExercise} exerciseResult={salesExerciseResult} exerciseBusy={salesExerciseBusy} onExerciseSubmit={(answers) => void submitIndependentExercise(WORKFLOW_KEY, answers)} />;
      case "hr-lab":
        return <HrLabScreen candidate={hrCandidate} errors={hrCandidateErrors} trigger={hrTrigger} busy={hrRunBusy} serverAvailable={sessionMode === "server"} error={hrRunError} onCandidateChange={changeHrCandidate} onTriggerChange={setHrTrigger} onLoadSample={loadHrSample} onRun={() => void runHrWorkflow()} onReplay={() => void showHrReplay()} exercise={hrExercise} exerciseResult={hrExerciseResult} exerciseBusy={hrExerciseBusy} onExerciseSubmit={(answers) => void submitIndependentExercise(HR_WORKFLOW_KEY, answers)} />;
      case "result":
        return <ResultScreen run={run} error={runError} busy={runBusy} onRefresh={() => void refreshRun()} onNavigate={navigate} onRestartSession={restartDemoSession} />;
      case "hr-result":
        return <ResultScreen run={hrRun} error={hrRunError} busy={hrRunBusy} onRefresh={() => void refreshHrRun()} onNavigate={navigate} onRestartSession={restartDemoSession} workflow="hr" />;
      case "assessment":
        return <AssessmentScreen definition={assessment} source={assessmentSource} answers={assessmentAnswers} practicalPolicy={practicalPolicy} warmBehavior={warmBehavior} reviewBehavior={reviewBehavior} busy={assessmentBusy} error={assessmentError} result={assessmentResult} onAnswer={(questionId, answer) => setAssessmentAnswers((current) => ({ ...current, [questionId]: answer }))} onPolicyChange={setPracticalPolicy} onWarmChange={setWarmBehavior} onReviewChange={setReviewBehavior} onSubmit={() => void submitAssessment()} onNavigate={navigate} />;
      case "hr-assessment":
        return <HrAssessmentScreen definition={hrAssessment} source={hrAssessmentSource} answers={hrAssessmentAnswers} reviewRule={hrReviewRule} insufficientEvidenceBehavior={hrInsufficientEvidenceBehavior} finalDecisionOwner={hrFinalDecisionOwner} busy={hrAssessmentBusy} error={hrAssessmentError} result={hrAssessmentResult} onAnswer={(questionId, answer) => setHrAssessmentAnswers((current) => ({ ...current, [questionId]: answer }))} onReviewRuleChange={setHrReviewRule} onInsufficientEvidenceChange={setHrInsufficientEvidenceBehavior} onFinalDecisionOwnerChange={setHrFinalDecisionOwner} onSubmit={() => void submitHrAssessment()} onNavigate={navigate} />;
      case "badge":
        return <BadgeScreen badge={award} onNavigate={navigate} />;
      case "hr-badge":
        return <BadgeScreen badge={hrAward} onNavigate={navigate} workflow="hr" />;
      case "portfolio":
        return <PortfolioScreen portfolio={portfolio} loading={portfolioLoading} error={portfolioError} saving={portfolioSaving} onVisibilityChange={(value) => void changePortfolioVisibility(value)} onPublicItemChange={(id, checked) => void changePublicItem(id, checked)} onPreview={() => void openPublicPreview()} />;
      case "public":
        return <PublicScreen portfolio={publicPortfolio} loading={publicLoading} error={publicError} onBack={closePublicPreview} />;
      case "manager":
        return <ManagerScreen summary={managerSummary} identity={identity} loading={managerLoading} error={managerError} sessionMode={sessionMode} onNavigate={navigate} />;
      case "entry":
      default:
        return <EntryScreen busy={entryBusy} onEnter={(selectedRole, profile) => void enterDemo(selectedRole, profile)} error={entryError} />;
    }
  })();

  if (bootstrapping) {
    return <main className="entry-screen"><section className="entry-hero"><div className="brand-lockup large"><span className="brand-mark" aria-hidden="true">I</span><div><strong>IkeOru</strong><span>Learn. Do. Prove.</span></div></div><p className="eyebrow">Restoring your demo</p><h1>Checking your saved browser session.</h1><p className="entry-copy">IkeOru is retrieving only the same-browser demo context, if one exists.</p></section></main>;
  }

  if (view === "entry" || view === "public") return screen;

  return (
    <div className="app-frame">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="app-header">
        <button className="brand-lockup brand-button" type="button" onClick={() => navigate(role === "manager" ? "manager" : "dashboard")} aria-label="IkeOru home">
          <span className="brand-mark" aria-hidden="true">I</span>
          <span><strong>IkeOru</strong><small>Learn. Do. Prove.</small></span>
        </button>
        <nav aria-label="Primary navigation">
          {role === "manager" ? (
            <>
              <button className={view === "manager" ? "active" : ""} type="button" onClick={() => navigate("manager")}>Manager</button>
              <button className="help-tour-button" type="button" onClick={openTour}>Help &amp; tour</button>
            </>
          ) : (
            <>
              <button className={view === "dashboard" ? "active" : ""} type="button" onClick={() => navigate("dashboard")}>Dashboard</button>
              <button className={view === "explore" || view === "sales" ? "active" : ""} type="button" onClick={() => navigate("explore")}>Explore</button>
              <button className={view === "portfolio" ? "active" : ""} type="button" onClick={() => navigate("portfolio")}>Portfolio</button>
              <button className="switch-role-button" type="button" onClick={restartDemoSession}>Switch demo role</button>
              <button className="help-tour-button" type="button" onClick={openTour}>Help &amp; tour</button>
            </>
          )}
        </nav>
        <div className="connection-state" title={`API base: ${API_BASE_URL}`}>
          <span className={`connection-dot ${sessionMode === "server" ? "connected" : ""}`} aria-hidden="true" />
          {sessionMode === "server" ? "Server demo" : "Local preview"}
        </div>
      </header>
      {role === "learner" ? <ProgressRail lessonComplete={lessonComplete} runEligible={runEligible} assessmentPassed={assessmentPassed} badgeAward={award} /> : null}
      <div id="main-content">{screen}</div>
      {tourOpen ? <OnboardingTour step={tourStep} onStepChange={setTourStep} onDismiss={dismissTour} /> : null}
    </div>
  );
}

export default App;
