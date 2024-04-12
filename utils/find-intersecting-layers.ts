import { LayersType, Point } from "@/types/canvas";

interface FindIntersectingLayers {
  layers: readonly LayersType[];
  origin: Point;
  current: Point;
}

export function findIntersectingLayers({
  current,
  layers,
  origin,
}: FindIntersectingLayers) {
  const rect = {
    x: Math.min(origin.x, current.x),
    y: Math.min(origin.y, current.y),
    width: Math.abs(origin.x - current.x),
    height: Math.abs(origin.y - current.y),
  };
  console.log(rect, " Rect");

  const elements = [];
  for (const layer of layers) {
    if (layer === null) continue;
    const { x1, x2, y1, y2 } = layer;

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    if (
      rect.x + rect.width > maxX &&
      rect.x < minX &&
      rect.y + rect.height > maxY &&
      rect.y < minY
    ) {
      elements.push(layer);
    }
  }

  return elements;
}
