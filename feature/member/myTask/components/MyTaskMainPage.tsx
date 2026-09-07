import { Suspense } from "react";
import MyTaskControls from "../../../../components/task/MyTaskControls";
import MyTaskTableDataPage from "./MyTaskTableDataPage";
import TaskTableSkeleton from "@/feature/admin/tasks/components/TaskTableSkeleton";

type MyTaskMainPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    filter?: string;
  }>;
};

export default async function MyTaskMainPage({
  searchParams,
}: MyTaskMainPageProps) {
  const params = await searchParams;
  return (
    <section className="space-y-6!">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="mt-1! text-sm text-gray-500">Tasks assigned to you</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex w-full items-center justify-between border-b border-gray-100 px-5! py-4!">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Assigned Tasks
            </h2>
          </div>
          <MyTaskControls
            initialSearch={params.search || ""}
            initialFilter={params.filter || ""}
          />
        </div>
        <Suspense fallback={<TaskTableSkeleton />}>
          <MyTaskTableDataPage searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
