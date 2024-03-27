import {
  CanvasElement,
  ElementType,
  LayersType,
  StrokePoint,
} from "@/types/canvas";
import { isWithinElement } from "@/utils/is-within-element";

export const getElementAtPosition = (
  x: number,
  y: number,
  layers: readonly LayersType[],
) => {
  return layers.find((layer) => isWithinElement(x, y, layer));
};
