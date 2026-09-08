"use server";
import { revalidatePath } from "next/cache";
import { requireAuth, requireAdmin } from "@/lib/auth";
import { Status } from "@/generated/prisma/enums";
import { createTaskSchema } from "@/validation/Create.schema";
import { CreateTaskState } from "../types/task.types";
import { invalidate } from "@/lib/cache";
import { taskService } from "@/feature/member/task.service";
import { nepalTimeToUTC } from "@/lib/helper";
import { handleError } from "@/lib/errors/handle-error";

export async function createTaskAction(
  _prevState: CreateTaskState,
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
      const errors = result.error.flatten().fieldErrors;
      const messages = Object.values(errors)
        .map((fieldError) => fieldError?.[0])
        .filter(Boolean);
      return {
        success: false as const,
        fieldErrors: messages,
      };
    }
    await taskService.createTask(result.data);
    revalidatePath("/admin/tasks");
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
    };
  }
}
export async function getTask() {
  const task = await taskService.getAllTasks();
  return task;
}

export async function updateTaskAction(
  _prevState: CreateTaskState,
  formData: FormData,
): Promise<CreateTaskState> {
  try {
    await requireAdmin();
    const taskId = formData.get("taskId");
    if (!taskId || typeof taskId !== "string") {
      return {
        success: false,
        error: null,
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
      const errors = result.error.flatten().fieldErrors;
      const messages = Object.values(errors)
        .map((fieldError) => fieldError?.[0])
        .filter(Boolean);
      return {
        success: false,
        error: null,
        fieldErrors: messages,
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
  try {
    await requireAdmin();
    const task = await taskService.deleteTask(taskId);
    if (task.status === Status.DONE) {
      invalidate.leaderboard();
      revalidatePath("/admin/leaderboards");
    }
    revalidatePath("/");
    invalidate.taskDeleted();
    return {
      success: true,
      message: "Task Deleted Successfully",
    };
  } catch (error) {
    console.error(error);
    const handledError = handleError(error);
    return {
      success: false as const,
      message: handledError.message,
      error: handledError.message,
      code: handledError.code,
      resource: handledError.resource,
    };
  }
}
