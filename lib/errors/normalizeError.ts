import { AppError } from "./app-error";

export function normalizeError(
  error: unknown,
  resource: AppError["resource"],
): AppError {
  if (error instanceof AppError) {
    return error;
  }
  console.error(`Unexpected ${resource} error:`, error);
  return new AppError(
    "Something went wrong. Please try again.",
    "INTERNAL",
    500,
    resource,
  );
}
