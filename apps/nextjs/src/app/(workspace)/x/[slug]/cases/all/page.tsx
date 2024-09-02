import { Suspense } from "react";
import qs from "qs";

import type { CasesResponseTypeComplete } from "@court-base/api/schemas/cases";
import { AllCaseRequestSchema } from "@court-base/api/schemas/cases";
import { DataTableSkeleton } from "@court-base/ui/data-table/data-table-skeleton";

import type { SearchParams } from "~/app/types";
import { CaseTable } from "~/app/_components/cases/cases-table";
import { columns } from "~/app/_components/cases/cases-table/columns";
import { DatePickerWithPresets } from "~/app/_components/cases/cases-table/date-range-picker";
import EmptyCases from "~/app/_components/cases/empty-cases";
import SidebarToggle from "~/app/_components/sidebar-toggle";
import { api } from "~/trpc/server";

interface CasesPageData {
  casesData: CasesResponseTypeComplete;
  casesCount: number;
}

async function fetchCasesData(
  searchParams: SearchParams,
): Promise<CasesPageData> {
  const qsParams = qs.parse(searchParams);
  const caseReqParams = AllCaseRequestSchema.parse(qsParams);

  const [casesData, casesCount] = await Promise.all([
    api.cases.all(caseReqParams),
    api.cases.count(),
  ]);

  return { casesData, casesCount };
}

export default async function CasesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { casesData, casesCount } = await fetchCasesData(searchParams);
  const key = qs.stringify(searchParams);
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <div>
          <SidebarToggle className="lg:hidden" />
        </div>
        <div className="flex flex-1">
          {casesCount > 0 ? (
            <div className="mt-2 flex w-full flex-col gap-4">
              <Suspense
                key={key}
                fallback={
                  <DataTableSkeleton
                    columnCount={5}
                    searchableColumnCount={1}
                    filterableColumnCount={2}
                    cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
                    shrinkZero
                  />
                }
              >
                <DatePickerWithPresets />
                <CaseTable columns={columns} data={casesData.data} />
              </Suspense>
            </div>
          ) : (
            <EmptyCases />
          )}
        </div>
      </div>
    </div>
  );
}
