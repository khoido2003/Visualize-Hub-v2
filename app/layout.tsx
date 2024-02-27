import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Loading } from "@/components/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VisualizeHub - Welcome page",
  description: "Start your journey right here!",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/light-logo.svg",
        href: "/light-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/dark-logo.svg",
        href: "/dark-logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
