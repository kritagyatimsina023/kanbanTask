"use client";

import { createTaskMessageAction } from "@/feature/task-message/taskMessage.action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  taskId: string;
  onSuccess?: () => void;
};

const initialState = {
  success: false,
  error: null,
};

export function TaskMessageForm({ taskId, onSuccess }: Props) {
  const [state, formAction, pending] = useActionState(
    createTaskMessageAction,
    initialState,
  );
  useEffect(() => {
    if (state.success) {
      toast.success("Message sent successfully");
      onSuccess?.();
    }
    if (!state.success && state.error) {
      toast.error(state.error);
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="space-y-4!">
      <input type="hidden" name="taskId" value={taskId} />
      <textarea
        name="message"
        placeholder="Write a message to the admin..."
        rows={5}
        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3! text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
      />
      <button
        type="submit"
        disabled={pending}
        className="flex items-center w-full justify-center gap-2 rounded-lg bg-indigo-600 px-4! py-2! text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
