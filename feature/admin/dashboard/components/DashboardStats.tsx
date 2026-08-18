import RewardSummary from "./RewardSummary";
// import { getDashboardStats } from "../dashboard.action";
import {
  CheckCircle2,
  CircleUserRound,
  ClipboardList,
  LoaderCircle,
} from "lucide-react";
import { dashboardService } from "../dashboard.service";

const DashboardStats = async () => {
  // const {
  //   totalUsers,
  //   activeTasks,
  //   inProgressTasks,
  //   completedTasks,
  //   totalTasks,
  //   totalRewards,
  //   rewardsThisMonth,
  //   topPerformers,
  // } = await getDashboardStats();
  const {
    totalUsers,
    activeTasks,
    inProgressTasks,
    completedTasks,
    totalTasks,
    totalRewards,
    rewardsThisMonth,
    topPerformers,
  } = await dashboardService.getDashboardStats();

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>

              <p className="mt-2! text-3xl font-bold text-gray-900">
                {totalUsers}
              </p>

              <p className="mt-1! text-xs text-gray-400">Registered users</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <CircleUserRound size={20} />
            </div>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Tasks</p>

              <p className="mt-2! text-3xl font-bold text-gray-900">
                {activeTasks}
              </p>

              <p className="mt-1! text-xs text-gray-400">Tasks not completed</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ClipboardList size={20} />
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">In Progress</p>

              <p className="mt-2! text-3xl font-bold text-gray-900">
                {inProgressTasks}
              </p>

              <p className="mt-1! text-xs text-gray-400">
                Currently being worked on
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <LoaderCircle size={20} />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Completed Tasks
              </p>

              <p className="mt-2! text-3xl font-bold text-gray-900">
                {completedTasks}
              </p>

              <p className="mt-1! text-xs text-gray-400">
                Successfully completed
              </p>
            </div>

            <div className="flex h-10! w-10! items-center justify-center rounded-lg bg-green-50 text-green-600">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Overview section */}
      <div className="mt-8! grid gap-6 lg:grid-cols-2">
        {/* Task Overview */}
        <div className="rounded-xl border border-gray-200 bg-white p-6! shadow-sm">
          <div className="mb-5!">
            <h2 className="text-base font-semibold text-gray-900">
              Task Overview
            </h2>

            <p className="mt-1! text-sm text-gray-500">
              Current task distribution across the board.
            </p>
          </div>

          <div className="space-y-4!">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Tasks</span>
              <span className="font-semibold text-gray-900">{activeTasks}</span>
            </div>

            <div className="h-2! overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width:
                    totalTasks > 0
                      ? `${(activeTasks / totalTasks) * 100}%`
                      : "0%",
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed Tasks</span>

              <span className="font-semibold text-gray-900">
                {completedTasks}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{
                  width:
                    totalTasks > 0
                      ? `${(completedTasks / totalTasks) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6! shadow-sm">
          <div className="mb-5!">
            <h2 className="text-base font-semibold text-gray-900">
              Workspace Summary
            </h2>
            <p className="mt-1! text-sm text-gray-500">
              A quick look at your workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4!">
            <div className="rounded-lg bg-gray-50 p-4!">
              <p className="text-xs font-medium text-gray-500">Total Tasks</p>

              <p className="mt-1! text-xl font-bold text-gray-900">
                {totalTasks}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4!">
              <p className="text-xs font-medium text-gray-500">Users</p>

              <p className="mt-1! text-xl font-bold text-gray-900">
                {totalUsers}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4!">
              <p className="text-xs font-medium text-gray-500">In Progress</p>

              <p className="mt-1! text-xl font-bold text-gray-900">
                {inProgressTasks}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4!">
              <p className="text-xs font-medium text-gray-500">Completed</p>
              <p className="mt-1! text-xl font-bold text-gray-900">
                {completedTasks}
              </p>
            </div>
          </div>
        </div>
      </div>
      <RewardSummary
        totalRewards={totalRewards}
        rewardsThisMonth={rewardsThisMonth}
        topPerformers={topPerformers}
      />
    </>
  );
};

export default DashboardStats;
