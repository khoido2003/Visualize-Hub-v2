"use client";

import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { InviteButton } from "./invite-button";
import {
  useOrganization,
  useUser,
  SignOutButton,
  UserProfile,
} from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export const MobileMenu = () => {
  const { resolvedTheme } = useTheme();
  const { organization } = useOrganization();
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="sm:hidden flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon height={30} width={30} />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={18}
          className="flex flex-col gap-2 p-4"
        >
          <div className="flex justify-center items-center gap-3 mb-3">
            <span className="truncate">{user?.fullName}</span>
            <Image
              src={user?.imageUrl!}
              height={30}
              width={30}
              className="rounded-full"
              alt="user photo"
            />
          </div>

          <Dialog>
            <DialogTrigger>
              <Button className="w-full">Profile</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[300px] border-none bg-transparent p-0 flex  justify-center">
              <UserProfile
                appearance={{
                  baseTheme: resolvedTheme === "dark" ? dark : undefined,
                  elements: {
                    rootBox: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      maxWidth: "400px",
                      maxHeight: "706px",
                    },
                  },
                }}
              />
            </DialogContent>
          </Dialog>

          {organization && <InviteButton />}

          <SignOutButton signOutCallback={() => router.push("/")}>
            <Button variant="secondary">Sign out</Button>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
