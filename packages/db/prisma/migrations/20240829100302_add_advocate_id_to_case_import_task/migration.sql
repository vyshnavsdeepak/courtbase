/*
  Warnings:

  - You are about to drop the column `advocateName` on the `CaseImportTask` table. All the data in the column will be lost.
  - Added the required column `advocateId` to the `CaseImportTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CaseImportTask" DROP COLUMN "advocateName",
ADD COLUMN     "advocateId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "caseImportTask_advocateId_organizationId_fk" FOREIGN KEY ("advocateId", "organizationId") REFERENCES "OrganizationMembers"("userId", "organizationId") ON DELETE CASCADE ON UPDATE NO ACTION;
