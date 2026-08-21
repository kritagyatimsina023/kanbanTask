"use client";

import { useTaskActions } from "@/hooks/useTaskAction";
import { useOpenModel } from "@/store/useOpenModel";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface DeleteTaskProps {
  isOpen: boolean;
  isPending?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteTask() {
  //   if (!isOpen) return null;
  const { setDeleteOpen, task } = useOpenModel();
  const { handleDelete } = useTaskActions();

  const handleDeleteTask = async () => {
    if (!task) return;
    try {
      await handleDelete(task.id);
      setDeleteOpen();
    } catch (err) {
      toast.error("Error in deleting task");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] px-4!">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex flex-col items-center border-b border-gray-100 px-6! py-6!">
          <div className="mb-4! flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle
              className="text-red-500"
              size={28}
              strokeWidth={2.2}
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">Delete Task</h2>

          <p className="mt-2! text-center text-sm leading-6 text-gray-500">
            Are you sure you want to delete this task?
            <br />
            This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-3 px-6! py-5!">
          <button
            onClick={() => setDeleteOpen()}
            type="button"
            className="rounded-lg border border-gray-200 px-5! py-2! text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteTask}
            type="button"
            className="rounded-lg bg-red-500 px-5! py-2! text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            Delete task
          </button>
        </div>
      </div>
    </div>
  );
}
