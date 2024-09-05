import React, { Suspense } from "react";
import qs from "qs";

import type { CasesResponseTypeComplete } from "@court-base/api/schemas/cases";
import { AllCaseRequestSchema } from "@court-base/api/schemas/cases";
import { DataTableSkeleton } from "@court-base/ui/data-table/data-table-skeleton";

import type { SearchParams } from "~/app/types";
import { CaseTable } from "~/app/_components/cases/cases-table";
import { ClearFiltersButton } from "~/app/_components/cases/cases-table/clear-filters";
import { columns } from "~/app/_components/cases/cases-table/columns";
import { DatePickerWithPresets } from "~/app/_components/cases/cases-table/date-range-picker";
import EmptyCases from "~/app/_components/cases/empty-cases";
import SidebarToggle from "~/app/_components/sidebar-toggle";
import { api } from "~/trpc/server";

interface CasesPageData {
  casesDataPromise: Promise<CasesResponseTypeComplete>;
  casesCountPromise: Promise<number>;
}

function fetchCasesData(searchParams: SearchParams): CasesPageData {
  const qsParams = qs.parse(searchParams);
  const caseReqParams = AllCaseRequestSchema.parse(qsParams);

  const casesDataPromise = api.cases.all(caseReqParams);
  const casesCountPromise = api.cases.count();

  return { casesDataPromise, casesCountPromise };
}

const CasesMainComponent = ({ promises }: { promises: CasesPageData }) => {
  const { casesDataPromise, casesCountPromise } = promises;
  const casesCount = React.use(casesCountPromise);
  if (casesCount === 0) {
    return <EmptyCases className="h-full" />;
  }

  const casesData = React.use(casesDataPromise);
  return (
    <>
      <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
        <DatePickerWithPresets />
        <ClearFiltersButton />
      </div>
      <CaseTable columns={columns} data={casesData.data} />
    </>
  );
};

export default function CasesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const promises = fetchCasesData(searchParams);
  const key = qs.stringify(searchParams);
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <div>
          <SidebarToggle className="lg:hidden" />
        </div>
        <div className="flex flex-1">
          <div className="mt-2 flex w-full flex-col gap-4">
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
              <CasesMainComponent promises={promises} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
