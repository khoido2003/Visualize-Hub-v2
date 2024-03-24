import { Drawable } from "roughjs/bin/core";

export enum ElementType {
  None = "none",
  Selection = "selection",
  Rectangle = "rectangle",
  Line = "line",
  Circle = "circle",
  Pencil = "pencil",
  Erase = "erase",
}

export type CanvasElement = {
  // id?: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  offsetX?: number;
  offsetY?: number;

  xOffsets?: number[];
  yOffsets?: number[];

  // roughElement?: Drawable;
  elementType: ElementType;
  position?: string | null;
  points?: StrokePoint[];
  // options?: StrokeOptions | undefined;
};

// Drawing with freehand
export type StrokePoint = {
  x: number;
  y: number;
  pressure?: number | undefined;
};

export type Layer = CanvasElement;
