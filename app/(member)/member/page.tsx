import { requireAuth } from "@/lib/auth";
// import { Suspense } from "react";
// import NewTaskButton from "@/feature/member/_components/NewTaskButton";
// import TaskBoardContainer from "@/feature/member/_components/TaskBoardContainer";
// import TaskBoardSkeleton from "@/feature/member/_components/TaskBoardSkeleton";
// import MemberPerformanceContainer from "@/feature/member/_components/MemberPerformanceContainer";
// import MemberPerformanceSkeleton from "@/feature/member/_components/MemberPerformanceSkeleton";
// import TaskViewToggle from "@/feature/member/_components/TaskViewToggle";
// import { GripVertical, MousePointer2 } from "lucide-react";
import MemberDataPage from "@/feature/member/_components/MemberDataPage";

export default async function DashboardPage() {
  const session = await requireAuth();
  if (!session) return null;
  return (
    // <div>
    //   <div className="mb-6! flex flex-col justify-between gap-4 md:flex-row md:items-end">
    //     <div>
    //       <h2 className="mb-1! text-2xl font-bold text-gray-900">Task Board</h2>
    //       <p className="text-gray-500">Manage your tasks efficiently.</p>
    //       <div className="mt-3! flex w-fit items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50/60 px-3! py-2! text-xs text-indigo-700">
    //         <GripVertical size={15} className="shrink-0" />
    //         <span>
    //           Drag and drop a task between columns to change its status.
    //         </span>
    //         <MousePointer2 size={14} className="shrink-0 text-indigo-500" />
    //       </div>
    //     </div>
    //     <div className="flex items-center gap-4">
    //       <TaskViewToggle />
    //       {session.role === "ADMIN" && <NewTaskButton />}
    //     </div>
    //   </div>
    //   {session.role === "MEMBER" && (
    //     <Suspense fallback={<MemberPerformanceSkeleton />}>
    //       <MemberPerformanceContainer userId={session.id} />
    //     </Suspense>
    //   )}
    //   <Suspense fallback={<TaskBoardSkeleton />}>
    //     <TaskBoardContainer
    //       currentUser={{
    //         id: session.id,
    //         role: session.role,
    //       }}
    //       view={view}
    //     />
    //   </Suspense>
    // </div>
    <section className="space-y-6!">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          My Task Overview
        </h2>
        <p className="mt-1! text-sm text-gray-500">
          Track your task progress and productivity.
        </p>
      </div>
      <MemberDataPage />
    </section>
  );
}
