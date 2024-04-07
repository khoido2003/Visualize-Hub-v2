import { Skeleton } from "@/components/ui/skeleton";

export const InfoLoading = () => {
  return (
    <Skeleton className="absolute left-2 top-2 hidden h-10 w-32 bg-gray-300 dark:bg-gray-50/20 md:block" />
  );
};
