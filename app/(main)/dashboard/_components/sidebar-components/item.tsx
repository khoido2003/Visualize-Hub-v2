"use client";

import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/clerk-react";
import { useTheme } from "next-themes";
import Image from "next/image";

interface ItemProps {
  name: string;
  imageUrl: string;
  id: string;
}

export const Item = ({ id, imageUrl, name }: ItemProps) => {
  const { resolvedTheme } = useTheme();
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (isActive) return;
    setActive?.({ organization: id });
  };

  return (
    <div className="relative aspect-square">
      <Hint
        label={name}
        side="right"
        align="start"
        sideOffset={18}
        resolved={resolvedTheme}
      >
        <Image
          alt={name}
          src={imageUrl}
          fill
          onClick={onClick}
          className={cn(
            "cursor-pointer rounded-md opacity-40 transition hover:opacity-100",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
};

///////

Item.Skeleton = function ItemSkeleton() {
  return (
    <div className="rounded-md aspect-square animate-pulse flex items-center justify-center w-8 h-8 bg-gray-300 dark:bg-gray-700"></div>
  );
};
