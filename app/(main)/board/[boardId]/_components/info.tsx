"use client";

import { Action } from "@/components/action";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

interface InfoProps {
  boardId: string;
}

export const TabSeparator = () => {
  return <div className="px-1.5 text-neutral-300">|</div>;
};

export const Info = ({ boardId }: InfoProps) => {
  const { resolvedTheme } = useTheme();
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  return (
    <div className="absolute left-2 top-2 hidden h-12 items-center rounded px-1.5 shadow-md md:flex">
      <Hint label="Back to dashboard" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image
              src={
                resolvedTheme === "dark" ? "/dark-logo.svg" : "/light-logo.svg"
              }
              alt="Logo"
              height={25}
              width={25}
            />
          </Link>
        </Button>
      </Hint>

      <TabSeparator />

      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="font-font-normal px-2 text-sm"
          onClick={() => {
            onOpen(data?._id!, data?.title!);
          }}
        >
          {data?.title}
        </Button>
      </Hint>

      <TabSeparator />

      <Action
        id={data?._id!}
        title={data?.title!}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main Menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu height={20} width={20} />
            </Button>
          </Hint>
        </div>
      </Action>
    </div>
  );
};
