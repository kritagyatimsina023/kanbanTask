import { Suspense } from "react";
import TaskTableDataPage from "./TaskTableDataPage";
import TaskTableSkeleton from "./TaskTableSkeleton";
import MyTaskControls from "@/components/task/MyTaskControls";

type TaskMainPage = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    filter?: string;
  }>;
};
export default async function TaskMainPage({ searchParams }: TaskMainPage) {
  const params = await searchParams;
  return (
    <div>
      <div className="mb-8! flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="mt-2! text-sm text-gray-600">
            Manage tasks, monitor assignments, and track task progress.
          </p>
        </div>
        <MyTaskControls
          initialSearch={params.search || ""}
          initialFilter={params.filter || ""}
        />
      </div>
      <Suspense fallback={<TaskTableSkeleton />}>
        <TaskTableDataPage searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
