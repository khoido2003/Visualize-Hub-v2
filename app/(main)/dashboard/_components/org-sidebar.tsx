"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboardIcon,
  Star,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ElementRef, useCallback, useRef, useState } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const { resolvedTheme } = useTheme();
  const searchParams = useSearchParams();
  const favourites = searchParams.get("favourites");

  // Make sidebar resizable
  const sidebarRef = useRef<ElementRef<"div">>(null);
  const isResizIngRef = useRef(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizIngRef.current) return;

    let newWidth = event.clientX;
    if (newWidth < 206) newWidth = 206;
    if (newWidth > 376) newWidth = 376;

    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    isResizIngRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizIngRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Reset the width to default
  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsCollapsed(false);
      sidebarRef.current.style.width = `206px`;
      sidebarRef.current.style.paddingLeft = "1.25rem";
      sidebarRef.current.style.paddingTop = "1.25rem";
      sidebarRef.current.style.overflow = "visible";
    }
  };

  // Close the sidebar
  const collapse = () => {
    if (sidebarRef.current) {
      setIsCollapsed(true);
      sidebarRef.current.style.width = "0";
      sidebarRef.current.style.overflow = "hidden";
      sidebarRef.current.style.padding = "0";
    }
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className="hidden lg:flex w-[206px] flex-col space-y-6 pl-5 pt-5 bg-soft dark:bg-background relative group/sidebar transition-all ease-linear"
      >
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

        <div className="w-full space-y-1  ">
          <Button
            variant="ghost"
            asChild
            size="lg"
            className={cn(
              "w-full justify-start px-2 font-normal bg-light_bg/40 dark:bg-dark_bg/20 dark:hover:bg-dark_bg/80",
              !favourites && "bg-light_bg dark:bg-dark_bg"
            )}
          >
            <Link href="/dashboard">
              <LayoutDashboardIcon className="mr-2 h-4 w-4" />
              Team boards
            </Link>
          </Button>

          <Button
            variant="ghost"
            asChild
            size="lg"
            className={cn(
              "w-full justify-start px-2 font-normal bg-light_bg/40 hover:bg-light_bg/90 dark:bg-dark_bg/20 dark:hover:bg-dark_bg/40 ",
              favourites && "bg-light_bg dark:bg-dark_bg"
            )}
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

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="w-1 group-hover/sidebar:opacity-100 opacity-0 bg-primary/10 h-[740px] cursor-ew-resize absolute right-[-15px] top-0 rounded-md"
        />

        <Button variant="ghost" onClick={collapse}>
          <ChevronsLeft
            className={cn(
              "absolute bottom-2 right-2 h-6 w-6",
              isCollapsed && "hidden"
            )}
          />
        </Button>
      </div>

      {isCollapsed && (
        <Button
          onClick={resetWidth}
          variant="ghost"
          className="absolute left-0 bottom-0 transition-all ease-linear delay-75"
        >
          <ChevronsRight className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};
