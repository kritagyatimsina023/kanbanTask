"use client";

import dynamic from "next/dynamic";
import BoardColumn from "@/components/BoardColumn";
import TaskCard from "@/components/TaskCard";
import { TaskWithAssignee } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";
import { columns } from "@/constants/Columns.constants";
import { CurrentUser } from "@/app/types/auth";
import { useTaskActions } from "@/hooks/useTaskAction";
import { Status } from "@/generated/prisma/enums";
import { useCallback, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  closestCorners,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
const CreateTaskModal = dynamic(() => import("@/components/CreateTaskModal"), {
  ssr: false,
});

type Props = {
  initialTasks: TaskWithAssignee[];
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
  const [activeTask, setActiveTask] = useState<TaskWithAssignee | null>(null);
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const task = initialTasks.find((t) => t.id === active.id);
      if (task) {
        setActiveTask(task);
      }
    },
    [initialTasks],
  );
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTask(null);
      const { active, over } = event;

      if (!over) return;

      const taskId = active.id as string;
      const destinationStatus = over.id as Status;

      const task = initialTasks.find((t) => t.id === taskId);
      if (!task) return;

      if (task.status === destinationStatus) return;

      const canEdit = isAdmin || task.assigneeId === currentUser.id;
      if (!canEdit) return;

      handleStatusChange(taskId, destinationStatus);
    },
    [initialTasks, isAdmin, currentUser.id, handleStatusChange],
  );

  const handleDragCancel = useCallback(() => {
    setActiveTask(null);
  }, []);
  const tasksByStatus = useMemo(() => {
    const grouped: Record<Status, TaskWithAssignee[]> = {
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
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
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
            />
          ))}
        </div>
        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: "0.4",
                },
              },
            }),
          }}
        >
          {activeTask ? (
            <TaskCard
              task={activeTask}
              column={columns.find((c) => c.id === activeTask.status)!}
              members={members}
              isAdmin={isAdmin}
              canEdit={isAdmin || activeTask.assigneeId === currentUser.id}
              isPending={pendingTaskId === activeTask.id}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <CreateTaskModal members={members} />
    </>
  );
}
