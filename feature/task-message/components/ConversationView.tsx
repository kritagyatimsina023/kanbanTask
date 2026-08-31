"use client";

import { useEffect, useCallback, useState } from "react";
import { AdminReplyInput } from "./AdminReplyInput";
import { DateOnly } from "@/lib/helper";
import { getTaskMessages } from "../taskMessage.action";
import { TaskMessageData } from "@/app/types/taskMessage.types";
import { Role } from "@/generated/prisma/enums";

type ConversationViewProps = {
  taskId: string;
  role: Role;
  userId: string;
};

export const ConversationView = ({
  taskId,
  role,
  userId,
}: ConversationViewProps) => {
  const [messages, setMessages] = useState<TaskMessageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);

        const result = await getTaskMessages(taskId);

        if (result.success) {
          setMessages(result.data);
        }
      } catch (error) {
        console.error("Failed to load task messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [taskId]);

  const handleMessageSent = useCallback((message: TaskMessageData) => {
    setMessages((current) => [...current, message]);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-gray-50/50 px-4! py-5!">
        <div className="space-y-4!">
          {messages.length === 0 ? (
            <div className="flex min-h-full items-center justify-center text-xs text-gray-400">
              No messages yet.
            </div>
          ) : (
            messages.map((item) => {
              const isMine = item.senderId === userId;

              return (
                <div
                  key={item.id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[78%] flex-col ${
                      isMine ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4! py-2.5! text-sm leading-5 ${
                        isMine
                          ? "rounded-br-md bg-indigo-600 text-white"
                          : "rounded-bl-md bg-white text-gray-800 shadow-sm ring-1 ring-gray-100"
                      }`}
                    >
                      {item.message}
                    </div>

                    <p
                      className={`mt-1! text-[9px] text-gray-400 ${
                        isMine ? "text-right" : "text-left"
                      }`}
                    >
                      {DateOnly(item.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {role === Role.ADMIN && (
        <div className="shrink-0">
          <AdminReplyInput taskId={taskId} onMessageSent={handleMessageSent} />
        </div>
      )}
    </div>
  );
};
