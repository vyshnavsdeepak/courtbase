import type { SidebarLink } from "../types";

const workspaceLinks: SidebarLink[] = [
  {
    label: "Cases",
    href: "/cases/all",
    subLinks: [
      { label: "Imports", href: "/cases/imports" },
      // { label: "Archive", href: "/cases/archive" },
    ],
  },
];

export { workspaceLinks };
