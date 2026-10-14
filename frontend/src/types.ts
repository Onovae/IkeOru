export type DemoRole = "learner" | "manager";

export type AppView =
  | "entry"
  | "dashboard"
  | "explore"
  | "sales"
  | "hr"
  | "lesson"
  | "lab"
  | "result"
  | "assessment"
  | "badge"
  | "hr-lesson"
  | "hr-lab"
  | "hr-result"
  | "hr-assessment"
  | "hr-badge"
  | "portfolio"
  | "public"
  | "manager";

export type FollowUpPolicy = "immediate" | "within_24_hours";

export type Priority = "HOT" | "WARM" | "COLD" | "NEEDS_REVIEW";

export type RunMode = "live" | "mock" | "replay" | "unknown";

export interface LeadInput {
  name: string;
  company: string;
  message: string;
  industry?: string;
  company_size?: number;
  budget_amount?: number;
  currency?: string;
  need?: string;
  purchase_timeframe?: string;
}

export interface WorkflowConfiguration {
  trigger: "new_lead_submitted";
  hot_follow_up_policy: FollowUpPolicy;
}

export interface WorkflowRunRequest {
  configuration: WorkflowConfiguration;
  lead: LeadInput;
}

export interface CandidateInput {
  /** Synthetic candidate information only; protected characteristics are never collected. */
  name: string;
  experience_summary: string;
  skills: string[];
  work_examples?: string;
}

export interface JobRequirementsInput {
  title: string;
  criteria: Array<{
    id: string;
    description: string;
  }>;
}

export interface HrWorkflowConfiguration {
  trigger: "candidate_submitted";
  review_rule: "human_review_required";
}

export interface HrWorkflowRunRequest {
  configuration: HrWorkflowConfiguration;
  candidate: CandidateInput;
  job_requirements: JobRequirementsInput;
}

export interface RunEvent {
  sequence?: number;
  step_id?: string;
  timestamp?: string;
  status?: string;
  message?: string;
  result_reference?: string;
}

export interface RunEventsPage {
  events?: RunEvent[];
  next_after?: number;
}

export interface RunResult {
  id?: string;
  run_id?: string;
  status?: "queued" | "running" | "completed" | "needs_review" | "failed" | string;
  mode?: RunMode | string;
  ai_mode?: RunMode | string;
  priority?: Priority | string;
  explanation?: string;
  evidence?: string[];
  missing_fields?: string[];
  suggested_next_step?: string;
  recommendation?: string;
  human_review_required?: boolean;
  criteria_evaluation?: Array<{
    criterion?: string;
    evidence?: string[];
    status?: string;
  }>;
  criteria_evidence?: Array<{
    criterion_id?: string;
    criterion?: string;
    evidence?: string[];
    status?: string;
  }>;
  task?: {
    status?: string;
    kind?: string;
    due_at?: string;
    summary?: string;
  } | null;
  eligible_for_progress?: boolean;
  events?: RunEvent[];
}

export interface AssessmentOption {
  id: string;
  label: string;
}

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  objective?: string;
  options: AssessmentOption[];
}

export interface AssessmentDefinition {
  key?: string;
  title?: string;
  objectives?: string[];
  questions?: AssessmentQuestion[];
  practical_prompt?: string;
  practical?: { id?: string; objective?: string; prompt?: string; fields?: string[] };
}

export interface AssessmentResult {
  score?: number;
  max_score?: number;
  practical_pass?: boolean;
  overall_pass?: boolean;
  feedback?: string[] | string;
  question_feedback?: Array<{ question_id?: string; correct?: boolean; feedback?: string }>;
  score_breakdown?: { theory_points?: number; practical_points?: number; theory_total?: number; practical_total?: number; independent_exercise_passed?: boolean; policy_practical_passed?: boolean };
  badge?: BadgeAward | null;
  badge_prerequisites?: Record<string, boolean>;
}

export interface IndependentExerciseField {
  id: string;
  label: string;
  options: AssessmentOption[];
}

export interface IndependentExercise {
  id?: string;
  workflow_key?: string;
  title?: string;
  objective?: string;
  instructions?: string;
  scenario?: string;
  evidence?: string[];
  criteria?: string[];
  fields?: IndependentExerciseField[];
  progress?: { attempt_count?: number; passed?: boolean };
}

export interface IndependentExerciseResult {
  exercise_id?: string;
  passed?: boolean;
  field_results?: Record<string, { correct?: boolean; feedback?: string }>;
  feedback?: string;
  progress?: { attempt_count?: number; passed?: boolean };
}

export interface AcademyConcept {
  term?: string;
  meaning?: string;
  why_it_matters?: string;
  example?: string;
  common_mistake?: string;
  correct_application?: string;
  incorrect_application?: string;
}

export interface AcademyKnowledgeCheck {
  id: string;
  prompt: string;
  options: AssessmentOption[];
}

export interface AcademySection {
  id: string;
  title: string;
  objective: string;
  overview: string;
  concepts: AcademyConcept[];
  worked_example?: {
    scenario?: string;
    evidence?: string;
    reasoning?: string;
    result?: string;
    contrast?: string;
  };
  knowledge_check?: AcademyKnowledgeCheck;
}

export interface AcademyProgress {
  completed_sections?: string[];
  completed_knowledge_checks?: string[];
  knowledge_checks?: Record<string, { correct?: boolean; attempts?: number }>;
  current_section?: number;
  section_count?: number;
  complete?: boolean;
}

export interface AcademyLesson {
  workflow_key?: string;
  workflow_title?: string;
  version?: string;
  title?: string;
  problem?: string;
  sections?: AcademySection[];
  progress?: AcademyProgress;
}

export interface BadgeAward {
  key?: string;
  name?: string;
  verification_id?: string;
  awarded_at?: string;
  skills?: string[];
}

export interface PortfolioData {
  public_id?: string;
  visibility?: "private" | "organization" | "public" | string;
  selected_public_items?: string[];
  projects?: Array<{
    workflow_key?: string;
    title?: string;
    skills?: string[];
    first_activity?: string;
    last_activity?: string;
    first_activity_at?: string;
    last_activity_at?: string;
  }>;
  badges?: BadgeAward[];
  attempts?: Array<{
    assessment_key?: string;
    submitted_at?: string;
    score?: number;
    overall_pass?: boolean;
  }>;
  progress?: {
    lesson_complete?: boolean;
    lab_complete?: boolean;
    assessment_passed?: boolean;
    by_workflow?: Record<string, {
      lesson_completed?: boolean;
      eligible_live_lab_completed?: boolean;
      assessment_passed?: boolean;
      lesson_sections_completed?: number;
      lesson_section_count?: number;
      knowledge_checks_completed?: number;
      independent_exercise_passed?: boolean;
      independent_attempt_count?: number;
    }>;
  };
  workflow_progress?: Record<string, {
    lesson_complete?: boolean;
    lab_complete?: boolean;
    assessment_passed?: boolean;
  }>;
}

export interface CurrentIdentity {
  role?: DemoRole;
  display_name?: string;
  organization_id?: string;
  organization_name?: string;
  demo?: boolean;
  is_seeded_sample?: boolean;
}

export interface Domain {
  key?: string;
  title: string;
  availability?: "active" | "next" | "coming_soon" | string;
  description?: string;
}

export interface ManagerSummary {
  organization_name?: string;
  learner_count?: number;
  required_workflow_completion?: number;
  assessment_pass_count?: number;
  badge_count?: number;
  learners?: Array<{
    display_name?: string;
    workflow_complete?: boolean;
    assessment_passed?: boolean;
    badges?: string[];
  }>;
}
