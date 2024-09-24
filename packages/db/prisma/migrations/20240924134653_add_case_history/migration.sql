-- CreateTable
CREATE TABLE "CaseHistoryItem" (
    "crn" VARCHAR(16) NOT NULL,
    "businessOnDate" DATE NOT NULL,
    "purposeOfHearing" VARCHAR(50) NOT NULL,
    "hearingDate" DATE NOT NULL,
    "notes" VARCHAR(255),
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "CaseHistoryItem_pkey" PRIMARY KEY ("crn")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseHistoryItem_organizationId_crn_businessOnDate_key" ON "CaseHistoryItem"("organizationId", "crn", "businessOnDate");

-- AddForeignKey
ALTER TABLE "CaseHistoryItem" ADD CONSTRAINT "CaseHistoryItem_organizationId_crn_fkey" FOREIGN KEY ("organizationId", "crn") REFERENCES "Case"("organizationId", "crn") ON DELETE CASCADE ON UPDATE NO ACTION;
