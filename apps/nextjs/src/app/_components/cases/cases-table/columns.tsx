"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { z } from "zod";
import moment from "moment";

import { AllCaseResponseSchema } from "@court-base/api/schemas/cases";
import { Button } from "@court-base/ui/button";
import { Icons } from "@court-base/ui/icons";

import { CaseEditDialog } from "./case-title-edit";

const _CaseTableRowsSchema = AllCaseResponseSchema.element.pick({
  crn: true,
  courtId: true,
  courtName: true,
  typeName: true,
  number: true,
  regYear: true,
  title: true,
  customTitle: true,
  nextHearingDate: true,
  advocateNames: true,
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
    header: () => <div className="hidden text-right md:block">CRN</div>,
    cell: ({ row }) => {
      return (
        <div className="hidden text-right md:block">{row.original.crn}</div>
      );
    },
  },
  {
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
    header: "Title",
    cell: ({ row }) => {
      return row.original.customTitle ?? row.original.title;
    },
  },
  {
    id: "edit",
    header: "",
    cell: ({ row }) => {
      return (
        <CaseEditDialog
          data={{
            crn: row.original.crn,
            originalTitle: row.original.title,
            customTitle: row.original.customTitle,
          }}
        >
          <Button variant={"outline"} size={"icon"} className="ml-2 min-w-10">
            <Icons.edit size={10} />
          </Button>
        </CaseEditDialog>
      );
    },
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
    header: "Advocate(s)",
    cell: ({ row }) => {
      return row.original.advocateNames.join(", ");
    },
  },
  {
    header: "Last Updated",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground" suppressHydrationWarning>
        {row.original.updatedAt
          ? moment(row.original.updatedAt).fromNow()
          : "Pending"}
      </div>
    ),
  },
];
