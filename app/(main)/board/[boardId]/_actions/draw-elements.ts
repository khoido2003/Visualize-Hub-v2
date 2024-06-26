import { CanvasElement, LayersType } from "@/types/canvas";
import { getSvgPathFromStroke } from "@/utils/get-svg-path-from-stroke";
import { RoughCanvas } from "roughjs/bin/canvas";

import getStroke from "perfect-freehand";

export const drawElement = (
  roughCanvas: RoughCanvas,
  context: CanvasRenderingContext2D,
  layer: LayersType,
  toolPencilOptions: {
    stroke: string;
  },
  resolvedTheme: string | undefined,
) => {
  switch (layer.elementType) {
    case "line":
    case "rectangle":
    case "circle":
      // @ts-ignore
      roughCanvas.draw(layer.roughElement!);
      break;

    case "pencil":
      const stroke = getSvgPathFromStroke(getStroke(layer.points!, {}));

      if (resolvedTheme === "dark" && layer.stroke === "#000") {
        context.fillStyle = "#fff";
      } else if (resolvedTheme !== "dark" && layer.stroke === "#fff") {
        context.fillStyle = "#000";
      } else context.fillStyle = layer.stroke!;
      context.fill(new Path2D(stroke));
      break;

    default:
      throw new Error("Invalid element type!");
  }
};
