/*
  Warnings:

  - The primary key for the `Court` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CourtComplex` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "eCourtCase_courtId_court_id_fk";

-- DropForeignKey
ALTER TABLE "Court" DROP CONSTRAINT "court_complexId_courtComplex_id_fk";

-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "courtId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Court" DROP CONSTRAINT "Court_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "complexId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Court_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CourtComplex" DROP CONSTRAINT "CourtComplex_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CourtComplex_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "eCourtCase_courtId_court_id_fk" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "court_complexId_courtComplex_id_fk" FOREIGN KEY ("complexId") REFERENCES "CourtComplex"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
