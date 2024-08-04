import { redirect } from 'next/navigation';
import React from 'react';
import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
import { auth } from "@court-base/auth";
import { AuthShowcase } from "./_components/auth-showcase";

export const runtime = "edge";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    // Redirect to login page if not authenticated
    return redirect("/login?callbackUrl=/");
  }

  const orgs = await api.organization.getAllByUser();
  console.log(JSON.stringify(orgs, null, 2));
  if (orgs.length === 0) {
    // Redirect to create organization page if no organizations found
    return redirect("/join");
  }

  if (orgs.length === 1) {
    // Redirect to the single organization
    return redirect(`/${orgs[0].slug}`);
  };

  if (orgs.length > 1) {
    return (<div>
        <h1>Multiple organizations found</h1>
        <ul>
          {orgs.map((org) => (
              <li key={org.id}>
                <Link href={`/${org.slug}`} className="underline">{org.name}</Link>
              </li>
          ))}
        </ul>
    </div>)
  }


  return (
      <HydrateClient>
        <main className="container h-screen py-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Create <span className="text-primary">T3</span> Turbo
            </h1>
            <AuthShowcase />
          </div>
        </main>
      </HydrateClient>
  );
}
