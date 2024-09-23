"use client";

import type { z } from "zod";
import React from "react";

import type { AllCaseRequestSchema } from "@court-base/api/schemas/cases";
import { DataTableSkeleton } from "@court-base/ui/data-table/data-table-skeleton";

import { CaseTable } from "~/app/_components/cases/cases-table";
import { ClearFiltersButton } from "~/app/_components/cases/cases-table/clear-filters";
import { columns } from "~/app/_components/cases/cases-table/columns";
import { DatePickerWithPresets } from "~/app/_components/cases/cases-table/date-range-picker";
import { ManualCaseImportInCasePage } from "~/app/_components/cases/manual-case-import";
import { api } from "~/trpc/react";

export const CasesTableRenderClient = ({
  children,
  caseConditions,
}: {
  children: React.ReactNode;
  caseConditions: z.infer<typeof AllCaseRequestSchema>;
}) => {
  const { isLoading, data } = api.cases.all.useQuery(caseConditions);
  if (isLoading) {
    return (
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
    );
  }

  if (!data?.data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Something went wrong. Please contact support.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex justify-stretch bg-shade">
        {children}
        <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
          <DatePickerWithPresets />
          <ClearFiltersButton />
        </div>
        <div className="flex items-center">
          <ManualCaseImportInCasePage />
        </div>
      </div>
      <div className="flex flex-col">
        <CaseTable columns={columns} data={data.data} />
      </div>
    </div>
  );
};
