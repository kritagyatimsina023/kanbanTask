"use client";

import { Award, Medal, Trophy } from "lucide-react";
import { useState } from "react";
import RewardUserModal from "./RewardUserModal";

type LeaderboardUser = {
  id: string;
  email: string;
  completedTasks: number;
  points: number;
  rank: number;
};

interface LeaderBoardTableProps {
  users: LeaderboardUser[];
}

export default function LeaderBoardTable({ users }: LeaderBoardTableProps) {
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(
    null,
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6! py-4!">
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow-500" size={20} />

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Leaderboard
              </h2>

              <p className="mt-1! text-sm text-gray-500">
                Members ranked by total reward points
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Rank
                </th>

                <th className="px-4! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  User
                </th>

                <th className="px-4! py-3! text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Points
                </th>

                <th className="px-4! py-3! text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Completed Tasks
                </th>

                <th className="px-6! py-3! text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y! divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  {/* Rank */}
                  <td className="px-6! py-4!">
                    <div className="flex items-center">
                      {user.rank === 1 ? (
                        <div className="flex h-9! w-9! items-center justify-center rounded-lg bg-yellow-50">
                          <Trophy size={20} className="text-yellow-500" />
                        </div>
                      ) : user.rank === 2 ? (
                        <div className="flex h-9! w-9! items-center justify-center rounded-lg bg-gray-100">
                          <Medal size={20} className="text-gray-500" />
                        </div>
                      ) : user.rank === 3 ? (
                        <div className="flex h-9! w-9! items-center justify-center rounded-lg bg-orange-50">
                          <Medal size={20} className="text-orange-500" />
                        </div>
                      ) : (
                        <span className="flex h-9! w-9! items-center justify-center rounded-lg bg-gray-50 text-sm font-semibold text-gray-600">
                          #{user.rank}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* User */}
                  <td className="px-4! py-4!">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9! w-9! items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                        {user.email.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.email}
                        </p>

                        {user.rank <= 3 && (
                          <p className="mt-0.5! text-xs text-gray-400">
                            Top performer
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Points */}
                  <td className="px-4! py-4! text-center">
                    <div className="inline-flex items-center rounded-lg bg-indigo-50 px-3! py-1.5!">
                      <span className="text-sm font-bold text-indigo-600">
                        {user.points}
                      </span>

                      <span className="ml-1! text-xs font-medium text-indigo-500">
                        pts
                      </span>
                    </div>
                  </td>
                  <td className="px-4! py-4! text-center">
                    <span className="text-sm font-semibold text-green-600">
                      {user.completedTasks}
                    </span>

                    <span className="ml-1! text-xs text-gray-400">tasks</span>
                  </td>
                  {/* Action */}
                  <td className="px-6! py-4! text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedUser(user)}
                      className="inline-flex items-center gap-2 rounded-lg px-3! py-2! text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                    >
                      <Award size={15} />
                      Reward
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RewardUserModal
        user={
          selectedUser
            ? {
                id: selectedUser.id,
                email: selectedUser.email,
              }
            : null
        }
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
}
