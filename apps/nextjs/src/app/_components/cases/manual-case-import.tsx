"use client";

import type { z } from "zod";
import React, { useEffect, useMemo, useState } from "react";
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
import DistrictCourtInput from "./case-district-court-input";
import CaseNumberInput from "./case-number-input";

export function ManualCaseImportTrigger(props: {
  className?: string;
  label?: string;
}) {
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
      <Button className={props.className}>
        {props.label ?? "Import Case"}
      </Button>
    </ManualCaseImportDialogButton>
  );
}

export default function ManualCaseImportDialogButton(props: {
  children: React.ReactNode;
  onSuccess?: () => void;
  jobId?: string;
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
          jobId={props.jobId}
        />
      </DialogContent>
    </Dialog>
  );
}

type FormData = z.infer<typeof ImportByCaseNumberParamsSchema>;

function ManualCaseImportDialog({
  close,
  onSuccess,
  jobId,
}: {
  close: () => void;
  onSuccess?: () => void;
  jobId?: string;
}) {
  const { data: job, isLoading: isExistingJobLoading } =
    api.caseImport.manualCaseImportTaskById.useQuery(
      {
        id: jobId ?? "",
      },
      { enabled: !!jobId },
    );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ImportByCaseNumberParamsSchema),
    defaultValues: useMemo(
      () => ({
        districtCourt: job
          ? { complexId: job.complexId, courtId: job.districtCourtId }
          : {},
        caseNumber: job
          ? {
              caseTypeId: job.caseTypeId,
              number: job.number,
              regYear: job.regYear,
            }
          : {},
      }),
      [job],
    ),
  });

  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null,
  );
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<
    string | null
  >(null);

  const [selectedDistrictCourt, setSelectedDistrictCourt] = useState<{
    complexId: string;
    courtId: string;
  } | null>(null);

  const [selectedCaseNumber, setSelectedCaseNumber] = useState<{
    caseTypeId: string;
    number: string;
    regYear: string;
  } | null>(null);

  useEffect(() => {
    if (job) {
      reset({
        districtCourt: {
          complexId: job.complexId,
          courtId: job.districtCourtId,
        },
        caseNumber: {
          caseTypeId: job.caseTypeId,
          number: job.number,
          regYear: job.regYear,
        },
      });
      setSelectedStateCode(job.stateCode);
      setSelectedDistrictCode(job.districtCode);
      setSelectedDistrictCourt({
        complexId: job.complexId,
        courtId: job.districtCourtId,
      });
      setSelectedCaseNumber({
        caseTypeId: job.caseTypeId,
        number: job.number,
        regYear: job.regYear,
      });
    }
  }, [job, reset]);

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

  const complexId = selectedDistrictCourt?.complexId;
  // Fetch case types based on highCourtId and availability of districtCourts
  const { data: caseTypesSource, isLoading: caseTypesLoading } =
    api.court.getCaseTypes.useQuery(
      { complexId: complexId ?? "" },
      { enabled: !!complexId },
    );

  const caseTypes = caseTypesLoading
    ? [{ id: "", label: "Loading..." }]
    : (caseTypesSource ?? [
        { id: "", label: "Select a state to load case types." },
      ]);

  // Mutation for creating the case import task
  const { mutate: createCaseImportTask, isPending } =
    api.caseImport.importByCaseNumber.useMutation({
      onSuccess: () => {
        toast.info("Case import task created successfully");
        void apiUtils.caseImport.importJobsByCaseNumber.refetch();
        close();
        onSuccess?.();
      },
      onError: (err) => {
        const zodMessages = err.data?.zodError?.formErrors;
        const message = err.message;
        if (zodMessages) {
          toast.error(zodMessages.join("\n"));
        } else if (message.length > 0) {
          toast.error(message);
        } else {
          toast.error("Failed to create case import task");
        }
      },
    });

  const title = jobId ? "Update case import task" : "Import cases from courts";
  const description = jobId
    ? "Edit case details to update the task."
    : "Enter case number, court name to search for cases.";
  const actionButtonText = jobId ? "Update" : "Import";
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) =>
          createCaseImportTask({
            id: jobId,
            ...data,
          }),
        )}
        className="grid gap-4 py-4"
      >
        {isExistingJobLoading && (
          <div className="text-center text-gray-500">
            Please wait, loading the necessary data...
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <Combobox
            placeholder="Select State"
            items={states.map((state) => ({
              value: state.stateCode,
              label: state.name,
            }))}
            selectedValue={selectedStateCode}
            onSelect={setSelectedStateCode}
            disabled={isExistingJobLoading}
          />
          <Combobox
            placeholder="Select District"
            items={districts.map((district) => ({
              value: district.districtCode,
              label: district.name,
            }))}
            selectedValue={selectedDistrictCode}
            onSelect={setSelectedDistrictCode}
            disabled={!selectedStateCode || isExistingJobLoading}
          />
        </div>
        <div className="grid">
          <Controller
            name="districtCourt"
            control={control}
            render={({ field }) => (
              <DistrictCourtInput
                data={districtCourtsSource ?? []}
                isLoading={districtCourtsLoading}
                selected={selectedDistrictCourt}
                onChange={(value) => {
                  setSelectedDistrictCourt(value);
                  field.onChange({
                    target: {
                      value,
                    },
                  });
                }}
                disabled={!selectedDistrictCode || isExistingJobLoading}
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
                selectedValue={selectedCaseNumber}
                onChange={(value) => {
                  setSelectedCaseNumber(value);
                  field.onChange({
                    target: {
                      value: {
                        caseTypeId: value.caseTypeId,
                        number: value.number,
                        regYear: value.regYear,
                      },
                    },
                  });
                }}
                disabled={!selectedDistrictCourt || isExistingJobLoading}
              />
            )}
          />
        </div>
        <ErrorDisplay errors={errors} />
        <Button
          type="submit"
          disabled={isSubmitting || isPending || isExistingJobLoading}
        >
          {isSubmitting || isPending ? "Submitting..." : actionButtonText}
        </Button>
      </form>
    </>
  );
}
