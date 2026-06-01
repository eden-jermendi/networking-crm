import type {
  CreateContactInput,
  CreateFollowUpInput,
  CreateInteractionInput,
  CreateNetworkingEventInput,
  FollowUp,
  UpdateFollowUpInput
} from "../db/types.js";
import { badRequest, validationError } from "./errors.js";

type RequestBody = Record<string, unknown>;

export function parsePositiveIntegerId(value: string, resourceName = "id") {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw badRequest(`Invalid ${resourceName}`);
  }

  return parsed;
}

export function validateCreateContact(input: unknown): CreateContactInput {
  const body = parseBody(input);
  const errors: string[] = [];

  requireString(body, "name", errors);
  requireString(body, "contact_source", errors);
  requireString(body, "status", errors);

  throwIfValidationFailed(errors);
  return body as CreateContactInput;
}

export function validateCreateNetworkingEvent(
  input: unknown
): CreateNetworkingEventInput {
  const body = parseBody(input);
  const errors: string[] = [];

  requireString(body, "name", errors);
  requireString(body, "event_type", errors);
  requireString(body, "starts_at", errors);

  throwIfValidationFailed(errors);
  return body as CreateNetworkingEventInput;
}

export function validateCreateInteraction(
  input: unknown
): CreateInteractionInput {
  const body = parseBody(input);
  const errors: string[] = [];

  requirePositiveInteger(body, "contact_id", errors);
  requireString(body, "interaction_type", errors);
  validateOptionalPositiveInteger(body, "networking_event_id", errors);

  throwIfValidationFailed(errors);
  return body as CreateInteractionInput;
}

export function validateCreateFollowUp(input: unknown): CreateFollowUpInput {
  const body = parseBody(input);
  const errors: string[] = [];

  requireString(body, "title", errors);
  requireString(body, "due_at", errors);
  requireString(body, "status", errors);
  validateFollowUpParents(body, errors);

  throwIfValidationFailed(errors);
  return body as CreateFollowUpInput;
}

export function validateUpdateFollowUp(
  input: unknown,
  existingFollowUp: FollowUp
): UpdateFollowUpInput {
  const body = parseBody(input);
  const errors: string[] = [];

  if (Object.keys(body).length === 0) {
    errors.push("At least one field is required");
  }

  validateOptionalNonEmptyString(body, "title", errors);
  validateOptionalNonEmptyString(body, "due_at", errors);
  validateOptionalNonEmptyString(body, "status", errors);
  validateOptionalPositiveInteger(body, "contact_id", errors);
  validateOptionalPositiveInteger(body, "networking_event_id", errors);
  validateOptionalPositiveInteger(body, "interaction_id", errors);
  validateUpdatedFollowUpParents(body, existingFollowUp, errors);

  throwIfValidationFailed(errors);
  return body as UpdateFollowUpInput;
}

function parseBody(input: unknown): RequestBody {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw validationError(["Request body must be an object"]);
  }

  return input as RequestBody;
}

function requireString(
  body: RequestBody,
  fieldName: string,
  errors: string[]
) {
  if (typeof body[fieldName] !== "string" || body[fieldName].trim() === "") {
    errors.push(`${fieldName} is required`);
  }
}

function requirePositiveInteger(
  body: RequestBody,
  fieldName: string,
  errors: string[]
) {
  const value = body[fieldName];

  if (!Number.isInteger(value) || Number(value) <= 0) {
    errors.push(`${fieldName} must be a positive integer`);
  }
}

function validateOptionalNonEmptyString(
  body: RequestBody,
  fieldName: string,
  errors: string[]
) {
  const value = body[fieldName];

  if (
    value !== undefined &&
    value !== null &&
    (typeof value !== "string" || value.trim() === "")
  ) {
    errors.push(`${fieldName} must be a non-empty string when provided`);
  }
}

function validateOptionalPositiveInteger(
  body: RequestBody,
  fieldName: string,
  errors: string[]
) {
  const value = body[fieldName];

  if (
    value !== undefined &&
    value !== null &&
    (!Number.isInteger(value) || Number(value) <= 0)
  ) {
    errors.push(`${fieldName} must be a positive integer when provided`);
  }
}

function validateFollowUpParents(body: RequestBody, errors: string[]) {
  validateOptionalPositiveInteger(body, "contact_id", errors);
  validateOptionalPositiveInteger(body, "networking_event_id", errors);
  validateOptionalPositiveInteger(body, "interaction_id", errors);

  if (
    !hasPositiveInteger(body.contact_id) &&
    !hasPositiveInteger(body.networking_event_id) &&
    !hasPositiveInteger(body.interaction_id)
  ) {
    errors.push(
      "Follow-up must be associated with at least one contact, networking event, or interaction"
    );
  }
}

function validateUpdatedFollowUpParents(
  body: RequestBody,
  existingFollowUp: FollowUp,
  errors: string[]
) {
  const contactId = hasField(body, "contact_id")
    ? body.contact_id
    : existingFollowUp.contact_id;
  const networkingEventId = hasField(body, "networking_event_id")
    ? body.networking_event_id
    : existingFollowUp.networking_event_id;
  const interactionId = hasField(body, "interaction_id")
    ? body.interaction_id
    : existingFollowUp.interaction_id;

  if (
    !hasPositiveInteger(contactId) &&
    !hasPositiveInteger(networkingEventId) &&
    !hasPositiveInteger(interactionId)
  ) {
    errors.push(
      "Follow-up must be associated with at least one contact, networking event, or interaction"
    );
  }
}

function hasPositiveInteger(value: unknown) {
  return Number.isInteger(value) && Number(value) > 0;
}

function hasField(body: RequestBody, fieldName: string) {
  return Object.prototype.hasOwnProperty.call(body, fieldName);
}

function throwIfValidationFailed(errors: string[]) {
  if (errors.length > 0) {
    throw validationError(errors);
  }
}
