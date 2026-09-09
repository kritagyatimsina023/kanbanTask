import React from "react";
import { activityService } from "../../activitylog/activity.service";
import ActivityLog from "../../activitylog/components/ActivityLog";

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
