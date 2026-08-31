"use client";

import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";
import { sendTaskMessage } from "@/feature/task-message/taskMessage.action";

export function useTaskMessageActions() {
  const [isPending, startTransition] = useTransition();
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);
  const handleSendMessage = useCallback(
    async (taskId: string, message: string) => {
      if (!message.trim()) {
        toast.error("Message cannot be empty");
        return false;
      }
      setPendingTaskId(taskId);
      return new Promise<boolean>((resolve) => {
        startTransition(async () => {
          try {
            const result = await sendTaskMessage({
              taskId,
              message: message.trim(),
            });
            if (!result.success) {
              toast.error(result.error);
              resolve(false);
              return;
            }
            toast.success("Message sent successfully");
            resolve(true);
          } catch (error) {
            console.error("Failed to send task message:", error);
            toast.error("Failed to send message");
            resolve(false);
          } finally {
            setPendingTaskId(null);
          }
        });
      });
    },
    [],
  );

  return {
    isPending,
    pendingTaskId,
    handleSendMessage,
  };
}
