import type {
  AssessmentDefinition,
  AssessmentResult,
  AssessmentOption,
  AssessmentQuestion,
  AcademyLesson,
  IndependentExercise,
  IndependentExerciseResult,
  CurrentIdentity,
  DemoRole,
  Domain,
  HrWorkflowRunRequest,
  ManagerSummary,
  PortfolioData,
  RunEventsPage,
  RunResult,
  WorkflowRunRequest,
} from "./types";

export const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

let csrfToken: string | undefined;

export class ApiError extends Error {
  status?: number;
  code?: string;
  retryable?: boolean;
  requestId?: string;
  fieldErrors?: Record<string, string>;

  constructor(message: string, details: Partial<ApiError> = {}) {
    super(message);
    this.name = "ApiError";
    Object.assign(this, details);
  }
}

type JsonObject = Record<string, unknown>;

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringRecord(value: unknown): Record<string, string> | undefined {
  if (!isJsonObject(value)) return undefined;
  const entries = Object.entries(value).flatMap(([key, item]) =>
    typeof item === "string" ? [[key, item] as const] : [],
  );
  return entries.length ? Object.fromEntries(entries) : undefined;
}

function displayOption(value: string): string {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function normalizeAssessment(payload: unknown): AssessmentDefinition {
  const source = unwrap<unknown>(payload);
  const record = isJsonObject(source) ? source : {};
  const practical = isJsonObject(record.practical) ? record.practical : {};
  const rawQuestions = Array.isArray(record.questions) ? record.questions : [];
  const questions: AssessmentQuestion[] = rawQuestions.flatMap((item) => {
    if (!isJsonObject(item)) return [];
    const question = item;
    const id = typeof question.id === "string" ? question.id : undefined;
    const prompt = typeof question.prompt === "string" ? question.prompt : undefined;
    if (!id || !prompt) return [];
    const rawOptions = Array.isArray(question.options) ? question.options : [];
    const options: AssessmentOption[] = rawOptions.flatMap((option) => {
      if (typeof option === "string") return [{ id: option, label: displayOption(option) }];
      const optionRecord = isJsonObject(option) ? option : undefined;
      const optionId = optionRecord && (typeof optionRecord.id === "string" ? optionRecord.id : typeof optionRecord.value === "string" ? optionRecord.value : undefined);
      if (!optionId) return [];
      return [{ id: optionId, label: typeof optionRecord?.label === "string" ? optionRecord.label : displayOption(optionId) }];
    });
    return [{ id, prompt, objective: typeof question.objective === "string" ? question.objective : undefined, options }];
  });
  return {
    key: typeof record.key === "string" ? record.key : undefined,
    title: typeof record.title === "string" ? record.title : undefined,
    objectives: Array.isArray(record.objectives) ? record.objectives.filter((item): item is string => typeof item === "string") : undefined,
    practical_prompt:
      typeof record.practical_prompt === "string"
        ? record.practical_prompt
        : typeof practical.prompt === "string"
          ? practical.prompt
          : undefined,
    questions,
  };
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;

  try {
    // Preserve caller-supplied headers (for example Idempotency-Key) while
    // layering the session-bound headers required by the API. Spreading the
    // full init object after this map would replace it and drop the CSRF
    // header on protected writes.
    const requestHeaders = new Headers(init.headers);
    requestHeaders.set("Accept", "application/json");
    if (init.body) requestHeaders.set("Content-Type", "application/json");
    if (init.method && !["GET", "HEAD"].includes(init.method.toUpperCase()) && csrfToken) {
      requestHeaders.set("X-CSRF-Token", csrfToken);
    }

    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      credentials: "include",
      headers: requestHeaders,
    });
  } catch {
    throw new ApiError("The IkeOru service could not be reached. Check that the FastAPI server is running.", {
      retryable: true,
    });
  }

  const contentType = response.headers.get("content-type") || "";
  const payload: unknown = contentType.includes("application/json")
    ? await response.json().catch(() => undefined)
    : undefined;

  if (!response.ok) {
    const error = isJsonObject(payload) && isJsonObject(payload.error) ? payload.error : payload;
    const errorData = isJsonObject(error) ? error : {};
    throw new ApiError(
      typeof errorData.message === "string" ? errorData.message : `The request could not be completed (${response.status}).`,
      {
        status: response.status,
        code: typeof errorData.code === "string" ? errorData.code : undefined,
        retryable: typeof errorData.retryable === "boolean" ? errorData.retryable : response.status >= 500,
        requestId: typeof errorData.request_id === "string" ? errorData.request_id : undefined,
        fieldErrors: stringRecord(errorData.field_errors),
      },
    );
  }

  return payload as T;
}

