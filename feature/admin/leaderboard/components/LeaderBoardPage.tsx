import { Trophy } from "lucide-react";

import { Suspense } from "react";
import LeaderBoardDataPage from "./LeaderBoardDataPage";
import LeaderBoardTableSkeleton from "./LeaderBoardSkeleton";

const LeaderBoardPage = async () => {
  return (
    <div className="space-y-6!">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10! w-10! items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
            <Trophy size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Leaderboard</h1>
            <p className="text-sm text-gray-500">
              Top performers ranked by completed tasks
            </p>
          </div>
        </div>
      </div>
      <Suspense fallback={<LeaderBoardTableSkeleton />}>
        <LeaderBoardDataPage />
      </Suspense>
    </div>
  );
};

export default LeaderBoardPage;
