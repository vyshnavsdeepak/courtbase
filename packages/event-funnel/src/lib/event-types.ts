import type { ImportByCourtComplexParams } from "../functions/case-import";
import type {
  ImportCaseByCaseNoAbort,
  ImportCaseByCaseNoParams,
} from "../functions/case-import-by-case-no";
import type { eCourtAPICallParams } from "../functions/ecourt";
import type { RefreshEcourtCasesParams } from "../functions/refresh-ecourt-cases";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type EventsMap = {
  "app/import-by-court-complex": ImportByCourtComplexParams;
  "app/refresh-ecourt-cases": RefreshEcourtCasesParams;
  "app/case-import-by-case-no": ImportCaseByCaseNoParams;
  "app/case-import-by-case-no/abort": ImportCaseByCaseNoAbort;
  "test/hello-world": object;
  "ecourt/api-call": eCourtAPICallParams;
};
