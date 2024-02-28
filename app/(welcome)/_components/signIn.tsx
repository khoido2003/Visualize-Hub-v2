"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export const SignIn = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return (
    <div className="flex">
      {isLoading && (
        <Loader2 height={15} width={15} className="block animate-spin" />
      )}

      {!isAuthenticated && !isLoading && (
        <div className="flex gap-3">
          <SignInButton mode="modal">
            <Button
              variant="outline_secondary"
              className="font-semibold text-xs sm:text-sm"
            >
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button className="text-xs sm:text-sm bg-black text-white hover:bg-white hover:text-black">
              Get VisualizeHub Free
            </Button>
          </SignUpButton>
        </div>
      )}

      {isAuthenticated && !isLoading && (
        <div className="flex gap-3">
          <Button className="bg-black text-white hover:bg-white hover:text-black">
            <Link href="/dashboard" className="text-xs sm:text-sm">
              Continue your work
            </Link>
          </Button>

          <Button
            variant="outline_secondary"
            className="font-semibold text-xs sm:text-sm"
          >
            <SignOutButton />
          </Button>
        </div>
      )}
    </div>
  );
};
