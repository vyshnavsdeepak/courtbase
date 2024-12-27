"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@court-base/ui/card";

import { InviteManager } from "~/app/_components/invite-manager";

export default function InvitesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Team Invites</h3>
        <p className="text-sm text-muted-foreground">
          Manage your organization&apos;s invites and add new team members.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Invites</CardTitle>
          <CardDescription>
            Create and manage invites for your team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InviteManager />
        </CardContent>
      </Card>
    </div>
  );
}
