import Link from "next/link";

import { Button } from "@court-base/ui/button";
import { Icons } from "@court-base/ui/icons";

import { getDashboardRedirect } from "~/app/_lib/dashboard";

export async function Hero() {
  const { url: dashboardUrl, isAuthenticated } = await getDashboardRedirect();

  return (
    <section className="container space-y-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Modern Legal Practice <span className="text-primary">Management</span>
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Streamline your legal practice with our comprehensive case management
          solution. Built for modern law firms who want to focus on what matters
          most.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href={dashboardUrl}>
              {isAuthenticated ? "Open Dashboard" : "Get Started"}{" "}
              <Icons.rightArrow className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
