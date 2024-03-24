"use client";

import rough from "roughjs";
import { throttle } from "lodash";

import { CanvasElement, ElementType } from "@/types/canvas";

import { useMutation, useMyPresence, useStorage } from "@/liveblocks.config";
import { useEffect, useLayoutEffect, useState } from "react";
import CursorPresence from "./cursor-display/cursor-presence";
import { createElement } from "../_actions/create-element";
import { LiveObject } from "@liveblocks/client";
import { useDeleteLayers } from "@/hooks/use-delete-elements";

export interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  useEffect(() => {
    // Function to update canvas size based on window dimensions
    const updateCanvasSize = () => {
      const canvas = document.getElementById(
        "canvas-board"
      ) as HTMLCanvasElement;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Update canvas size when the window is resized
    window.addEventListener("resize", updateCanvasSize);

    // Call updateCanvasSize initially to set the canvas size
    updateCanvasSize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  //-------------------------------------------

  // Cusror presence
  const [myPresence, updateMyPresence] = useMyPresence();

  //////////////////////////////////////////////////

  const deleteLayers = useDeleteLayers();

  const layers = useStorage((root) => root.layers);

  const [elementType, setElementType] = useState<ElementType>(
    ElementType.Rectangle
  );
  // Check if drawing or not
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // Setup the canvas
    const canvas = document.getElementById("canvas-board") as HTMLCanvasElement;

    // representing a two-dimensional rendering context.
    const context = canvas!.getContext("2d");

    // Erase the whole canvas or else the old element or old state will still be there and causing some weird behaviors.
    context?.clearRect(0, 0, canvas!.width, canvas!.height);

    // Linking roughjs to html canvas
    const roughCanvas = rough.canvas(canvas!);

    layers.forEach((layer) => {
      // @ts-ignore
      roughCanvas.draw(layer.roughElement!); // the rough element from roughjs currently does not compatible with liveblocks so I have to turn off typescript for this line

      console.log({ ...layer });
    });
  }, [layers]);

  const insertElement = useMutation(
    ({ storage, setMyPresence }, element: CanvasElement) => {
      const liveLayers = storage.get("layers");

      const layer = new LiveObject(element);
      liveLayers.push(layer);
    },
    []
  );

  const updateElement = useMutation(
    ({ storage, setMyPresence }, clientX: number, clientY: number) => {
      const liveLayers = storage.get("layers");
      const index = liveLayers.length - 1;
      const { x1, y1, elementType } = liveLayers.get(index)!.toObject();

      // Keep the position, only update the height and width due to the postion of the mouse
      const element = createElement({
        x1,
        y1,
        x2: clientX,
        y2: clientY,
        elementType,
      }) as CanvasElement;

      const updatedElement = new LiveObject(element);
      // Update the new height and width of the element
      liveLayers.set(index, updatedElement);
    },
    []
  );

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      switch (e.key) {
        // case "Backspace":
        //   deleteLayers();
        //   break;
        case "z":
          if (e.ctrlKey || e.metaKey) {
            if (layers.length > 0) deleteLayers();
            break;
          }
      }
    }

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [deleteLayers, layers]);

  ////////////////////////////////////////////////////////////

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsDrawing(true);
    const { clientX, clientY } = event;
    const element = createElement({
      x1: clientX,
      y1: clientY,
      x2: clientX,
      y2: clientY,
      elementType,
    });

    insertElement(element);
  };

  // MOUSE MOVE (Click mouse and move the mouse on the canvas)
  const handleMouseMove = throttle(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      // The new height and width of the element or position of mouse cursor
      const { clientX, clientY } = event;

      updateMyPresence({ cursor: { x: clientX, y: clientY } });

      if (!isDrawing) return;

      updateElement(clientX, clientY);
    },
    1000 / 60, // 60 FPS
    { leading: true, trailing: true }
  );

  const handleMouseUp = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsDrawing(false);
  };

  const handlePointerLeave = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    updateMyPresence({ cursor: null });
  };

  /////////////////////////////////////

  // RENDER THE CANVAS
  // if (isClient === false) return null;
  return (
    <div className="">
      {/* Show other people cursor */}
      <CursorPresence />

      <div className="fixed top-2 left-3 flex gap-3">
        <div>
          <input
            type="radio"
            id="line"
            checked={elementType === "line"}
            onChange={() => setElementType(ElementType.Line)}
            className="mr-2"
          />
          <label htmlFor="line">Line</label>
        </div>

        <div>
          <input
            type="radio"
            id="rectangle"
            checked={elementType === "rectangle"}
            onChange={() => setElementType(ElementType.Rectangle)}
            className="mr-2"
          />
          <label htmlFor="rectangle">Rectangle</label>
        </div>

        <div>
          <input
            type="radio"
            id="circle"
            checked={elementType === "circle"}
            onChange={() => setElementType(ElementType.Circle)}
            className="mr-2"
          />
          <label htmlFor="circle">Circle</label>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        id="canvas-board"
        width={window.innerWidth}
        height={window.innerHeight}
        className="h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onPointerLeave={handlePointerLeave}
      ></canvas>
    </div>
  );
};
