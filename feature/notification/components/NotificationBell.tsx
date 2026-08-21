"use client";

import { Bell, CheckCircle2, Trash2Icon, X } from "lucide-react";
import { Notification } from "@/app/types/notification";
import { useState } from "react";
import { formatNepalDate } from "@/lib/helper";
import { NotificationType } from "@/generated/prisma/enums";
import { ClockAlert, UserPlus, Trash2, Gift } from "lucide-react";
import {
  deleteNotificaiton,
  markAllNotificationsAsReadAction,
} from "../notification.action";
import { useRouter } from "next/navigation";
import NotificationModel from "./NotificationModel";
import { toast } from "sonner";
import Tooltip from "@/components/Tooltip";

type Props = {
  notifications: Notification[];
};
const notificationIcons = {
  [NotificationType.TASK_OVERDUE]: ClockAlert,
  [NotificationType.TASK_ASSIGNED]: UserPlus,
  [NotificationType.TASK_DELETED]: Trash2,
  [NotificationType.REWARD_GRANTED]: Gift,
};
export default function NotificationBell({ notifications }: Props) {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const handleOpenNotification = async () => {
    setOpen((prev) => !prev);
    if (unreadCount > 0) {
      await markAllNotificationsAsReadAction();
      router.refresh();
    }
  };
  const handleDeleteNotification = async (notificationId?: string) => {
    const result = await deleteNotificaiton(notificationId);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <div className="relative">
      {/* Bell */}
      <Tooltip text="Notification" side="bottom">
        <button
          type="button"
          onClick={handleOpenNotification}
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </Tooltip>

      {/* Notification Dropdown */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-12 z-50 w-[360px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4! py-3!">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Notifications
                </h3>

                {unreadCount > 0 && (
                  <p className="mt-0.5! text-xs text-gray-500">
                    {unreadCount} unread notification
                    {unreadCount !== 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {unreadCount > 0 && (
                <span className="rounded-full bg-red-50 px-2! py-1! text-[10px] font-semibold text-red-600">
                  {unreadCount} new
                </span>
              )}
            </div>

            {/* Notifications */}
            <div className="max-h-[420px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6! py-10! text-center">
                  <div className="mb-3! flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <CheckCircle2 size={20} className="text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    No notifications
                  </p>
                  <p className="mt-1! text-xs text-gray-400">
                    You&apos;re all caught up.
                  </p>
                </div>
              ) : (
                notifications.slice(0, 5).map((notification) => {
                  const Icon = notificationIcons[notification.type];
                  return (
                    <div
                      key={notification.id}
                      className={`border-b border-gray-100 px-4! py-3! transition hover:bg-gray-50 ${
                        !notification.read ? "bg-indigo-50/40" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Notification Icon */}
                        <div className="shrink-0">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
                            <Icon size={17} className="text-indigo-600" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-semibold text-gray-900">
                              {notification.title}
                            </h4>
                            <Tooltip
                              blurDesign={true}
                              text="Delete Notification"
                              side="left"
                            >
                              <button
                                onClick={() =>
                                  handleDeleteNotification(notification.id)
                                }
                              >
                                <Trash2Icon color="red" size={15} />
                              </button>
                            </Tooltip>
                            {!notification.read && (
                              <span className="shrink-0 text-[10px] font-medium text-indigo-600">
                                New
                              </span>
                            )}
                          </div>
                          <p className="mt-1! text-xs leading-5 text-gray-600">
                            {notification.message}
                          </p>
                          {notification.task && (
                            <div className="mt-2! rounded-lg bg-gray-50 px-2.5! py-2!">
                              <p className="truncate text-[11px] font-medium text-gray-700">
                                {notification.task.title}
                              </p>

                              {notification.task.deadline && (
                                <p className="mt-0.5! text-[10px] text-red-500">
                                  Deadline:{" "}
                                  {formatNepalDate(notification.task.deadline)}
                                </p>
                              )}
                            </div>
                          )}
                          <p className="mt-2! text-[10px] text-gray-400">
                            {formatNepalDate(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {notifications.length > 0 && (
              <div className="border-t border-gray-100 px-4! py-2.5! text-center">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setShowAll(true);
                  }}
                  className="text-xs cursor-pointer w-full  py-2! font-medium text-indigo-600 transition hover:text-indigo-700"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {showAll && (
        <>
          <NotificationModel
            handleDeleteNotification={handleDeleteNotification}
            notifications={notifications}
            setShowAll={setShowAll}
          />
        </>
      )}
    </div>
  );
}
