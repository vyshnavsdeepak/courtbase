import { Button } from "@court-base/ui/button";

import ManualCaseImportDialogButton from "~/app/_components/cases/manual-case-import";
import { ManualCaseImportJobs } from "~/app/_components/cases/manual-case-import-jobs";
import SidebarToggle from "~/app/_components/sidebar-toggle";

export default function CasesImportsPage() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div></div>
      <div className="sticky top-0 z-10 flex justify-between bg-shade">
        <SidebarToggle className="lg:hidden" />
        <div className="m-2 flex w-full justify-end">
          <ManualCaseImportDialogButton>
            <Button className="">Import Case</Button>
          </ManualCaseImportDialogButton>
        </div>
      </div>
      <ManualCaseImportJobs />
    </div>
  );
}
