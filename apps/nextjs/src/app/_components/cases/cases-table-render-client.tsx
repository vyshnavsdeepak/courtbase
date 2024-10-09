"use client";

import type { z } from "zod";
import React from "react";

import type {
  AllCaseRequestSchema,
  AllCaseResponseSchema,
} from "@court-base/api/schemas/cases";

import { CaseTable } from "~/app/_components/cases/cases-table";
import { ClearFiltersButton } from "~/app/_components/cases/cases-table/clear-filters";
import { columns } from "~/app/_components/cases/cases-table/columns";
import { DatePickerWithPresets } from "~/app/_components/cases/cases-table/date-range-picker";
import { ManualCaseImportTrigger } from "~/app/_components/cases/manual-case-import";
import { api } from "~/trpc/react";

export const CasesTableRenderClient = ({
  children,
  caseConditions,
  initialData,
}: {
  children: React.ReactNode;
  caseConditions: z.infer<typeof AllCaseRequestSchema>;
  initialData: { data: z.infer<typeof AllCaseResponseSchema> };
}) => {
  const { data } = api.cases.all.useQuery(caseConditions, {
    initialData,
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex justify-stretch bg-shade">
        {children}
        <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
          <DatePickerWithPresets />
          <ClearFiltersButton />
        </div>
        <div className="flex items-center">
          <ManualCaseImportTrigger />
        </div>
      </div>
      <div className="flex flex-col">
        <CaseTable columns={columns} data={data.data} />
      </div>
    </div>
  );
};
