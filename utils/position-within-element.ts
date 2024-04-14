import { CanvasElement, StrokePoint } from "@/types/canvas";
import { distance } from "./distance";
import { nearPoint } from "./near-point";
import { HANDLE_WIDTH } from "@/constants";
import { onLine } from "./on-line";

export const postionWithinElement = (
  x: number,
  y: number,
  layer: CanvasElement,
) => {
  const { id, x1, x2, y1, y2, elementType } = layer;

  let positionWithin;

  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  const width = maxX - minX;
  const height = maxY - minY;

  const topLeft = nearPoint(
    x,
    y,
    minX - HANDLE_WIDTH,
    minY - HANDLE_WIDTH,
    "tl",
  );
  const topRight = nearPoint(
    x,
    y,
    minX + width + HANDLE_WIDTH * 2,
    minY - HANDLE_WIDTH * 2,
    "tr",
  );
  const bottomLeft = nearPoint(
    x,
    y,
    minX - HANDLE_WIDTH * 2,
    minY + height + HANDLE_WIDTH,
    "bl",
  );
  const bottomRight = nearPoint(
    x,
    y,
    minX + width + HANDLE_WIDTH * 2,
    minY + height + HANDLE_WIDTH * 2,
    "br",
  );

  switch (elementType) {
    case "rectangle":
      const insideRect =
        x >= minX && x <= maxX && y >= minY && y <= maxY ? "inside" : null;

      positionWithin =
        topLeft || topRight || bottomLeft || bottomRight || insideRect;
      break;

    case "line":
      const a = { x: x1, y: y1 };
      const b = { x: x2, y: y2 };
      const c = { x: x, y: y };
      const offset = distance(a, b) - (distance(a, c) + distance(b, c));
      const insideLine = Math.abs(offset) < 1 ? "inside" : null;
      // const start = nearPoint(x, y, x1, y1, "start");
      // const end = nearPoint(x, y, x2, y2, "end");
      positionWithin =
        topLeft || topRight || bottomLeft || bottomRight || insideLine;
      break;

    case "circle":
      const radiusX = Math.abs(x1 - x2) / 2;
      const radiusY = Math.abs(y1 - y2) / 2;
      const centerX = Math.min(x1, x2) + radiusX;
      const centerY = Math.min(y1, y2) + radiusY;

      // Calculate the normalizes coordinates
      const normalizedX = (x - centerX) / radiusX;
      const normalizedY = (y - centerY) / radiusY;

      // Check if the poit is inside the circle
      const isInside =
        normalizedX * normalizedX + normalizedY * normalizedY <= 1;

      // Check if the cursor is near the border of the circle
      // const isNearBorder =
      //   Math.abs(1 - (normalizedX * normalizedX + normalizedY * normalizedY)) <=
      //   0.5;

      positionWithin =
        topLeft ||
        topRight ||
        bottomLeft ||
        bottomRight ||
        (isInside && "inside") ||
        null;
      break;

    case "pencil":
      const betweenAnyPoint = layer.points?.some((point, index) => {
        const nextPoint = layer.points?.[index + 1] as StrokePoint;
        if (!nextPoint) return false;
        return (
          onLine(
            (point as StrokePoint).x,
            (point as StrokePoint).y,
            nextPoint.x,
            nextPoint.y,
            x,
            y,
            5,
          ) !== null
        );
      });

      positionWithin = betweenAnyPoint ? "inside" : null;
      break;
    default:
      break;
  }

  return positionWithin;
};
