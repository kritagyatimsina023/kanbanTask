"use client";

import { useActionState, useEffect } from "react";

import { loginAction } from "../actions/auth.action";
import { useFormStatus } from "react-dom";
import { LoginState } from "../types/auth";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import LoadingQuote from "@/components/login/LoadingQuote";

const initialState: LoginState = {
  error: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending &&
        typeof document !== "undefined" &&
        createPortal(<LoadingQuote />, document.body)}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={pending}
        style={{ width: "100%", marginTop: "0.5rem" }}
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </>
  );
}
export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);
  return (
    <>
      <form
        action={formAction}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label htmlFor="email" className="label">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="input"
            placeholder="••••••••"
          />
        </div>
        <SubmitButton />
      </form>
    </>
  );
}
