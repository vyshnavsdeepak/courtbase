import CaseHistory from "~/app/_components/cases/case-details/case-history";

interface Props {
  params: {
    crn: string;
  };
}

export default function CaseDetailsPage(props: Props) {
  return (
    <div className="container mx-auto space-y-4 p-4">
      <CaseHistory crn={props.params.crn} />
    </div>
  );
}
