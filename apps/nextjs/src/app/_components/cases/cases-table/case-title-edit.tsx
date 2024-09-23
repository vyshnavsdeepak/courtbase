"use client";

import type { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { CaseUpdateTitleRequestSchema } from "@court-base/api/schemas/cases";
import { Button } from "@court-base/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@court-base/ui/dialog";
import { Input } from "@court-base/ui/input";
import { toast } from "@court-base/ui/toast";

import { api } from "~/trpc/react";

type FormData = z.infer<typeof CaseUpdateTitleRequestSchema>;

export function CaseEditDialog({
  data,
  children,
  onSuccess,
}: {
  data: {
    crn: string;
    originalTitle: string;
    customTitle: string | null;
  };
  children: React.ReactNode;
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Case Title</DialogTitle>
          <DialogDescription>Edit the title of the case</DialogDescription>
        </DialogHeader>
        <CaseEditForm
          data={data}
          onSuccess={() => {
            setOpen(false);
            onSuccess?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function CaseEditForm({
  data,
  onSuccess,
}: {
  data: {
    crn: string;
    originalTitle: string;
    customTitle: string | null;
  };
  onSuccess?: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(CaseUpdateTitleRequestSchema),
    defaultValues: {
      title: data.customTitle ?? data.originalTitle,
      crn: data.crn,
    },
  });
  const disabled = isSubmitting || isSubmitted;
  const utils = api.useUtils();
  const updateTitle = api.cases.updateTitle.useMutation({
    onSuccess: async () => {
      await utils.cases.all.invalidate();
      onSuccess?.();
      toast.success("Case title has been updated.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => updateTitle.mutate(values))}
      className="grid gap-4"
    >
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <div>
            <Input {...field} placeholder="Title" />
          </div>
        )}
      />
      <Button type="submit" disabled={disabled}>
        {disabled ? "Saving..." : "Save"}
      </Button>
      {errors.title && (
        <div className="mt-2 text-destructive">{errors.title.message}</div>
      )}
    </form>
  );
}
