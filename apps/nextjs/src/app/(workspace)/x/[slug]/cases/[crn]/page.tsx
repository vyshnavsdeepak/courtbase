import CaseHistory from "~/app/_components/cases/case-details/case-history";
import CaseOverview from "~/app/_components/cases/case-details/case-overview";
import { api } from "~/trpc/server";

interface Props {
  params: {
    crn: string;
  };
}

export default async function CaseDetailsPage(props: Props) {
  const { crn } = props.params;
  const cases = await api.cases.byCrn({ crn });

  return (
    <div className="container mx-auto space-y-4 p-4">
      <CaseOverview caseData={cases.data} />
      <CaseHistory crn={crn} />
    </div>
  );
}
