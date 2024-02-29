import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  resolved?: string | undefined;
}

export const Hint = ({
  children,
  label,
  align,
  alignOffset,
  side,
  sideOffset,
  resolved,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent
          className={cn(
            "",
            resolved === "dark"
              ? "border-light_bg bg-light_bg text-dark_bg"
              : "border-dark_bg bg-dark_bg text-light_bg"
          )}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className={cn("font-semibold capitalize")}>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
