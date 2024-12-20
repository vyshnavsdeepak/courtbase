"use client";

import type { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";

import type { AllCaseRequestSchema } from "@court-base/api/schemas/cases";
import { AllCaseResponseSchema } from "@court-base/api/schemas/cases";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@court-base/ui/accordion";
import { Button } from "@court-base/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@court-base/ui/card";
import { Icons } from "@court-base/ui/icons";

import { api } from "~/trpc/react";
import { CaseDetailViewLink } from "../cases-table/case-detail-view-link";
import { CaseEditDialog } from "../cases-table/case-title-edit";

const _CaseTableRowsSchema = AllCaseResponseSchema.element.pick({
  crn: true,
  courtId: true,
  courtName: true,
  typeName: true,
  number: true,
  regYear: true,
  title: true,
  customTitle: true,
  nextHearingDate: true,
  advocateNames: true,
  updatedAt: true,
});
type CaseTableRows = z.infer<typeof _CaseTableRowsSchema>;

export default function CaseGroupedView({
  caseConditions,
}: {
  caseConditions: z.infer<typeof AllCaseRequestSchema>;
}) {
  const { isLoading, data } = api.cases.all.useQuery(caseConditions);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    setExpandedDate(today);
  }, []);

  const groupedCases = useMemo(() => {
    const cases = data?.data ?? [];
    const grouped = cases.reduce(
      (acc, caseItem) => {
        const date = caseItem.nextHearingDate
          ? moment(caseItem.nextHearingDate).format("YYYY-MM-DD")
          : "No Date";
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(caseItem);
        return acc;
      },
      {} as Record<string, CaseTableRows[]>,
    );

    return Object.entries(grouped).sort(([dateA], [dateB]) => {
      if (dateA === "No Date") return 1;
      if (dateB === "No Date") return -1;
      return moment(dateA).diff(moment(dateB));
    });
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const printCases = (date: string, casesForDate: CaseTableRows[]) => {
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cases for ${date}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .case { margin: 20px 0; padding: 10px; border-bottom: 1px solid #ccc; }
            .title { font-size: 18px; font-weight: bold; }
            .details { margin-top: 10px; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Cases for ${date === "No Date" ? "No Hearing Date" : moment(date).format("dddd, MMMM D, YYYY")}</h1>
          ${casesForDate
            .map(
              (caseItem) => `
            <div class="case">
              <div class="title">${caseItem.customTitle ?? caseItem.title}</div>
              <div class="details">
                <p><span class="label">Case No:</span> ${caseItem.typeName}/${caseItem.number}/${caseItem.regYear}</p>
                <p><span class="label">Court:</span> ${caseItem.courtName}</p>
                <p><span class="label">Advocate(s):</span> ${caseItem.advocateNames.join(", ")}</p>
              </div>
            </div>
          `,
            )
            .join("")}
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(content);
    printWindow?.print();
  };

  return (
    <div className="space-y-4">
      {groupedCases.map(([date, casesForDate]) => (
        <Card key={date}>
          <CardHeader>
            <CardTitle
              className="flex cursor-pointer items-center justify-between"
              onClick={() =>
                setExpandedDate(expandedDate === date ? null : date)
              }
            >
              <div className="flex items-center gap-2">
                {date === "No Date"
                  ? "No Hearing Date"
                  : moment(date).format("dddd, MMMM D, YYYY")}
                <span className="ml-2 text-muted-foreground">
                  ({casesForDate.length}{" "}
                  {casesForDate.length === 1 ? "case" : "cases"})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    printCases(date, casesForDate);
                  }}
                >
                  <Icons.print className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              collapsible
              value={expandedDate === date ? date : ""}
            >
              <AccordionItem value={date}>
                <AccordionTrigger className="sr-only">
                  Toggle cases
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {casesForDate.map((caseItem) => (
                      <Card key={caseItem.crn}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between text-lg">
                            <span>
                              {caseItem.customTitle ?? caseItem.title}
                            </span>
                            <div>
                              <CaseEditDialog
                                data={{
                                  crn: caseItem.crn,
                                  originalTitle: caseItem.title,
                                  customTitle: caseItem.customTitle,
                                }}
                              >
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="ml-2 min-w-10"
                                >
                                  <Icons.edit size={16} />
                                </Button>
                              </CaseEditDialog>
                              <CaseDetailViewLink crn={caseItem.crn}>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="ml-2 min-w-10"
                                >
                                  <Icons.view size={16} />
                                </Button>
                              </CaseDetailViewLink>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div>
                              <dt className="font-medium">Case No</dt>
                              <dd>{`${caseItem.typeName}/${caseItem.number}/${caseItem.regYear}`}</dd>
                            </div>
                            <div>
                              <dt className="font-medium">Court</dt>
                              <dd>{caseItem.courtName}</dd>
                            </div>
                            <div>
                              <dt className="font-medium">Advocate(s)</dt>
                              <dd>{caseItem.advocateNames.join(", ")}</dd>
                            </div>
                            <div className="col-span-2">
                              <dt className="font-medium">Last Updated</dt>
                              <dd suppressHydrationWarning>
                                {moment(caseItem.updatedAt).fromNow()}
                              </dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
