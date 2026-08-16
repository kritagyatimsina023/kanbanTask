"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "../actions/auth";
import { useFormStatus } from "react-dom";
import { LoginState } from "../types/auth";
import { toast } from "sonner";

const initialState: LoginState = {
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary"
      disabled={pending}
      style={{ width: "100%", marginTop: "0.5rem" }}
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
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
  );
}
