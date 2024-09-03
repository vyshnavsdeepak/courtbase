-- DropForeignKey
ALTER TABLE "CaseImportTask" DROP CONSTRAINT "caseImportTask_advocateId_organizationId_fk";

-- AlterTable
ALTER TABLE "CaseImportTask" ADD COLUMN     "organizationMembersOrganizationId" UUID,
ADD COLUMN     "organizationMembersUserId" UUID,
ALTER COLUMN "advocateId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "CaseImportTask_organizationMembersOrganizationId_organizat_fkey" FOREIGN KEY ("organizationMembersOrganizationId", "organizationMembersUserId") REFERENCES "OrganizationMembers"("organizationId", "userId") ON DELETE SET NULL ON UPDATE CASCADE;
