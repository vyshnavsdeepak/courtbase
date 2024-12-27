"use client";

import React, { useState } from "react";

import { Button } from "@court-base/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@court-base/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@court-base/ui/dialog";
import { Icons } from "@court-base/ui/icons";
import { Input } from "@court-base/ui/input";
import { Label } from "@court-base/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@court-base/ui/select";
import { toast } from "@court-base/ui/toast";

import { api } from "~/trpc/react";

function CreateInviteDialog() {
  const [role, setRole] = useState("MEMBER");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const utils = api.useUtils();
  const createInvite = api.organizationInvite.create.useMutation({
    onSuccess: async (data) => {
      setLoading(false);
      const link = `${window.location.origin}/join/?inviteCode=${data.code}`;
      setInviteLink(link);
      await utils.organizationInvite.invalidate();
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message || "Failed to create invite");
    },
  });

  const onSubmit = () => {
    setLoading(true);
    createInvite.mutate({ role: role as "MEMBER" | "ADMIN" });
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Icons.createUserInvitationPlus className="mr-2 h-4 w-4" />
          Create Invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Invite Link</DialogTitle>
          <DialogDescription>
            Create an invite link to share with your team members.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="role">Member Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MEMBER">Member</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {inviteLink && (
            <div className="grid gap-2">
              <Label>Invite Link</Label>
              <div className="flex gap-2">
                <Input value={inviteLink} readOnly />
                <Button onClick={copyLink}>
                  <Icons.linkCopy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          {!inviteLink ? (
            <Button onClick={onSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Icons.loading className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Invite"
              )}
            </Button>
          ) : (
            <Button onClick={() => setOpen(false)}>Done</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InviteList() {
  const { data: invites, isLoading } = api.organizationInvite.list.useQuery();
  const utils = api.useUtils();

  const revokeInvite = api.organizationInvite.revoke.useMutation({
    onSuccess: async () => {
      await utils.organizationInvite.invalidate();
      toast.success("Invite revoked");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to revoke invite");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Icons.loading className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!invites?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center text-sm text-muted-foreground">
        <Icons.invitationInbox className="mb-2 h-12 w-12" />
        <p>No active invites</p>
        <p>Create an invite to add team members</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invites.map((invite) => (
        <div
          key={invite.id}
          className="flex items-center justify-between border p-4"
        >
          <div>
            <div className="font-medium">
              {invite.role === "ADMIN" ? "Admin" : "Member"} Invite
            </div>
            <div className="text-sm text-muted-foreground">
              Used {invite.usedCount} time{invite.usedCount !== 1 && "s"}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => revokeInvite.mutate({ inviteId: invite.id })}
          >
            <Icons.deleteInvitation className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export function InviteManager() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Invites</CardTitle>
          <CardDescription>
            Manage invites for your workspace members
          </CardDescription>
        </div>
        <CreateInviteDialog />
      </CardHeader>
      <CardContent>
        <InviteList />
      </CardContent>
    </Card>
  );
}
