/*
  Warnings:

  - Made the column `districtCourtId` on table `ManualCaseImportTask` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ManualCaseImportTask" ALTER COLUMN "districtCourtId" SET NOT NULL;
