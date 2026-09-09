import RealTimeUnderDevelopment from "@/components/RealTimeUnderDevelopment";
import { activityService } from "@/feature/activitylog/activity.service";
import ActivityLog from "@/feature/activitylog/components/ActivityLog";
import { requireAuth } from "@/lib/auth";

const ActivityMemberHome = async () => {
  const session = await requireAuth();

  const activities = await activityService.getMemberActivities(session.id);

  return (
    <div className="space-y-6!">
      {/* Header */}
      <div className="flex mt-4!  items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Activity</h1>

          <p className="mt-1 text-sm text-neutral-500">
            Recent activity related to your tasks and work.
          </p>
        </div>

        <RealTimeUnderDevelopment />
      </div>
      <div className="my-8!">
        <ActivityLog activities={activities ?? []} />
      </div>
    </div>
  );
};

export default ActivityMemberHome;
