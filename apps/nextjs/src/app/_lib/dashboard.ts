import { auth } from "@court-base/auth";

import { routes } from "~/config/routes";
import { api } from "~/trpc/server";
import { getOrgDashboardPath } from "~/utils";

interface DashboardRedirectInfo {
  url: string;
  isAuthenticated: boolean;
}

export async function getDashboardRedirect(): Promise<DashboardRedirectInfo> {
  const session = await auth();

  if (!session) {
    return {
      url: routes.login,
      isAuthenticated: false,
    };
  }

  const orgs = await api.organization.getAllByUser();
  const [firstOrg] = orgs;

  return {
    url: firstOrg ? getOrgDashboardPath(firstOrg.id) : routes.join,
    isAuthenticated: true,
  };
}
