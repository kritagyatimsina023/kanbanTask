import MemberTaskOverview from "./MemberTaskOverview";
import { taskService } from "../task.service";
import { requireAuth } from "@/lib/auth";

const MemberDataPage = async () => {
  const session = await requireAuth();
  const taskData = await taskService.getMyTask(session.id);

  return (
    <>
      <MemberTaskOverview stats={taskData.stats} />
    </>
  );
};

export default MemberDataPage;
