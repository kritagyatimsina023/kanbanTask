"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MessageCircle, X } from "lucide-react";
import { ConversationView } from "./ConversationView";
import { ConversationList } from "./ConversationList";
import { Conversation } from "@/app/types/taskMessage.types";
import { Role } from "@/generated/prisma/enums";
import { markTaskMessageAsRead } from "@/feature/task-message/taskMessage.action";

type Props = {
  conversations: Conversation[];
  role: Role;
  userId: string;
};

const MessageWidget = ({ conversations, role, userId }: Props) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedConversation = conversations.find(
    (conversation) => conversation.taskId === selectedTaskId,
  );

  const unreadCount = conversations.filter((conversation) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    return (
      lastMessage && !lastMessage.isRead && lastMessage.senderId !== userId
    );
  }).length;

  const handleSelectConversation = async (taskId: string) => {
    setSelectedTaskId(taskId);
    const result = await markTaskMessageAsRead(taskId);
    if (result.success) {
      router.refresh();
    }
  };
  const handleBack = () => {
    setSelectedTaskId(null);
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all hover:scale-105 hover:bg-indigo-700"
          aria-label="Open messages"
        >
          <MessageCircle size={24} />

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 px-1! text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[9999] flex h-[620px] min-h-0 w-[390px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4!">
            {selectedTaskId ? (
              <div className="flex min-w-0 items-center gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-gray-900">
                    {selectedConversation?.task.title ?? "Conversation"}
                  </h2>
                  <p className="text-[11px] text-gray-400">Task conversation</p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Messages
                </h2>
                <p className="text-[11px] text-gray-400">
                  Your task conversations
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setSelectedTaskId(null);
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100"
            >
              <X size={19} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {selectedTaskId ? (
              <ConversationView
                userId={userId}
                taskId={selectedTaskId}
                role={role}
              />
            ) : (
              <ConversationList
                conversations={conversations}
                role={role}
                onSelect={handleSelectConversation}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageWidget;
