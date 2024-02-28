import { Logo } from "@/components/logo";
import { SignIn } from "./signIn";

export const Navbar = () => {
  return (
    <div className=" p-6 flex items-center justify-between">
      <Logo />
      <SignIn />
    </div>
  );
};
