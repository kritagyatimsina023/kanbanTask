import { Trophy } from "lucide-react";
import prisma from "@/lib/prisma";
import LeaderBoardTable from "./LeaderBoardTable";
import { calculateLeaderboard } from "@/lib/leaderboard";

const LeaderBoardPage = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: "MEMBER",
      status: "ACTIVE",
    },
    select: {
      id: true,
      email: true,
      _count: {
        select: {
          tasks: {
            where: {
              status: "DONE",
            },
          },
        },
      },
    },
    orderBy: {
      tasks: {
        _count: "desc",
      },
    },
  });
  console.log(
    "LEADERBOARD:",
    users.map((user) => ({
      email: user.email,
      completed: user._count.tasks,
    })),
  );
  const leaderboard = calculateLeaderboard(users);

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
      <LeaderBoardTable users={leaderboard} />
    </div>
  );
};

export default LeaderBoardPage;
