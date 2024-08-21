/*
  Warnings:

  - You are about to alter the column `crn` on the `Case` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(16)`.
  - You are about to alter the column `description` on the `Case` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[organizationId,typeName,number,regYear,courtId]` on the table `Case` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationId,crn]` on the table `Case` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courtId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petitioner` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petitionerLawyers` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rawData` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regYear` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `respondent` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `respondentLawyers` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeName` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrgDesignation" AS ENUM ('ADVOCATE', 'STAFF');

-- CreateEnum
CREATE TYPE "AdvocateCaseSide" AS ENUM ('PETITIONER', 'RESPONDENT', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "CaseImportTaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "CaseImportTask" DROP CONSTRAINT "caseImportTask_courtComplexId_courtComplex_id_fk";

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "courtId" UUID NOT NULL,
ADD COLUMN     "dateOfDecision" DATE,
ADD COLUMN     "extraParties" VARCHAR(255),
ADD COLUMN     "extraPetitioners" VARCHAR(255),
ADD COLUMN     "extraRespondents" VARCHAR(255),
ADD COLUMN     "nextHearingDate" DATE,
ADD COLUMN     "number" VARCHAR(4) NOT NULL,
ADD COLUMN     "petitioner" VARCHAR(255) NOT NULL,
ADD COLUMN     "petitionerLawyers" VARCHAR(255) NOT NULL,
ADD COLUMN     "rawData" JSON NOT NULL,
ADD COLUMN     "regYear" VARCHAR(4) NOT NULL,
ADD COLUMN     "respondent" VARCHAR(255) NOT NULL,
ADD COLUMN     "respondentLawyers" VARCHAR(255) NOT NULL,
ADD COLUMN     "side" "AdvocateCaseSide" NOT NULL,
ADD COLUMN     "typeName" VARCHAR(50) NOT NULL,
ALTER COLUMN "crn" SET DATA TYPE VARCHAR(16),
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CaseImportTask" ADD COLUMN     "courtComplexIds" JSONB,
ADD COLUMN     "taskMeta" JSONB,
ADD COLUMN     "taskStatus" "CaseImportTaskStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "courtComplexId" DROP NOT NULL,
ALTER COLUMN "caseStatus" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OrganizationMembers" ADD COLUMN     "designation" "OrgDesignation";

-- CreateTable
CREATE TABLE "AdvocateCase" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "caseId" UUID NOT NULL,
    "advocateId" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "AdvocateCase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "advocateCase_caseId_advocateId_unique" ON "AdvocateCase"("caseId", "advocateId");

-- CreateIndex
CREATE UNIQUE INDEX "case_organization_typeName_number_regYear_courtId_unique" ON "Case"("organizationId", "typeName", "number", "regYear", "courtId");

-- CreateIndex
CREATE UNIQUE INDEX "case_organization_organization_id_fk" ON "Case"("organizationId", "crn");

-- RenameForeignKey
ALTER TABLE "Case" RENAME CONSTRAINT "case_organization_organization_id_fk" TO "eCourtCase_organization_organization_id_fk";

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "eCourtCase_courtId_court_id_fk" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdvocateCase" ADD CONSTRAINT "advocateCase_advocateId_organizationId_fk" FOREIGN KEY ("advocateId", "organizationId") REFERENCES "OrganizationMembers"("userId", "organizationId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "CaseImportTask_courtComplexId_fkey" FOREIGN KEY ("courtComplexId") REFERENCES "CourtComplex"("id") ON DELETE SET NULL ON UPDATE CASCADE;
