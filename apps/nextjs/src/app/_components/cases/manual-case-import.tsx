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
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ImportByCaseNumberParamsSchema),
    defaultValues: {
      districtCourt: {},
      caseNumber: {},
    },
  });

  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null,
  );
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<
    string | null
  >(null);

  const selectedDistrictCourt = watch("districtCourt");

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

  // Transform districtCourts before sending to Combobox
  const transformDistrictCourts = () => {
    if (districtCourtsLoading) {
      return [
        { value: "", label: "Loading...", isHeader: false, selectable: false },
      ];
    }
    if (!districtCourtsSource) {
      return [
        {
          value: "",
          label: "No courts found",
          isHeader: false,
          selectable: false,
        },
      ];
    }
    const items: {
      value: string;
      label: string;
      isHeader: boolean;
      selectable: boolean;
    }[] = [];

    districtCourtsSource.forEach((complex) => {
      // Add complex name as header
      const valueObj = { complexId: complex.id, courtId: "" };
      // complex Id is always need to get case types
      if (complex.isMasterCourtComplex) {
        if (complex.courts.length !== 1) {
          throw new Error(
            `Master court complex ${complex.name} should have exactly one court`,
          );
        }
        valueObj.courtId = complex.courts[0]?.id ?? "";
      }
      items.push({
        value: JSON.stringify(valueObj),
        label: complex.name,
        isHeader: true,
        selectable: complex.isMasterCourtComplex,
      });

      // Add courts under the complex if it's not a master court complex
      if (!complex.isMasterCourtComplex) {
        complex.courts.forEach((court) => {
          items.push({
            value: JSON.stringify({ courtId: court.id, complexId: complex.id }),
            label: court.name,
            isHeader: false,
            selectable: true,
          });
        });
      }
    });
    return items;
  };
  const districtCourts = transformDistrictCourts();
  const complexId = selectedDistrictCourt.complexId;
  // Fetch case types based on highCourtId and availability of districtCourts
  const { data: caseTypesSource, isLoading: caseTypesLoading } =
    api.court.getCaseTypes.useQuery(
      { complexId: complexId },
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
        } else if (message) {
          toast.error(message);
        } else {
          toast.error("Failed to create case import task");
        }
      },
    });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Import cases from courts</DialogTitle>
        <DialogDescription>
          Enter case number, court name to search for cases.
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => createCaseImportTask(data))}
        className="grid gap-4 py-4"
      >
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
            name="districtCourt"
            control={control}
            render={({ field }) => (
              <Combobox
                placeholder="Select Court"
                items={districtCourts}
                onSelect={(val) => {
                  field.onChange(JSON.parse(val));
                }}
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
                disabled={!selectedDistrictCourt}
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
