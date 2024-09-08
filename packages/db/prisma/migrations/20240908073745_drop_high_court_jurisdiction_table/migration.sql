/*
  Warnings:

  - You are about to drop the `HighCourtJurisdiction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HighCourtJurisdiction" DROP CONSTRAINT "HighCourtJurisdiction_highCourtId_fkey";

-- DropForeignKey
ALTER TABLE "HighCourtJurisdiction" DROP CONSTRAINT "HighCourtJurisdiction_stateCode_fkey";

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "highCourtId" TEXT;

-- DropTable
DROP TABLE "HighCourtJurisdiction";

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_highCourtId_fkey" FOREIGN KEY ("highCourtId") REFERENCES "HighCourt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
