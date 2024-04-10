import {
  CanvasElement,
  ElementType,
  LayersType,
  StrokePoint,
} from "@/types/canvas";
import { postionWithinElement } from "@/utils/position-within-element";

export const getElementAtPosition = (
  x: number,
  y: number,
  layers: readonly LayersType[],
) => {
  return layers
    .map((layer) => ({
      ...layer,
      position: postionWithinElement(x, y, layer),
    }))
    .find((layer) => layer.position !== null);
};
