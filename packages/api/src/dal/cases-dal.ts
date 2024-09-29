import { kysely } from "@court-base/db";

interface CaseData {
  typeName: string;
  number: string;
  regYear: string;
  courtId: string;
  organizationId: string;
}

const casesDal = {
  getCaseByCaseNo: async (data: CaseData) => {
    const { typeName, number, regYear, courtId, organizationId } = data;
    return await kysely
      .selectFrom("Case")
      .select(["id", "crn"])
      .where("number", "=", number)
      .where("regYear", "=", regYear)
      .where("typeName", "=", typeName)
      .where("courtId", "=", courtId)
      .where("organizationId", "=", organizationId)
      .executeTakeFirst();
  },
};

export default casesDal;
