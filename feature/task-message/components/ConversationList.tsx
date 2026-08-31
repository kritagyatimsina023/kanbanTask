import { Conversation } from "@/app/types/taskMessage.types";
import { formatMessageTime } from "@/lib/helper";
import { CheckCheck, MessageCircle } from "lucide-react";

type ConversationListProps = {
  conversations: Conversation[];
  role: "ADMIN" | "MEMBER";
  onSelect: (taskId: string) => void;
};
export const ConversationList = ({
  conversations,
  role,
  onSelect,
}: ConversationListProps) => {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8! text-center">
        <div className="mb-4! flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
          <MessageCircle size={25} className="text-indigo-500" />
        </div>

        <h3 className="text-sm font-semibold text-gray-900">
          No conversations yet
        </h3>
        <p className="mt-1! max-w-[240px] text-xs leading-5 text-gray-400">
          Messages related to your assigned tasks will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      {conversations.map((conversation) => {
        const lastMessage =
          conversation.messages[conversation.messages.length - 1];
        const isUnread =
          lastMessage &&
          !lastMessage.isRead &&
          lastMessage.sender.role !== role;
        return (
          <button
            key={conversation.taskId}
            type="button"
            onClick={() => onSelect(conversation.taskId)}
            className="flex w-full items-start gap-3 border-b border-gray-100 px-4! py-4! text-left transition hover:bg-gray-50"
          >
            {/* Avatar */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
              {conversation.task.title.charAt(0).toUpperCase()}
              {isUnread && (
                <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-600" />
              )}
            </div>
            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3
                  className={`truncate text-sm ${
                    isUnread
                      ? "font-bold text-gray-900"
                      : "font-semibold text-gray-700"
                  }`}
                >
                  {conversation.task.title}
                </h3>

                {lastMessage && (
                  <span className="shrink-0 text-[10px] text-gray-400">
                    {formatMessageTime(lastMessage.createdAt)}
                  </span>
                )}
              </div>

              <div className="mt-1! flex items-center gap-1">
                {lastMessage?.sender.role === role && (
                  <CheckCheck size={13} className="shrink-0 text-indigo-500" />
                )}
                <p
                  className={`truncate text-xs ${
                    isUnread ? "font-medium text-gray-700" : "text-gray-400"
                  }`}
                >
                  {lastMessage?.message ?? "No messages yet"}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
