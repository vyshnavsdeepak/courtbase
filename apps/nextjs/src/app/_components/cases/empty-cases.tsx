import React from "react";
import { Icons } from "@court-base/ui/icons";
import { Button } from "@court-base/ui/button";
import CaseImportDialogButton from "~/app/_components/cases/case-import-dialog-button";

export default function EmptyCases() {
  return (
    <div className="flex flex-col items-center justify-center container">
      <Icons.cases className="w-16 h-16 mb-4" />
      <h2 className="text-2xl font-semibold">Cases</h2>
      <p className="mt-2 text-center text-gray-400">
        Start by clicking the "Add New Case" button to enter your legal case details. This is your first step in managing your cases efficiently.
      </p>
      <div className="mt-6 gap-4 flex md:flex-row flex-col justify-center items-center">
        <Button className="w-56">Add New Case</Button>
        <CaseImportDialogButton>
          <Button variant="outline" className="w-56">🪄 Import Cases (No magic!)</Button>
        </CaseImportDialogButton>
      </div>
    </div>
  );
}
