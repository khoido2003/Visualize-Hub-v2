"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "./footer";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/clerk-react";

interface BoardCardProps {
  id: string;
  imageUrl: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: string | number;
  orgId: string;
  isFavourite: boolean;
}

export const BoardCard = ({
  id,
  imageUrl,
  authorName,
  authorId,
  createdAt,
  isFavourite,
  orgId,
  title,
}: BoardCardProps) => {
  const { resolvedTheme } = useTheme();
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;

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

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/101] overflow-hidden rounded-lg">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
