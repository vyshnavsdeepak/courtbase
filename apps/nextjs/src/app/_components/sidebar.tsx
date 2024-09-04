"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import { workspaceLinks } from "../_constants/data";
import { useSidebar } from "../_contexts/sidebar-context";
import AccountDropdown from "./account-dropdown";
import { DashboardNav } from "./dashboard-nav";
import SidebarToggle from "./sidebar-toggle";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

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
      className={`absolute z-50 h-screen w-72 border-r bg-background transition-transform duration-500 lg:relative ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex">
        <SidebarToggle className="md:hidden" />
      </div>
      <div className="flex h-full flex-1 flex-col justify-between px-2 py-4">
        <DashboardNav workspaceLinks={workspaceLinks} />
        <div className="flex items-center">
          <AccountDropdown
            user={{
              name: session?.user.name,
              image: session?.user.image,
            }}
          />
        </div>
      </div>
    </aside>
  );
}
