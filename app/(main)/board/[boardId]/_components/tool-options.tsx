"use client";

import { ButtonOptions } from "@/components/button-options";
import { cn } from "@/lib/utils";
import { ToolOptionsType } from "@/types/canvas";

import { HachureIcon, SolidIcon, ZigzagIcon } from "@/utils/bg-style-svg";
import { ExtraSloppy, MediumSloppy, NoSloppy } from "@/utils/sloppiness";
import { Ban, Dot, Hash } from "lucide-react";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction } from "react";

interface ToolOptionsProps {
  setToolOptions: Dispatch<SetStateAction<ToolOptionsType>>;
  toolOptions: ToolOptionsType;
}

export const ToolOptions = ({
  setToolOptions,
  toolOptions,
}: ToolOptionsProps) => {
  const { resolvedTheme } = useTheme();

  const handleStrokeColor = (stroke: string) => {
    setToolOptions((prev) => {
      return { ...prev, stroke };
    });
  };

  const handleFillColor = (fill: string) => {
    setToolOptions((prev) => {
      return { ...prev, fill };
    });
  };

  const handleFillStyle = (fillStyle: string) => {
    setToolOptions((prev) => {
      return { ...prev, fillStyle };
    });
  };

  const handleRoughness = (roughness: number) => {
    setToolOptions((prev) => {
      return { ...prev, roughness };
    });
  };

  return (
    <div className="absolute bottom-0 left-2 top-0 z-50 mb-auto mt-auto h-[500px] w-[230px] rounded-md border-[1px] border-slate-200 p-4 shadow-md dark:bg-gray-100/5">
      {/* Stroke options */}
      <p className="pl-2 text-xs">Stroke</p>
      <div className="flex gap-1 p-2">
        {/* Black */}
        <ButtonOptions
          backgroundOptions={resolvedTheme === "dark" ? "bg-white" : "bg-black"}
          handleAction={() =>
            handleStrokeColor(resolvedTheme === "dark" ? "#fff" : "#000")
          }
          options={
            (toolOptions.stroke === "#fff" || toolOptions.stroke === "#000") &&
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
            toolOptions.stroke === "#DC2626" &&
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
            toolOptions.stroke === "#D97706" &&
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
            toolOptions.stroke === "#059669" &&
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
            toolOptions.stroke === "#7C3AED" &&
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
            toolOptions.stroke === "#DB2777" &&
            (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
          }
        />
      </div>

      {/* ///////////////////////////////////////////////// */}

      {/* Background color */}
      <p className="mt-3 pl-2 text-xs">Background Color</p>
      <div className="flex">
        <div className="flex gap-1 p-2">
          {/* No color */}
          <ButtonOptions
            handleAction={() => {
              handleFillColor("");
            }}
            options={
              toolOptions.fill === "" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          >
            <Ban className="h-4 w-4" />
          </ButtonOptions>

          <ButtonOptions
            backgroundOptions={"bg-[#FFC9C9]"}
            handleAction={() => {
              handleFillColor("#FFC9C9");
            }}
            options={
              toolOptions.fill === "#FFC9C9" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          />
          <ButtonOptions
            backgroundOptions={"bg-[#B2F2BB]"}
            handleAction={() => {
              handleFillColor("#B2F2BB");
            }}
            options={
              toolOptions.fill === "#B2F2BB" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          />

          <ButtonOptions
            backgroundOptions={"bg-[#A5D8FF]"}
            handleAction={() => {
              handleFillColor("#A5D8FF");
            }}
            options={
              toolOptions.fill === "#A5D8FF" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          />

          <ButtonOptions
            backgroundOptions={"bg-[#FFEC99]"}
            handleAction={() => {
              handleFillColor("#FFEC99");
            }}
            options={
              toolOptions.fill === "#FFEC99" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          />

          <ButtonOptions
            backgroundOptions={"bg-[#DB2777]"}
            handleAction={() => {
              handleFillColor("#DB2777");
            }}
            options={
              toolOptions.fill === "#DB2777" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          />
        </div>
      </div>

      {/* /////////////////////////////////////////////////// */}

      {/* Background style */}
      <p className="mt-3 pl-2 text-xs">Background Style</p>
      <div className="flex">
        <div className="flex gap-1 p-2">
          {/* Hachure */}
          <ButtonOptions
            handleAction={() => {
              handleFillStyle("hachure");
            }}
            options={
              toolOptions.fillStyle === "hachure" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          >
            <HachureIcon />
          </ButtonOptions>

          {/* Solid */}
          <ButtonOptions
            handleAction={() => {
              handleFillStyle("solid");
            }}
            options={
              toolOptions.fillStyle === "solid" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          >
            <SolidIcon />
          </ButtonOptions>

          {/* Zig-zag */}
          <ButtonOptions
            handleAction={() => {
              handleFillStyle("zigzag-line");
            }}
            options={
              toolOptions.fillStyle === "zigzag-line" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          >
            <ZigzagIcon />
          </ButtonOptions>

          {/* cross-hatch */}
          <ButtonOptions
            handleAction={() => {
              handleFillStyle("cross-hatch");
            }}
            options={
              toolOptions.fillStyle === "cross-hatch" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          >
            <Hash className="h-4 w-4" />
          </ButtonOptions>

          {/* dots */}
          <ButtonOptions
            handleAction={() => {
              handleFillStyle("dashed");
            }}
            options={
              toolOptions.fillStyle === "dashed" &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          >
            <Dot className="h-11 w-11" />
          </ButtonOptions>
        </div>
      </div>

      {/* ///////////////////////////////////////// */}

      {/* Background style */}
      <p className="mt-3 pl-2 text-xs">Sloppiness</p>
      <div className="flex">
        <div className="flex gap-1 p-2">
          <ButtonOptions
            handleAction={() => {
              handleRoughness(0);
            }}
            options={
              toolOptions.roughness === 0 &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          >
            <NoSloppy />
          </ButtonOptions>

          <ButtonOptions
            handleAction={() => {
              handleRoughness(2);
            }}
            options={
              toolOptions.roughness === 2 &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          >
            <MediumSloppy />
          </ButtonOptions>

          <ButtonOptions
            handleAction={() => {
              handleRoughness(3);
            }}
            options={
              toolOptions.roughness === 3 &&
              (resolvedTheme === "dark" ? "dark:border-white" : "border-black")
            }
          >
            <ExtraSloppy />
          </ButtonOptions>
        </div>
      </div>
    </div>
  );
};
