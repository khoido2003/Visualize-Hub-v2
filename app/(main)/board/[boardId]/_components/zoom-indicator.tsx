import { Dispatch, SetStateAction } from "react";

export interface ZoomIndicatorProps {
  onZoom: (delta: number) => void;
  scale: number;
  setScale: Dispatch<SetStateAction<number>>;
}

export const ZoomIndicator = ({
  onZoom,
  scale,
  setScale,
}: ZoomIndicatorProps) => {
  return (
    <div className="absolute bottom-1 left-2 z-50 flex h-12 items-center gap-4 rounded ">
      <button
        className="rounded-md px-3 py-1 shadow-md dark:bg-gray-100/10"
        onClick={() => onZoom(-0.1)}
      >
        -
      </button>

      <button
        className="rounded-md px-3 py-1 shadow-md dark:bg-gray-100/10"
        onClick={() => setScale(1)}
      >{`${new Intl.NumberFormat("en-GB", {
        style: "percent",
      }).format(scale)}`}</button>
      <button
        className="rounded-md px-3 py-1 shadow-md dark:bg-gray-100/10"
        onClick={() => onZoom(0.1)}
      >
        +
      </button>
    </div>
  );
};
