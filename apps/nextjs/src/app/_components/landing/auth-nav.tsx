import Link from "next/link";

import type { RouterOutputs } from "@court-base/api";
import { Button } from "@court-base/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@court-base/ui/dropdown-menu";
import { Icons } from "@court-base/ui/icons";

import { getOrgDashboardPath } from "~/utils";

interface AuthNavProps {
  orgs: RouterOutputs["organization"]["getAllByUser"];
}

export function AuthNav({ orgs }: AuthNavProps) {
  if (orgs.length === 1) {
    const org = orgs.at(0);
    if (!org) return null; // should never happen
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">CourtBase</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link
                href={getOrgDashboardPath(org.id)}
                className="flex items-center gap-2"
              >
                <Icons.organization className="h-4 w-4" />
                <span>{org.name}</span>
                <Icons.externalLink className="h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">CourtBase</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Icons.organization className="h-4 w-4" />
                <span>Your Organizations</span>
                <Icons.externalLink className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {orgs.map((org) => (
                <DropdownMenuItem key={org.id} asChild>
                  <Link href={getOrgDashboardPath(org.id)}>{org.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
