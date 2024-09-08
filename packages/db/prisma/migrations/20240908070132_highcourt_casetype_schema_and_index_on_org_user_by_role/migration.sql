-- CreateTable
CREATE TABLE "HighCourt" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "HighCourt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighCourtJurisdiction" (
    "highCourtId" TEXT NOT NULL,
    "stateCode" VARCHAR(2) NOT NULL,

    CONSTRAINT "HighCourtJurisdiction_pkey" PRIMARY KEY ("highCourtId","stateCode")
);

-- CreateTable
CREATE TABLE "CaseType" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "highCourtId" TEXT NOT NULL,

    CONSTRAINT "CaseType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HighCourtJurisdiction_stateCode_idx" ON "HighCourtJurisdiction"("stateCode");

-- CreateIndex
CREATE UNIQUE INDEX "CaseType_highCourtId_code_key" ON "CaseType"("highCourtId", "code");

-- CreateIndex
CREATE INDEX "organizationMembers_organizationId_designation_idx" ON "OrganizationMembers"("organizationId", "designation");

-- AddForeignKey
ALTER TABLE "HighCourtJurisdiction" ADD CONSTRAINT "HighCourtJurisdiction_highCourtId_fkey" FOREIGN KEY ("highCourtId") REFERENCES "HighCourt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighCourtJurisdiction" ADD CONSTRAINT "HighCourtJurisdiction_stateCode_fkey" FOREIGN KEY ("stateCode") REFERENCES "State"("stateCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseType" ADD CONSTRAINT "CaseType_highCourtId_fkey" FOREIGN KEY ("highCourtId") REFERENCES "HighCourt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
