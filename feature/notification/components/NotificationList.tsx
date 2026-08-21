import { notificationService } from "@/feature/notification/notification.service";

type Props = {
  userId: string;
};

export default async function NotificationList({ userId }: Props) {
  const notifications = await notificationService.getUserNotifications(userId);

  if (notifications.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-4! text-sm text-gray-500">
        No notifications.
      </div>
    );
  }
  return (
    <div className="space-y-3!">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`rounded-xl border p-4! ${
            notification.read
              ? "border-gray-100 bg-white"
              : "border-red-100 bg-red-50/50"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {notification.title}
              </h3>

              <p className="mt-1! text-sm text-gray-600">
                {notification.message}
              </p>

              {notification.task && (
                <div className="mt-2! text-xs text-gray-500">
                  <p>
                    Task:{" "}
                    <span className="font-medium">
                      {notification.task.title}
                    </span>
                  </p>

                  <p>
                    Deadline:{" "}
                    {new Date(notification.task.deadline!).toLocaleString(
                      "en-NP",
                      {
                        timeZone: "Asia/Kathmandu",
                        dateStyle: "medium",
                        timeStyle: "short",
                      },
                    )}
                  </p>
                </div>
              )}
            </div>

            {!notification.read && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
