"use client";

import { formatDistanceToNow } from "date-fns";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "./footer";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/clerk-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Overlay } from "./overlay";

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
  const createdAtlabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const { mutate: onFavorite, pending: pendingFavourite } = useApiMutation(
    api.board.favourite
  );
  const { mutate: onUnfavorite, pending: pendingUnfavourite } = useApiMutation(
    api.board.unfavourite
  );

  const toggleFavourite = () => {
    if (isFavourite) {
      onUnfavorite({ id }).catch(() => {
        toast.error("Failed to unfavourite!");
      });
    } else {
      onFavorite({ id, orgId }).catch(() =>
        toast.error("Failed to favourite!")
      );
    }
  };

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

          <Overlay />
        </div>

        <Footer
          isFavourite={isFavourite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtlabel}
          onClick={toggleFavourite}
          disabled={pendingFavourite || pendingUnfavourite}
        />
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
