import MyTaskHome from "@/feature/member/myTask/components/MyTaskHome";
import { taskService } from "@/feature/member/task.service";
import { requireAuth } from "@/lib/auth";
import React from "react";

const MyTaskMain = async () => {
  const session = await requireAuth();
  const data = await taskService.getMyTask(session.id);
  return (
    <>
      <MyTaskHome taskData={data} />
    </>
  );
};

export default MyTaskMain;
