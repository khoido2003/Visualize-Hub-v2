import { Skeleton } from "@/components/ui/skeleton";

export const ParticipantLoading = () => {
  return (
    <Skeleton className="absolute right-2 top-2 hidden h-10 w-20 bg-gray-300 dark:bg-gray-50/20 md:block" />
  );
};
