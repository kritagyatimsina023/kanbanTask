"use client";

import { useState } from "react";
import { ListTodo } from "lucide-react";
import { MyTaskData } from "@/app/types/task.types";

import { TaskMessageForm } from "./TaskMessageForm";
import MyTaskTable from "./MyTaskTable";

type Task = MyTaskData["tasks"][number];

type Props = {
  taskData: MyTaskData;
};

const MyTaskHome = ({ taskData }: Props) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  return (
    <>
      {taskData.tasks.length === 0 ? (
        <EmptyTasks />
      ) : (
        <MyTaskTable onSelectedTask={setSelectedTask} data={taskData} />
      )}

      {selectedTask && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="border-b border-gray-100 px-5! py-4!">
              <h2 className="text-base font-semibold text-gray-900">
                Message Admin
              </h2>

              <p className="mt-1! text-xs text-gray-500">
                Regarding:{" "}
                <span className="font-medium text-gray-700">
                  {selectedTask.title}
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-center p-5!">
              <TaskMessageForm
                taskId={selectedTask.id}
                onSuccess={() => setSelectedTask(null)}
              />
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="mt-2! rounded-lg px-4! py-2! text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function EmptyTasks() {
  return (
    <div className="flex flex-col items-center justify-center px-6! py-14! text-center">
      <div className="mb-3! flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <ListTodo size={22} className="text-gray-400" />
      </div>

      <h3 className="text-sm font-semibold text-gray-800">No tasks assigned</h3>

      <p className="mt-1! text-xs text-gray-500">
        You currently don&apos;t have any tasks assigned to you.
      </p>
    </div>
  );
}

export default MyTaskHome;
