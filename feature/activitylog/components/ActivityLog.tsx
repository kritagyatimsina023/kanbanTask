"use client";

import {
  Activity as ActivityIcon,
  ArrowRight,
  CheckCircle2,
  CirclePlus,
  MessageCircle,
  Trash2,
  Trophy,
  UserPlus,
} from "lucide-react";

import { ActivityAction } from "@/generated/prisma/enums";
import { ActivityWithUser } from "@/app/types/activityLog";
import { Prisma } from "@/generated/prisma/browser";
import { formatNepalDate } from "@/lib/helper";
import { activityConfig } from "@/constants/activitylog";

type ActivityLogProps = {
  activities: ActivityWithUser[];
};

function getInitials(email: string) {
  return email.slice(0, 2).toUpperCase();
}
type ActivityMetadata = {
  title?: string;
  from?: string | null;
  to?: string | null;
  fromId?: string | null;
  fromEmail?: string | null;
  toId?: string | null;
  toEmail?: string | null;
  type?: "MANUAL" | "MILESTONE";
  points?: number;
  awardedTo?: string | null;
  milestone?: number | null;
  completedTasks?: number;
  // Chat room
  name?: string;
  memberIds?: string[];
  memberEmails?: string[];
};
function getMetadata(metadata: Prisma.JsonValue | null): ActivityMetadata {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    return metadata as ActivityMetadata;
  }

  return {};
}
const ActivityLog = ({ activities }: ActivityLogProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* Empty State */}
      {activities.length === 0 ? (
        <div className="flex min-h-50! items-center justify-center px-6! py-10!">
          <div className="text-center">
            <div className="mx-auto flex size-12! items-center justify-center rounded-2xl bg-neutral-50">
              <ActivityIcon className="size-6 text-neutral-300" />
            </div>
            <p className="mt-3! text-sm font-semibold text-neutral-700">
              No activity yet
            </p>
            <p className="mt-1! text-xs text-neutral-400">
              Activity will appear here as changes are made.
            </p>
          </div>
        </div>
      ) : (
        <div>
          {activities.map((activity, index) => {
            const config = activityConfig[activity.action];

            if (!config) return null;

            const Icon = config.icon;
            const metadata = getMetadata(activity.metadata);
            const taskMetadata = getMetadata(activity.metadata);
            const isLast = index === activities.length - 1;
            return (
              <div
                key={activity.id}
                className="group relative flex gap-4! px-6! py-5! transition-colors hover:bg-neutral-50/70"
              >
                {/* Timeline */}
                {!isLast && (
                  <div className="absolute bottom-0! left-[40px]! top-[72px]! w-px bg-neutral-200" />
                )}

                {/* Avatar */}
                <div className="relative z-10! flex size-10! shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs font-bold text-neutral-600 shadow-sm">
                  {getInitials(activity.user.email)}
                </div>

                {/* Activity Icon */}
                <div
                  className={`relative z-10! flex size-10! shrink-0 items-center justify-center rounded-xl border ${config.iconBg} ${config.iconBorder}`}
                >
                  <Icon className={`size-4 ${config.iconColor}`} />

                  {/* Ping */}
                  {index === 0 && (
                    <span className="absolute -right-1! -top-1! flex size-2.5!">
                      <span
                        className={`absolute inline-flex size-full animate-ping rounded-full ${config.pingColor} opacity-60`}
                      />
                      <span
                        className={`relative inline-flex size-2.5! rounded-full ${config.pingColor}`}
                      />
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pb-1!">
                  {/* Main activity */}
                  <div className="flex flex-wrap items-center gap-x-1.5! gap-y-1! text-sm">
                    <span className="font-semibold text-neutral-900">
                      {activity.user.email}
                    </span>

                    <span className="text-neutral-500">{config.label}</span>
                  </div>

                  {/* Task Created */}
                  {activity.action === ActivityAction.TASK_CREATED && (
                    <div className="mt-3! rounded-xl border border-emerald-100 bg-emerald-50/60 px-3! py-2.5!">
                      <div className="flex items-center gap-2!">
                        <CirclePlus className="size-3.5 shrink-0 text-emerald-600" />

                        <p className="truncate text-sm font-medium text-neutral-700">
                          {taskMetadata.title ?? "Untitled task"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Status Changed */}
                  {activity.action === ActivityAction.TASK_STATUS_CHANGED && (
                    <div className="mt-3! flex flex-wrap items-center gap-2!">
                      <span className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5! py-1.5! text-xs font-medium text-neutral-600">
                        {metadata.from ?? "Unknown"}
                      </span>

                      <div className="flex size-6! items-center justify-center rounded-full bg-neutral-100">
                        <ArrowRight className="size-3 text-neutral-400" />
                      </div>

                      <span className="rounded-lg border border-blue-100 bg-blue-50 px-2.5! py-1.5! text-xs font-medium text-blue-700">
                        {metadata.to ?? "Unknown"}
                      </span>
                    </div>
                  )}
                  {/* Task Reassigned */}
                  {activity.action === ActivityAction.TASK_REASSIGNED && (
                    <div className="mt-3! flex flex-wrap items-center gap-2!">
                      <span className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5! py-1.5! text-xs font-medium text-neutral-600">
                        {metadata.fromEmail ?? "Unassigned"}
                      </span>

                      <div className="flex size-6! items-center justify-center rounded-full bg-neutral-100">
                        <ArrowRight className="size-3 text-neutral-400" />
                      </div>

                      <span className="rounded-lg border border-orange-100 bg-orange-50 px-2.5! py-1.5! text-xs font-medium text-orange-700">
                        {metadata.toEmail ?? "Unassigned"}
                      </span>
                    </div>
                  )}

                  {/* Task Deleted */}
                  {activity.action === ActivityAction.TASK_DELETED && (
                    <div className="mt-3! rounded-xl border border-red-100 bg-red-50/60 px-3! py-2.5!">
                      <div className="flex items-center gap-2!">
                        <Trash2 className="size-3.5 shrink-0 text-red-500" />

                        <p className="truncate text-sm font-medium text-red-700">
                          {taskMetadata.title ?? "Deleted task"}
                        </p>
                      </div>
                    </div>
                  )}

                  {activity.action === ActivityAction.TASK_COMPLETED && (
                    <div className="mt-3! flex items-center gap-2! rounded-xl border border-green-100 bg-green-50/60 px-3! py-2.5!">
                      <CheckCircle2 className="size-4 text-green-600" />

                      <span className="text-sm font-medium text-green-700">
                        Task marked as completed
                      </span>
                    </div>
                  )}
                  {/* Reward Granted */}
                  {activity.action === ActivityAction.REWARD_GRANTED && (
                    <div className="mt-3! rounded-xl border border-yellow-100 bg-yellow-50/60 px-3! py-2.5!">
                      <div className="flex items-start gap-3!">
                        <div className="flex size-8! shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                          <Trophy className="size-4 text-yellow-600" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2!">
                            <p className="truncate text-sm font-semibold text-neutral-800">
                              {metadata.title ?? "Reward"}
                            </p>

                            {metadata.points !== undefined && (
                              <span className="rounded-full bg-yellow-100 px-2! py-0.5! text-[10px] font-bold text-yellow-700">
                                +{metadata.points} points
                              </span>
                            )}
                          </div>

                          {metadata.type === "MILESTONE" && (
                            <p className="mt-1! text-xs text-neutral-500">
                              Milestone reward · {metadata.completedTasks ?? 0}{" "}
                              tasks completed
                            </p>
                          )}

                          {metadata.type === "MANUAL" && (
                            <p className="mt-1! text-xs text-neutral-500">
                              Manually awarded by admin
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {activity.action === ActivityAction.CHAT_ROOM_CREATED && (
                    <div className="mt-3! rounded-xl border border-violet-100 bg-violet-50/60 px-3! py-2.5!">
                      <div className="flex items-center gap-2!">
                        <MessageCircle className="size-4 shrink-0 text-violet-600" />

                        <p className="truncate text-sm font-medium text-neutral-700">
                          {metadata.name ?? "Unnamed chat room"}
                        </p>
                      </div>
                    </div>
                  )}
                  {activity.action ===
                    ActivityAction.CHAT_ROOM_MEMBER_ADDED && (
                    <div className="mt-3! rounded-xl border border-blue-100 bg-blue-50/60 px-3! py-2.5!">
                      <div className="flex items-start gap-2!">
                        <UserPlus className="mt-0.5! size-4 shrink-0 text-blue-600" />

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-neutral-700">
                            Added{" "}
                            <span className="font-semibold text-neutral-900">
                              {metadata.memberEmails?.join(", ") ?? "members"}
                            </span>
                          </p>

                          {metadata.name && (
                            <p className="mt-1! truncate text-xs text-neutral-500">
                              Chat room · {metadata.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-3! flex items-center gap-2!">
                    <span className="text-xs text-neutral-400">
                      {formatNepalDate(activity.createdAt)}
                    </span>
                    {index === 0 && (
                      <span className="rounded-full bg-emerald-50 px-2! py-0.5! text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                        Recent
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
