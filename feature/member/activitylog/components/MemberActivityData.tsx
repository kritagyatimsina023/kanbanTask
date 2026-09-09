import { activityService } from "@/feature/activitylog/activity.service";
import ActivityLog from "@/feature/activitylog/components/ActivityLog";
import { requireAuth } from "@/lib/auth";
import React from "react";

const MemberActivityData = async () => {
  const session = await requireAuth();

  const activities = await activityService.getMemberActivities(session.id);
  return (
    <>
      <ActivityLog activities={activities || []} />
    </>
  );
};

export default MemberActivityData;
