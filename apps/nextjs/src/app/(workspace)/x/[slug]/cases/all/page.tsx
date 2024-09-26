import type { z } from "zod";
import React, { Suspense } from "react";
import qs from "qs";

import type { AllCaseResponseSchema } from "@court-base/api/schemas/cases";
import { AllCaseRequestSchema } from "@court-base/api/schemas/cases";

import type { SearchParams } from "~/app/types";
import { CasesTableRenderClient } from "~/app/_components/cases/cases-table-render-client";
import CasesTableLoadingShimmer from "~/app/_components/cases/cases-table/cases-table-loading-shimmer";
import EmptyCases from "~/app/_components/cases/empty-cases";
import SidebarToggle from "~/app/_components/sidebar-toggle";
import { api } from "~/trpc/server";

type AllCaseRequestType = z.infer<typeof AllCaseResponseSchema>;
export function CasesFetchComponent({
  caseReqParams,
  promise,
}: {
  caseReqParams: z.infer<typeof AllCaseRequestSchema>;
  promise: Promise<{ data: AllCaseRequestType }>;
}) {
  const response = React.use(promise);
  return (
    <CasesTableRenderClient
      caseConditions={caseReqParams}
      initialData={response}
    >
      <SidebarToggle className="lg:hidden" />
    </CasesTableRenderClient>
  );
}

export default async function CasesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const qsParams = qs.parse(searchParams);
  const caseReqParams = AllCaseRequestSchema.parse(qsParams);

  const hasCasesPromise = api.cases.hasOne();
  const casesResPromise = api.cases.all(caseReqParams);

  const hasCases = await hasCasesPromise;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="mt-2 flex w-full flex-col gap-4">
          {hasCases ? (
            <Suspense fallback={<CasesTableLoadingShimmer />}>
              <CasesFetchComponent
                caseReqParams={caseReqParams}
                promise={casesResPromise}
              />
              <SidebarToggle className="lg:hidden" />
            </Suspense>
          ) : (
            <div className="flex h-full flex-col">
              <SidebarToggle className="lg:hidden" />
              <EmptyCases className="h-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
