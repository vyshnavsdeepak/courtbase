import React from "react";
import Link from "next/link";

import { useOrg } from "~/app/_contexts/org-context";

export function CaseDetailViewLink({
  crn,
  children,
}: {
  crn: string;
  children: React.ReactNode;
}) {
  const dashboardUrl = useOrg().dashboardUrl();
  const caseDetailsUrl = `${dashboardUrl}/cases/${crn}`;
  return <Link href={caseDetailsUrl}>{children}</Link>;
}
