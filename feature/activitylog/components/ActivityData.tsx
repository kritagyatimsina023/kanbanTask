import React from "react";
import { activityService } from "../activity.service";
import ActivityLog from "./ActivityLog";

const ActivityData = async () => {
  const activity = await activityService.getAllActivity();
  console.log("Activity", activity);
  return (
    <>
      <ActivityLog activities={activity ?? []} />
    </>
  );
};

export default ActivityData;
