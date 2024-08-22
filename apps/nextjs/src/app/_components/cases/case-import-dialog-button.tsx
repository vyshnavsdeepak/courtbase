"use client";

import type { z } from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { CreateCaseImportTaskParamsSchema } from "@court-base/api/models";
import { Button } from "@court-base/ui/button";
import { Combobox } from "@court-base/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@court-base/ui/dialog";
import { MultiCombobox } from "@court-base/ui/multi-combobox";
import { toast } from "@court-base/ui/toast";

import { api } from "~/trpc/react";

const lawyersData = [
  {
    value: "Deepak Madathil",
    label: "Deepak Madathil",
  },
  {
    value: "Sreeja Prashanth",
    label: "Sreeja Prashanth",
  },
];

export default function CaseImportDialogButton(props: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px]"
        onInteractOutside={(e) => {
          // prevent closing dialog when clicking on the dialog content
          e.preventDefault();
        }}
      >
        <CaseImportDialog />
      </DialogContent>
    </Dialog>
  );
}

type FormData = z.infer<typeof CreateCaseImportTaskParamsSchema>;

function CaseImportDialog() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(CreateCaseImportTaskParamsSchema),
    defaultValues: {
      status: "Pending",
    },
  });
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null,
  );
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<
    string | null
  >(null);

  const { data: statesSource, isLoading: statesLoading } =
    api.court.states.useQuery();
  const states = statesLoading
    ? [{ name: "Loading...", stateCode: "" }]
    : (statesSource ?? [{ name: "No states found", stateCode: "" }]);

  const { data: districtsSource, isLoading: districtsLoading } =
    api.court.districts.useQuery(
      { stateCode: selectedStateCode ?? "" },
      { enabled: !!selectedStateCode },
    );
  const districts = districtsLoading
    ? [{ name: "Loading...", districtCode: "" }]
    : (districtsSource ?? [{ name: "No districts found", districtCode: "" }]);

  const { data: courtComplexesSource, isLoading: courtsLoading } =
    api.court.getCourtComplexes.useQuery(
      {
        stateCode: selectedStateCode ?? "",
        districtCode: selectedDistrictCode ?? "",
      },
      { enabled: !!selectedStateCode && !!selectedDistrictCode },
    );
  const courtComplexes = courtsLoading
    ? [{ name: "Loading...", id: "" }]
    : (courtComplexesSource ?? [{ name: "No courts found", id: "" }]);

  const { mutate: createCaseImportTask } =
    api.court.createCaseImportTask.useMutation({
      onSuccess: () => {
        console.log("Case import task created successfully");
        toast.info("Case import task created successfully");
      },
      onError: (err) => {
        console.error("Failed to create case import task", err);
        const messages = err.data?.zodError?.formErrors;
        if (messages) {
          toast.error(messages.join("\n"));
        } else {
          toast.error("Failed to create case import task");
        }
      },
    });

  const onSubmit = (data: FormData) => {
    createCaseImportTask(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Import cases from courts</DialogTitle>
        <DialogDescription>
          Select one or more courts you want to import cases from.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="advocate"
            control={control}
            render={({ field }) => (
              <>
                <Combobox
                  placeholder="Select an advocate"
                  items={lawyersData}
                  onSelect={field.onChange}
                />
              </>
            )}
          />

          <Combobox
            placeholder="Select State"
            items={states.map((state) => ({
              value: state.stateCode,
              label: state.name,
            }))}
            onSelect={(value) => {
              setSelectedStateCode(value);
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Combobox
            placeholder="Select District"
            items={districts.map((district) => ({
              value: district.districtCode,
              label: district.name,
            }))}
            onSelect={(value) => {
              setSelectedDistrictCode(value);
            }}
            disabled={!selectedStateCode}
          />
          <Controller
            name="courtComplexIds"
            control={control}
            render={({ field }) => (
              <>
                <MultiCombobox
                  placeholder="Select Court(s)"
                  items={courtComplexes.map((court) => ({
                    value: court.id,
                    label: court.name,
                  }))}
                  onSelect={field.onChange}
                  disabled={!selectedDistrictCode}
                />
              </>
            )}
          />
        </div>
        <div className="flex flex-col">
          {Object.keys(errors).length > 0 && (
            <div className="text-destructive">
              {Object.values(errors).map((error) => (
                <div key={error.message}>{error.message}</div>
              ))}
            </div>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Import"}
        </Button>
      </form>
    </>
  );
}
