"use client";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import {
  createTaskAction,
  updateTaskAction,
} from "../app/actions/tasks.action";
import { useOpenModel } from "@/store/useOpenModel";
import { CreateTaskState } from "@/app/types/auth";
import { Member } from "@/app/types/member.types";
import { toast } from "sonner";
import { utcToNepalInput } from "@/lib/helper";

const initialState: CreateTaskState = {
  error: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { mode } = useOpenModel();
  const isEditMode = mode === "edit";

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending
        ? isEditMode
          ? "Updating..."
          : "Creating..."
        : isEditMode
          ? "Update Task"
          : "Create Task"}
    </button>
  );
}
export default function CreateTaskModal({ members }: { members: Member[] }) {
  const { isOpen, setOpen, mode, task, closeTaskModal } = useOpenModel();
  const isEditMode = mode === "edit";
  const action = isEditMode ? updateTaskAction : createTaskAction;
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen();
      toast.success(
        isEditMode ? "Task updated successfully" : "Task created successfully",
      );
      return;
    }
    if (state.fieldErrors) {
      Object.values(state.fieldErrors)
        .flat()
        .forEach((error) => toast.error(error));
    }
  }, [state, setOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4!">
      <div className="w-full max-w-lg rounded-xl bg-white p-8! shadow-xl">
        <h2 className="mb-6! text-xl font-semibold">
          {isEditMode ? "Edit Task" : "Create New Task"}
        </h2>
        <form action={formAction} className="flex flex-col gap-4">
          {isEditMode && task && (
            <input type="hidden" name="taskId" value={task.id} />
          )}
          <div>
            <label className="label">Title</label>
            <input
              name="title"
              className="input"
              defaultValue={task?.title ?? ""}
              placeholder="Task title"
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              defaultValue={task?.description ?? ""}
              name="description"
              className="input"
              rows={4}
            />
          </div>

          <div>
            <label className="label">Assignee</label>
            <select
              defaultValue={task?.assigneeId ?? ""}
              name="assigneeId"
              className="input"
            >
              <option value="">Unassigned</option>

              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Deadline</label>
            <input
              defaultValue={
                task?.deadline ? utcToNepalInput(task.deadline) : ""
              }
              type="datetime-local"
              name="deadline"
              className="input"
            />

            <p className="mt-1! text-xs text-gray-500">
              Deadline is based on Nepal Time (NPT).
            </p>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button type="button" className="btn" onClick={closeTaskModal}>
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
