"use server";
import { requireAuth } from "@/lib/auth";
import { taskService } from "../task.service";
import { handleError } from "@/lib/errors/handle-error";
import { MyTask, TaskFilter } from "@/app/types/task.types";
import { normalizeError } from "@/lib/errors/normalizeError";
import { ErrorResource } from "@/lib/errors/app-error";

type SearchMyTaskResult =
  | {
      success: true;
      data: MyTask[];
    }
  | {
      success: false;
      error: string;
    };

export const searchMyTaskActions = async (
  search: string,
): Promise<SearchMyTaskResult> => {
  try {
    const session = await requireAuth();
    const tasks = await taskService.searchMyTask(session.id, search);
    return {
      success: true,
      data: tasks,
    };
  } catch (error) {
    const handledError = handleError(error);
    return {
      success: false,
      error: handledError.message,
    };
  }
};
export const filterMyTaskAction = async (filter: TaskFilter) => {
  try {
    const session = await requireAuth();
    const data = await taskService.filterMyTask(session.id, filter);
    return {
      success: true as const,
      data,
    };
  } catch (error) {
    const handledError = handleError(error);
    return {
      success: false as const,
      error: handledError.message,
    };
  }
};
export async function getTaskForClient(taskId: string) {
  try {
    const session = await requireAuth();
    const result = await taskService.getTaskForAI(session.id, taskId);
    return result;
  } catch (error) {
    throw normalizeError(error, ErrorResource.TASK);
  }
}
