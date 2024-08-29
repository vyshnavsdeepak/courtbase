"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { z } from "zod";

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
});

type CaseTableRows = z.infer<typeof _CaseTableRowsSchema>;

export const columns: ColumnDef<CaseTableRows>[] = [
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
    header: "Next Hearing Date",
    cell: ({ row }) => {
      return row.original.nextHearingDate
        ? new Date(row.original.nextHearingDate).toLocaleDateString()
        : null;
    },
  },
  {
    accessorKey: "advocateId",
    header: "Advocate",
    cell: ({ row }) => {
      return row.original.advocateName;
    },
  },
];

export const sampleData: CaseTableRows[] = [
  {
    crn: "1234567890",
    courtId: "1",
    courtName: "Test Court",
    typeName: "OP",
    number: "1234",
    regYear: "2021",
    title: "Test Case",
    nextHearingDate: new Date("2021-01-01"),
    advocateId: "1",
    advocateName: "Test Advocate",
  },
  {
    crn: "1234567891",
    courtId: "2",
    courtName: "Test Court 2",
    typeName: "OP",
    number: "1235",
    regYear: "2022",
    title: "Test Case 2",
    nextHearingDate: new Date("2022-01-01"),
    advocateId: "2",
    advocateName: "Test Advocate 2",
  },
];
