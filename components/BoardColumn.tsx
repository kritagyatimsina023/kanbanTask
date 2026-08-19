"use client";

import TaskCard from "./TaskCard";
import { Column } from "@/app/types/column.types";
import { Task } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";
import { memo, useState } from "react";

interface Props {
  column: Column;
  tasks: Task[];
  members: Member[];
  userId: string;
  isAdmin: boolean;
  pendingTaskId: string | null;
  onDropTask: (taskId: string, status: Column["id"]) => void;
}
const BoardColumn = memo(function BoardColumn({
  column,
  tasks,
  members,
  userId,
  isAdmin,
  pendingTaskId,
  onDropTask,
}: Props) {
  const [isDragOver, setIsDragOver] = useState(false);

  const canEditTask = (task: Task) => isAdmin || task.assigneeId === userId;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData("taskId");
    const taskStatus = e.dataTransfer.getData("taskStatus");

    console.log("Dropped task:", taskId);
    console.log("Current status:", taskStatus);
    console.log("Target status:", column.id);

    if (!taskId || !taskStatus) return;

    if (taskStatus === column.id) return;

    onDropTask(taskId, column.id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`my-4! flex min-h-[400px] flex-col overflow-hidden rounded-xl border bg-[#fafafa] shadow-md transition ${
        isDragOver ? "border-blue-400 bg-blue-50/50" : "border-gray-100"
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
