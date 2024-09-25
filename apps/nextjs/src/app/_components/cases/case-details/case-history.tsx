"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDebounce } from "use-debounce";

import type { CaseHistoryResponse } from "@court-base/api/schemas/cases";
import { Button } from "@court-base/ui/button";
import { DataTableSkeleton } from "@court-base/ui/data-table/data-table-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@court-base/ui/table";
import { Textarea } from "@court-base/ui/textarea";
import { toast } from "@court-base/ui/toast";

import { api } from "~/trpc/react";

function TableRowComponent({
  hearing: hearingInput,
  crn,
}: {
  hearing: CaseHistoryResponse[number];
  crn: string;
}) {
  const apiUtils = api.useUtils();
  const [expanded, setExpanded] = useState(false);

  const businessOnDate = hearingInput.businessOnDate;
  const { mutate: mutateNote, isPending: isNoteMutating } =
    api.cases.updateHistoryNote.useMutation({
      onSuccess: () => {
        void apiUtils.cases.historyItem.invalidate({ crn, businessOnDate });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const { data: hearing } = api.cases.historyItem.useQuery(
    { crn, businessOnDate },
    { initialData: hearingInput },
  );

  const originalNotes = hearing.notes ?? "";
  const [notes, setNotes] = useState(originalNotes);
  const [debouncedNotes] = useDebounce(notes, 1000);

  useEffect(() => {
    if (debouncedNotes !== originalNotes) {
      mutateNote({
        businessOnDate: businessOnDate.toISOString(),
        crn,
        note: debouncedNotes,
      });
    }
  }, [debouncedNotes, businessOnDate, originalNotes, crn, mutateNote]);

  useEffect(() => {
    let toastId: string | number | undefined;
    if (isNoteMutating) {
      toastId = toast.loading("Saving note...");
    }
    return () => {
      if (toastId !== undefined) {
        toast.dismiss(toastId);
      }
    };
  }, [isNoteMutating]);

  const showHideLabel = expanded
    ? "Hide Notes"
    : notes.length > 0
      ? "Show Notes"
      : "Add Notes";

  return (
    <>
      <TableRow key={hearing.businessOnDate.getTime()}>
        <TableCell>{format(hearing.businessOnDate, "dd-MM-yyyy")}</TableCell>
        <TableCell>{hearing.purposeOfHearing}</TableCell>
        <TableCell>
          {hearing.hearingDate ? format(hearing.hearingDate, "dd-MM-yyyy") : ""}
        </TableCell>
        <TableCell>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {showHideLabel}
          </Button>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={4}>
            <Textarea
              placeholder="Add your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function HistoryTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={4}
      rowCount={5}
      cellWidths={["10rem", "20rem", "10rem", "10rem"]}
    />
  );
}

export default function CaseHistory({ crn }: { crn: string }) {
  const { data, isLoading, error } = api.cases.history.useQuery({ crn });
  const hearings = isLoading ? [] : data ? data : [];

  return (
    <div className="container mx-auto space-y-4 p-4">
      <h1 className="mb-4 text-2xl font-bold">Court Hearings</h1>
      {error && <p className="text-red-500">{error.message}</p>}
      <div className="rounded-md border">
        {isLoading ? (
          <HistoryTableSkeleton />
        ) : (
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
                  crn={crn}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
