import { AcceptInvite, CreateWorkspace } from "./_components";

export default async function JoinWorkspacePage(props: {
  searchParams?: Promise<{
    inviteCode: string;
  }>;
}) {
  const inviteCode = (await props.searchParams)?.inviteCode;

  return (
    <div className="container flex min-h-screen items-center justify-center">
      {inviteCode ? (
        <AcceptInvite inviteCode={inviteCode} />
      ) : (
        <CreateWorkspace />
      )}
    </div>
  );
}
