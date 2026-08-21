import React from "react";
import MemberTaskOverview from "./MemberTaskOverview";
import { taskService } from "../task.service";
import { getSession, requireAuth } from "@/lib/auth";

const MemberDataPage = async () => {
  const session = await requireAuth();
  const taskData = await taskService.getMyTask(session.id);
  console.log("My task", taskData);
  return (
    <>
      <MemberTaskOverview stats={taskData.stats} />
    </>
  );
};

export default MemberDataPage;
