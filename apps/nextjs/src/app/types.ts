import type { Icons } from "@court-base/ui/icons";

interface SidebarLink {
  label: string;
  href: string;
  icon?: keyof typeof Icons;
  subLinks?: { label: string; href: string }[];
}

type SearchParams = Record<string, string | string[] | undefined>;

export type { SidebarLink, SearchParams };
