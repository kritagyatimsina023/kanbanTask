"use client";

import { useTransition } from "react";
import { Status } from "@prisma/client";
import {
  createTaskAction,
  deleteTaskAction,
  reassignTaskAction,
  updateTaskStatusAction,
} from "../app/actions/tasks";

type Options = {
  onTaskCreated?: () => void;
};

export function useTaskActions(options?: Options) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (taskId: string, status: Status) => {
    startTransition(() => {
      updateTaskStatusAction(taskId, status);
    });
  };
  const handleDelete = async (taskId: string) => {
    await deleteTaskAction(taskId);
  };

  const handleReassign = (taskId: string, assigneeId: string | null) => {
    startTransition(() => {
      reassignTaskAction(taskId, assigneeId);
    });
  };

  //   const handleCreateTask = (formData: FormData) => {
  //     startTransition(async () => {
  //       await createTaskAction(formData);
  //       options?.onTaskCreated?.();
  //     });
  //   };

  return {
    isPending,
    handleDelete,
    handleStatusChange,
    handleReassign,
    // handleCreateTask,
  };
}
