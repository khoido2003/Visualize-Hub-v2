"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { Plus } from "lucide-react";
import { useTheme } from "next-themes";

export const InviteButton = () => {
  const { resolvedTheme } = useTheme();
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite Members
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[880px] border-none bg-transparent p-0">
        <OrganizationProfile
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
