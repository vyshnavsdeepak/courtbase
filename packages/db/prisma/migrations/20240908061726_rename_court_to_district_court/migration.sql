-- Rename table
ALTER TABLE "Court" RENAME TO "DistrictCourt";

-- Rename constraint
ALTER TABLE "DistrictCourt" RENAME CONSTRAINT "Court_pkey" TO "DistrictCourt_pkey";

-- Rename index
ALTER INDEX "court_stateCode_districtCode_courtCode_unique" RENAME TO "districtcourt_stateCode_districtCode_courtCode_unique";

-- Update foreign key references
ALTER TABLE "Case" DROP CONSTRAINT "eCourtCase_courtId_court_id_fk",
ADD CONSTRAINT "eCourtCase_courtId_districtcourt_id_fk" FOREIGN KEY ("courtId") REFERENCES "DistrictCourt"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- No need to change these constraints as they reference the table, which has been renamed
-- "court_district_stateCode_districtCode_fk"
-- "court_complexId_courtComplex_id_fk"
