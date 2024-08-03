import { cn } from "@court-base/ui";
import { DashboardNav } from "./dashboard-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@court-base/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@court-base/ui/select";
import Link from "next/link";
import { Icons } from "@court-base/ui/icons";
import AccountDropdown from "./account-dropdown";
import { auth } from "@court-base/auth";

import { workspaceLinks } from "../_constants/data";

export default async function Sidebar() {
  const session = await auth();
  if (!session) {
    return null;
  }
  return (
    <aside className="w-64 p-4 border-r border-secondary">
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
