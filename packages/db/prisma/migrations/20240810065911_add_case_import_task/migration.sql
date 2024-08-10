/*
  Warnings:

  - A unique constraint covering the columns `[stateCode,districtCode,courtCode]` on the table `Court` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "CaseImportTask" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" UUID NOT NULL,
    "courtComplexId" UUID NOT NULL,
    "advocateName" VARCHAR(255) NOT NULL,
    "caseStatus" VARCHAR(255) NOT NULL,
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "CaseImportTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "court_stateCode_districtCode_courtCode_unique" ON "Court"("stateCode", "districtCode", "courtCode");

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "caseImportTask_courtComplexId_courtComplex_id_fk" FOREIGN KEY ("courtComplexId") REFERENCES "CourtComplex"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "caseImportTask_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "caseImportTask_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
