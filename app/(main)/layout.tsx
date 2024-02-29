"use client";

import { Loading } from "@/components/loading";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthLoading, Authenticated } from "convex/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ThemeProvider>
    </main>
  );
};

export default MainLayout;
