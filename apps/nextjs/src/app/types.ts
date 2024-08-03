import { Icons } from "@court-base/ui/icons";

interface SidebarLink {
  label: string;
  href: string;
  icon?: keyof typeof Icons;
  subLinks?: { label: string; href: string }[];
}

export type { SidebarLink }
