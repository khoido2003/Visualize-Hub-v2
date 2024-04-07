import { Skeleton } from "@/components/ui/skeleton";

export const ToolbarSkeleton = () => {
  return (
    <Skeleton className="absolute left-0 right-0 top-2 ml-auto mr-auto h-10 w-[35rem] bg-gray-300 dark:bg-gray-50/20" />
  );
};
