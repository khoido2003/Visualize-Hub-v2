"use client";

import { Logo } from "@/components/logo";
import { SignIn } from "./signIn";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "px-6 py-3 bg-soft flex fixed top-0 z-[100] left-0 w-full justify-between",
        scrolled && "border-b shadow-sm "
      )}
    >
      <Logo isLanding={true} />
      <SignIn />
    </div>
  );
};
