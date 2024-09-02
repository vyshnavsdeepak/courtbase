import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";

import { cn } from "@court-base/ui";
import { ThemeProvider } from "@court-base/ui/theme";
import { Toaster } from "@court-base/ui/toast";

import { OrgProvider } from "~/app/_contexts/org-context";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";
import PageLoadProgress from "./_contexts/page-load-progress-provider";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://courtbase.app"
      : "http://localhost:3000",
  ),
  title: "Courtbase",
  description: "",
  openGraph: {
    title: "Courtbase",
    description: "Simple solution for efficient and effective case management.",
    url: "https://courtbase.app",
    siteName: "Courtbase",
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
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SessionProvider>
            <OrgProvider>
              <TRPCReactProvider>
                <PageLoadProgress>{props.children}</PageLoadProgress>
              </TRPCReactProvider>
            </OrgProvider>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
