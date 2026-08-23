/*
  Warnings:

  - A unique constraint covering the columns `[userId,milestone]` on the table `Reward` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "milestone" INTEGER,
ADD COLUMN     "point" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Reward_userId_milestone_key" ON "Reward"("userId", "milestone");
