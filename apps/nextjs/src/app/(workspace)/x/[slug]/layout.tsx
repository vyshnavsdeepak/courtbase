import type { Metadata } from "next";

import { SidebarProvider } from "~/app/_contexts/sidebar-context";
import Sidebar from "../../../_components/sidebar";

export const metadata: Metadata = {
  title: "Courtbase",
  description: "Simple solution for efficient and effective case management.",
};

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen border-collapse overflow-hidden">
      <SidebarProvider>
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
