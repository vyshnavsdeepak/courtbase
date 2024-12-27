"use client";

import { useSearchParams } from "next/navigation";

import { Icons } from "@court-base/ui/icons";

import { api } from "~/trpc/react";

export function InviteDetails() {
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("inviteCode");

  const { data: invite, isLoading } = api.organizationInvite.getByCode.useQuery(
    { code: inviteCode ?? "" },
    {
      enabled: !!inviteCode,
    },
  );

  if (!inviteCode) return null;

  return (
    <div className="mb-4 border bg-muted/50 p-4">
      {isLoading ? (
        <div className="flex items-center justify-center py-2">
          <Icons.loading className="h-5 w-5 animate-spin" />
        </div>
      ) : invite ? (
        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            You've been invited to join
          </p>
          <p className="text-lg font-semibold">{invite.organizationName}</p>
          {invite.designation && (
            <p className="text-sm text-muted-foreground">
              as {invite.designation}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Sign in to accept the invite
          </p>
        </div>
      ) : (
        <div className="text-center text-sm text-destructive">
          This invite link is invalid or has expired
        </div>
      )}
    </div>
  );
}
