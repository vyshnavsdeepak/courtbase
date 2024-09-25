import qs from "qs";

import { AllCaseRequestSchema } from "@court-base/api/schemas/cases";

import type { SearchParams } from "~/app/types";
import CaseGroupedView from "~/app/_components/cases/cases-grouped-view";
import SidebarToggle from "~/app/_components/sidebar-toggle";

export default function CasesGroupedPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const qsParams = qs.parse(searchParams);
  const caseReqParams = AllCaseRequestSchema.parse(qsParams);
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="mt-2 flex w-full flex-col gap-4">
          <div className="flex h-full flex-col">
            <div>
              <SidebarToggle className="lg:hidden" />
            </div>
            <CaseGroupedView caseConditions={caseReqParams} />
          </div>
        </div>
      </div>
    </div>
  );
}
