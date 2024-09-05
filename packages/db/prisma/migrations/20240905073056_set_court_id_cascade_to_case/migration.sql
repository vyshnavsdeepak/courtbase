-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "eCourtCase_courtId_court_id_fk";

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "eCourtCase_courtId_court_id_fk" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
