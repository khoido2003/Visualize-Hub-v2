import Image from "next/image";

export const LogoLoading = () => {
  return (
    <div className="absolute bottom-0 top-0 mb-auto ml-auto mr-auto mt-auto flex h-full w-full animate-pulse items-center justify-center bg-transparent">
      <Image
        src="/dark-logo.svg"
        alt="Logo"
        width={200}
        height={200}
        className="hidden h-[200px] w-[200px] dark:block sm:h-[100px] sm:w-[100px]"
      />

      <Image
        src="/light-logo.svg"
        alt="Logo"
        width={200}
        height={200}
        className="h-[200px] w-[200px] dark:hidden sm:h-[100px] sm:w-[100px]"
      />
    </div>
  );
};
