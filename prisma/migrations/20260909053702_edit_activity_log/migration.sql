-- DropForeignKey
ALTER TABLE "ActivityLog" DROP CONSTRAINT "ActivityLog_userId_fkey";

-- DropIndex
DROP INDEX "ActivityLog_rewardId_createdAt_idx";

-- DropIndex
DROP INDEX "ActivityLog_taskId_createdAt_idx";

-- AlterTable
ALTER TABLE "ActivityLog" ADD COLUMN     "targetUserId" TEXT;

-- CreateIndex
CREATE INDEX "ActivityLog_targetUserId_createdAt_idx" ON "ActivityLog"("targetUserId", "createdAt");

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
