import LeaderBoardTable from "./LeaderBoardTable";

import { leaderBoardService } from "../leaderboard.service";

const LeaderBoardDataPage = async () => {
  const leaderboard = await leaderBoardService.getLeaderBoard();
  return (
    <>
      <LeaderBoardTable users={leaderboard} />
    </>
  );
};

export default LeaderBoardDataPage;
