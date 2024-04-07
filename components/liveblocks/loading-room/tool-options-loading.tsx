import { Skeleton } from "@/components/ui/skeleton";

export const ToolOptionsLoading = () => {
  return (
    <Skeleton className="absolute bottom-0 left-2 top-0 mb-auto mt-auto hidden h-[600px] w-[250px] bg-gray-200 dark:bg-gray-50/20 md:block" />
  );
};
