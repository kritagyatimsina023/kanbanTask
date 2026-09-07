"use server";
import { cookies } from "next/headers";
import { signToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import { authService } from "./auth.service";
import { handleError } from "@/lib/errors/handle-error";
import { LoginState } from "../types/auth";

export async function loginAction(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      error: "Email and password are required",
      success: false,
    };
  }
  let user;

  try {
    user = await authService.login(email, password);
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
    const handledError = handleError(error);
    return {
      error: handledError.message,
      success: false,
    };
  }
  if (user.role === "ADMIN") {
    redirect("/admin");
  }
  redirect("/member");
}
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("kanban_session");
  // revalidatePath("/", "layout");
  // redirect("/login");
}
