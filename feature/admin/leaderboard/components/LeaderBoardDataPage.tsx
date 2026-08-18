// import { calculateLeaderboard, getLeaderboard } from "@/lib/leaderboard";
import prisma from "@/lib/prisma";
import LeaderBoardTable from "./LeaderBoardTable";
import { delay } from "@/lib/delay";
import { requireAuth } from "@/lib/auth";
import { leaderBoardService } from "../leaderboard.service";

const LeaderBoardDataPage = async () => {
  // const leaderboard = await getLeaderboard();
  // const session = await requireAuth();
  const leaderboard = await leaderBoardService.getLeaderBoard();
  // const users = await prisma.user.findMany({
  //   where: {
  //     role: "MEMBER",
  //     status: "ACTIVE",
  //   },
  //   select: {
  //     id: true,
  //     email: true,
  //     _count: {
  //       select: {
  //         tasks: {
  //           where: {
  //             status: "DONE",
  //           },
  //         },
  //       },
  //     },
  //   },
  //   orderBy: {
  //     tasks: {
  //       _count: "desc",
  //     },
  //   },
  // });

  // const leaderboard = calculateLeaderboard(users);
  // console.log(leaderboard);
  return (
    <>
      <LeaderBoardTable users={leaderboard} />
    </>
  );
};

export default LeaderBoardDataPage;
