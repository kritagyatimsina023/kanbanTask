"use client";

import { useTransition } from "react";
import { Status } from "@/app/types/task.types";
import {
  deleteTaskAction,
  reassignTaskAction,
  updateTaskStatusAction,
} from "../app/actions/tasks";

export function useTaskActions() {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (taskId: string, status: Status) => {
    startTransition(async () => {
      await updateTaskStatusAction(taskId, status);
    });
  };

  const handleDelete = async (taskId: string) => {
    await deleteTaskAction(taskId);
  };

  const handleReassign = (taskId: string, assigneeId: string | null) => {
    startTransition(async () => {
      await reassignTaskAction(taskId, assigneeId);
    });
  };

  return {
    isPending,
    handleDelete,
    handleStatusChange,
    handleReassign,
  };
}
