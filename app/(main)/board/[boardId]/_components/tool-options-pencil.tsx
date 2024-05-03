"use client";

import { ButtonOptions } from "@/components/button-options";
import { cn } from "@/lib/utils";
import { ToolOptionsType } from "@/types/canvas";

import { HachureIcon, SolidIcon, ZigzagIcon } from "@/utils/bg-style-svg";
import { ExtraSloppy, MediumSloppy, NoSloppy } from "@/utils/sloppiness";
import { Ban, Dot, Hash } from "lucide-react";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction } from "react";

interface ToolOptionsPencilProps {
  setToolPencilOptions: Dispatch<
    SetStateAction<{
      stroke: string;
    }>
  >;
  toolPencilOptions: {
    stroke: string;
  };
}

export const ToolOptionsPencils = ({
  setToolPencilOptions,
  toolPencilOptions,
}: ToolOptionsPencilProps) => {
  const { resolvedTheme } = useTheme();

  const handleStrokeColor = (stroke: string) => {
    setToolPencilOptions((prev) => {
      return { ...prev, stroke };
    });
  };

  return (
    <div className="absolute bottom-0 left-2 top-0 z-50 mb-auto mt-auto h-[100px] w-[230px] rounded-md border-[1px] border-slate-200 p-4 shadow-md dark:bg-gray-100/5">
      {/* Stroke options */}
      <p className="pl-2 text-xs">Color</p>
      <div className="flex gap-1 p-2">
        {/* Black */}
        <ButtonOptions
          backgroundOptions={resolvedTheme === "dark" ? "bg-white" : "bg-black"}
          handleAction={() =>
            handleStrokeColor(resolvedTheme === "dark" ? "#fff" : "#000")
          }
          options={
            (toolPencilOptions.stroke === "#fff" ||
              toolPencilOptions.stroke === "#000") &&
            (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
          }
        />

        {/* Red */}
        <ButtonOptions
          backgroundOptions={"bg-[#DC2626]"}
          handleAction={() => {
            handleStrokeColor("#DC2626");
          }}
          options={
            toolPencilOptions.stroke === "#DC2626" &&
            (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
          }
        />

        {/* Orange */}
        <ButtonOptions
          backgroundOptions={"bg-[#D97706]"}
          handleAction={() => {
            handleStrokeColor("#D97706");
          }}
          options={
            toolPencilOptions.stroke === "#D97706" &&
            (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
          }
        />

        {/* Green */}
        <ButtonOptions
          backgroundOptions={"bg-[#059669]"}
          handleAction={() => {
            handleStrokeColor("#059669");
          }}
          options={
            toolPencilOptions.stroke === "#059669" &&
            (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
          }
        />

        {/* Violet */}
        <ButtonOptions
          backgroundOptions={"bg-[#7C3AED]"}
          handleAction={() => {
            handleStrokeColor("#7C3AED");
          }}
          options={
            toolPencilOptions.stroke === "#7C3AED" &&
            (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
          }
        />

        {/* Pink */}
        <ButtonOptions
          backgroundOptions={"bg-[#DB2777]"}
          handleAction={() => {
            handleStrokeColor("#DB2777");
          }}
          options={
            toolPencilOptions.stroke === "#DB2777" &&
            (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
          }
        />
      </div>

      {/* ///////////////////////////////////////////////// */}

      {/* /////////////////////////////////////////////////// */}

      {/* ///////////////////////////////////////// */}
    </div>
  );
};
