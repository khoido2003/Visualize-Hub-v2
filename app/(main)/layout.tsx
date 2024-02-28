import { ThemeProvider } from "@/providers/theme-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VisualizeHub - Workspace",
  description: "Continue your work right here!",
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

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </main>
  );
};

export default MainLayout;
