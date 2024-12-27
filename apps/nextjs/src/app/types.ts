import type { Icons } from "@court-base/ui/icons";

interface SidebarLink {
  label: string;
  href: string;
  icon?: (typeof Icons)[keyof typeof Icons];
  subLinks?: {
    label: string;
    href: string;
    icon?: (typeof Icons)[keyof typeof Icons];
  }[];
}

type SearchParams = Record<string, string>;

export type { SidebarLink, SearchParams };
