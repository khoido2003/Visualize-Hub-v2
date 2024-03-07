"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "./footer";
import { useTheme } from "next-themes";

interface BoardCardProps {
  id?: string;
  imageUrl: string;
}

export const BoardCard = ({ id, imageUrl }: BoardCardProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Link href={`/board/${id}`}>
      <div className="group flex aspect-[100/101] flex-col justify-between overflow-hidden rounded-lg border border-black">
        <div className="relative flex-1 bg-white/90 dark:bg-dark_bg">
          <Image
            src={
              resolvedTheme === "dark"
                ? `/dashboard/board-dark/${imageUrl}`
                : `/dashboard/board-light/${imageUrl}`
            }
            fill
            alt="Picture"
          />
        </div>

        <Footer />
      </div>
    </Link>
  );
};
