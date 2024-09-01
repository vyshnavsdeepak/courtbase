import qs from "querystring";
import React from "react";

import type { CasesResponseTypeComplete } from "@court-base/api/schemas/cases";
import { AllCaseRequestSchema } from "@court-base/api/schemas/cases";
import { DataTableSkeleton } from "@court-base/ui/data-table/data-table-skeleton";
import { Skeleton } from "@court-base/ui/skeleton";

import type { SearchParams } from "~/app/types";
import { CaseTable } from "~/app/_components/cases/cases-table";
import { columns } from "~/app/_components/cases/cases-table/columns";
import { DatePickerWithPresets } from "~/app/_components/cases/cases-table/date-range-picker";
import EmptyCases from "~/app/_components/cases/empty-cases";
import SidebarToggle from "~/app/_components/sidebar-toggle";
import { api } from "~/trpc/server";

interface CasesPageProps {
  searchParams: SearchParams;
}

function CasesTableSuspense({
  casesPromise,
}: {
  casesPromise: Promise<CasesResponseTypeComplete>;
}) {
  return (
    <div className="mt-2 flex flex-col gap-4">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        <DatePickerWithPresets />
      </React.Suspense>
      <React.Suspense
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
        {/**
         * Passing promises and consuming them using React.use for triggering the suspense fallback.
         * @see https://react.dev/reference/react/use
         */}
        <CasesTableFormatter casesPromise={casesPromise} />
      </React.Suspense>
    </div>
  );
}

function CasesTableFormatter({
  casesPromise,
}: {
  casesPromise: Promise<CasesResponseTypeComplete>;
}) {
  const cases = React.use(casesPromise);
  const data = cases.data;
  return <CaseTable columns={columns} data={data} />;
}

export default async function CasesPage({ searchParams }: CasesPageProps) {
  const filters = qs.parse(searchParams.filters as string);
  const sort = qs.parse(searchParams.sort as string);
  const paramsToParse: {
    filters?: object;
    sort?: object;
  } = {};

  // Conditionally add filters and sort if they are not empty objects
  if (Object.keys(filters).length > 0) {
    paramsToParse.filters = filters;
  }

  if (Object.keys(sort).length > 0) {
    paramsToParse.sort = sort;
  }

  const caseReqParams = AllCaseRequestSchema.parse(paramsToParse);
  const casesPromise = api.cases.all(caseReqParams);
  const casesCount = await api.cases.count();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <div>
          <SidebarToggle className="lg:hidden" />
        </div>
        <div className="flex flex-1">
          {casesCount > 0 ? (
            <CasesTableSuspense casesPromise={casesPromise} />
          ) : (
            <EmptyCases />
          )}
        </div>
      </div>
    </div>
  );
}
