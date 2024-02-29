import { Sidebar } from "./_components/sidebar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Navbar } from "./_components/navbar";
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

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-soft dark:bg-background">
      <Sidebar />
      <div className="h-full sm:pl-[60px] ">
        <div className="flex h-full gap-x-3">
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
