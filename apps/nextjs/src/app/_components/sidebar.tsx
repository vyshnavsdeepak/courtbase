import { DashboardNav } from "./dashboard-nav";
import AccountDropdown from "./account-dropdown";
import { auth } from "@court-base/auth";

import { workspaceLinks } from "../_constants/data";

export default async function Sidebar() {
  const session = await auth();
  if (!session) {
    return null;
  }
  return (
    <aside className="hidden md:block w-72 py-4 px-2 mx-auto">
      <div className="flex items-center mb-6">
        <AccountDropdown user={{
          name: session.user.name,
          image: session.user.image,
        }} />
      </div>
      <DashboardNav workspaceLinks={workspaceLinks} />
    </aside>
  );
}
