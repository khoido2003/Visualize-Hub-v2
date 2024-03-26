import { CanvasElement } from "@/types/canvas";
import rough from "roughjs";

// Init the roughjs generator
const generator = rough.generator();

/**
 *
 * Create a new element on the canvas
 *
 */
export const createElement = ({
  x1,
  y1,
  x2,
  y2,
  elementType,
  fill,
  fillStyle,
  roughness,
  stroke,
}: CanvasElement) => {
  let roughElement;

  switch (elementType) {
    case "line":
      roughElement = generator.line(x1, y1, x2, y2, {
        fill,
        fillStyle,
        roughness,
        stroke,
        strokeWidth: 3,
      });
      break;
    case "rectangle":
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
        fill,
        fillStyle,
        roughness,
        stroke,
        strokeWidth: 3,
      });
      break;
    case "circle":
      // Calculate the center of the circle
      const centerX = (x1 + x2) / 2;
      const centerY = (y1 + y2) / 2;

      // Calculate the radius
      const radiusX = Math.abs(x2 - x1) / 2;
      const radiusY = Math.abs(y2 - y1) / 2;

      roughElement = generator.ellipse(
        centerX,
        centerY,
        radiusX * 2,
        radiusY * 2,
        {
          fill,
          fillStyle,
          roughness,
          stroke,
          strokeWidth: 3,
        },
      );
      break;
    case "pencil":
      break;
    default:
      // throw new Error("Invalid element type");
      break;
  }

  return { x1, y1, x2, y2, roughElement, elementType };
};
