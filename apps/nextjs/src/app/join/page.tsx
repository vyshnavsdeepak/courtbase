"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  useForm
} from "@court-base/ui/form";
import { Input } from "@court-base/ui/input";
import { Label } from "@court-base/ui/label";
import { api } from "~/trpc/react";
import { OrganizationCreateModel } from "@court-base/api/models";
import type { z } from "zod";
import { toast } from "@court-base/ui/toast";
import { Icons } from "@court-base/ui/icons";

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
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
    schema: OrganizationCreateModel
  });
  const utils = api.useUtils();
  const createOrganization = api.organization.create.useMutation({
    onSuccess: async (data) => {
      await utils.organization.invalidate();
      router.push(`/x/${data.slug}`);
    },
    onError: (err) => {
      setLoading(false);
      console.log({
        err,
      })
      toast.error(
          err.data?.code === "UNAUTHORIZED"
              ? "You must be logged in to create workspace"
              : "Failed to create workspace",
      );
    },
  });

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && !form.getFieldState("slug").isDirty) {
        const slug = slugify(value.name ?? "");
        form.setValue("slug", slug);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

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
                  <Label htmlFor="workspace_name">Workspace name</Label>
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input id="workspace_name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="workspace_slug">Workspace Url</Label>
                  <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-sm">
                                  courtbase.app/x/
                                </div>
                                <Input
                                    id="workspace_slug"
                                    {...field}
                                    className="block ps-32"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" disabled={loading} className="flex items-center justify-center">
                {loading ? <Icons.loading className="w-5 h-5 animate-spin" /> : "Create"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
  );
}

export default function JoinWorkspacePage() {
  return (
      <div className="flex h-screen items-center justify-center">
        <CardWithForm />
      </div>
  );
}
