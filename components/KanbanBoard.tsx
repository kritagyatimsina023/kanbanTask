"use client";

import { Status } from "@prisma/client";
import { SessionPayload } from "@/lib/auth";

import BoardColumn from "./BoardColumn";
import CreateTaskModal from "./CreateTaskModal";
import { useOpenModel } from "@/store/useOpenModel";

import { Plus } from "lucide-react";
import { Task } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";
import { columns } from "../constants/Columns.constants";

type Props = {
  initialTasks: Task[];
  members: Member[];
  session: SessionPayload;
};

export default function KanbanBoard({ initialTasks, members, session }: Props) {
  const { isOpen, setOpen } = useOpenModel();
  const isAdmin = session.role === "ADMIN";

  return (
    <div className="">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Task Board</h2>
          <p className="text-gray-500">Manage your tasks efficiently.</p>
        </div>
        {isAdmin && (
          <button
            className="btn btn-primary mt-4 md:mt-0 flex items-center gap-2 px-4 py-2"
            onClick={setOpen}
          >
            <Plus size={16} />
            New Task
          </button>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={initialTasks.filter((task) => task.status === column.id)}
            members={members}
            session={session}
            isAdmin={isAdmin}
          />
        ))}
      </div>
      <CreateTaskModal members={members} />
    </div>
  );
}
