"use server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { redirect } from "next/navigation";
type LoginState = {
  error: string | null;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Invalid credentials" };
  }
  if (user.status === "BANNED") {
    const bannedAt = user.bannedAt
      ? new Intl.DateTimeFormat("en-NP", {
          timeZone: "Asia/Kathmandu",
          dateStyle: "medium",
          timeStyle: "short",
        }).format(user.bannedAt)
      : "Unknown time";
    return {
      error: `You have been banned from this platform. Reason: ${
        user.banReason || "No reason provided"
      }. Banned on: ${bannedAt}`,
    };
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  const token = await signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieStore = await cookies();

  cookieStore.set("kanban_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });
  redirect("/");
}
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("kanban_session");
  redirect("/login");
}
