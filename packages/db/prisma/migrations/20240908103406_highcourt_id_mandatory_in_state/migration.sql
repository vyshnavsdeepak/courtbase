/*
  Warnings:

  - Made the column `highCourtId` on table `State` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_highCourtId_fkey";

-- AlterTable
ALTER TABLE "State" ALTER COLUMN "highCourtId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_highCourtId_fkey" FOREIGN KEY ("highCourtId") REFERENCES "HighCourt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
