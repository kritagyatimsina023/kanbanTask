import { requireAuth } from "@/lib/auth";
import React from "react";
import { taskService } from "../../task.service";
import MyTaskList from "./MyTaskList";

const MyTaskData = async () => {
  const session = await requireAuth();
  const { remainingTasks } = await taskService.getMyTask(session.id);
  return (
    <>
      <MyTaskList tasks={remainingTasks} />
    </>
  );
};

export default MyTaskData;
