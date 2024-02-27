import Image from "next/image";

export const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-sorf dark:bg-background">
      <Image
        src="/dark-logo.svg"
        height={120}
        width={120}
        alt="Logo"
        className="animate-pulse dark:block hidden"
      />

      <Image
        src="/light-logo.svg"
        height={120}
        width={120}
        alt="Logo"
        className="animate-pulse dark:hidden "
      />
    </div>
  );
};
