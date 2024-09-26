"use client";

import React from "react";
import { format } from "date-fns";

import type { CaseImportJobsResponseType } from "@court-base/api/schemas/cases";
import { Badge } from "@court-base/ui/badge";
import { Card } from "@court-base/ui/card";

import { api } from "~/trpc/react";

export const ManualCaseImportJobs = ({
  initialData,
}: {
  initialData: CaseImportJobsResponseType;
}) => {
  const { data, error } = api.caseImport.importJobsByCaseNumber.useQuery(
    undefined,
    {
      initialData,
    },
  );

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {data.map((job) => (
        <Card key={job.id} className="mb-4 p-2">
          <div className="font-bold">Case Type: {job.caseType}</div>
          <div className="text-sm">
            {job.caseType}/{job.number}/{job.regYear}
          </div>
          <div className="text-sm">
            Created At: {format(job.createdAt, "Pp")}
          </div>
          <Badge variant="outline" color="primary">
            {job.importStatus}
          </Badge>
        </Card>
      ))}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};
