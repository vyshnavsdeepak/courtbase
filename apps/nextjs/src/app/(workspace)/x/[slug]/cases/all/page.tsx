import qs from "qs";

import { AllCaseRequestSchema } from "@court-base/api/schemas/cases";

import type { SearchParams } from "~/app/types";
import { CasesTableRenderClient } from "~/app/_components/cases/cases-table-render-client";
import EmptyCases from "~/app/_components/cases/empty-cases";
import SidebarToggle from "~/app/_components/sidebar-toggle";
import { api } from "~/trpc/server";

export default async function CasesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const qsParams = qs.parse(searchParams);
  const caseReqParams = AllCaseRequestSchema.parse(qsParams);
  const hasCases = await api.cases.hasOne();
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="mt-2 flex w-full flex-col gap-4">
          {hasCases ? (
            <CasesTableRenderClient caseConditions={caseReqParams}>
              <SidebarToggle className="lg:hidden" />
            </CasesTableRenderClient>
          ) : (
            <div className="flex h-full flex-col">
              <div>
                <SidebarToggle className="lg:hidden" />
              </div>
              <EmptyCases className="h-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
