"use server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import { authService } from "./auth.service";
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
    return {
      error: "Email and password are required",
    };
  }

  try {
    const user = await authService.login(email, password);
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
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Invalid credentials",
    };
  }
  redirect("/");
}
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("kanban_session");
  redirect("/login");
}
