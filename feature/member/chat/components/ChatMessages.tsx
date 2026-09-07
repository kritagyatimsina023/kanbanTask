"use client";
import { messages } from "@/app/types/chatMessage.types";
import { useMessageSound } from "@/hooks/useMessageSound";
import { formatNepalDate } from "@/lib/helper";
import { pusherClient } from "@/lib/pusher/pusher.client";
import { REALTIME_EVENTS } from "@/lib/realtime/realtime.events";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
type props = {
  messages: messages[];
  currentUserId: string;
  roomId: string;
};

const ChatMessages = ({
  messages: initialMessages,
  currentUserId,
  roomId,
}: props) => {
  const [messages, setMessages] = useState<messages[]>(initialMessages);
  const { playSound } = useMessageSound();
  const messageContainerRef = useScrollToBottom(messages);

  useEffect(() => {
    const channelName = `private-chat-room-${roomId}`;
    const channel = pusherClient.subscribe(channelName);
    console.log(channelName, "roomId channel name");

    const handleNewMessage = (message: messages) => {
      if (message.sender.id !== currentUserId) {
        playSound();
      }
      setMessages((currentMessages) => {
        if (currentMessages.some((item) => item.id === message.id)) {
          return currentMessages;
        }
        return [...currentMessages, message];
      });
    };
    channel.bind(REALTIME_EVENTS.CHAT_MESSAGE_NEW, handleNewMessage);
    return () => {
      channel.unbind(REALTIME_EVENTS.CHAT_MESSAGE_NEW, handleNewMessage);
      pusherClient.unsubscribe(channelName);
    };
  }, [roomId, playSound, currentUserId]);

  return (
    <div
      ref={messageContainerRef}
      className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-gray-50 px-4! py-5! sm:px-6!"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        {/* Date */}
        <div className="flex justify-center">
          <span className="rounded-full bg-white px-3! py-1! text-[10px] font-medium text-gray-400 shadow-sm">
            Today
          </span>
        </div>
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
                <MessageCircle size={22} className="text-indigo-500" />
              </div>

              <h3 className="text-sm font-semibold text-gray-800">
                No messages yet
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Start the conversation by sending a message.
              </p>
            </div>
          </div>
        ) : (
          messages.map((item) => {
            const isOwn = item.sender.id === currentUserId;
            return (
              <div
                key={item.id}
                className={`flex items-end gap-2 ${
                  isOwn ? "justify-end" : "justify-start"
                }`}
              >
                {!isOwn && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
                    {item.sender.email.charAt(0).toUpperCase()}
                  </div>
                )}

                <div
                  className={`flex max-w-[75%]! flex-col ${
                    isOwn ? "items-end" : "items-start"
                  }`}
                >
                  {!isOwn && (
                    <span className="mb-1! px-1! text-[10px] font-medium text-gray-500">
                      {item.sender.email}
                    </span>
                  )}

                  <div
                    className={`rounded-2xl px-4! py-2.5! text-sm leading-relaxed ${
                      isOwn
                        ? "rounded-br-md bg-indigo-600 text-white"
                        : "rounded-bl-md border border-gray-200 bg-white text-gray-800"
                    }`}
                  >
                    {item.content}
                  </div>

                  <span className="mt-1! px-1! text-[10px] text-gray-400">
                    {formatNepalDate(item.createdAt)}
                  </span>
                </div>

                {isOwn && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                    Y
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
