"use client";

import { Status } from "@prisma/client";
import { ChevronLeft, ChevronRight, Trash2, User } from "lucide-react";
import { useTaskActions } from "../hooks/useTaskAction";
import { Task } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";
import { Column } from "@/app/types/column.types";
import { useOpenModel } from "@/store/useOpenModel";
import DeleteTask from "./DeleteTask";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
  column: Column;
  members: Member[];
  isAdmin: boolean;
  canEdit: boolean;
}

export default function TaskCard({
  task,
  column,
  members,
  isAdmin,
  canEdit,
}: TaskCardProps) {
  const { isPending, handleDelete, handleStatusChange, handleReassign } =
    useTaskActions();
  const router = useRouter();
  const { setDeleteOpen, setTask, isDeleteOpen } = useOpenModel();
  const handleTaskDelete = (task: Task) => {
    setDeleteOpen();
    setTask(task);
  };
  return (
    <div
      className="rounded-xl relative border border-gray-100 bg-white p-5! shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-opacity"
      style={{
        opacity: isPending ? 0.7 : 1,
      }}
    >
      {isDeleteOpen && <DeleteTask />}
      <div className="mb-2! flex items-start justify-between">
        <h4 className="text-[15px] font-semibold text-gray-800">
          {task.title}
        </h4>
        {isAdmin && (
          <button
            // onClick={() => handleDelete(task.id)}
            onClick={() => handleTaskDelete(task)}
            className="text-red-400 transition hover:text-red-500"
            title="Delete Task"
          >
            <Trash2 size={16} strokeWidth={2} />
          </button>
        )}
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
  );
}
