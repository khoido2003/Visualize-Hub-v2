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

const DashBoardPage = () => {
  return <div>Dashboard</div>;
};

export default DashBoardPage;
