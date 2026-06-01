import type {
  ApiErrorBody,
  Contact,
  CreateContactInput,
  CreateFollowUpInput,
  CreateInteractionInput,
  CreateNetworkingEventInput,
  FollowUp,
  Interaction,
  NetworkingEvent,
  UpdateFollowUpInput
} from "./types";

const DEFAULT_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:3000";

type RequestOptions = {
  body?: unknown;
  method?: string;
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details: string[] = []
  ) {
    super(message);
  }
}

export function listContacts() {
  return apiRequest<Contact[]>("/api/contacts");
}

export function getContact(id: number) {
  return apiRequest<Contact>(`/api/contacts/${id}`);
}

export function createContact(input: CreateContactInput) {
  return apiRequest<Contact>("/api/contacts", {
    body: input,
    method: "POST"
  });
}

export function listNetworkingEvents() {
  return apiRequest<NetworkingEvent[]>("/api/networking-events");
}

export function getNetworkingEvent(id: number) {
  return apiRequest<NetworkingEvent>(`/api/networking-events/${id}`);
}

export function createNetworkingEvent(input: CreateNetworkingEventInput) {
  return apiRequest<NetworkingEvent>("/api/networking-events", {
    body: input,
    method: "POST"
  });
}

export function createInteraction(input: CreateInteractionInput) {
  return apiRequest<Interaction>("/api/interactions", {
    body: input,
    method: "POST"
  });
}

export function listUpcomingFollowUps() {
  return apiRequest<FollowUp[]>("/api/follow-ups/upcoming");
}

export function createFollowUp(input: CreateFollowUpInput) {
  return apiRequest<FollowUp>("/api/follow-ups", {
    body: input,
    method: "POST"
  });
}

export function updateFollowUp(id: number, input: UpdateFollowUpInput) {
  return apiRequest<FollowUp>(`/api/follow-ups/${id}`, {
    body: input,
    method: "PATCH"
  });
}

async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const response = await fetch(`${DEFAULT_API_BASE_URL}${path}`, {
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    headers:
      options.body === undefined
        ? undefined
        : {
            "content-type": "application/json"
          },
    method: options.method ?? "GET"
  });
  const data = await readJson(response);

  if (!response.ok) {
    throw toApiError(response, data);
  }

  return data as T;
}

async function readJson(response: Response) {
  const text = await response.text();

  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function toApiError(response: Response, data: unknown) {
  if (isApiErrorBody(data)) {
    return new ApiError(
      response.status,
      data.error.code,
      data.error.message,
      data.error.details
    );
  }

  return new ApiError(response.status, "request_failed", "Request failed");
}

function isApiErrorBody(data: unknown): data is ApiErrorBody {
  if (!data || typeof data !== "object" || !("error" in data)) {
    return false;
  }

  const error = (data as ApiErrorBody).error;

  return (
    typeof error?.code === "string" &&
    Array.isArray(error.details) &&
    typeof error.message === "string"
  );
}
