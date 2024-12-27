import type { Metadata } from "next";
import { Suspense } from "react";

import {
  TeamMembers,
  TeamMembersLoading,
} from "~/app/_components/team/team-members";

export const metadata: Metadata = {
  title: "Team Members",
  description: "Manage your team members and their roles.",
};

export default function TeamPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground">
            Manage your team members and their roles.
          </p>
        </div>
        <Suspense fallback={<TeamMembersLoading />}>
          <TeamMembers />
        </Suspense>
      </div>
    </div>
  );
}
