"use client";

import React, { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";

import { getOrgDashboardPath } from "~/utils";

interface OrgContextType {
  orgId: string | null;
}

const OrgContext = createContext<OrgContextType>({ orgId: null });

export const OrgProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  const orgId =
    useMemo(() => {
      const segments = pathname.split("/");
      return segments.includes("x")
        ? segments[segments.indexOf("x") + 1]
        : null;
    }, [pathname]) ?? null;

  return (
    <OrgContext.Provider value={{ orgId }}>{children}</OrgContext.Provider>
  );
};

export const useOrg = () => {
  const context = useContext(OrgContext);

  const dashboardUrl = () => {
    if (!context.orgId) {
      throw new Error("orgSlug is null");
    }
    return getOrgDashboardPath(context.orgId);
  };

  return {
    nonNull: () => {
      if (!context.orgId) {
        throw new Error("orgSlug is null");
      }
      return context.orgId;
    },
    dashboardUrl,
    getPath: (path: string) => {
      return [dashboardUrl(), path].join("");
    },
    orgId: context.orgId,
  };
};
