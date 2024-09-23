/*
  Warnings:

  - Made the column `complexId` on table `CaseType` required. This step will fail if there are existing NULL values in that column.
  - Made the column `complexId` on table `ManualCaseImportTask` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CaseType" ALTER COLUMN "complexId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ManualCaseImportTask" ALTER COLUMN "complexId" SET NOT NULL;
