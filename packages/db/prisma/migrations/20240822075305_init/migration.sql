-- CreateEnum
CREATE TYPE "OrgDesignation" AS ENUM ('ADVOCATE', 'STAFF');

-- CreateEnum
CREATE TYPE "OrgRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "AdvocateCaseSide" AS ENUM ('PETITIONER', 'RESPONDENT', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "CaseImportTaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Account" (
    "userId" UUID NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "provider" VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    "refresh_token" VARCHAR(255),
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" VARCHAR(255),
    "scope" VARCHAR(255),
    "id_token" TEXT,
    "session_state" VARCHAR(255),

    CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(256) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" VARCHAR(255) NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "emailVerified" TIMESTAMPTZ(6),
    "image" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "token" VARCHAR(255) NOT NULL,
    "identifier" VARCHAR(255) NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationMembers" (
    "organizationId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "OrgRole" NOT NULL DEFAULT 'MEMBER',
    "designation" "OrgDesignation",

    CONSTRAINT "organizationMembers_organizationId_userId_pk" PRIMARY KEY ("organizationId","userId")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "crn" VARCHAR(16) NOT NULL,
    "courtId" UUID NOT NULL,
    "typeName" VARCHAR(50) NOT NULL,
    "number" VARCHAR(4) NOT NULL,
    "regYear" VARCHAR(4) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "petitioner" VARCHAR(255) NOT NULL,
    "petitionerLawyers" VARCHAR(255) NOT NULL,
    "respondent" VARCHAR(255) NOT NULL,
    "respondentLawyers" VARCHAR(255) NOT NULL,
    "dateOfDecision" DATE,
    "nextHearingDate" DATE,
    "side" "AdvocateCaseSide" NOT NULL,
    "extraPetitioners" VARCHAR(255),
    "extraRespondents" VARCHAR(255),
    "extraParties" VARCHAR(255),
    "rawData" JSON NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "organizationId" UUID NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "State" (
    "stateCode" VARCHAR(2) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("stateCode")
);

-- CreateTable
CREATE TABLE "District" (
    "name" VARCHAR(255) NOT NULL,
    "stateCode" VARCHAR(2) NOT NULL,
    "districtCode" VARCHAR(2) NOT NULL,

    CONSTRAINT "district_stateCode_districtCode_pk" PRIMARY KEY ("stateCode","districtCode")
);

-- CreateTable
CREATE TABLE "CourtComplex" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "stateCode" TEXT NOT NULL,
    "districtCode" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "CourtComplex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Court" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "courtCode" VARCHAR(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "complexId" UUID NOT NULL,
    "stateCode" VARCHAR(2) NOT NULL,
    "districtCode" VARCHAR(2) NOT NULL,

    CONSTRAINT "Court_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseImportTask" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" UUID NOT NULL,
    "courtComplexIds" JSONB,
    "advocateName" VARCHAR(255) NOT NULL,
    "caseStatus" TEXT NOT NULL,
    "taskStatus" "CaseImportTaskStatus" NOT NULL DEFAULT 'PENDING',
    "taskMeta" JSONB,
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "courtComplexId" UUID,

    CONSTRAINT "CaseImportTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verificationToken_identifier_token_unique" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "case_organization_typeName_number_regYear_courtId_unique" ON "Case"("organizationId", "typeName", "number", "regYear", "courtId");

-- CreateIndex
CREATE UNIQUE INDEX "case_organization_organization_id_fk" ON "Case"("organizationId", "crn");

-- CreateIndex
CREATE UNIQUE INDEX "advocateCase_caseId_advocateId_unique" ON "AdvocateCase"("caseId", "advocateId");

-- CreateIndex
CREATE UNIQUE INDEX "court_stateCode_districtCode_courtCode_unique" ON "Court"("stateCode", "districtCode", "courtCode");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "eCourtCase_organization_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "eCourtCase_courtId_court_id_fk" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AdvocateCase" ADD CONSTRAINT "advocateCase_advocateId_organizationId_fk" FOREIGN KEY ("advocateId", "organizationId") REFERENCES "OrganizationMembers"("userId", "organizationId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "district_state_stateCode_fk" FOREIGN KEY ("stateCode") REFERENCES "State"("stateCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourtComplex" ADD CONSTRAINT "courtComplex_stateCode_districtCode_fk" FOREIGN KEY ("stateCode", "districtCode") REFERENCES "District"("stateCode", "districtCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "court_district_stateCode_districtCode_fk" FOREIGN KEY ("stateCode", "districtCode") REFERENCES "District"("stateCode", "districtCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "court_complexId_courtComplex_id_fk" FOREIGN KEY ("complexId") REFERENCES "CourtComplex"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "caseImportTask_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "caseImportTask_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseImportTask" ADD CONSTRAINT "CaseImportTask_courtComplexId_fkey" FOREIGN KEY ("courtComplexId") REFERENCES "CourtComplex"("id") ON DELETE SET NULL ON UPDATE CASCADE;
