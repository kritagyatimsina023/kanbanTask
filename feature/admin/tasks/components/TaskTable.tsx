"use client";
import { taskService } from "@/feature/member/task.service";
import {
  CalendarDays,
  CircleUserRound,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  CalendarClock,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { DateOnly, formatNepalDate, TimeOnly } from "@/lib/helper";
import { useEffect } from "react";
import { getTask } from "@/app/actions/tasks.action";

type TaskTableProps = {
  data: Awaited<ReturnType<typeof taskService.getAllTasks>>;
};

const statusStyles = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-yellow-50 text-yellow-700 ",
  DONE: "bg-green-50 text-green-700",
};

const TaskTable = ({ data }: TaskTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tasks, totalTasks, totalPages, currentPage } = data;
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    router.push(`/admin/tasks?${params.toString()}`);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6! py-5!">
        <div className="flex items-center justify-between gap-4!">
          <div>
            <h2 className="text-base font-semibold text-gray-900">All Tasks</h2>

            <p className="mt-1! text-sm text-gray-500">
              View and monitor all tasks across the workspace.
            </p>
          </div>

          <div className="flex items-center gap-2! rounded-lg bg-gray-50 px-3! py-2!">
            <ClipboardList size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {totalTasks} {totalTasks === 1 ? "Task" : "Tasks"}
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] table-fixed">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="w-[26%] px-4! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Task
              </th>

              <th className="w-[20%] px-4! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Assignee
              </th>

              <th className="w-[14%] px-4! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="w-[12%] px-4! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Created
              </th>

              <th className="w-[12%] px-4! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Updated
              </th>

              <th className="w-[16%] px-4! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Deadline
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4! py-12! text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-3! flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <ClipboardList size={20} className="text-gray-400" />
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      No tasks found
                    </p>

                    <p className="mt-1! text-xs text-gray-400">
                      There are currently no tasks in the workspace.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-4! py-3!">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {task.title}
                      </p>

                      {task.description && (
                        <p className="mt-0.5! truncate text-xs text-gray-500">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Assignee */}
                  <td className="px-4! py-3!">
                    {task.assignee ? (
                      <div className="flex min-w-0 items-center gap-2!">
                        {/* <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                          <CircleUserRound size={14} />
                        </div> */}

                        <div className="min-w-0">
                          <p
                            className="truncate text-sm font-medium text-gray-800"
                            title={task.assignee.email}
                          >
                            {task.assignee.email}
                          </p>

                          <p className="mt-0.5! truncate text-[11px] text-gray-400">
                            {task.assignee.role}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Unassigned</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4! py-3!">
                    <span
                      className={`inline-flex items-center whitespace-nowrap rounded-full px-2! py-1! text-xs font-medium ${
                        statusStyles[task.status]
                      }`}
                    >
                      <span className="relative mr-1.5! flex h-1.5 w-1.5 shrink-0">
                        <span
                          className={`absolute inline-flex h-full w-full rounded-full bg-current ${
                            task.status === "IN_PROGRESS" ? "animate-ping" : ""
                          }`}
                        />

                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                      </span>

                      {task.status === "IN_PROGRESS"
                        ? "In Progress"
                        : task.status === "TODO"
                          ? "To Do"
                          : "Completed"}
                    </span>
                  </td>

                  {/* Created */}
                  <td className="px-4! py-3!">
                    <div className="flex items-center gap-1.5! text-xs text-gray-600">
                      <span className="whitespace-nowrap">
                        {/* {formatNepalDate(task.createdAt)} */}
                        {DateOnly(task.createdAt)}
                        {/* {new Date(task.createdAt).toLocaleDateString("en-NP", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })} */}
                      </span>
                    </div>
                  </td>

                  <td className="px-4! py-3!">
                    <span className="whitespace-nowrap text-xs text-gray-600">
                      {/* {new Date(task.updatedAt).toLocaleDateString("en-NP", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })} */}
                      {DateOnly(task.createdAt)}
                    </span>
                  </td>

                  <td className="px-4! py-3!">
                    {task.deadline ? (
                      (() => {
                        const deadline = new Date(task.deadline);
                        const now = new Date();
                        const isOverdue = deadline < now;
                        return (
                          <div className="flex min-w-0 items-center gap-2!">
                            <CalendarClock
                              size={14}
                              className={`shrink-0 ${
                                isOverdue ? "text-red-500" : "text-gray-400"
                              }`}
                            />
                            <div className="min-w-0">
                              <p
                                className={`whitespace-nowrap text-xs font-medium ${
                                  isOverdue ? "text-red-600" : "text-gray-600"
                                }`}
                              >
                                {DateOnly(deadline)}
                                {/* {deadline.toLocaleDateString("en-NP", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })} */}
                              </p>
                              <p
                                className={`whitespace-nowrap text-[11px] ${
                                  isOverdue ? "text-red-500" : "text-gray-400"
                                }`}
                              >
                                {TimeOnly(deadline)}
                                {/* {deadline.toLocaleTimeString("en-NP", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })} */}
                              </p>
                            </div>
                            {isOverdue && (
                              <span className="shrink-0 rounded-full bg-red-50 px-1.5! py-0.5! text-[9px] font-medium text-red-600">
                                Overdue
                              </span>
                            )}
                          </div>
                        );
                      })()
                    ) : (
                      <div className="flex items-center gap-1.5!">
                        <CalendarClock size={14} className="text-gray-300" />
                        <span className="whitespace-nowrap text-xs text-gray-400">
                          No deadline
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 px-6! py-3!">
          <p className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2!">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center gap-1! rounded-lg border border-gray-200 bg-white px-3! py-2! text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={15} />
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center gap-1! rounded-lg border border-gray-200 bg-white px-3! py-2! text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
