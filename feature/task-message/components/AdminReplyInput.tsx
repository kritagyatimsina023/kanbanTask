import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createTaskMessageAction } from "../taskMessage.action";
import { TaskMessageData } from "@/app/types/taskMessage.types";
const initialState = {
  success: false,
  error: null,
};

export const AdminReplyInput = ({
  taskId,
  onMessageSent,
}: {
  taskId: string;
  onMessageSent: (message: TaskMessageData) => void;
}) => {
  const [state, formAction, pending] = useActionState(
    createTaskMessageAction,
    initialState,
  );
  useEffect(() => {
    if (state.success && state.data) {
      onMessageSent(state.data);
      toast.success("Reply sent");
    }

    if (!state.success && state.error) {
      toast.error(state.error);
    }
  }, [state, onMessageSent]);
  return (
    <div className="border-t border-gray-100 bg-white p-3!">
      <form
        action={formAction}
        className="flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1.5! focus-within:border-indigo-300 focus-within:bg-white"
      >
        <input type="hidden" name="taskId" value={taskId} />
        <textarea
          name="message"
          placeholder="Reply to member..."
          rows={1}
          disabled={pending}
          className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2! py-2! text-sm outline-none placeholder:text-gray-400"
        />

        <button
          type="submit"
          disabled={pending}
          className="flex h-9 items-center justify-center rounded-lg bg-indigo-600 px-3! text-xs font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
};
