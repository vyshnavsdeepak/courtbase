"use client";

import type { z } from "zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { ImportByCaseNumberParamsSchema } from "@court-base/api/models";
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
import { toast } from "@court-base/ui/toast";

import { useOrg } from "~/app/_contexts/org-context";
import { api } from "~/trpc/react";
import { getOrgDashboardPath } from "~/utils";
import ErrorDisplay from "../ErrorDisplay";
import CaseNumberInput from "./case-number-input";

export function ManualCaseImportInCasePage() {
  const router = useRouter();
  const orgSlug = useOrg().nonNull();

  return (
    <ManualCaseImportDialogButton
      onSuccess={() => {
        router.push(
          [getOrgDashboardPath(orgSlug), "cases", "imports"].join("/"),
        );
      }}
    >
      <Button className="">Import Case</Button>
    </ManualCaseImportDialogButton>
  );
}

export default function ManualCaseImportDialogButton(props: {
  children: React.ReactNode;
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px]"
        onInteractOutside={(e) => {
          // prevent closing dialog when clicking on the dialog content
          e.preventDefault();
        }}
      >
        <ManualCaseImportDialog
          close={() => setOpen(false)}
          onSuccess={props.onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}

type FormData = z.infer<typeof ImportByCaseNumberParamsSchema>;

function ManualCaseImportDialog({
  close,
  onSuccess,
}: {
  close: () => void;
  onSuccess?: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ImportByCaseNumberParamsSchema),
    defaultValues: {
      caseNumber: {},
    },
  });

  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null,
  );
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<
    string | null
  >(null);

  const apiUtils = api.useUtils();

  // Fetch states
  const { data: statesSource, isLoading: statesLoading } =
    api.court.states.useQuery();
  const states = statesLoading
    ? [{ name: "Loading...", stateCode: "", highCourtId: "" }]
    : (statesSource ?? [
        { name: "No states found", stateCode: "", highCourtId: "" },
      ]);

  // Fetch districts when selectedStateCode is available
  const { data: districtsSource, isLoading: districtsLoading } =
    api.court.districts.useQuery(
      { stateCode: selectedStateCode ?? "" },
      { enabled: !!selectedStateCode },
    );

  const districts = districtsLoading
    ? [{ name: "Loading...", districtCode: "" }]
    : (districtsSource ?? [{ name: "No districts found", districtCode: "" }]);

  // Fetch district courts when both stateCode and districtCode are available
  const { data: districtCourtsSource, isLoading: districtCourtsLoading } =
    api.court.districtCourts.useQuery(
      {
        districtCode: selectedDistrictCode ?? "",
        stateCode: selectedStateCode ?? "",
      },
      { enabled: !!selectedStateCode && !!selectedDistrictCode },
    );

  const districtCourts = districtCourtsLoading
    ? [{ name: "Loading...", id: "" }]
    : (districtCourtsSource ?? [{ name: "No courts found", id: "" }]);

  // Find selected state's high court ID
  const selectedStateObj = states.find(
    (state) => state.stateCode === selectedStateCode,
  );
  const selectedHighCourtId = selectedStateObj?.highCourtId;

  // Fetch case types based on highCourtId and availability of districtCourts
  const { data: caseTypesSource, isLoading: caseTypesLoading } =
    api.court.getCaseTypes.useQuery(
      { highCourtId: selectedHighCourtId ?? "" },
      { enabled: !!selectedHighCourtId && !!districtCourtsSource },
    );

  const caseTypes = caseTypesLoading
    ? [{ id: "", label: "Loading..." }]
    : (caseTypesSource ?? [
        { id: "", label: "Select a state to load case types." },
      ]);

  // Mutation for creating the case import task
  const {
    mutate: createCaseImportTask,
    isPending,
    status,
    isPaused,
  } = api.caseImport.importByCaseNumber.useMutation({
    onSuccess: () => {
      toast.info("Case import task created successfully");
      void apiUtils.caseImport.importJobsByCaseNumber.refetch();
      onSuccess?.();
    },
    onError: (err) => {
      const messages = err.data?.zodError?.formErrors;
      toast.error(messages?.join("\n") ?? "Failed to create case import task");
    },
    onSettled: () => {
      // reset form after mutation is settled
      close();
    },
  });
  console.log("Mutation cycles: ", {
    isPending,
    status,
    isPaused,
  });

  const onSubmit = (data: FormData) => {
    createCaseImportTask(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Import cases from courts</DialogTitle>
        <DialogDescription>
          Enter case number, court name to search for cases.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <Combobox
            placeholder="Select State"
            items={states.map((state) => ({
              value: state.stateCode,
              label: state.name,
            }))}
            onSelect={setSelectedStateCode}
          />
          <Combobox
            placeholder="Select District"
            items={districts.map((district) => ({
              value: district.districtCode,
              label: district.name,
            }))}
            onSelect={setSelectedDistrictCode}
            disabled={!selectedStateCode}
          />
        </div>
        <div className="grid">
          <Controller
            name="districtCourtId"
            control={control}
            render={({ field }) => (
              <Combobox
                placeholder="Select Court"
                items={districtCourts.map((court) => ({
                  value: court.id,
                  label: court.name,
                }))}
                onSelect={field.onChange}
                disabled={!selectedDistrictCode}
              />
            )}
          />
        </div>
        <div className="grid">
          <Controller
            name="caseNumber"
            control={control}
            render={({ field }) => (
              <CaseNumberInput
                caseTypeOptions={caseTypes.map((caseType) => ({
                  value: caseType.id,
                  label: caseType.label,
                }))}
                onChange={(value) => {
                  field.onChange({
                    target: {
                      value: {
                        caseTypeId: value.typeName,
                        number: value.number,
                        regYear: value.regYear,
                      },
                    },
                  });
                }}
                disabled={!selectedStateCode}
              />
            )}
          />
        </div>
        <ErrorDisplay errors={errors} />
        <Button type="submit" disabled={isSubmitting || isPending}>
          {isSubmitting || isPending ? "Submitting..." : "Import"}
        </Button>
      </form>
    </>
  );
}
