import React from "react";

import EmptyCases from "~/app/_components/cases/empty-cases";
import SidebarToggle from "~/app/_components/sidebar-toggle";

export default function CasesPage() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <div>
          <SidebarToggle className="lg:hidden" />
        </div>
        <div className="flex flex-1">
          <EmptyCases />
        </div>
      </div>
    </div>
  );
}
