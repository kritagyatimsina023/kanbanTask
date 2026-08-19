import { Errors } from "@/lib/errors/errors";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // if (!user) {
    //   throw new Error("Invalid credentials");
    // }
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
      // throw new Error(
      //   `You have been banned from this platform. Reason: ${
      //     user.banReason || "No reason provided"
      //   }. Banned on: ${bannedAt}`,
      // );
      throw Errors.forbidden(
        `You have been banned from this platform. Reason: ${
          user.banReason || "No reason provided"
        }. Banned on: ${bannedAt}`,
        "AUTH",
      );
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);

    // if (!isValid) {
    //   throw new Error("Invalid Credientials");
    // }
    if (!isValid) {
      throw Errors.unauthorized("Invalid Credientials", "AUTH");
    }
    return user;
  }
}
export const authService = new AuthService();
