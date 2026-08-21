import React from "react";
import { Notification } from "@/app/types/notification";
import { formatNepalDate } from "@/lib/helper";
import {
  ClockAlert,
  Gift,
  Trash2,
  Trash2Icon,
  UserPlus,
  X,
} from "lucide-react";
import { NotificationType } from "@/generated/prisma/enums";
import Tooltip from "@/components/Tooltip";

const notificationIcons = {
  [NotificationType.TASK_OVERDUE]: ClockAlert,
  [NotificationType.TASK_ASSIGNED]: UserPlus,
  [NotificationType.TASK_DELETED]: Trash2,
  [NotificationType.REWARD_GRANTED]: Gift,
};

type ModelProps = {
  notifications: Notification[];
  setShowAll: (val: boolean) => void;
  handleDeleteNotification: (notificationId?: string) => Promise<void>;
};

const NotificationModel = ({
  notifications,
  setShowAll,
  handleDeleteNotification,
}: ModelProps) => {
  return (
    <div className="fixed inset-0 min-h-screen z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6! py-4!">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                All Notifications
              </h2>
              <Tooltip blurDesign={false} text="Delete All" side="bottom">
                <button onClick={() => handleDeleteNotification()}>
                  <Trash2Icon color="red" size={15} />
                </button>
              </Tooltip>
            </div>
            <p className="mt-1! text-xs text-gray-500">
              {notifications.length} notification
              {notifications.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAll(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[calc(85vh-80px)] overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notificationIcons[notification.type];
            return (
              <div
                key={notification.id}
                className={`border-b border-gray-100 px-6! py-4! transition hover:bg-gray-50 ${
                  !notification.read ? "bg-indigo-50/40" : ""
                }`}
              >
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
                      <Icon size={17} className="text-indigo-600" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="mt-1! inline-block text-[10px] font-semibold text-indigo-600">
                            NEW
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 text-xs text-gray-400">
                        {formatNepalDate(notification.createdAt)}
                      </span>
                    </div>

                    <p className="mt-2! text-sm leading-6 text-gray-600">
                      {notification.message}
                    </p>
                    {notification.task && (
                      <div className="mt-3! rounded-xl border border-gray-100 bg-gray-50 p-3!">
                        <p className="text-xs font-semibold text-gray-700">
                          Task
                        </p>

                        <p className="mt-1! text-sm font-medium text-gray-900">
                          {notification.task.title}
                        </p>

                        {notification.task.deadline && (
                          <p className="mt-2! text-xs text-red-500">
                            Deadline:{" "}
                            {formatNepalDate(notification.task.deadline)}
                          </p>
                        )}

                        <p className="mt-1! text-xs text-gray-500">
                          Status: {notification.task.status}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationModel;
