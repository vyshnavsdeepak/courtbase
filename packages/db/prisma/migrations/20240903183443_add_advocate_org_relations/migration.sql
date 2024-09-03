/*
  Warnings:

  - A unique constraint covering the columns `[caseId,advocateId,organizationId]` on the table `AdvocateCase` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "advocateCase_caseId_advocateId_unique";

-- CreateIndex
CREATE UNIQUE INDEX "advocateCase_caseId_advocateId_organizationId_unique" ON "AdvocateCase"("caseId", "advocateId", "organizationId");

-- AddForeignKey
ALTER TABLE "OrganizationMembers" ADD CONSTRAINT "organizationMembers_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "case_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvocateCase" ADD CONSTRAINT "AdvocateCase_advocateId_organizationId_fkey" FOREIGN KEY ("advocateId", "organizationId") REFERENCES "OrganizationMembers"("memberId", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvocateCase" ADD CONSTRAINT "AdvocateCase_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "CaseImportTask_advocateId_organizationId_fkey" FOREIGN KEY ("advocateId", "organizationId") REFERENCES "OrganizationMembers"("memberId", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "caseImportTask_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
