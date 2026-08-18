// import { getUserLeaderboardData } from "@/lib/leaderboard";
import MemberPerformanceContent from "./MemberPerformanceContent";
import { leaderBoardService } from "@/feature/admin/leaderboard/leaderboard.service";

type Props = {
  userId: string;
};

export default async function MemberPerformanceContainer({ userId }: Props) {
  // const leaderboardData = await getUserLeaderboardData(userId);
  const leaderboardData =
    await leaderBoardService.getUserLeaderboardData(userId);

  return <MemberPerformanceContent leaderboardData={leaderboardData} />;
}
