import { calculateLeaderboard } from "@/lib/leaderboard";
import prisma from "@/lib/prisma";
import LeaderBoardTable from "./LeaderBoardTable";

const LeaderBoardDataPage = async () => {
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
  const leaderboard = calculateLeaderboard(users);
  return (
    <>
      <LeaderBoardTable users={leaderboard} />
    </>
  );
};

export default LeaderBoardDataPage;
