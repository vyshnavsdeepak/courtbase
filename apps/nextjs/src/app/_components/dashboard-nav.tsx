"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@court-base/ui";
import { Icons } from "@court-base/ui/icons";
import { SidebarLink } from "../types";
interface DashboardNavProps {
  workspaceLinks: SidebarLink[];
}

export function DashboardNav({ workspaceLinks }: DashboardNavProps) {
  const path = usePathname();
  const workspaceUrl = "/workspacename";

  return (
    <nav className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold text-secondary-foreground uppercase">Workspace</h3>
        <ul className="mt-2 space-y-1">
          {workspaceLinks.map((link) => {
            const linkPath = `${workspaceUrl}${link.href}`;
            const isActive = path === linkPath;
            const isAnySubLinkActive = link.subLinks?.some(subLink => path === `${workspaceUrl}${subLink.href}`);

            return (
              <li key={link.label}>
                <Link
                  href={linkPath}
                  className={cn(
                    "flex items-center p-2 text-sm font-medium rounded-md hover:bg-secondary",
                    isActive && !isAnySubLinkActive && "bg-secondary"
                  )}
                  prefetch={false}
                >
                  <Icons.cases className="w-5 h-5 mr-3" />
                  {link.label}
                </Link>
                {link.subLinks && (
                  <ul className="ml-6 mt-1">
                    {link.subLinks.map((subLink) => {
                      const subLinkPath = `${workspaceUrl}${subLink.href}`;
                      const isSubLinkActive = path === subLinkPath;
                      return (
                        <li key={subLink.label}>
                          <Link
                            href={subLinkPath}
                            className={cn(
                              "flex items-center p-2 text-sm font-medium rounded-md hover:bg-secondary border-l-2 border-secondary pl-4",
                              isSubLinkActive && "bg-secondary"
                            )}
                            prefetch={false}
                          >
                            {subLink.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}