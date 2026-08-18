"use client";

import dynamic from "next/dynamic";
import BoardColumn from "@/components/BoardColumn";
import { Task } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";
import { columns } from "@/constants/Columns.constants";
import { CurrentUser } from "@/app/types/auth";
const CreateTaskModal = dynamic(() => import("@/components/CreateTaskModal"), {
  ssr: false,
});

type Props = {
  initialTasks: Task[];
  members: Member[];
  currentUser: CurrentUser;
};
export default function TaskBoardContent({
  initialTasks,
  members,
  currentUser,
}: Props) {
  const isAdmin = currentUser.role === "ADMIN";

  return (
    <>
      <div className="grid gap-6! md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={initialTasks.filter((task) => task.status === column.id)}
            members={members}
            userId={currentUser.id}
            isAdmin={isAdmin}
          />
        ))}
      </div>
      <CreateTaskModal members={members} />
    </>
  );
}
