export type Errorcode =
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "BAD_REQUEST"
  | "INTERNAL";

export type ErrorResource = "AUTH" | "USER" | "TASK" | "REWARD" | "LEADERBOARD";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: Errorcode,
    public readonly statusCode: number,
    public readonly resource: ErrorResource,
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
