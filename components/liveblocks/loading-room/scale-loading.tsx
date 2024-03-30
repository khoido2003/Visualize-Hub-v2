import { Skeleton } from "@/components/ui/skeleton";

export const ScaleLoading = () => {
  return (
    <div className="absolute bottom-2 left-2 flex items-center justify-center gap-2">
      <Skeleton className="h-10 w-44 bg-gray-300" />
      <Skeleton className="h-10 w-20 bg-gray-300" />
    </div>
  );
};
