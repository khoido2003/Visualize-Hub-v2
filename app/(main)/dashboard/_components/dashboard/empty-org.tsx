"use client";

import { Button } from "@/components/ui/button";
import { DialogTrigger, Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import Image from "next/image";

interface EmptyOrg {
  resolved?: string;
}

export const EmptyOrg = ({ resolved }: EmptyOrg) => {
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <Image
        src={
          resolved === "dark"
            ? "/dashboard/effortless-d.svg"
            : "/dashboard/landscape-light.svg"
        }
        height={400}
        width={400}
        alt="empty"
        className="aspect-square sm:w-[400px] sm:h-[400px] w-[250px] h-[250px]"
      />

      <h2 className="mt-6 text-xl sm:text-2xl font-semibold">
        Welcome to VisualizeHub
      </h2>
      <p className="mt-2 text-[11px] sm:text-sm text-muted-foreground">
        Create an organization to get started
      </p>

      <div className="mt-6">
        <Dialog>
          <DialogTrigger>
            <Button className="text-[10px] sm:text-base">
              Create new organization
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-[400px] border-none bg-transparent p-0 ">
            <CreateOrganization
              appearance={{
                baseTheme: resolved === "dark" ? dark : undefined,
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* decoration */}
    </div>
  );
};
