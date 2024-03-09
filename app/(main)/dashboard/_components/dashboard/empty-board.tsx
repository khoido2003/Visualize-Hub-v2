import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/clerk-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const EmptyBoard = () => {
  const router = useRouter();
  const { organization } = useOrganization();

  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created successfully!");
        // router.push(`/dashboard/board/${id}`);
      })
      .catch((err) => toast.error("Failed to create board"));
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="/dashboard/empty-board-light.svg"
        height={300}
        width={300}
        alt="Empty search result"
        className="dark:hidden block"
      />

      <Image
        src="/dashboard/empty-board-dark.svg"
        height={300}
        width={300}
        alt="Empty search result"
        className="dark:block hidden"
      />

      <h2 className="mt-1 text-2xl font-semibold">Create your first board</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start by creatng a board for your organization
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={onClick} disabled={pending}>
          Create Board
        </Button>
      </div>
    </div>
  );
};
