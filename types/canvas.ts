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
  id?: number;
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

  // Style of the element
  fill?: string;
  fillStyle?: string;
  roughness?: number;
  stroke?: string;
};

// Drawing with freehand
export type StrokePoint = {
  x: number;
  y: number;
  pressure?: number | undefined;
};

export type Layer = CanvasElement;

export interface ToolOptionsType {
  // Style of the element
  fill?: string;
  fillStyle?: string;
  roughness?: number;
  stroke?: string;
}

export interface LayersType {
  readonly id?: number;
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly offsetX?: number;
  readonly offsetY?: number;

  readonly sxOffsets?: number[];
  readonly yOffsets?: number[];

  // roughElement?: Drawable;
  readonly elementType: ElementType;
  readonly position?: string | null;
  readonly points?: StrokePoint[];

  // Style of the element
  readonly fill?: string;
  readonly fillStyle?: string;
  readonly roughness?: number;
  readonly stroke?: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface SelectionNet {
  origin?: Point;
  current?: Point;
}
