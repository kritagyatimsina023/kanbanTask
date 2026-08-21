import { AppError } from "./app-error";
export const Errors = {
  validation(message: string, resource: AppError["resource"]) {
    return new AppError(message, "VALIDATION", 422, resource);
  },

  unauthorized(message: string, resource: AppError["resource"]) {
    return new AppError(message, "UNAUTHORIZED", 401, resource);
  },

  forbidden(message: string, resource: AppError["resource"]) {
    return new AppError(message, "FORBIDDEN", 403, resource);
  },

  notFound(message: string, resource: AppError["resource"]) {
    return new AppError(message, "NOT_FOUND", 404, resource);
  },

  conflict(message: string, resource: AppError["resource"]) {
    return new AppError(message, "CONFLICT", 409, resource);
  },

  badRequest(message: string, resource: AppError["resource"]) {
    return new AppError(message, "BAD_REQUEST", 400, resource);
  },

  internal(message: string, resource: AppError["resource"]) {
    return new AppError(message, "INTERNAL", 500, resource);
  },
};
