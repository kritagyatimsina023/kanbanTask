"use client";

import { ImageIcon, Paperclip, Send, Smile } from "lucide-react";

import React, { useActionState, useEffect, useRef, useState } from "react";
import { sendChatMessageAction } from "../chatMessage.action";
import { ChatMessageActionState, Room } from "@/app/types/chatMessage.types";
import { toast } from "sonner";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const initialState: ChatMessageActionState = {
  success: false,
  message: "",
};

type Props = {
  room: Room;
};

const MessageInput = ({ room }: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  const [state, formAction, pending] = useActionState(
    sendChatMessageAction,
    initialState,
  );

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;

    textarea.style.height = "auto";

    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);

    requestAnimationFrame(() => {
      const textarea = textareaRef.current;

      if (!textarea) return;
      textarea.focus();
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
    });
  };

  useEffect(() => {
    if (!state.message && !state.fieldErrors) return;

    if (!state.success) {
      if (state.fieldErrors) {
        Object.values(state.fieldErrors).forEach((errors) => {
          errors?.forEach((error) => {
            toast.error(error);
          });
        });
      }
      return;
    }
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }

    toast.success(state.message || "Message was sent successfully");
  }, [state]);

  return (
    <div className="shrink-0 border-t border-gray-200 bg-white p-3! sm:p-4!">
      <form
        action={formAction}
        className="mx-auto flex max-w-5xl items-end gap-2"
      >
        <input type="hidden" name="roomId" value={room.id} />

        {/* Attachment */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          aria-label="Attach file"
        >
          <Paperclip size={19} />
        </button>

        {/* Message Composer */}
        <div className="flex min-h-10 flex-1 items-end rounded-2xl border border-gray-200 bg-gray-50 px-3! py-1! transition focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            name="content"
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="min-h-10 max-h-32 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent py-2! text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-400"
          />

          {/* Emoji */}
          <div ref={emojiRef} className="relative mb-1!">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="ml-2! flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
              aria-label="Emoji"
            >
              <Smile size={18} />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-9 right-0 z-50">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  searchDisabled={false}
                  skinTonesDisabled
                  width={320}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>

        {/* Image */}
        <button
          type="button"
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 sm:flex"
          aria-label="Send image"
        >
          <ImageIcon size={19} />
        </button>

        {/* Send */}
        <button
          type="submit"
          disabled={pending}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          aria-label="Send message"
        >
          <Send size={17} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
