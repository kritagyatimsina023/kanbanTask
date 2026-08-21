import { Construction, Trophy } from "lucide-react";
import React from "react";

const LeaderBoardPage = () => {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gray-50/50 px-4! py-10! sm:px-6! lg:px-8!">
      <div className="mx-auto! flex min-h-[70vh] max-w-5xl! items-center justify-center">
        <div className="w-full max-w-lg! rounded-2xl border border-gray-200 bg-white p-8! text-center shadow-sm sm:p-10!">
          {/* Icon */}
          <div className="mx-auto! mb-6! flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
            <Trophy size={30} strokeWidth={2} />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Leaderboard
          </h1>

          <div className="mx-auto! mt-3! inline-flex items-center gap-2 rounded-full bg-amber-50 px-3! py-1.5! text-xs font-semibold text-amber-700">
            <Construction size={14} />
            Currently Under Development
          </div>

          {/* Description */}
          <p className="mx-auto! mt-5! max-w-md! text-sm leading-6 text-gray-500">
            We&apos;re working on the leaderboard experience. Soon you&apos;ll
            be able to see rankings, points, rewards, and your position among
            other members.
          </p>

          {/* Progress indication */}
          <div className="mt-8! rounded-xl border border-gray-100 bg-gray-50 p-4!">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-gray-600">
                Development Status
              </span>

              <span className="font-semibold text-indigo-600">In Progress</span>
            </div>

            <div className="mt-3! h-2! overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6! text-[11px] font-medium uppercase tracking-wider text-gray-400">
            Kanban Workspace
          </p>
        </div>
      </div>
    </section>
  );
};

export default LeaderBoardPage;
