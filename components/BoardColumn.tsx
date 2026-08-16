"use client";

import TaskCard from "./TaskCard";
import { Column } from "@/app/types/column.types";
import { Task } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";

interface Props {
  column: Column;
  tasks: Task[];
  members: Member[];
  userId: string;
  isAdmin: boolean;
}

export default function BoardColumn({
  column,
  tasks,
  members,
  userId,
  isAdmin,
}: Props) {
  const canEditTask = (task: Task) => isAdmin || task.assigneeId === userId;

  return (
    <div className="flex min-h-[400px] shadow-md flex-col my-4! overflow-hidden rounded-xl border border-gray-100 bg-[#fafafa]">
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
            canEdit={canEditTask(task)}
          />
        ))}
      </div>
    </div>
  );
}
