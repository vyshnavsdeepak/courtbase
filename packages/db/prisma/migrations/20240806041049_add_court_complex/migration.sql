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
    "courtCodes" TEXT[],
    "stateCode" TEXT NOT NULL,
    "districtCode" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "CourtComplex_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "district_state_stateCode_fk" FOREIGN KEY ("stateCode") REFERENCES "State"("stateCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourtComplex" ADD CONSTRAINT "courtComplex_stateCode_districtCode_fk" FOREIGN KEY ("stateCode", "districtCode") REFERENCES "District"("stateCode", "districtCode") ON DELETE NO ACTION ON UPDATE NO ACTION;
