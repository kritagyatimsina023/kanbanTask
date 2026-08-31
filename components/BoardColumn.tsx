"use client";

import TaskCard from "./TaskCard";
import { Column } from "@/app/types/column.types";
import { TaskWithAssignee } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";
import { memo } from "react";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  column: Column;
  tasks: TaskWithAssignee[];
  members: Member[];
  userId: string;
  isAdmin: boolean;
  pendingTaskId: string | null;
}
const BoardColumn = memo(function BoardColumn({
  column,
  tasks,
  members,
  userId,
  isAdmin,
  pendingTaskId,
}: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const canEditTask = (task: TaskWithAssignee) =>
    isAdmin || task.assigneeId === userId;

  return (
    <div
      ref={setNodeRef}
      className={`my-4! flex min-h-[400px] flex-col overflow-hidden rounded-xl border bg-[#fafafa] shadow-md transition ${
        isOver ? "border-blue-400 bg-blue-50/50" : "border-gray-100"
      }`}
    >
      <div
        className="flex items-center justify-between px-4! py-2!"
        style={{
          backgroundColor: column.color,
        }}
      >
        <h3 className="text-[15px] font-semibold text-slate-800">
          {column.title}
        </h3>
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-gray-700 shadow-sm">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4!">
        {tasks.length === 0 && (
          <div className="py-8! text-center text-sm text-slate-500">
            No tasks
          </div>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            column={column}
            members={members}
            isAdmin={isAdmin}
            isPending={pendingTaskId === task.id}
            canEdit={canEditTask(task)}
          />
        ))}
      </div>
    </div>
  );
});
export default BoardColumn;
