"use client";

import type { z } from "zod";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  OrganizationCreateModel,
  OrganizationJoinSchema,
} from "@court-base/api/models";
import { Button } from "@court-base/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@court-base/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@court-base/ui/form";
import { Icons } from "@court-base/ui/icons";
import { Input } from "@court-base/ui/input";
import { Label } from "@court-base/ui/label";
import { toast } from "@court-base/ui/toast";

import { api } from "~/trpc/react";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

// Shared form wrapper component
function FormCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}

function CreateWorkspace() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const utils = api.useUtils();

  const form = useForm({
    defaultValues: {
      name: "",
      id: "",
      memberName: session?.user.name ?? "",
    },
    schema: OrganizationCreateModel,
  });

  const createOrganization = api.organization.create.useMutation({
    onSuccess: async (data) => {
      await utils.organization.invalidate();
      router.push(`/x/${data.id}`);
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message || "Failed to create organization");
    },
  });

  const onSubmit = async (data: z.infer<typeof OrganizationCreateModel>) => {
    try {
      setLoading(true);
      await createOrganization.mutateAsync(data);
    } catch (error) {
      console.error("Form submission error:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && !form.getFieldState("id").isDirty) {
        const slug = slugify(value.name ?? "");
        form.setValue("id", slug);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <FormCard
      title="Create workspace"
      description="Ready to get started? Let's build your workspace—your office on our app!"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="memberName">Your name</Label>
                <FormField
                  control={form.control}
                  name="memberName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="memberName"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="workspace_name">Workspace name</Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="workspace_name"
                          placeholder="Enter workspace name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="workspace_url">Workspace URL</Label>
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="workspace_url"
                          placeholder="Enter workspace URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icons.loading className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create workspace"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </FormCard>
  );
}

function AcceptInvite({ inviteCode }: { inviteCode: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const utils = api.useUtils();

  const { data: invite, isLoading: inviteLoading } =
    api.organizationInvite.getByCode.useQuery(
      { code: inviteCode },
      {
        retry: false,
      },
    );

  const form = useForm({
    defaultValues: {
      inviteCode,
      memberName: session?.user.name ?? "",
    },
    schema: OrganizationJoinSchema,
  });

  const acceptInvite = api.organizationInvite.accept.useMutation({
    onSuccess: async (data) => {
      await utils.organization.invalidate();
      router.push(`/x/${data.organizationId}`);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to accept invite");
    },
  });

  const joining = acceptInvite.isPending;

  const onSubmit = (data: z.infer<typeof OrganizationJoinSchema>) => {
    acceptInvite.mutate(data);
  };

  if (inviteLoading) {
    return (
      <FormCard title="Loading..." description="">
        <CardContent className="flex items-center justify-center py-8">
          <Icons.loading className="h-6 w-6 animate-spin" />
        </CardContent>
      </FormCard>
    );
  }

  if (!invite) {
    return (
      <FormCard
        title="Invalid Invite"
        description="This invite link is invalid or has expired. Please contact your organization admin for a new invite."
      >
        <CardContent />
      </FormCard>
    );
  }

  return (
    <FormCard
      title="Accept Invite"
      description={`Join ${invite.organizationName} and start collaborating!`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="memberName">Your name</Label>
                <FormField
                  control={form.control}
                  name="memberName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="memberName"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={joining}>
              {joining ? (
                <>
                  <Icons.loading className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Workspace"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </FormCard>
  );
}

export default function JoinWorkspacePage() {
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("inviteCode");

  return (
    <div className="container flex min-h-screen items-center justify-center">
      {inviteCode ? (
        <AcceptInvite inviteCode={inviteCode} />
      ) : (
        <CreateWorkspace />
      )}
    </div>
  );
}
