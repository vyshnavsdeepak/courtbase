"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { z } from "zod";
import moment from "moment";

import { AllCaseResponseSchema } from "@court-base/api/schemas/cases";

const _CaseTableRowsSchema = AllCaseResponseSchema.pick({
  crn: true,
  courtId: true,
  courtName: true,
  typeName: true,
  number: true,
  regYear: true,
  title: true,
  nextHearingDate: true,
  advocateId: true,
  advocateName: true,
  updatedAt: true,
});

type CaseTableRows = z.infer<typeof _CaseTableRowsSchema>;

export const columns: ColumnDef<CaseTableRows>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "crn",
    header: "CRN",
  },
  {
    accessorKey: "courtId",
    header: "Court",
    cell: ({ row }) => {
      return row.original.courtName;
    },
  },
  {
    header: "Case No",
    cell: ({ row }) => {
      return `${row.original.typeName}/${row.original.number}/${row.original.regYear}`;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "nextHearingDate",
    header: () => <div className="text-right">Next Hearing Date</div>,
    cell: ({ row }) => {
      if (!row.original.nextHearingDate) return null;
      return (
        <div className="text-right">
          {moment(row.original.nextHearingDate).format("DD-MM-YYYY")}
        </div>
      );
    },
  },
  {
    accessorKey: "advocateId",
    header: "Advocate",
    cell: ({ row }) => {
      return row.original.advocateName;
    },
  },
  {
    header: "Last Updated",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground" suppressHydrationWarning>
        {moment(row.original.updatedAt).fromNow()}
      </div>
    ),
  },
];
