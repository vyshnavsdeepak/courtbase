"use client";

import { createContext, useContext } from 'react';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface OrgContextType {
  orgSlug: string | null;
}
const OrgContext = createContext<OrgContextType>({
  orgSlug: null,
});

export const OrgProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const orgSlug = useMemo(() => {
    const segments = pathname.split('/');
    return segments.includes('x') ? segments[segments.indexOf('x') + 1] : null;
  }, [pathname]);
  return (
    <OrgContext.Provider value={{ orgSlug }}>
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = (): OrgContextType => useContext(OrgContext);