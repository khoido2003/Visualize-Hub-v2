"use client";

import { Loading } from "@/components/loading";
import { ModelProvider } from "@/providers/modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthLoading, Authenticated } from "convex/react";
import { Suspense } from "react";
import { Toaster } from "sonner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Authenticated>
          {children}

          {/* Rename modal */}
          <ModelProvider />

          {/*Show notification */}
          <Toaster position="top-center" />
        </Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ThemeProvider>
    </main>
  );
};

export default MainLayout;
