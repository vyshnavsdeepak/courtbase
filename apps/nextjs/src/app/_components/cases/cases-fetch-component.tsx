"use client";

import type { z } from "zod";
import React from "react";

import type {
  AllCaseRequestSchema,
  AllCaseResponseSchema,
} from "@court-base/api/schemas/cases";

import SidebarToggle from "../sidebar-toggle";
import { CasesTableRenderClient } from "./cases-table-render-client";

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
