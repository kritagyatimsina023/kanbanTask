"use server";
import { revalidatePath } from "next/cache";
import { requireAuth, requireAdmin } from "@/lib/auth";
import { Status } from "@/generated/prisma/enums";
import { createTaskSchema } from "@/validation/Create.schema";
import { CreateTaskState } from "../types/auth";
import z from "zod";
import { invalidate } from "@/lib/cache";
import { taskService } from "@/feature/member/task.service";

export async function createTaskAction(
  prevState: CreateTaskState,
  formData: FormData,
): Promise<CreateTaskState> {
  await requireAdmin();
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    assigneeId: formData.get("assigneeId") || null,
  };
  const result = createTaskSchema.safeParse(rawData);
  if (!result.success) {
    const errors = z.treeifyError(result.error);
    console.log(errors);
    return {
      success: false,
      error: "Please fix the validation errors",
      fieldErrors: {
        title: errors.properties?.title?.errors,
        description: errors.properties?.description?.errors,
        assigneeId: errors.properties?.assigneeId?.errors,
      },
    };
  }
  await taskService.createTask(result.data);
  invalidate.admin();
  invalidate.adminUser();
  return {
    error: null,
    success: true,
  };
}

export async function updateTaskStatusAction(taskId: string, status: Status) {
  const session = await requireAuth();
  await taskService.updateStatus(taskId, status, session);
  revalidatePath("/");
  revalidatePath("/admin/leaderboard");
  invalidate.taskStatusChanged();
}

export async function reassignTaskAction(
  taskId: string,
  newAssigneeId: string | null,
) {
  await requireAdmin();
  const task = await taskService.reassignTask(taskId, newAssigneeId);
  revalidatePath("/");
  invalidate.taskReassigned();
  if (task.status === Status.DONE) {
    invalidate.leaderboard();
    revalidatePath("/admin/leaderboards");
  }
}

export async function deleteTaskAction(taskId: string) {
  await requireAdmin();
  const task = await taskService.deleteTask(taskId);
  if (task.status === Status.DONE) {
    invalidate.leaderboard();
    revalidatePath("/admin/leaderboards");
  }
  revalidatePath("/");
  invalidate.taskDeleted();
}
