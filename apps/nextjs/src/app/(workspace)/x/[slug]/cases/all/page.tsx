import React from "react";

import type { CasesResponseTypeComplete } from "@court-base/api/schemas/cases";
import { DataTableSkeleton } from "@court-base/ui/data-table/data-table-skeleton";

import type { SearchParams } from "~/app/types";
import { CaseTable } from "~/app/_components/cases/cases-table";
import { columns } from "~/app/_components/cases/cases-table/columns";
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
    <>
      {/* <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
    <DateRangePicker
      triggerSize="sm"
      triggerClassName="ml-auto w-56 sm:w-60"
      align="end"
      portal={false}
      />
  </React.Suspense> */}
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
    </>
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
  console.log("searchParams", searchParams);
  // const caseReqParams = AllCaseRequestSchema.parse(searchParams);
  const casesPromise = api.cases.all({});
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
