import Link from "next/link";

import { Button } from "@court-base/ui/button";
import { Icons } from "@court-base/ui/icons";

export function CTA() {
  return (
    <section className="container py-24 sm:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Ready to Transform Your Practice?
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Join thousands of legal professionals who trust CourtBase
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/login">
            Start Now <Icons.rightArrow className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
