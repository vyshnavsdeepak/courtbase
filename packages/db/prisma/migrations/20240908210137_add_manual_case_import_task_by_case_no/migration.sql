-- CreateTable
CREATE TABLE "ManualCaseImportTask" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "highCourtId" TEXT NOT NULL,
    "caseType" TEXT NOT NULL,
    "number" VARCHAR(4) NOT NULL,
    "regYear" VARCHAR(4) NOT NULL,
    "districtCourtId" TEXT NOT NULL,
    "importStatus" "CaseImportTaskStatus" NOT NULL DEFAULT 'PENDING',
    "caseId" UUID,
    "createdBy" TEXT NOT NULL,
    "response" JSONB,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "ManualCaseImportTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "manualCaseImportTask_organizationId_importStatus_idx" ON "ManualCaseImportTask"("organizationId", "importStatus");

-- CreateIndex
CREATE UNIQUE INDEX "ManualCaseImportTask_organizationId_highCourtId_caseType_nu_key" ON "ManualCaseImportTask"("organizationId", "highCourtId", "caseType", "number", "regYear", "districtCourtId");

-- AddForeignKey
ALTER TABLE "ManualCaseImportTask" ADD CONSTRAINT "ManualCaseImportTask_highCourtId_caseType_fkey" FOREIGN KEY ("highCourtId", "caseType") REFERENCES "CaseType"("highCourtId", "code") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualCaseImportTask" ADD CONSTRAINT "manualCaseImportTask_districtCourtId_districtcourt_id_fk" FOREIGN KEY ("districtCourtId") REFERENCES "DistrictCourt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualCaseImportTask" ADD CONSTRAINT "ManualCaseImportTask_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualCaseImportTask" ADD CONSTRAINT "ManualCaseImportTask_createdBy_organizationId_fkey" FOREIGN KEY ("createdBy", "organizationId") REFERENCES "OrganizationMembers"("memberId", "organizationId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualCaseImportTask" ADD CONSTRAINT "manualCaseImportTask_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
