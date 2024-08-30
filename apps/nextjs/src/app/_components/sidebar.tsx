"use client";

import { useEffect, useRef } from "react";

import { workspaceLinks } from "../_constants/data";
import { useSidebar } from "../_contexts/sidebar-context";
import { DashboardNav } from "./dashboard-nav";
import SidebarToggle from "./sidebar-toggle";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSidebar]);

  return (
    <aside
      ref={sidebarRef}
      className={`z-20 absolute mx-auto block min-h-full w-72 bg-background px-2 py-4 transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SidebarToggle className="md:hidden" />
      <div className="mb-6 flex items-center">
        {/* <AccountDropdown user={{
          name: session.user.name,
          image: session.user.image,
        }} /> */}
      </div>
      <DashboardNav workspaceLinks={workspaceLinks} />
    </aside>
  );
}
