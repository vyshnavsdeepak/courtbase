import type { Metadata } from "next";
import Sidebar from "../../../_components/sidebar";
import { SidebarProvider } from "~/app/_contexts/sidebar-context";

export const metadata: Metadata = {
  title: "Court Base",
  description: "Simple solution for efficient and effective case management.",
};

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-screen">
        <SidebarProvider>
        <Sidebar />
        <main className="flex-1">{children}</main>
        </SidebarProvider>
      </div>
  );
}
