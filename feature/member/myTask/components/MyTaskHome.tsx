"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Eye,
  ListTodo,
  MessageSquare,
} from "lucide-react";
import { MyTaskData } from "@/app/types/task.types";
import { DateOnly, formatNepalDate } from "@/lib/helper";

type Task = MyTaskData["tasks"][number];

type Props = {
  taskData: MyTaskData;
};

const statusConfig = {
  TODO: {
    label: "Todo",
    className: "bg-gray-100 text-gray-700",
    icon: ListTodo,
  },

  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-amber-50 text-amber-700",
    icon: Clock3,
  },

  DONE: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
};

const MyTaskHome = ({ taskData }: Props) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [message, setMessage] = useState("");
  const { tasks } = taskData;
  const handleSendMessage = () => {
    if (!selectedTask || !message.trim()) return;

    console.log({
      taskId: selectedTask.id,
      message,
    });

    setMessage("");
    setSelectedTask(null);
  };

  return (
    <section className="space-y-6!">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>

        <p className="mt-1! text-sm text-gray-500">Tasks assigned to you</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5! py-4!">
          <h2 className="text-sm font-semibold text-gray-900">
            Assigned Tasks
          </h2>

          <p className="mt-1! text-xs text-gray-500">
            {tasks.length} task
            {tasks.length !== 1 ? "s" : ""} assigned to you
          </p>
        </div>

        {tasks.length === 0 ? (
          <EmptyTasks />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="px-5! py-3! text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Task
                  </th>

                  <th className="px-5! py-3! text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5! py-3! text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Deadline
                  </th>

                  <th className="px-5! py-3! text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => {
                  const statusItem = statusConfig[task.status];
                  const StatusIcon = statusItem.icon;

                  return (
                    <tr
                      key={task.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60"
                    >
                      <td className="px-5! py-4!">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-gray-900">
                            {task.title}
                          </h3>

                          <p className="mt-1! max-w-md truncate text-xs text-gray-500">
                            {task.description ?? "No description"}
                          </p>
                        </div>
                      </td>

                      <td className="px-5! py-4!">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5! py-1! text-[11px] font-medium ${statusItem.className}`}
                        >
                          <StatusIcon size={13} />
                          {statusItem.label}
                        </span>
                      </td>

                      <td className="px-5! py-4!">
                        <p className="text-xs font-medium text-gray-700">
                          {task.deadline
                            ? DateOnly(task.deadline)
                            : "No deadline"}
                        </p>

                        <p className="mt-0.5! text-[10px] text-gray-400">
                          Created {DateOnly(task.createdAt)}
                        </p>
                      </td>

                      <td className="px-5! py-4!">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedTask(task)}
                            className="flex h-9 items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50 px-3! text-xs font-medium text-indigo-600 transition hover:bg-indigo-100"
                          >
                            <MessageSquare size={14} />
                            Message
                          </button>

                          <button
                            type="button"
                            onClick={() => console.log("View", task.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                            title="View task"
                          >
                            <Eye size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedTask && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="border-b border-gray-100 px-5! py-4!">
              <h2 className="text-base font-semibold text-gray-900">
                Message Admin
              </h2>

              <p className="mt-1! text-xs text-gray-500">
                Regarding:{" "}
                <span className="font-medium text-gray-700">
                  {selectedTask.title}
                </span>
              </p>
            </div>

            {/* Message */}
            <div className="p-5!">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message to the admin..."
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3! text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

              <div className="mt-4! flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTask(null);
                    setMessage("");
                  }}
                  className="rounded-lg px-4! py-2! text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={!message.trim()}
                  onClick={handleSendMessage}
                  className="rounded-lg bg-indigo-600 px-4! py-2! text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

function EmptyTasks() {
  return (
    <div className="flex flex-col items-center justify-center px-6! py-14! text-center">
      <div className="mb-3! flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <ListTodo size={22} className="text-gray-400" />
      </div>

      <h3 className="text-sm font-semibold text-gray-800">No tasks assigned</h3>

      <p className="mt-1! text-xs text-gray-500">
        You currently don&apos;t have any tasks assigned to you.
      </p>
    </div>
  );
}

export default MyTaskHome;
