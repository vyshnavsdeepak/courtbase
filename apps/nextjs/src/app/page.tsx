import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@court-base/auth";

import { api } from "~/trpc/server";
import { getOrgDashboardPath } from "~/utils";
import {
  AuthNav,
  CTA,
  Features,
  Footer,
  Hero,
  Nav,
} from "./_components/landing";

export const runtime = "edge";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { dashboard?: string };
}) {
  const session = await auth();

  // Handle authenticated users
  if (session) {
    const orgs = await api.organization.getAllByUser();

    // Redirect to first org if dashboard param is present and orgs exist
    if (searchParams.dashboard === "true") {
      const [firstOrg] = orgs;
      if (!firstOrg) {
        // Fresh login
        return redirect("/join");
      }
      return redirect(getOrgDashboardPath(firstOrg.id));
    }

    // Show landing page with authenticated nav
    return (
      <div className="flex min-h-screen flex-col">
        <AuthNav orgs={orgs} />
        <main className="flex-1">
          <Hero />
          <Features />
          <CTA />
        </main>
        <Footer />
      </div>
    );
  }

  // Show regular landing page for unauthenticated users
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
