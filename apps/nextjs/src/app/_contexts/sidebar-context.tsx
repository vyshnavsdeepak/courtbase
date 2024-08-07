"use client";
import React, { createContext, useState } from 'react';

interface SidebarContextValue {
  isSidebarOpen: boolean,
  toggleSidebar: (v?: boolean) => void
};

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export const SidebarProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (v?: boolean) => {
    if (v !== undefined) {
      setIsSidebarOpen(v);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const value: SidebarContextValue = {
    isSidebarOpen,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
