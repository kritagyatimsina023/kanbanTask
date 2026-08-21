import TaskBoardContainer from "@/feature/member/_components/TaskBoardContainer";
import TaskBoardSkeleton from "@/feature/member/_components/TaskBoardSkeleton";
import TaskViewToggle from "@/feature/member/_components/TaskViewToggle";
import { getSession, requireAuth } from "@/lib/auth";
import { GripVertical, MousePointer2 } from "lucide-react";
import React, { Suspense } from "react";
type Props = {
  searchParams: Promise<{ view?: string }>;
};

const TaskBoardMember = async (props: Props) => {
  const searchParams = await props.searchParams;
  const view = searchParams.view === "mine" ? "mine" : "all";
  const session = await requireAuth();
  if (!session) return null;
  return (
    <>
      <div>
        <h2 className="mb-1! text-2xl font-bold text-gray-900">Task Board</h2>
        <p className="text-gray-500">Manage your tasks efficiently.</p>
        <div className="mt-3! flex w-fit items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50/60 px-3! py-2! text-xs text-indigo-700">
          <GripVertical size={15} className="shrink-0" />
          <span>
            Drag and drop a task between columns to change its status.
          </span>
          <MousePointer2 size={14} className="shrink-0 text-indigo-500" />
        </div>
      </div>
      <div className="flex justify-end items-center  gap-4">
        <TaskViewToggle />
      </div>
      <Suspense fallback={<TaskBoardSkeleton />}>
        <TaskBoardContainer
          currentUser={{
            id: session.id,
            role: session.role,
          }}
          view={view}
        />
      </Suspense>
    </>
  );
};

export default TaskBoardMember;
