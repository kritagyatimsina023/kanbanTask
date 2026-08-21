"use client";

import { Trophy } from "lucide-react";

type Reward = {
  id: string;
  title: string;
  message: string | null;
  createdAt: Date;
};

type LeaderboardData = {
  rank: number;
  completedTasks: number;
  totalMembers: number;
  rewards: Reward[];
} | null;

type Props = {
  leaderboardData: LeaderboardData;
};

export default function MemberPerformanceContent({ leaderboardData }: Props) {
  if (!leaderboardData) return null;

  return (
    <>
      <div className="mb-6! grid gap-4! md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm">
          <div className="flex items-center gap-3!">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Rank</p>
              <p className="text-xl font-bold text-gray-900">
                #{leaderboardData.rank}
              </p>
            </div>
          </div>
          <p className="mt-3! text-xs text-gray-400">
            Out of {leaderboardData.totalMembers} members
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm">
          <p className="text-sm text-gray-500">Completed Tasks</p>
          <p className="mt-1! text-2xl font-bold text-green-600">
            {leaderboardData.completedTasks}
          </p>
          <p className="mt-1! text-xs text-gray-400">
            Keep completing tasks to improve your rank
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm">
          <p className="text-sm text-gray-500">Rewards Received</p>
          <p className="mt-1! text-2xl font-bold text-indigo-600">
            {leaderboardData.rewards.length}
          </p>
          <p className="mt-1! text-xs text-gray-400">
            {leaderboardData.rewards.length > 0
              ? "You have received rewards"
              : "No rewards yet"}
          </p>
        </div>
      </div>
    </>
  );
}
