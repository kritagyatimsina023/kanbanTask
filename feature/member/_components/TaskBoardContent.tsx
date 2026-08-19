"use client";

import dynamic from "next/dynamic";
import BoardColumn from "@/components/BoardColumn";
import { Task } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";
import { columns } from "@/constants/Columns.constants";
import { CurrentUser } from "@/app/types/auth";
import { useTaskActions } from "@/hooks/useTaskAction";
import { Status } from "@/generated/prisma/enums";
import { useCallback, useMemo } from "react";
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
  const { handleStatusChange, pendingTaskId } = useTaskActions();

  const handleDropTask = useCallback(
    (taskId: string, status: Status) => {
      handleStatusChange(taskId, status);
    },
    [handleStatusChange],
  );
  const tasksByStatus = useMemo(() => {
    const grouped: Record<Status, Task[]> = {
      [Status.TODO]: [],
      [Status.IN_PROGRESS]: [],
      [Status.DONE]: [],
    };

    for (const task of initialTasks) {
      grouped[task.status].push(task);
    }

    return grouped;
  }, [initialTasks]);

  return (
    <>
      <div className="grid gap-6! md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={tasksByStatus[column.id]}
            members={members}
            pendingTaskId={pendingTaskId}
            userId={currentUser.id}
            isAdmin={isAdmin}
            onDropTask={handleDropTask}
          />
        ))}
      </div>
      <CreateTaskModal members={members} />
    </>
  );
}
