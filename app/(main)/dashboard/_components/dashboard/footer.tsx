import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export const Footer = () => {
  return (
    <div className="relative bg-black/85 p-2">
      <p className="max-w-[calc(100%-20px)] truncate text-[13px] text-white">
        Untitled
      </p>
      <p className="truncate text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        Khoi Do, 1 day ago
      </p>
      <button className="absolute right-3 top-3 text-muted-foreground opacity-0 transition hover:text-yellow-400 group-hover:opacity-100">
        <Star className={cn("h-4 w-4")} />
      </button>
    </div>
  );
};
