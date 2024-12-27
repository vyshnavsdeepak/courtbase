import React, { Suspense } from "react";
import qs from "qs";

import { AllCaseRequestSchema } from "@court-base/api/schemas/cases";

import type { SearchParams } from "~/app/types";
import { CasesFetchComponent } from "~/app/_components/cases/cases-fetch-component";
import CasesTableLoadingShimmer from "~/app/_components/cases/cases-table/cases-table-loading-shimmer";
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
