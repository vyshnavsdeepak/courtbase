"use client";

import React from "react";
import { format } from "date-fns";

import { Badge } from "@court-base/ui/badge";
import { Card } from "@court-base/ui/card";

import { api } from "~/trpc/react";

// Minimal Shimmer component for loading effect
const Shimmer = () => (
  <div className="animate-pulse rounded-lg bg-gray-200 p-4">
    <div className="h-2 rounded bg-gray-400"></div>
    <div className="mt-2 h-2 rounded bg-gray-400"></div>
    <div className="mt-2 h-2 rounded bg-gray-400"></div>
  </div>
);

export const ManualCaseImportJobs = () => {
  const { data, error, isLoading } =
    api.caseImport.importJobsByCaseNumber.useQuery();

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {isLoading ? (
        <>
          <Shimmer />
          <Shimmer />
          <Shimmer />
        </>
      ) : (
        data?.map((job) => (
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
        ))
      )}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};
