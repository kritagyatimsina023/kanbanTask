import { Prisma } from "@/generated/prisma/client";
import { AppError } from "./app-error";
import { ZodError } from "zod";

export function normalizeError(
  error: unknown,
  resource: AppError["resource"],
): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new AppError(
      error.issues[0]?.message ?? "Invalid input",
      "VALIDATION",
      400,
      resource,
    );
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return new AppError(
        "You have already sent a message for this task",
        "CONFLICT",
        409,
        resource,
      );
    }
  }
  console.error(`Unexpected ${resource} error:`, error);
  return new AppError(
    "Something went wrong. Please try again.",
    "INTERNAL",
    500,
    resource,
  );
}
