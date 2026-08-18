"use client";

import { Award, Trophy } from "lucide-react";

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

      {leaderboardData.rewards.length > 0 && (
        <div className="mb-6! rounded-xl border border-indigo-100 bg-indigo-50/50 p-5!">
          <div className="mb-4! flex items-center gap-2!">
            <Award size={20} className="text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Your Rewards</h3>
          </div>
          <div className="space-y-3!">
            {leaderboardData.rewards.map((reward) => (
              <div
                key={reward.id}
                className="rounded-lg border border-gray-200 bg-white p-4!"
              >
                <h4 className="font-semibold text-gray-900">{reward.title}</h4>
                {reward.message && (
                  <p className="mt-1! text-sm text-gray-600">
                    {reward.message}
                  </p>
                )}
                <p className="mt-2! text-xs text-gray-400">
                  {new Date(reward.createdAt).toLocaleString("en-NP", {
                    timeZone: "Asia/Kathmandu",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
