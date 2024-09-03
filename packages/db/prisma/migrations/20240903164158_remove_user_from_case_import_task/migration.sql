/*
  Warnings:

  - You are about to drop the column `userId` on the `CaseImportTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CaseImportTask" DROP CONSTRAINT "CaseImportTask_userId_fkey";

-- AlterTable
ALTER TABLE "CaseImportTask" DROP COLUMN "userId";
