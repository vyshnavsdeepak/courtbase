-- DropForeignKey
ALTER TABLE "AdvocateCase" DROP CONSTRAINT "advocateCase_advocateId_organizationId_fk";

-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "AdvocateCase" ADD CONSTRAINT "advocateCase_caseId_case_id_fk" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdvocateCase" ADD CONSTRAINT "advocateCase_advocateId_organizationId_fk" FOREIGN KEY ("advocateId", "organizationId") REFERENCES "OrganizationMembers"("userId", "organizationId") ON DELETE CASCADE ON UPDATE NO ACTION;
