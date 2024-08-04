"use client";

import { createContext, useContext } from 'react';
import React from 'react';
import { usePathname } from 'next/navigation';

interface OrgContextType {
  orgSlug: string | null;
}
const OrgContext = createContext<OrgContextType>({
  orgSlug: null,
});

export const OrgProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname()

  // Extract the organization name from the URL
  const pathParts = pathname.split('/');
  const orgSlug = pathParts[1] ?? '';

  return (
    <OrgContext.Provider value={{ orgSlug }}>
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = (): OrgContextType => useContext(OrgContext);