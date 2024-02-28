import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <div className="px-6 py-2 w-full h-36 mt-10 flex justify-between items-center">
        <Logo />

        <div>
          <Button variant="ghost">
            <Link href="/">Privacy Policy</Link>
          </Button>

          <Button variant="ghost">
            <Link href="/">Terms & Conditions</Link>
          </Button>
        </div>
      </div>
      <p className="px-6 py-3 flex justify-center items-center">
        &copy; 2024 VisualizeHub. All rights reserved. Designed by Khoi Do.
      </p>
    </>
  );
};
