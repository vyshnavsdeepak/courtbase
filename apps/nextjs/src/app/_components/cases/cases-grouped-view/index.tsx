"use client";

import type { z } from "zod";
import { useMemo, useState } from "react";
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

// type CaseTableRows = {
//   crn: string
//   courtName: string
//   typeName: string
//   number: string
//   regYear: string
//   title: string
//   customTitle: string | null
//   nextHearingDate: string | null
//   advocateNames: string[]
//   updatedAt: string
// }

export default function CaseGroupedView({
  caseConditions,
}: {
  caseConditions: z.infer<typeof AllCaseRequestSchema>;
}) {
  const { isLoading, data } = api.cases.all.useQuery(caseConditions);

  const [expandedDate, setExpandedDate] = useState<string | null>(null);
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
              <span>
                {date === "No Date"
                  ? "No Hearing Date"
                  : moment(date).format("dddd, MMMM D, YYYY")}
              </span>
              <span className="text-muted-foreground">
                ({casesForDate.length}{" "}
                {casesForDate.length === 1 ? "case" : "cases"})
              </span>
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
                              <dt className="font-medium">Court</dt>
                              <dd>{caseItem.courtName}</dd>
                            </div>
                            <div>
                              <dt className="font-medium">Case No</dt>
                              <dd>{`${caseItem.typeName}/${caseItem.number}/${caseItem.regYear}`}</dd>
                            </div>
                            <div>
                              <dt className="font-medium">CRN</dt>
                              <dd>{caseItem.crn}</dd>
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
