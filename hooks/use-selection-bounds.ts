import { useSelf, useStorage } from "@/liveblocks.config";
import { LayersType } from "@/types/canvas";

const boundingBox = (layers: readonly LayersType[]) => {
  const firstElement = layers[0];

  if (!firstElement) return null;

  let left = Math.min(firstElement.x1, firstElement.x2);
  let right = Math.max(firstElement.x1, firstElement.x2);
  let top = Math.min(firstElement.y1, firstElement.y2);
  let bottom = Math.max(firstElement.y1, firstElement.y2);

  for (let i = 1; i < layers.length; i++) {
    const { x1, x2, y1, y2 } = layers[i];

    const maxX = Math.max(x1, x2);
    const maxY = Math.max(y1, y2);
    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);

    if (left > x1) {
      left = minX;
    }
    if (right < x2) {
      right = maxX;
    }
    if (top > y1) {
      top = minY;
    }
    if (bottom < y2) {
      bottom = maxY;
    }
  }

  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    centerX,
    centerY,
  };
};

export const useSelectionBounds = () => {
  const seletionLayers = useSelf((me) => me.presence.selectionLayers);

  return boundingBox(seletionLayers);
};
