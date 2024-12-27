-- AlterTable
ALTER TABLE "OrganizationMembers" ADD COLUMN     "name" VARCHAR(255) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "OrganizationInvite" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdByOrgId" TEXT NOT NULL,
    "createdByMemberId" TEXT NOT NULL,
    "role" "OrgRole" NOT NULL DEFAULT 'MEMBER',
    "designation" "OrgDesignation",
    "maxUses" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "OrganizationInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationInvite_code_key" ON "OrganizationInvite"("code");

-- CreateIndex
CREATE INDEX "OrganizationInvite_organizationId_idx" ON "OrganizationInvite"("organizationId");

-- CreateIndex
CREATE INDEX "OrganizationInvite_code_idx" ON "OrganizationInvite"("code");

-- CreateIndex
CREATE INDEX "OrganizationInvite_createdByOrgId_createdByMemberId_idx" ON "OrganizationInvite"("createdByOrgId", "createdByMemberId");

-- AddForeignKey
ALTER TABLE "OrganizationInvite" ADD CONSTRAINT "OrganizationInvite_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationInvite" ADD CONSTRAINT "OrganizationInvite_createdByOrgId_createdByMemberId_fkey" FOREIGN KEY ("createdByOrgId", "createdByMemberId") REFERENCES "OrganizationMembers"("organizationId", "memberId") ON DELETE CASCADE ON UPDATE CASCADE;
