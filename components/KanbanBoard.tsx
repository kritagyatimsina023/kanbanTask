"use client";

import BoardColumn from "./BoardColumn";
import CreateTaskModal from "./CreateTaskModal";
import { useOpenModel } from "@/store/useOpenModel";
import { Award, Plus, Trophy } from "lucide-react";
import { Task } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";
import { columns } from "../constants/Columns.constants";
import { CurrentUser } from "@/app/types/auth";

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
  initialTasks: Task[];
  members: Member[];
  currentUser: CurrentUser;
  leaderboardData: LeaderboardData;
};

export default function KanbanBoard({
  initialTasks,
  members,
  currentUser,
  leaderboardData,
}: Props) {
  const { setOpen } = useOpenModel();

  const isAdmin = currentUser.role === "ADMIN";

  return (
    <div>
      <div className="mb-6! flex flex-col justify-between md:flex-row md:items-end">
        <div>
          <h2 className="mb-1! text-2xl font-bold text-gray-900">Task Board</h2>

          <p className="text-gray-500">Manage your tasks efficiently.</p>
        </div>

        {isAdmin && (
          <button
            className="btn btn-primary mt-4! flex items-center gap-2 px-4! py-2! md:mt-0!"
            onClick={setOpen}
          >
            <Plus size={16} />
            New Task
          </button>
        )}
      </div>
      {!isAdmin && leaderboardData && (
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
      )}

      {!isAdmin && leaderboardData && leaderboardData.rewards.length > 0 && (
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

      <div className="grid gap-6! md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={initialTasks.filter((task) => task.status === column.id)}
            members={members}
            userId={currentUser.id}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      <CreateTaskModal members={members} />
    </div>
  );
}
