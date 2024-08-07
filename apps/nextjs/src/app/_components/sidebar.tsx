"use client";
import { DashboardNav } from "./dashboard-nav";
import AccountDropdown from "./account-dropdown";

import { workspaceLinks } from "../_constants/data";
import { useSidebar } from "../_contexts/sidebar-context";
import SidebarToggle from "./sidebar-toggle";
import { useEffect, useRef } from "react";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        toggleSidebar(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleSidebar]);

  return (
    <aside ref={sidebarRef}
    className={`block w-72 py-4 px-2 bg-background min-h-full mx-auto absolute lg:relative lg:translate-x-0 transition-transform duration-300 ${
    isSidebarOpen? 'translate-x-0' : '-translate-x-full'}`}>
      <SidebarToggle className="md:hidden" />
      <div className="flex items-center mb-6">
        {/* <AccountDropdown user={{
          name: session.user.name,
          image: session.user.image,
        }} /> */}
      </div>
      <DashboardNav workspaceLinks={workspaceLinks} />
    </aside>
  );
}
