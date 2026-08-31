import { MyTask } from "@/app/types/task.types";

import { Status } from "@/generated/prisma/enums";
import Link from "next/link";

type Props = {
  tasks: MyTask[];
};

const MyTaskList = ({ tasks }: Props) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <h2 className="text-sm font-semibold text-gray-800">
          No tasks available
        </h2>
        <p className="mt-1! text-xs text-gray-500">
          You don&aspo; t have any assigned tasks.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3!">
      {tasks.map((task) => (
        <Link
          key={task.id}
          href={`/member/ai-workflow/${task.id}`}
          className="block rounded-xl border border-gray-200 bg-white p-5! transition hover:border-indigo-300 hover:bg-indigo-50/30 hover:shadow-sm"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-gray-900">
                {task.title}
              </h2>

              <p className="mt-1! truncate text-xs text-gray-500">
                {task.description ?? "No description"}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5! py-1! text-[11px] font-medium ${
                task.status === Status.DONE
                  ? "bg-emerald-50 text-emerald-700"
                  : task.status === Status.IN_PROGRESS
                    ? "bg-amber-50 text-amber-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status === Status.IN_PROGRESS
                ? "In Progress"
                : task.status === Status.DONE
                  ? "Completed"
                  : "Todo"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MyTaskList;
