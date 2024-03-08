import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-light_bg/50 dark:bg-dark_bg/70",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
