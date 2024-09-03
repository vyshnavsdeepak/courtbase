/*
  Warnings:

  - You are about to drop the column `courtComplexId` on the `CaseImportTask` table. All the data in the column will be lost.
  - You are about to drop the column `organizationMembersOrganizationId` on the `CaseImportTask` table. All the data in the column will be lost.
  - You are about to drop the column `organizationMembersUserId` on the `CaseImportTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CaseImportTask" DROP CONSTRAINT "CaseImportTask_courtComplexId_fkey";

-- DropForeignKey
ALTER TABLE "CaseImportTask" DROP CONSTRAINT "CaseImportTask_organizationMembersOrganizationId_organizat_fkey";

-- DropForeignKey
ALTER TABLE "CaseImportTask" DROP CONSTRAINT "caseImportTask_created_by_user_id_fk";

-- AlterTable
ALTER TABLE "CaseImportTask" DROP COLUMN "courtComplexId",
DROP COLUMN "organizationMembersOrganizationId",
DROP COLUMN "organizationMembersUserId",
ADD COLUMN     "userId" UUID;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "CaseImportTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
