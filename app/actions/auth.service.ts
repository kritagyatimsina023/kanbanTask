import { ErrorResource } from "@/lib/errors/app-error";
import { Errors } from "@/lib/errors/errors";
import { normalizeError } from "@/lib/errors/normalizeError";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export class AuthService {
  async login(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw Errors.unauthorized("Invalid credentials", "AUTH");
      }
      if (user.status === "BANNED") {
        const bannedAt = user.bannedAt
          ? new Intl.DateTimeFormat("en-NP", {
              timeZone: "Asia/Kathmandu",
              dateStyle: "medium",
              timeStyle: "short",
            }).format(user.bannedAt)
          : "Unknown time";

        throw Errors.forbidden(
          `You have been banned from this platform. Reason: ${
            user.banReason || "No reason provided"
          }. Banned on: ${bannedAt}`,
          "AUTH",
        );
      }
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        throw Errors.unauthorized("Invalid Credientials", "AUTH");
      }
      return user;
    } catch (error) {
      throw normalizeError(error, ErrorResource.AUTH);
    }
  }
}
export const authService = new AuthService();
