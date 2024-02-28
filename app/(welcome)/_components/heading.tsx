import Image from "next/image";

export const Heading = () => {
  return (
    <div className="w-full mt-6 relative">
      <h1 className="text-center text-2xl sm:text-5xl font-bold">
        Enter with an idea. <br />
        Exit with the next big thing.{" "}
      </h1>
      <p className="mt-2 md:mt-4 text-center text-[9px] sm:text-sm text-wrap">
        VisualizeHub is the connected workspace where better, faster work
        happens.
      </p>
      {/* ///////////////////////////////////////////////////// */}

      <div className="hidden md:block  ">
        {/* 3 line */}
        <Image
          src="/scribbles/s-6.svg"
          alt="decoration"
          height={70}
          width={70}
          className="absolute  lg:top-12 lg:right-32 md:top-[40px] md:right-[10px] md:w-[120px] md:h-[50px] lg:h-[70px] lg:w-[70px]"
        />

        {/* Star */}
        <Image
          src="/scribbles/s-1.svg"
          alt="decoration"
          height={45}
          width={45}
          className="absolute lg:top-0 lg:right-64 lg:h-[45px] lg:w-[45px] md:top-[0px] md:right-[120px] md:w-[35px] md:h-[35px]"
        />

        {/* Arrow */}
        <Image
          src="/scribbles/s-8.svg"
          alt="decoration"
          height={70}
          width={70}
          className=" absolute lg:h-[70px] lg:w-[70px] lg:top-[60px] lg:left-[190px] hidden xl:block"
        />

        {/* Smile face */}
        <Image
          src="/scribbles/s-4.svg"
          alt="decoration"
          height={60}
          width={60}
          className="absolute lg:h-[60px] lg:w-[60px] lg:top-[130px] lg:left-[160px] md:top-[130px] md:left-[30px] md:w-[40px] md:h-[40px]"
        />

        {/* Thumb up */}
        <Image
          src="/scribbles/s-11.svg"
          alt="decoration"
          height={60}
          width={60}
          className="absolute lg:h-[60px] lg:w-[60px] lg:top-[130px] lg:left-[220px] animate-bounce md:top-[130px] md:left-[70px] md:w-[40px] md:h-[40px]"
        />

        {/* moon */}
        <Image
          src="/scribbles/s-17.svg"
          alt="decoration"
          height={60}
          width={60}
          className="absolute lg:h-[60px] lg:w-[60px] lg:top-[-110px] lg:left-[400px] md:top-[-80px] md:right-[400px] md:w-[50px] md:h-[50px]"
        />
      </div>
    </div>
  );
};
