/*
  Warnings:

  - You are about to drop the column `courtCodes` on the `CourtComplex` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CourtComplex" DROP COLUMN "courtCodes";

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

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "court_district_stateCode_districtCode_fk" FOREIGN KEY ("stateCode", "districtCode") REFERENCES "District"("stateCode", "districtCode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "court_complexId_courtComplex_id_fk" FOREIGN KEY ("complexId") REFERENCES "CourtComplex"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
