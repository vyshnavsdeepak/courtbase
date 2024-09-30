"use client";

import React from "react";
import Link from "next/link";
import {
  format,
  formatDistanceToNow,
  isWithinInterval,
  subDays,
} from "date-fns";

import type { CaseImportJobsResponseType } from "@court-base/api/schemas/cases";
import type { CaseImportTaskStatusType } from "@court-base/db/models";
import { Button } from "@court-base/ui/button";
import { Icons } from "@court-base/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@court-base/ui/table";

import { useOrg } from "~/app/_contexts/org-context";
import { api } from "~/trpc/react";

const getStatusIcon = (status: CaseImportTaskStatusType) => {
  switch (status) {
    case "PENDING":
      return <Icons.caseImportPending className="h-5 w-5 text-yellow-500" />;
    case "IN_PROGRESS":
      return (
        <Icons.caseImportInProgress className="h-5 w-5 animate-spin text-blue-500" />
      );
    case "COMPLETED":
      return <Icons.caseImportCompleted className="h-5 w-5 text-green-500" />;
    case "FAILED":
      return <Icons.caseImportFailed className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const formatDate = (date: Date) => {
  const now = new Date();

  if (isWithinInterval(date, { start: subDays(now, 7), end: now })) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  return format(date, "yyyy-MM-dd");
};

export default function ManualCaseImportJobs({
  initialData,
}: {
  initialData: CaseImportJobsResponseType;
}) {
  const {
    data: tasks,
    error,
    refetch,
    isFetching,
  } = api.caseImport.importJobsByCaseNumber.useQuery(undefined, {
    initialData,
  });

  const org = useOrg();

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Case Import Tasks</h2>
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          variant="outline"
          size="sm"
          className="flex items-center"
        >
          {isFetching ? (
            <>
              <Icons.caseImportRefreshLoading className="mr-2 h-4 w-4 animate-spin" />
              <span className="w-20">Refreshing...</span>
            </>
          ) : (
            <>
              <Icons.caseImportRefresh className="mr-2 h-4 w-4" />
              <span className="w-20">Refresh</span>
            </>
          )}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case Type</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Court Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.caseType}</TableCell>
              <TableCell className="font-medium">
                {task.crn ? (
                  <Link
                    href={org.getPath(`/cases/${task.crn}`)}
                    className="underline"
                  >
                    {task.number}/{task.regYear}
                  </Link>
                ) : (
                  `${task.number}/${task.regYear}`
                )}
              </TableCell>
              <TableCell>{task.courtName ?? "N/A"}</TableCell>
              <TableCell>{formatDate(task.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(task.importStatus)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
}

export const Shimmer = () => {
  return (
    <div className="container mx-auto py-10">
      <h2 className="mb-4 text-2xl font-bold">Case Import Tasks</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case Type</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Court Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 w-1/3 animate-pulse rounded bg-gray-300"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
