import { Icons } from "@court-base/ui/icons";

import type { SidebarLink } from "../types";

const workspaceLinks: SidebarLink[] = [
  {
    label: "Cases",
    href: "/cases/all",
    icon: Icons.cases,
    subLinks: [
      {
        label: "Imports",
        href: "/cases/imports",
        icon: Icons.caseImports,
      },
      {
        label: "Groups",
        href: "/cases/groups",
        icon: Icons.caseGroups,
      },
    ],
  },
  {
    label: "Organization",
    href: "/organization",
    icon: Icons.organization,
    subLinks: [
      {
        label: "Team",
        href: "/team",
        icon: Icons.team,
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: Icons.analytics,
      },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Icons.settings,
    subLinks: [
      {
        label: "Team Invites",
        href: "/settings/invites",
        icon: Icons.invitationInbox,
      },
    ],
  },
];

export { workspaceLinks };
