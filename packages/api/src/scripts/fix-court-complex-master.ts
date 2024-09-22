import { kysely } from "@court-base/db";

const complexes = await kysely
  .selectFrom("CourtComplex")
  .select(["id", "name", "isMasterCourtComplex", "masterComplexCourtCode"])
  .execute();

const complexIds = complexes.map((complex) => complex.id);
const courts = await kysely
  .selectFrom("DistrictCourt")
  .select(["id", "name", "complexId"])
  .where("complexId", "in", complexIds)
  .execute();

const courtsByComplexId = courts.reduce((acc, court) => {
  acc.set(court.complexId, (acc.get(court.complexId) ?? []).concat(court));
  return acc;
}, new Map<string, (typeof courts)[number][]>());

const res = complexes.map((complex) => {
  const courts = courtsByComplexId.get(complex.id) ?? [];
  return {
    ...complex,
    courts,
  };
});

const faultyComplexes = res.filter(
  (complex) => complex.courts.length > 0 && complex.isMasterCourtComplex,
);

await kysely
  .updateTable("CourtComplex")
  .set({
    isMasterCourtComplex: false,
  })
  .where(
    "id",
    "in",
    faultyComplexes.map((complex) => complex.id),
  )
  .execute();

console.log("Fixed master court complexes", faultyComplexes.length);
