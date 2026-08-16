import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  return (
    <div className="login-container mx-auto! mt-16! max-w-[400px] rounded-xl border border-gray-200 bg-white p-8! shadow-lg">
      <div className="mb-8! text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Welcome Back
        </h1>

        <p className="mt-2! text-sm text-[var(--text-muted)]">
          Please sign in to access your tasks.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
