import type { ImportByCourtComplexParams } from "../functions/case-import";
import type { eCourtAPICallParams } from "../functions/ecourt";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type EventsMap = {
  "app/import-by-court-complex": ImportByCourtComplexParams;
  "test/hello-world": object;
  "ecourt/api-call": eCourtAPICallParams;
};
