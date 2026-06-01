import type { ErrorRequestHandler } from "express";

export type ErrorCode =
  | "bad_request"
  | "internal_server_error"
  | "not_found"
  | "validation_error";

export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: ErrorCode,
    message: string,
    public readonly details: string[] = []
  ) {
    super(message);
  }
}

export function badRequest(message: string, details: string[] = []) {
  return new HttpError(400, "bad_request", message, details);
}

export function notFound(resourceName: string) {
  return new HttpError(404, "not_found", `${resourceName} not found`);
}

export function validationError(details: string[]) {
  return new HttpError(400, "validation_error", "Validation failed", details);
}

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  if (response.headersSent) {
    return;
  }

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        details: error.details,
        message: error.message
      }
    });
    return;
  }

  response.status(500).json({
    error: {
      code: "internal_server_error",
      details: [],
      message: "Internal server error"
    }
  });
};
