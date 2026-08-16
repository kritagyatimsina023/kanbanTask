"use client";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { createTaskAction } from "../app/actions/tasks";
import { useOpenModel } from "@/store/useOpenModel";
import { CreateTaskState } from "@/app/types/auth";
import { Member } from "@/app/types/member.types";
import { toast } from "sonner";

const initialState: CreateTaskState = {
  error: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Creating..." : "Create Task"}
    </button>
  );
}
export default function CreateTaskModal({ members }: { members: Member[] }) {
  const { isOpen, setOpen } = useOpenModel();

  const [state, formAction] = useActionState(createTaskAction, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen();
      toast.success("Task created successfully");
    }
  }, [state.success, setOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4!">
      <div className="w-full max-w-lg rounded-xl bg-white p-8! shadow-xl">
        <h2 className="mb-6! text-xl font-semibold">Create New Task</h2>

        <form action={formAction} className="flex flex-col gap-4">
          {state.error && (
            <div className="rounded-md border p-3! text-sm  border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] text-[var(--danger)]">
              {state.error}
            </div>
          )}

          <div>
            <label className="label">Title</label>
            <input name="title" className="input" placeholder="Task title" />
          </div>

          <div>
            <label className="label">Description</label>

            <textarea name="description" className="input" rows={4} />
          </div>

          <div>
            <label className="label">Assignee</label>

            <select name="assigneeId" className="input">
              <option value="">Unassigned</option>

              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.email}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button type="button" className="btn" onClick={setOpen}>
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
