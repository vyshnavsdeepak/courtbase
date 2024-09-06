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
      className={`absolute z-50 flex h-screen w-72 flex-col border-r bg-background transition-transform duration-500 lg:relative ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex-none md:hidden">
        <SidebarToggle />
      </div>
      <div className="mt-5 grow px-2">
        <DashboardNav workspaceLinks={workspaceLinks} />
      </div>
      <div className="mb-5 flex-none px-2">
        <AccountDropdown
          user={{
            name: session?.user.name,
            image: session?.user.image,
          }}
        />
      </div>
    </aside>
  );
}
