import { cn } from "@/lib/utils";
import React from "react";

interface ButtonOptionsProps {
  children?: React.ReactNode;
  handleAction?: () => void;
  options?: string | boolean;
  backgroundOptions?: string;
}

export const ButtonOptions = ({
  children,
  handleAction,
  options,
  backgroundOptions,
}: ButtonOptionsProps) => {
  return (
    <button
      onClick={handleAction}
      className={cn(
        "relative h-7 w-7 rounded-md border-2 border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white",
        options,
      )}
    >
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 top-0 m-auto h-5 w-5 rounded-md",
          backgroundOptions,
          children && "flex items-center justify-center",
        )}
      >
        {children}
      </div>
    </button>
  );
};
