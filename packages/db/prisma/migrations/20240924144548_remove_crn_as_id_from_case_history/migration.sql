/*
  Warnings:

  - The primary key for the `CaseHistoryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "CaseHistoryItem_organizationId_crn_businessOnDate_key";

-- AlterTable
ALTER TABLE "CaseHistoryItem" DROP CONSTRAINT "CaseHistoryItem_pkey",
ADD CONSTRAINT "CaseHistoryItem_pkey" PRIMARY KEY ("organizationId", "crn", "businessOnDate");
