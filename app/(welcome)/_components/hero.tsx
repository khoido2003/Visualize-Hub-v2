import { Button } from "@/components/ui/button";
import { ArrowUpRightSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center relative ">
      <Image
        src="/hero-2.svg"
        alt="Hero"
        height={500}
        width={500}
        className="z-50 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px]"
      />

      <Button className="cursor-pointer px-10 py-7 group mt-6">
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-3 "
        >
          <span className="font-semibold">Go to Workspace</span>
          <ArrowUpRightSquare
            className="group-hover:mb-1 group-hover:ml-1"
            width={20}
            height={20}
          />
        </Link>
      </Button>

      <div className="hidden md:block">
        {/* Lightbulb */}
        <Image
          src="/scribbles/s-7.svg"
          alt="decoration"
          height={70}
          width={70}
          className="absolute lg:bottom-[480px] lg:left-96 hidden lg:block"
        />

        {/* House */}
        <Image
          src="/scribbles/s-13.svg"
          alt="decoration"
          height={90}
          width={90}
          className="absolute bottom-[400px] right-40 rotate-12 lg:h-[90px] lg:w-[90px] md:h-[65px] md:w-[65px] md:right-36"
        />
        {/* Tree */}
        <Image
          src="/scribbles/s-20.svg"
          alt="decoration"
          height={90}
          width={90}
          className="absolute bottom-[400px] right-20 rotate-12 lg:h-[90px] lg:w-[90px] md:h-[65px] md:w-[65px] "
        />

        {/* Message*/}
        <Image
          src="/scribbles/s-12.svg"
          alt="decoration"
          height={70}
          width={70}
          className="absolute lg:w-[60px] lg:h-[60px] xl:w-[70px] h-[70px] xl:bottom-[460px] xl:right-[350px]  lg:bottom-[500px] lg:right-[350px]    rotate-45 hidden lg:block"
        />

        {/* Planet */}
        <Image
          src="/scribbles/s-9.svg"
          alt="decoration"
          height={90}
          width={90}
          className="absolute lg:h-[90px] lg:w-[90px] lg:bottom-20 lg:left-[220px] md:w-[70px] md:h-[70px] md:bottom-24 md:left-[130px] "
        />

        {/* Crown */}
        <Image
          src="/scribbles/s-15.svg"
          alt="decoration"
          height={80}
          width={80}
          className="absolute lg:h-[80px] lg:w-[80px] lg:bottom-[150px] lg:left-[230px] md:w-[65px] md:h-[65px] md:bottom-[150px] md:left-[130px]"
        />

        {/* draw */}
        <Image
          src="/scribbles/s-18.svg"
          alt="decoration"
          height={120}
          width={120}
          className="absolute bottom-20 right-[220px] lg:h-[120px] lg:w-[120px] md:h-[90px] md:w-[90px] "
        />

        {/* triangle, circle */}
        <Image
          src="/scribbles/s-19.svg"
          alt="decoration"
          height={70}
          width={70}
          className="absolute bottom-20 right-[360px] lg:h-[70px] lg:w-[70px] md:h-[55px] md:w-[55px] md:right-[330px]"
        />

        {/* Wavy line */}
        <Image
          src="/bg.svg"
          alt="decoration"
          height={600}
          width={600}
          className="absolute lg:top-[-80px] lg:right-[-35px] xl:top-[-50px] xl:right-[35px] lg:h-[600px] lg:w-[600px] md:h-[400px] md:w-[400px] md:right-[60px] md:top-[50px]"
        />

        <Image
          src="/bg.svg"
          alt="decoration"
          height={600}
          width={600}
          className="absolute lg:top-[-80px] lg:left-[-240px] xl:top-[-60px] xl:left-[-175px] lg:h-[600px] lg:w-[600px] md:h-[400px] md:w-[400px] md:top-[40px] md:left-[-160px]"
        />
      </div>
    </div>
  );
};
