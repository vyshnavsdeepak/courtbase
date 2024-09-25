import type { z } from "zod";
import React from "react";

import type { CaseSchemaExtended } from "@court-base/api/schemas/cases";
import { Badge } from "@court-base/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@court-base/ui/card";
import { Icons } from "@court-base/ui/icons";
import { Separator } from "@court-base/ui/separator";

export default function CaseOverview({
  caseData,
}: {
  caseData: z.infer<typeof CaseSchemaExtended>;
}) {
  const formatDate = (date: Date | null) => {
    return date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Not Available";
  };

  return (
    <Card className="mx-auto w-full max-w-4xl rounded-none shadow-md">
      <CardHeader className="border-b">
        <CardTitle className="text-center font-serif text-3xl">
          {caseData.customTitle ?? caseData.title}
        </CardTitle>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">{caseData.typeName}</Badge>
          <Badge variant="outline">{caseData.regYear}</Badge>
          <Badge>{caseData.side}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <Icons.caseNumber className="h-5 w-5" /> Case Number
            </h3>
            <p className="text-lg font-medium">
              {caseData.typeName}/{caseData.number}/{caseData.regYear}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <Icons.date className="h-5 w-5" /> Next Hearing Date
            </h3>
            <p className="text-lg">{formatDate(caseData.nextHearingDate)}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Icons.parties className="h-5 w-5" /> Parties Involved
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-medium">Petitioner</p>
              <p>{caseData.petitioner}</p>
              {caseData.extraPetitioners && (
                <p className="mt-1 text-sm">
                  Additional: {caseData.extraPetitioners}
                </p>
              )}
            </div>
            <div>
              <p className="font-medium">Respondent</p>
              <p>{caseData.respondent}</p>
              {caseData.extraRespondents && (
                <p className="mt-1 text-sm">
                  Additional: {caseData.extraRespondents}
                </p>
              )}
            </div>
          </div>
          {caseData.extraParties && (
            <div>
              <p className="font-medium">Additional Parties</p>
              <p>{caseData.extraParties}</p>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Icons.advocates className="h-5 w-5" /> Advocates
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {caseData.advocateNames.map(
              (name, index) =>
                name && (
                  <li key={index} className="flex items-center gap-2">
                    <Icons.advocate className="h-4 w-4" />
                    {name}
                  </li>
                ),
            )}
          </ul>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Icons.court className="h-5 w-5" /> Court Information
            </h3>
            <div>
              <p className="font-medium">Court Name</p>
              <p>{caseData.courtName ?? "Not Available"}</p>
            </div>
            <div>
              <p className="font-medium">Court ID</p>
              <p>{caseData.courtId}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Icons.date className="h-5 w-5" /> Important Dates
            </h3>
            <div>
              <p className="font-medium">Date of Decision</p>
              <p>{formatDate(caseData.dateOfDecision)}</p>
            </div>
            <div>
              <p className="font-medium">Last Updated</p>
              <p>{formatDate(caseData.updatedAt)}</p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <Icons.caseFile className="h-5 w-5" /> CRN
            </h3>
            <p className="border p-2 font-mono text-sm">{caseData.crn}</p>
          </div>
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <Icons.caseFile className="h-5 w-5" /> Case ID
            </h3>
            <p className="border p-2 font-mono text-sm">{caseData.id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
