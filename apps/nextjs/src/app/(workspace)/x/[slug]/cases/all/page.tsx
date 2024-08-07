import React from "react";
import EmptyCases from "~/app/_components/cases/empty-cases";
import SidebarToggle from "~/app/_components/sidebar-toggle";

export default function CasesPage() {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex flex-col flex-1">
        <div>
          <SidebarToggle className="lg:hidden" />
        </div>
        <div className="flex-1 flex">
          <EmptyCases />
        </div>
      </div>
    </div>
  );
}
