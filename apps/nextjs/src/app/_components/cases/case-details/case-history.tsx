"use client";

import { useState } from "react";
import { format } from "date-fns";

import type { CaseHistoryResponse } from "@court-base/api/schemas/cases";
import { Button } from "@court-base/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@court-base/ui/table";
import { Textarea } from "@court-base/ui/textarea";

import { api } from "~/trpc/react";

function TableRowComponent({
  hearing,
  onNoteChange,
}: {
  hearing: CaseHistoryResponse[number];
  onNoteChange: (value: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <TableRow key={hearing.businessOnDate.getTime()}>
        <TableCell>{format(hearing.businessOnDate, "dd-MM-yyyy")}</TableCell>
        <TableCell>{hearing.purposeOfHearing}</TableCell>
        <TableCell>{format(hearing.businessOnDate, "dd-MM-yyyy")}</TableCell>
        <TableCell>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Notes" : "Add Notes"}
          </Button>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={4}>
            <Textarea
              placeholder="Add your notes here..."
              value={hearing.notes ?? ""}
              onChange={(e) => onNoteChange(e.target.value)}
              rows={3}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default function CaseHistory({ crn }: { crn: string }) {
  const { data: hearings, isLoading } = api.cases.history.useQuery(
    { crn },
    {
      initialData: [],
    },
  );

  console.log({ isLoading, crn, hearings });
  const handleNoteChange = (businessOnDate: number, value: string) => {
    console.log("Note changed for", businessOnDate, value);
  };

  return (
    <div className="container mx-auto space-y-4 p-4">
      <h1 className="mb-4 text-2xl font-bold">Court Hearings</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Date</TableHead>
              <TableHead>Purpose of Hearing</TableHead>
              <TableHead>Hearing Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hearings.map((hearing) => (
              <TableRowComponent
                key={hearing.businessOnDate.toString()}
                hearing={hearing}
                onNoteChange={(value) =>
                  handleNoteChange(hearing.businessOnDate.getTime(), value)
                }
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Button type="button" disabled>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
