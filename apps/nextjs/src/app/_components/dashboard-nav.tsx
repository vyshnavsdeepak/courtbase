"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@court-base/ui";
import { Icons } from "@court-base/ui/icons";

import type { SidebarLink } from "../types";
import { useOrg } from "~/app/_contexts/org-context";
import { getOrgDashboardPath } from "~/utils";

interface DashboardNavProps {
  workspaceLinks: SidebarLink[];
}

export function DashboardNav({ workspaceLinks }: DashboardNavProps) {
  const path = usePathname();
  const orgSlug = useOrg().nonNull();
  const workspaceUrl = getOrgDashboardPath(orgSlug);

  return (
    <nav className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold uppercase text-secondary-foreground">
          Workspace
        </h3>
        <ul className="mt-2 space-y-1">
          {workspaceLinks.map((link) => {
            const linkPath = `${workspaceUrl}${link.href}`;
            const isActive = path === linkPath;
            const isAnySubLinkActive = link.subLinks?.some(
              (subLink) => path === `${workspaceUrl}${subLink.href}`,
            );

            return (
              <li key={link.label}>
                <Link
                  href={linkPath}
                  className={cn(
                    "flex items-center rounded-md p-2 text-sm font-medium hover:bg-secondary",
                    isActive && !isAnySubLinkActive && "bg-secondary",
                  )}
                  prefetch={false}
                >
                  <Icons.cases className="mr-3 h-5 w-5" />
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
                              "flex items-center rounded-md border-l-2 border-secondary p-2 pl-4 text-sm font-medium hover:bg-secondary",
                              isSubLinkActive && "bg-secondary",
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
