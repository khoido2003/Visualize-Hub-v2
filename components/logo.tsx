import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/dark-logo.svg"
        alt="Logo"
        width={50}
        height={50}
        className="dark:block hidden sm:w-[50px] w-[30px] sm:h-[50px] h-[30px]"
      />

      <Image
        src="/light-logo.svg"
        width={50}
        height={50}
        alt="Logo"
        className="dark:hidden sm:w-[50px] w-[30px] sm:h-[50px] h-[30px]"
      />

      <span className="hidden sm:block font-semibold text-lg">
        VisualizeHub
      </span>
    </div>
  );
};
