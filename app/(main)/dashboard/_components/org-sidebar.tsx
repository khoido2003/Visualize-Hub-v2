"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { LayoutDashboardIcon, Star } from "lucide-react";
import { useTheme } from "next-themes";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const { resolvedTheme } = useTheme();
  const searchParams = useSearchParams();
  const favourites = searchParams.get("favourites");

  return (
    <div className="hidden lg:flex w-[206px] flex-col space-y-6 pl-5 pt-5 bg-soft dark:bg-background">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image
            src={
              resolvedTheme === "dark" ? "/dark-logo.svg" : "/light-logo.svg"
            }
            alt="Logo"
            width={45}
            height={45}
          />
          <span className={cn("text-xl font-semibold", font.className)}>
            VisualizeHub
          </span>
        </div>
      </Link>

      <OrganizationSwitcher
        afterCreateOrganizationUrl="/dashboard"
        afterLeaveOrganizationUrl="/dashboard"
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "376px",
            },
            organizationSwitcherTrigger: {
              backgroundColor: `${
                resolvedTheme === "dark" ? "#19191A" : "#fff"
              }`,
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              justifyContent: "space-between",
            },
          },
        }}
      />

      <div className="w-full space-y-1">
        <Button
          variant={favourites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal bg-light_bg dark:bg-dark_bg dark:hover:bg-dark_bg/80"
        >
          <Link href="/dashboard">
            <LayoutDashboardIcon className="mr-2 h-4 w-4" />
            Team boards
          </Link>
        </Button>

        <Button
          variant={favourites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal bg-light_bg dark:bg-dark_bg dark:hover:bg-dark_bg/80"
        >
          <Link
            href={{
              pathname: "/dashboard",
              query: { favourites: true },
            }}
          >
            <Star className="mr-2 h-4 w-4" />
            Favourite boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
