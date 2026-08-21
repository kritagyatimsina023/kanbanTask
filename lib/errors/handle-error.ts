import { AppError } from "./app-error";

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      resource: error.resource,
    };
  }
  console.error("Unexpected error", error);
  return {
    code: "INTERNAL" as const,
    message: "Somthing went wrong:Please try again",
    resource: undefined,
  };
}
