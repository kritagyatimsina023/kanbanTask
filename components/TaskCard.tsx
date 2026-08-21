"use client";
import { Status } from "@/generated/prisma/enums";
import { ChevronLeft, ChevronRight, Pen, Trash2, User } from "lucide-react";
import { useTaskActions } from "../hooks/useTaskAction";
import { Task } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";
import { Column } from "@/app/types/column.types";
import { useOpenModel } from "@/store/useOpenModel";
import DeleteTask from "./DeleteTask";
import { memo } from "react";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
  column: Column;
  members: Member[];
  isAdmin: boolean;
  canEdit: boolean;
  isPending: boolean;
}

const TaskCard = memo(function TaskCard({
  task,
  column,
  members,
  isAdmin,
  canEdit,
  isPending,
}: TaskCardProps) {
  const { handleStatusChange, handleReassign } = useTaskActions();
  const router = useRouter();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("taskStatus", task.status);
    e.dataTransfer.effectAllowed = "move";
  };
  const { setDeleteOpen, setTask, isDeleteOpen, openEditModal } =
    useOpenModel();
  const handleTaskDelete = (task: Task) => {
    setDeleteOpen();
    setTask(task);
    router.refresh();
  };

  return (
    <>
      <div
        draggable={canEdit && !isPending}
        onDragStart={handleDragStart}
        className="relative rounded-xl border border-gray-100 bg-white p-5! shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-opacity"
        style={{
          opacity: isPending ? 0.7 : 1,
          cursor: canEdit ? "grab" : "default",
        }}
      >
        {isPending && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/70">
            <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm shadow">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
              Updating...
            </div>
          </div>
        )}
        {isDeleteOpen && <DeleteTask />}
        <div className="mb-2! flex items-start justify-between">
          <h4 className="text-[15px] font-semibold text-gray-800">
            {task.title}
          </h4>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => handleTaskDelete(task)}
                className="text-red-400 transition hover:text-red-500"
                title="Delete Task"
              >
                <Trash2 size={16} strokeWidth={2} />
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => openEditModal(task)}
                className="text-black transition "
                title="Edit task"
              >
                <Pen size={14} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
        {task.description && (
          <p className="mb-5! whitespace-pre-wrap text-[13px] leading-relaxed text-slate-500">
            {task.description}
          </p>
        )}
        <div className="mb-5! flex items-center gap-2 text-[13px] text-slate-500">
          <User size={14} />
          {isAdmin ? (
            <div className="relative flex items-center">
              <select
                value={task.assigneeId || ""}
                onChange={(e) => handleReassign(task.id, e.target.value)}
                disabled={isPending}
                className="appearance-none bg-transparent outline-none cursor-pointer pr-4! hover:text-slate-700"
              >
                <option value="">Unassigned</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.email}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-0 flex items-center">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <span>{task.assignee?.email ?? "Unassigned"}</span>
          )}
        </div>

        <div className="flex gap-2">
          {column.id !== Status.TODO && (
            <button
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 py-2! text-[13px] font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              disabled={isPending || !canEdit}
              onClick={() =>
                handleStatusChange(
                  task.id,
                  column.id === Status.DONE ? Status.IN_PROGRESS : Status.TODO,
                )
              }
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
              Move Back
            </button>
          )}
          {column.id !== Status.DONE && (
            <button
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 py-2! text-[13px] font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              disabled={isPending || !canEdit}
              onClick={() =>
                handleStatusChange(
                  task.id,
                  column.id === Status.TODO ? Status.IN_PROGRESS : Status.DONE,
                )
              }
            >
              Move Next
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </>
  );
});
export default TaskCard;