function unwrap<T>(payload: unknown): T {
  if (isJsonObject(payload) && "data" in payload) {
    return payload.data as T;
  }
  return payload as T;
}

export const api = {
  createDemoSession: async (role: DemoRole, profile?: "fresh" | "seeded") => {
    const response = await request<unknown>("/api/demo/session", {
      method: "POST",
      body: JSON.stringify({ role, ...(profile ? { profile } : {}) }),
    });
    const session = unwrap<unknown>(response);
    const record = isJsonObject(session) ? session : isJsonObject(response) ? response : undefined;
    if (typeof record?.csrf_token === "string") csrfToken = record.csrf_token;
    return response;
  },

  getCurrentIdentity: async () => {
    const response = await request<unknown>("/api/me");
    const source = unwrap<unknown>(response);
    const record = isJsonObject(source) ? source : isJsonObject(response) ? response : undefined;
    const user = isJsonObject(record?.user) ? record.user : record;
    const organization = isJsonObject(record?.organization) ? record.organization : undefined;
    const identity: CurrentIdentity = {
      role: user?.role === "learner" || user?.role === "manager" ? user.role : undefined,
      display_name: typeof user?.display_name === "string" ? user.display_name : undefined,
      organization_id:
        typeof organization?.id === "string" || typeof organization?.id === "number"
          ? String(organization.id)
          : typeof record?.organization_id === "string" || typeof record?.organization_id === "number"
            ? String(record.organization_id)
            : undefined,
      organization_name: typeof organization?.name === "string" ? organization.name : typeof record?.organization_name === "string" ? record.organization_name : undefined,
      demo: user?.is_demo === true || record?.is_demo === true,
      is_seeded_sample: user?.is_seeded_sample === true || record?.is_seeded_sample === true,
    };
    if (typeof record?.csrf_token === "string") csrfToken = record.csrf_token;
    return identity;
  },

  getDomains: async () => {
    const source = unwrap<unknown>(await request<unknown>("/api/domains"));
    const record = isJsonObject(source) ? source : undefined;
    const items = Array.isArray(source) ? source : Array.isArray(record?.domains) ? record.domains : [];
    return items.flatMap((item): Domain[] => {
      const domain = isJsonObject(item) ? item : undefined;
      if (!domain || typeof domain.title !== "string") return [];
      return [{
        key: typeof domain.key === "string" ? domain.key : undefined,
        title: domain.title,
        availability: typeof domain.availability === "string" ? domain.availability : "coming_soon",
        description: typeof domain.description === "string" ? domain.description : undefined,
      }];
    });
  },

  getLesson: async (workflowKey: string) =>
    unwrap<AcademyLesson>(await request<unknown>(`/api/lessons/${encodeURIComponent(workflowKey)}`)),

  recordLessonProgress: async (workflowKey: string, sectionId: string, knowledgeCheckId?: string, answer?: string) =>
    unwrap<{ correct?: boolean; section_complete?: boolean; feedback?: string; progress?: AcademyLesson["progress"] }>(
      await request<unknown>(`/api/lessons/${encodeURIComponent(workflowKey)}/progress`, {
        method: "POST",
        body: JSON.stringify({ section_id: sectionId, ...(knowledgeCheckId ? { knowledge_check_id: knowledgeCheckId } : {}), ...(answer ? { answer } : {}) }),
      }),
    ),

  completeLesson: (workflowKey: string, sectionIds?: string[], knowledgeCheckIds?: string[]) =>
    request<unknown>(`/api/lessons/${encodeURIComponent(workflowKey)}/complete`, {
      method: "POST",
      body: JSON.stringify({ section_ids: sectionIds || [], knowledge_check_ids: knowledgeCheckIds || [] }),
    }),

  getIndependentExercise: async (workflowKey: string) =>
    unwrap<IndependentExercise>(await request<unknown>(`/api/lessons/${encodeURIComponent(workflowKey)}/independent-exercise`)),

  submitIndependentExercise: async (workflowKey: string, answers: Record<string, string>) =>
    unwrap<IndependentExerciseResult>(
      await request<unknown>(`/api/lessons/${encodeURIComponent(workflowKey)}/independent-exercise`, {
        method: "POST",
        body: JSON.stringify({ answers }),
      }),
    ),

  startRun: async (workflowKey: string, run: WorkflowRunRequest | HrWorkflowRunRequest, idempotencyKey: string) =>
    unwrap<{ run_id?: string; id?: string }>(
      await request<unknown>(`/api/workflows/${encodeURIComponent(workflowKey)}/runs`, {
        method: "POST",
        headers: { "Idempotency-Key": idempotencyKey },
        body: JSON.stringify(
          "lead" in run
            ? {
                lead: run.lead,
                trigger: "new_lead",
                hot_follow_up_rule: run.configuration.hot_follow_up_policy,
              }
            : {
                candidate: run.candidate,
                job_requirements: run.job_requirements,
                trigger: run.configuration.trigger,
                review_rule: run.configuration.review_rule,
              },
        ),
      }),
    ),

  getRun: async (runId: string) => unwrap<RunResult>(await request<unknown>(`/api/runs/${encodeURIComponent(runId)}`)),

  getRunEvents: async (runId: string, after?: number) =>
    unwrap<RunEventsPage>(
      await request<unknown>(
        `/api/runs/${encodeURIComponent(runId)}/events${after ? `?after=${encodeURIComponent(after)}` : ""}`,
      ),
    ),

  getAssessment: async (workflowKey: string) =>
    normalizeAssessment(await request<unknown>(`/api/assessments/${encodeURIComponent(workflowKey)}`)),

  submitAssessment: async (workflowKey: string, answers: Record<string, string>, practical: Record<string, string>) =>
    unwrap<AssessmentResult>(
      await request<unknown>(`/api/assessments/${encodeURIComponent(workflowKey)}/attempts`, {
        method: "POST",
        body: JSON.stringify({ answers, practical }),
      }),
    ),

  getPortfolio: async () => unwrap<PortfolioData>(await request<unknown>("/api/me/portfolio")),

  updatePortfolio: async (change: Partial<PortfolioData>) =>
    unwrap<PortfolioData>(
      await request<unknown>("/api/me/portfolio", {
        method: "PATCH",
        body: JSON.stringify(change),
      }),
    ),

  getPublicPortfolio: async (publicId: string) =>
    unwrap<PortfolioData>(await request<unknown>(`/api/p/${encodeURIComponent(publicId)}`)),

  getManagerSummary: async (organizationId: string) => {
    const source = unwrap<unknown>(
      await request<unknown>(`/api/organizations/${encodeURIComponent(organizationId)}/progress`),
    );
    const record = isJsonObject(source) ? source : {};
    const rawLearners = Array.isArray(record.learners) ? record.learners : [];
    const learners = rawLearners.flatMap((item) => {
      const learner = isJsonObject(item) ? item : undefined;
      if (!learner) return [];
      const badgeCount = typeof learner.badge_count === "number" ? learner.badge_count : 0;
      return [{
        display_name: typeof learner.display_name === "string" ? learner.display_name : undefined,
        workflow_complete: learner.workflow_complete === true || learner.eligible_live_lab_completed === true,
        assessment_passed: learner.assessment_passed === true,
        badges: Array.from({ length: Math.max(0, badgeCount) }, () => "Server-issued badge"),
      }];
    });
    return {
      organization_name: typeof record.organization_name === "string" ? record.organization_name : undefined,
      learner_count: typeof record.learner_count === "number" ? record.learner_count : learners.length,
      required_workflow_completion:
        typeof record.required_workflow_completion === "number"
          ? record.required_workflow_completion
          : learners.filter((learner) => learner.workflow_complete).length,
      assessment_pass_count:
        typeof record.assessment_pass_count === "number"
          ? record.assessment_pass_count
          : learners.filter((learner) => learner.assessment_passed).length,
      badge_count:
        typeof record.badge_count === "number"
          ? record.badge_count
          : learners.reduce((total, learner) => total + (learner.badges?.length || 0), 0),
      learners,
    };
  },

  getReplay: async (workflowKey: string) =>
    unwrap<RunResult>(await request<unknown>(`/api/examples/${encodeURIComponent(workflowKey)}`)),
};

export function readableApiError(error: unknown): string {
  return error instanceof ApiError ? error.message : "Something unexpected happened. Please try again.";
}
