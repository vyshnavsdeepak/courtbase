import Link from "next/link";

import { cn } from "@court-base/ui";

import { routes } from "~/config/routes";

interface LogoProps {
  className?: string;
  linkClassName?: string;
  showText?: boolean;
}

export function Logo({ className, linkClassName, showText = true }: LogoProps) {
  return (
    <Link
      href={routes.home}
      className={cn("flex items-center space-x-2", linkClassName)}
    >
      <div className={cn("relative flex items-center", className)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
      </div>
      {showText && <span className="font-medium">Courtbase</span>}
    </Link>
  );
}
