/*
  Warnings:

  - You are about to drop the column `highCourtId` on the `CaseType` table. All the data in the column will be lost.
  - You are about to drop the column `highCourtId` on the `ManualCaseImportTask` table. All the data in the column will be lost.
  - You are about to drop the column `highCourtId` on the `State` table. All the data in the column will be lost.
  - You are about to drop the `HighCourt` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[complexId,code]` on the table `CaseType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stateCode,districtCode,complexCode]` on the table `CourtComplex` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationId,caseType,number,regYear,districtCourtId]` on the table `ManualCaseImportTask` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CaseType" DROP CONSTRAINT "CaseType_highCourtId_fkey";

-- DropForeignKey
ALTER TABLE "ManualCaseImportTask" DROP CONSTRAINT "ManualCaseImportTask_highCourtId_caseType_fkey";

-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_highCourtId_fkey";

-- DropIndex
DROP INDEX "CaseType_highCourtId_code_key";

-- DropIndex
DROP INDEX "ManualCaseImportTask_organizationId_highCourtId_caseType_nu_key";

-- AlterTable
ALTER TABLE "CaseType" DROP COLUMN "highCourtId",
ADD COLUMN     "complexId" TEXT;

-- AlterTable
ALTER TABLE "CourtComplex" ADD COLUMN     "complexCode" VARCHAR(3),
ADD COLUMN     "isMasterCourtComplex" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "masterComplexCourtCode" VARCHAR(3);

-- AlterTable
ALTER TABLE "ManualCaseImportTask" DROP COLUMN "highCourtId",
ADD COLUMN     "complexId" TEXT;

-- AlterTable
ALTER TABLE "State" DROP COLUMN "highCourtId";

-- DropTable
DROP TABLE "HighCourt";

-- CreateIndex
CREATE UNIQUE INDEX "CaseType_complexId_code_key" ON "CaseType"("complexId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "courtComplex_stateCode_districtCode_complexCode_unique" ON "CourtComplex"("stateCode", "districtCode", "complexCode");

-- CreateIndex
CREATE UNIQUE INDEX "ManualCaseImportTask_organizationId_caseType_number_regYear_key" ON "ManualCaseImportTask"("organizationId", "caseType", "number", "regYear", "districtCourtId");

-- AddForeignKey
ALTER TABLE "CaseType" ADD CONSTRAINT "CaseType_complexId_fkey" FOREIGN KEY ("complexId") REFERENCES "CourtComplex"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualCaseImportTask" ADD CONSTRAINT "ManualCaseImportTask_complexId_caseType_fkey" FOREIGN KEY ("complexId", "caseType") REFERENCES "CaseType"("complexId", "code") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualCaseImportTask" ADD CONSTRAINT "ManualCaseImportTask_complexId_fkey" FOREIGN KEY ("complexId") REFERENCES "CourtComplex"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
