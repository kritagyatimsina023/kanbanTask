import { requireAuth } from "@/lib/auth";
import { Suspense } from "react";
import NewTaskButton from "@/feature/member/_components/NewTaskButton";
import TaskBoardContainer from "@/feature/member/_components/TaskBoardContainer";
import TaskBoardSkeleton from "@/feature/member/_components/TaskBoardSkeleton";
import MemberPerformanceContainer from "@/feature/member/_components/MemberPerformanceContainer";
import MemberPerformanceSkeleton from "@/feature/member/_components/MemberPerformanceSkeleton";
import TaskViewToggle from "@/feature/member/_components/TaskViewToggle";

type Props = {
  searchParams: Promise<{ view?: string }>;
};

export default async function DashboardPage(props: Props) {
  const searchParams = await props.searchParams;
  const view = searchParams.view === "all" ? "all" : "mine";

  const session = await requireAuth();
  if (!session) return null;
  return (
    <div>
      <div className="mb-6! flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="mb-1! text-2xl font-bold text-gray-900">Task Board</h2>
          <p className="text-gray-500">Manage your tasks efficiently.</p>
        </div>
        <div className="flex items-center gap-4">
          <TaskViewToggle />
          {session.role === "ADMIN" && <NewTaskButton />}
        </div>
      </div>
      {session.role === "MEMBER" && (
        <Suspense fallback={<MemberPerformanceSkeleton />}>
          <MemberPerformanceContainer userId={session.id} />
        </Suspense>
      )}
      <Suspense fallback={<TaskBoardSkeleton />}>
        <TaskBoardContainer
          currentUser={{
            id: session.id,
            role: session.role,
          }}
          view={view}
        />
      </Suspense>
    </div>
  );
}
