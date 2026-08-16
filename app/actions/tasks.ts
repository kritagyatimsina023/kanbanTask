"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAuth, requireAdmin } from "@/lib/auth";
import { Status } from "@/app/types/task.types";

type CreateTaskState = {
  error: string | null;
  success: boolean;
};

export async function createTaskAction(
  prevState: CreateTaskState,
  formData: FormData,
): Promise<CreateTaskState> {
  await requireAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const assigneeId = formData.get("assigneeId") as string | null;

  if (!title.trim()) {
    return {
      error: "Title is required",
      success: false,
    };
  }

  await prisma.task.create({
    data: {
      title,
      description,
      assigneeId: assigneeId || null,
      status: Status.TODO,
    },
  });

  revalidatePath("/");

  return {
    error: null,
    success: true,
  };
}

export async function updateTaskStatusAction(taskId: string, status: Status) {
  const session = await requireAuth();

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");

  console.log("BEFORE:", {
    taskId,
    oldStatus: task.status,
    newStatus: status,
    assigneeId: task.assigneeId,
  });

  if (session.role !== "ADMIN" && task.assigneeId !== session.id) {
    throw new Error("Forbidden: You can only update tasks assigned to you");
  }
  await prisma.task.update({
    where: { id: taskId },
    data: { status },
  });
  revalidatePath("/");
  revalidatePath("/admin/leaderboard");
}

export async function reassignTaskAction(
  taskId: string,
  newAssigneeId: string | null,
) {
  await requireAdmin();
  await prisma.task.update({
    where: { id: taskId },
    data: { assigneeId: newAssigneeId },
  });
  revalidatePath("/");
}

export async function deleteTaskAction(taskId: string) {
  await requireAdmin();

  await prisma.task.delete({
    where: { id: taskId },
  });

  revalidatePath("/");
}
