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

  const elements = [];
  for (const layer of layers) {
    if (layer === null) continue;
    const { x1, x2, y1, y2 } = layer;

    if (
      rect.x + rect.width > x1 + Math.abs(x2 - x1) &&
      rect.x < x1 + Math.abs(x2 - x1) &&
      rect.y + rect.height > y1 + Math.abs(y2 - y1) &&
      rect.y < y1 + Math.abs(y2 - y1)
    ) {
      elements.push(layer);
    }
  }

  return elements;
}
