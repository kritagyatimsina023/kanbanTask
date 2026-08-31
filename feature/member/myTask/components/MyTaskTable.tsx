import { MyTask } from "@/app/types/task.types";
import { DateOnly, formatNepalDate } from "@/lib/helper";
import {
  CheckCircle2,
  Clock3,
  Eye,
  ListTodo,
  MessageSquare,
} from "lucide-react";

import { memo } from "react";
type props = {
  displayedTasks: MyTask[];
  onSelectedTask: (task: MyTask) => void;
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

const MyTaskTable = ({ displayedTasks, onSelectedTask }: props) => {
  return (
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
          {displayedTasks.map((task) => {
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
                      ? formatNepalDate(task.deadline)
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
                      onClick={() => onSelectedTask(task)}
                      className="flex h-9 items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50 px-3! text-xs font-medium text-indigo-600 transition hover:bg-indigo-100"
                    >
                      <MessageSquare size={14} />
                      Message
                    </button>

                    <button
                      type="button"
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
  );
};

export default memo(MyTaskTable);
