import Image from "next/image";

export const Logo = ({ isLanding }: { isLanding: boolean }) => {
  return (
    <>
      {isLanding ? (
        <div className="flex items-center justify-center">
          <Image
            src="/light-logo.svg"
            width={50}
            height={50}
            alt="Logo"
            className="h-[30px] w-[30px] sm:h-[50px] sm:w-[50px]"
          />

          <span className="hidden text-lg font-semibold text-black sm:block">
            VisualizeHub
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Image
            src="/dark-logo.svg"
            alt="Logo"
            width={50}
            height={50}
            className="hidden h-[30px] w-[30px] dark:block sm:h-[50px] sm:w-[50px]"
          />

          <Image
            src="/light-logo.svg"
            width={50}
            height={50}
            alt="Logo"
            className="h-[30px] w-[30px] dark:hidden sm:h-[50px] sm:w-[50px]"
          />

          <span className="hidden text-lg font-semibold sm:block">
            VisualizeHub
          </span>
        </div>
      )}
    </>
  );
};
