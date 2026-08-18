import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (user.status === "BANNED") {
      const bannedAt = user.bannedAt
        ? new Intl.DateTimeFormat("en-NP", {
            timeZone: "Asia/Kathmandu",
            dateStyle: "medium",
            timeStyle: "short",
          }).format(user.bannedAt)
        : "Unknown time";
      throw new Error(
        `You have been banned from this platform. Reason: ${
          user.banReason || "No reason provided"
        }. Banned on: ${bannedAt}`,
      );
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new Error("Invalid Credientials");
    }
    return user;
  }
}
export const authService = new AuthService();
