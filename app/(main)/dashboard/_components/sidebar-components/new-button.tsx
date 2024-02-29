"use client";

import { Hint } from "@/components/hint";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import { Plus } from "lucide-react";

import { CreateOrganization } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

/////////////////////////

export const NewButton = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger>
        <div className="aspect-square">
          <Hint
            label="Create organization"
            side="right"
            align="start"
            sideOffset={18}
          >
            <button className="flex h-full w-full items-center justify-center rounded-md bg-transparent opacity-60 transition hover:opacity-100">
              <Plus className="white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[480px] border-none bg-transparent p-0">
        <CreateOrganization
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
