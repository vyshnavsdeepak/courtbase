"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { usePathname } from 'next/navigation';

interface OrgContextType {
  orgSlug: string | null;
}

const OrgContext = createContext<OrgContextType>({ orgSlug: null });

export const OrgProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const orgSlug = useMemo(() => {
    const segments = pathname.split('/');
    return segments.includes('x') ? segments[segments.indexOf('x') + 1] : null;
  }, [pathname]) ?? null;

  return (
    <OrgContext.Provider value={{ orgSlug }}>
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = () => {
  const context = useContext(OrgContext);

  return {
    nonNull: () => {
      if (!context.orgSlug) {
        throw new Error('orgSlug is null');
      }
      return context.orgSlug;
    },
    orgSlug: context.orgSlug,
  };
};
