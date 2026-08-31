-- CreateTable
CREATE TABLE "TaskMessage" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TaskMessage_taskId_idx" ON "TaskMessage"("taskId");

-- CreateIndex
CREATE INDEX "TaskMessage_senderId_idx" ON "TaskMessage"("senderId");

-- CreateIndex
CREATE INDEX "TaskMessage_isRead_idx" ON "TaskMessage"("isRead");

-- CreateIndex
CREATE INDEX "TaskMessage_createdAt_idx" ON "TaskMessage"("createdAt");

-- CreateIndex
CREATE INDEX "Task_assigneeId_idx" ON "Task"("assigneeId");

-- CreateIndex
CREATE INDEX "Task_status_idx" ON "Task"("status");

-- AddForeignKey
ALTER TABLE "TaskMessage" ADD CONSTRAINT "TaskMessage_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskMessage" ADD CONSTRAINT "TaskMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
