import Link from "next/link";

import { Button } from "@court-base/ui/button";

export function Nav() {
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
            <Link href="#features">Features</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="#pricing">Pricing</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
