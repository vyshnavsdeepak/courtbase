/*
  Warnings:

  - The primary key for the `OrganizationMembers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[organizationId,userId]` on the table `OrganizationMembers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "eCourtCase_organization_organization_id_fk";

-- DropForeignKey
ALTER TABLE "CaseImportTask" DROP CONSTRAINT "caseImportTask_organizationId_organization_id_fk";

-- DropIndex
DROP INDEX "organizationMembers_organizationId_memberId_unique";

-- AlterTable
ALTER TABLE "AdvocateCase" ALTER COLUMN "organizationId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "organizationId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "CaseImportTask" ALTER COLUMN "organizationId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OrganizationMembers" DROP CONSTRAINT "organizationMembers_organizationId_userId_pk",
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "organizationMembers_organizationId_memberId_pk" PRIMARY KEY ("organizationId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "organizationMembers_organizationId_userId_unique" ON "OrganizationMembers"("organizationId", "userId");
