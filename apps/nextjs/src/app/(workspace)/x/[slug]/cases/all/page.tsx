import React, { Suspense } from "react";
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

const CasesMainComponent = ({
  promise,
}: {
  promise: Promise<CasesPageData>;
}) => {
  const { casesData, casesCount } = React.use(promise);
  return (
    <>
      {casesCount > 0 ? (
        <>
          <DatePickerWithPresets />
          <CaseTable columns={columns} data={casesData.data} />
        </>
      ) : (
        <EmptyCases />
      )}
    </>
  );
};

export default function CasesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const promise = fetchCasesData(searchParams);
  const key = qs.stringify(searchParams);
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <div>
          <SidebarToggle className="lg:hidden" />
        </div>
        <div className="flex flex-1">
          <div className="mt-2 flex max-w-full flex-col gap-4">
            <Suspense
              key={key}
              fallback={
                <DataTableSkeleton
                  columnCount={7}
                  searchableColumnCount={1}
                  filterableColumnCount={2}
                  cellWidths={[
                    "10rem",
                    "10rem",
                    "10rem",
                    "20rem",
                    "8rem",
                    "8rem",
                    "8rem",
                  ]}
                />
              }
            >
              <CasesMainComponent promise={promise} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
