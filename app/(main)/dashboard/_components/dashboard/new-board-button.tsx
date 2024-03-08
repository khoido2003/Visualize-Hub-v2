"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate: create, pending } = useApiMutation(api.board.create);
  const router = useRouter();

  const onClick = () => {
    create({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created successfully!");
        // router.push(`/dashboard/board/${id}`);
      })
      .catch(() => {
        toast.error("Failed to create board!");
      });
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 flex aspect-[100/101] cursor-pointer flex-col items-center justify-center rounded-lg bg-light_bg hover:bg-light_bg/60 dark:bg-secondary py-6 dark:hover:bg-secondary/50",
        (pending || disabled) &&
          "cursor-not-allowed opacity-75 dark:hover:bg-secondary/50"
      )}
    >
      <Plus className="h-12 w-12 stroke-1 dark:text-white text-black" />
      <p className="text-xs font-light dark:text-white text-black">New Board</p>
    </button>
  );
};
