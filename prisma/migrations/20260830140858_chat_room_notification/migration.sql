-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'CHAT_ROOM_ADDED';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "chatRoomId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
