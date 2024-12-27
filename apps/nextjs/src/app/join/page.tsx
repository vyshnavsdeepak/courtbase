"use client";

import type { z } from "zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { OrganizationCreateModel } from "@court-base/api/models";
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

function CardWithForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const form = useForm({
    defaultValues: {
      name: "",
      id: "",
      memberName: session?.user?.name ?? "",
    },
    schema: OrganizationCreateModel,
  });

  const utils = api.useUtils();
  const createOrganization = api.organization.create.useMutation({
    onSuccess: async (data) => {
      await utils.organization.invalidate();
      router.push(`/x/${data.id}`);
    },
    onError: (err) => {
      setLoading(false);
      console.log({
        err,
      });
      toast.error(
        err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to create workspace"
          : "Failed to create workspace",
      );
    },
  });

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && !form.getFieldState("id").isDirty) {
        const slug = slugify(value.name ?? "");
        form.setValue("id", slug);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Update member name when session loads
  React.useEffect(() => {
    if (session?.user?.name) {
      form.setValue("memberName", session.user.name);
    }
  }, [session, form]);

  const onSubmit = (data: z.infer<typeof OrganizationCreateModel>) => {
    setLoading(true);
    createOrganization.mutate(data);
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>Create workspace</CardTitle>
        <CardDescription>
          Ready to get started? Let's build your workspace—your office on our
          app!
        </CardDescription>
      </CardHeader>
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
                          placeholder={
                            status === "loading"
                              ? "Loading..."
                              : "Enter your name"
                          }
                          disabled={
                            status === "loading" || !!session?.user?.name
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {session?.user?.name && (
                  <p className="text-xs text-muted-foreground">
                    Your name is already set. You can change it in your profile
                    settings.
                  </p>
                )}
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
            <Button
              type="submit"
              className="w-full"
              disabled={loading || status === "loading"}
            >
              {loading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create workspace"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default function JoinWorkspacePage() {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <CardWithForm />
    </div>
  );
}
