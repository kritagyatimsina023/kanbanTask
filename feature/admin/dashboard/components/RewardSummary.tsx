"use client";

import { Award, Medal, Trophy } from "lucide-react";

type TopPerformer = {
  id: string;
  email: string;
  completedTasks: number;
  rewards: number;
  rank: number;
};

interface RewardSummaryProps {
  totalRewards: number;
  rewardsThisMonth: number;
  topPerformers: TopPerformer[];
}

const RewardSummary = ({
  totalRewards,
  rewardsThisMonth,
  topPerformers,
}: RewardSummaryProps) => {
  return (
    <div className="mt-8! grid gap-6 lg:grid-cols-3">
      <div className="rounded-xl border border-gray-200 bg-white p-6! shadow-sm lg:col-span-1">
        <div className="mb-5! flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
            <Award size={20} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Rewards Summary
            </h2>

            <p className="text-sm text-gray-500">
              Recognition given to members.
            </p>
          </div>
        </div>

        <div className="space-y-4!">
          {/* Total Rewards */}
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4!">
            <div>
              <p className="text-xs font-medium text-gray-500">Total Rewards</p>

              <p className="mt-1! text-2xl font-bold text-gray-900">
                {totalRewards}
              </p>
            </div>

            <Award className="text-yellow-500" size={22} />
          </div>

          {/* This Month */}
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4!">
            <div>
              <p className="text-xs font-medium text-gray-500">This Month</p>

              <p className="mt-1! text-2xl font-bold text-indigo-600">
                {rewardsThisMonth}
              </p>
            </div>

            <Trophy className="text-indigo-500" size={22} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6! shadow-sm lg:col-span-2">
        <div className="mb-5! flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
            <Trophy size={20} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Top Performers
            </h2>

            <p className="text-sm text-gray-500">
              Members with the most completed tasks.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-3! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Rank
                </th>

                <th className="px-3! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  User
                </th>

                <th className="px-3! py-3! text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Completed
                </th>

                <th className="px-3! py-3! text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Rewards
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {topPerformers.map((user) => (
                <tr key={user.id} className="transition hover:bg-gray-50">
                  <td className="px-3! py-3!">
                    {user.rank === 1 ? (
                      <Trophy size={18} className="text-yellow-500" />
                    ) : user.rank === 2 ? (
                      <Medal size={18} className="text-gray-400" />
                    ) : (
                      <Medal size={18} className="text-orange-500" />
                    )}
                  </td>

                  <td className="px-3! py-3!">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                        {user.email.charAt(0).toUpperCase()}
                      </div>

                      <span className="text-sm font-medium text-gray-900">
                        {user.email}
                      </span>
                    </div>
                  </td>

                  <td className="px-3! py-3! text-center">
                    <span className="font-semibold text-green-600">
                      {user.completedTasks}
                    </span>
                  </td>

                  <td className="px-3! py-3! text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                      <Award size={14} />
                      {user.rewards}
                    </span>
                  </td>
                </tr>
              ))}

              {topPerformers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3! py-8! text-center text-sm text-gray-500"
                  >
                    No active members yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RewardSummary;
