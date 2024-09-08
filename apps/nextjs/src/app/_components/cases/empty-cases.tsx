import React from "react";

import { cn } from "@court-base/ui";
import { Button } from "@court-base/ui/button";
import { Icons } from "@court-base/ui/icons";

import CaseImportDialogButton from "~/app/_components/cases/case-import-dialog-button";
import ManualCaseImportDialogButton from "./manual-case-import";

export default function EmptyCases({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "container flex flex-col items-center justify-center",
        className,
      )}
    >
      <Icons.cases className="mb-4 h-16 w-16" />
      <h2 className="text-2xl font-semibold">Cases</h2>
      <p className="mt-2 text-center text-gray-400">
        Start by clicking the "Add New Case" button to enter your legal case
        details. This is your first step in managing your cases efficiently.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row">
        <ManualCaseImportDialogButton>
          <Button className="w-56">Import Case</Button>
        </ManualCaseImportDialogButton>
        <CaseImportDialogButton>
          <Button variant="outline" className="w-56">
            🪄 Import by Advocate name
          </Button>
        </CaseImportDialogButton>
      </div>
    </div>
  );
}
