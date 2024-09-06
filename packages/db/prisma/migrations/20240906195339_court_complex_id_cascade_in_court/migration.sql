-- DropForeignKey
ALTER TABLE "Court" DROP CONSTRAINT "court_complexId_courtComplex_id_fk";

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "court_complexId_courtComplex_id_fk" FOREIGN KEY ("complexId") REFERENCES "CourtComplex"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
