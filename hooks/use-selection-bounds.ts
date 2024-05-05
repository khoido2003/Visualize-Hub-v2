import { useSelf, useStorage } from "@/liveblocks.config";
import { CanvasElement, LayersType } from "@/types/canvas";
import { memo } from "react";

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

    if (left > minX) {
      left = minX;
    }
    if (right < maxX) {
      right = maxX;
    }
    if (top > minY) {
      top = minY;
    }
    if (bottom < maxY) {
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

export const selectionBounds = (seletionLayers: CanvasElement[]) => {
  return boundingBox(seletionLayers);
};
