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

    if (left > x1) {
      left = x1;
    }
    if (right < x2) {
      right = x2;
    }
    if (top > y1) {
      top = y1;
    }
    if (bottom < y2) {
      bottom = y2;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};

export const useSelectionBounds = () => {
  const seletionLayers = useSelf((me) => me.presence.selectionLayers);

  return boundingBox(seletionLayers);
};
