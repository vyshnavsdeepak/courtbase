import type { Metadata } from "next";
import Sidebar from "../../_components/sidebar";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full">{children}</main>
      </div>
  );
}
