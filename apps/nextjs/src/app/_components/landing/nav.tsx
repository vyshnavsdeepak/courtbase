import Link from "next/link";

import { Button } from "@court-base/ui/button";

import { routes } from "~/config/routes";
import { Logo } from "../logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo />
        </div>
        <nav className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href="#features">Features</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="#pricing">Pricing</Link>
          </Button>
          <Button asChild>
            <Link href={routes.login}>Sign In</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
