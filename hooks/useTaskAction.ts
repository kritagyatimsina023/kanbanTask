"use client";

import { useTransition } from "react";
import { Status } from "@prisma/client";
import {
  createTaskAction,
  deleteTaskAction,
  reassignTaskAction,
  updateTaskStatusAction,
} from "../app/actions/tasks";
import { useRouter } from "next/navigation";

type Options = {
  onTaskCreated?: () => void;
};

export function useTaskActions(options?: Options) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusChange = (taskId: string, status: Status) => {
    startTransition(async () => {
      await updateTaskStatusAction(taskId, status);

      router.refresh();
    });
  };

  const handleDelete = async (taskId: string) => {
    await deleteTaskAction(taskId);
    router.refresh();
  };

  const handleReassign = (taskId: string, assigneeId: string | null) => {
    startTransition(async () => {
      await reassignTaskAction(taskId, assigneeId);

      router.refresh();
    });
  };

  return {
    isPending,
    handleDelete,
    handleStatusChange,
    handleReassign,
  };
}
