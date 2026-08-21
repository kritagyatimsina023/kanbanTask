import { Suspense } from "react";
import TaskTableDataPage from "./TaskTableDataPage";
import TaskTableSkeleton from "./TaskTableSkeleton";

type TaskMainPage = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default function TaskMainPage({ searchParams }: TaskMainPage) {
  return (
    <div>
      <div className="mb-8!">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <p className="mt-2! text-sm text-gray-600">
          Manage tasks, monitor assignments, and track task progress.
        </p>
      </div>
      <Suspense fallback={<TaskTableSkeleton />}>
        <TaskTableDataPage searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
