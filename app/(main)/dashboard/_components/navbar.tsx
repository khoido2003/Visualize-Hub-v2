"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { SearchInput } from "./navbar-components/search-input";
import { useTheme } from "next-themes";
import { InviteButton } from "./navbar-components/invite-button";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const { resolvedTheme } = useTheme();
  const { organization } = useOrganization();

  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>

      <div className="block flex-1 lg:hidden">
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
                border: `1px solid ${
                  resolvedTheme === "dark" ? "#e5e7eb92" : "#323232"
                }`,
                justifyContent: "space-between",
              },
            },
          }}
        />
      </div>

      <ModeToggle />
      {organization && <InviteButton />}
      <UserButton
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
      />
    </div>
  );
};
