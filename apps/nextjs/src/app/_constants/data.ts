import { SidebarLink } from "../types";

const workspaceLinks: SidebarLink[] = [
  {
    label: "Cases",
    href: "/cases/all",
    subLinks: [
      { label: "Active", href: "/cases/active" },
      { label: "Archive", href: "/cases/archive" },
    ],
  },
];

export { workspaceLinks };