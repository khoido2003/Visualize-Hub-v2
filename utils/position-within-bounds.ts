import { HANDLE_WIDTH } from "@/constants";
import { nearPoint } from "./near-point";

export const positionWithinBounds = (
  x: number,
  y: number,
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  } | null,
) => {
  const { x: x1, y: y1, width, height } = bounds!;
  const x2 = x1 + width;
  const y2 = y1 + height;

  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

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

  let positionWithin;

  const insideRect =
    x >= minX && x <= maxX && y >= minY && y <= maxY ? "inside" : null;

  positionWithin =
    topLeft || topRight || bottomLeft || bottomRight || insideRect;

  return positionWithin;
};
