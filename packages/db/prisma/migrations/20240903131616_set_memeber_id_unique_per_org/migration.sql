/*
  Warnings:

  - A unique constraint covering the columns `[organizationId,memberId]` on the table `OrganizationMembers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `memberId` on table `OrganizationMembers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AdvocateCase" DROP CONSTRAINT "advocateCase_advocateId_organizationId_fk";

-- AlterTable
ALTER TABLE "OrganizationMembers" ALTER COLUMN "memberId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizationMembers_organizationId_memberId_unique" ON "OrganizationMembers"("organizationId", "memberId");
