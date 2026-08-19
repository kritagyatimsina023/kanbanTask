"use client";
import { useCallback, useState, useTransition } from "react";
import { Status } from "@/generated/prisma/enums";
import {
  deleteTaskAction,
  reassignTaskAction,
  updateTaskStatusAction,
} from "../app/actions/tasks.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useTaskActions() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);
  const handleStatusChange = useCallback((taskId: string, status: Status) => {
    setPendingTaskId(taskId);
    startTransition(async () => {
      try {
        const result = await updateTaskStatusAction(taskId, status);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        toast.success("Task status updated");
        router.refresh();
      } finally {
        setPendingTaskId(null);
      }
    });
  }, []);

  const handleDelete = useCallback(async (taskId: string) => {
    await deleteTaskAction(taskId);
  }, []);

  const handleReassign = useCallback(
    (taskId: string, assigneeId: string | null) => {
      startTransition(async () => {
        const result = await reassignTaskAction(taskId, assigneeId);

        if (!result?.success) {
          toast.error(result?.error);
          return;
        }
        toast.success("Task reassigned successfully");
      });
    },
    [startTransition],
  );

  return {
    isPending,
    handleDelete,
    pendingTaskId,
    handleStatusChange,
    handleReassign,
  };
}
