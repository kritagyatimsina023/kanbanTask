/*
  Warnings:

  - You are about to drop the column `point` on the `Reward` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reward" DROP COLUMN "point",
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;
