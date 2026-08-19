"use server";
import { revalidatePath } from "next/cache";
import { requireAuth, requireAdmin } from "@/lib/auth";
import { Status } from "@/generated/prisma/enums";
import { createTaskSchema } from "@/validation/Create.schema";
import { CreateTaskState } from "../types/auth";
import z, { success } from "zod";
import { invalidate } from "@/lib/cache";
import { taskService } from "@/feature/member/task.service";
import { nepalTimeToUTC } from "@/lib/helper";
import { handleError } from "@/lib/errors/handle-error";

export async function createTaskAction(
  prevState: CreateTaskState,
  formData: FormData,
): Promise<CreateTaskState> {
  try {
    await requireAdmin();
    const deadline = formData.get("deadline");
    const rawData = {
      title: formData.get("title"),
      description: formData.get("description"),
      assigneeId: formData.get("assigneeId") || null,
      deadline: deadline ? nepalTimeToUTC(String(deadline)) : null,
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
          deadline: errors.properties?.deadline?.errors,
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
  } catch (error) {
    const handledError = handleError(error);
    return {
      success: false,
      error: handledError.message,
      fieldErrors: {},
    };
  }
}
export async function updateTaskAction(
  prevState: CreateTaskState,
  formData: FormData,
): Promise<CreateTaskState> {
  try {
    await requireAdmin();

    const taskId = formData.get("taskId");

    if (!taskId || typeof taskId !== "string") {
      return {
        success: false,
        error: "Task ID is required",
      };
    }

    const deadline = formData.get("deadline");

    const rawData = {
      title: formData.get("title"),
      description: formData.get("description"),
      assigneeId: formData.get("assigneeId") || null,
      deadline: deadline ? nepalTimeToUTC(String(deadline)) : null,
    };
    const result = createTaskSchema.safeParse(rawData);

    if (!result.success) {
      const errors = z.treeifyError(result.error);

      return {
        success: false,
        error: "Please fix the validation errors",
        fieldErrors: {
          title: errors.properties?.title?.errors,
          description: errors.properties?.description?.errors,
          assigneeId: errors.properties?.assigneeId?.errors,
          deadline: errors.properties?.deadline?.errors,
        },
      };
    }
    await taskService.updateTask(taskId, result.data);
    invalidate.taskUpdated();
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    const handledError = handleError(error);
    return {
      success: false,
      error: handledError.message,
      fieldErrors: {},
    };
  }
}

export async function updateTaskStatusAction(taskId: string, status: Status) {
  try {
    const session = await requireAuth();
    await taskService.updateStatus(taskId, status, session);
    revalidatePath("/");
    revalidatePath("/admin/leaderboard");
    invalidate.taskStatusChanged();
    return {
      success: true as const,
      error: null,
    };
  } catch (error) {
    const handledError = handleError(error);
    return {
      success: false as const,
      error: handledError.message,
      resource: handledError.resource,
    };
  }
}
export async function reassignTaskAction(
  taskId: string,
  newAssigneeId: string | null,
) {
  try {
    await requireAdmin();
    const task = await taskService.reassignTask(taskId, newAssigneeId);
    revalidatePath("/");
    invalidate.taskReassigned();
    if (task.status === Status.DONE) {
      invalidate.leaderboard();
      revalidatePath("/admin/leaderboards");
    }
  } catch (error) {
    const handledError = handleError(error);
    return {
      success: false,
      error: handledError.message,
      code: handledError.code,
      resource: handledError.resource,
    };
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
