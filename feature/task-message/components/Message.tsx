import { taskMessageService } from "@/feature/task-message/taskMessage.service";
import { requireAuth } from "@/lib/auth";
import MessageWidget from "./MessageWidget";

const Message = async () => {
  const session = await requireAuth();

  const conversations = await taskMessageService.getUserTaskMessages(
    session.id,
  );

  return (
    <MessageWidget
      conversations={conversations}
      role={session.role}
      userId={session.id}
    />
  );
};

export default Message;
