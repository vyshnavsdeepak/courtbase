import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@court-base/ui";
import { ThemeProvider, ThemeToggle } from "@court-base/ui/theme";
import { Toaster } from "@court-base/ui/toast";
import { OrgProvider } from "~/app/_contexts/org-context";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://courtbase.app"
      : "http://localhost:3000",
  ),
  title: "Court Base",
  description: "",
  openGraph: {
    title: "Court Base",
    description: "Simple solution for efficient and effective case management.",
    url: "https://courtbase.app",
    siteName: "Court Base",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  userScalable: false,
  maximumScale: 1,
  initialScale: 1,
    width: "device-width",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <OrgProvider>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          </OrgProvider>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
