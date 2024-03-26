"use client";

import rough from "roughjs";
import { throttle } from "lodash";

import { CanvasElement, ElementType, ToolOptionsType } from "@/types/canvas";

import { useMutation, useMyPresence, useStorage } from "@/liveblocks.config";
import { useEffect, useLayoutEffect, useState } from "react";
import CursorPresence from "./cursor-display/cursor-presence";
import { createElement } from "../_actions/create-element";
import { LiveObject } from "@liveblocks/client";
import { useDeleteLayers } from "@/hooks/use-delete-elements";
import { Info } from "./info";
import { ModeToggle } from "@/components/mode-toggle";
import { Toolbar } from "./toolbar";
import { Participants } from "./participants-display/participants";
import { ToolOptions } from "./tool-options";
import { useTheme } from "next-themes";
export interface CanvasProps {
  boardId: string;
}

// Helper function
function renderCanvas() {
  // Setup the canvas
  const canvas = document.getElementById("canvas-board") as HTMLCanvasElement;

  // representing a two-dimensional rendering context.
  const context = canvas!.getContext("2d");

  // Erase the whole canvas or else the old element or old state will still be there and causing some weird behaviors.
  context!.clearRect(0, 0, canvas!.width, canvas!.height);

  // Linking roughjs to html canvas
  const roughCanvas = rough.canvas(canvas!);

  return roughCanvas;
}

////////////////////////////////

// MAIN COMPONENT
export const Canvas = ({ boardId }: CanvasProps) => {
  // Check dark mode or light mode
  const { resolvedTheme } = useTheme();

  // Took options initial state
  const [toolOptions, setToolOptions] = useState<ToolOptionsType>({
    stroke: resolvedTheme === "dark" ? "#fff" : "#000",
    roughness: 0,
    fill: "",
    fillStyle: "",
  });

  // Cusror presence
  const [myPresence, updateMyPresence] = useMyPresence();

  // Delete element in the layer
  const deleteLayers = useDeleteLayers();

  // layers contain all the elements that rendered on the canvas
  const layers = useStorage((root) => root.layers);

  // Select element type
  const [elementType, setElementType] = useState<ElementType>(
    ElementType.Rectangle,
  );
  // Check if drawing or not
  const [isDrawing, setIsDrawing] = useState(false);

  // ----------------------------------------

  // These two state just to keep the canvas re-rendering when we change the window size
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [innerWidth, setInnerWidth] = useState<number>(0);

  // Update the canvas width and height when resize
  useEffect(() => {
    // Function to update canvas size based on window dimensions
    const updateCanvasSize = () => {
      const canvas = document.getElementById(
        "canvas-board",
      ) as HTMLCanvasElement;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };

    // Update canvas size when the window is resized
    window.addEventListener("resize", updateCanvasSize);

    // Call updateCanvasSize initially to set the canvas size
    updateCanvasSize();

    // Render the canvas
    const roughCanvas = renderCanvas();

    // Render all the elements inside the layers
    layers.forEach((layer, index) => {
      // the rough element from roughjs currently does not compatible with liveblocks so I have to turn off typescript for this line
      if (
        resolvedTheme === "dark" &&
        // @ts-ignore
        layer.roughElement!.options.stroke === "#000"
      ) {
        // @ts-ignore
        layer.roughElement!.options.stroke = "#fff";
      }

      if (
        resolvedTheme !== "dark" &&
        // @ts-ignore
        layer.roughElement!.options.stroke === "#fff"
      ) {
        // @ts-ignore
        layer.roughElement!.options.stroke = "#000";
      }
      // @ts-ignore
      roughCanvas.draw(layer.roughElement!);

      // console.log(index + " ", { ...layer });
    });

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [layers, innerHeight, innerWidth, resolvedTheme]);

  // -------------------------------------------

  useEffect(() => {
    // Render the canvas
    const roughCanvas = renderCanvas();

    layers.forEach((layer, index) => {
      // @ts-ignore
      roughCanvas.draw(layer.roughElement!); // the rough element from roughjs currently does not compatible with liveblocks so I have to turn off typescript for this line

      // console.log(index + " ", { ...layer });
    });
  }, [layers]);

  //-----------------------------------------

  const insertElement = useMutation(
    ({ storage, setMyPresence }, element: CanvasElement) => {
      const liveLayers = storage.get("layers");

      const layer = new LiveObject(element);
      liveLayers.push(layer);
    },
    [],
  );

  // ---------------------------------------

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

        stroke: toolOptions.stroke,
        fill: toolOptions.fill,
        fillStyle: toolOptions.fillStyle,
        roughness: toolOptions.roughness ? toolOptions.roughness : 1,
      }) as CanvasElement;

      const updatedElement = new LiveObject(element);
      // Update the new height and width of the element
      liveLayers.set(index, updatedElement);
    },
    [toolOptions],
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

  // ACTIONS

  // Start drawing(mouse down event)
  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    setIsDrawing(true);
    const { clientX, clientY } = event;
    const element = createElement({
      x1: clientX,
      y1: clientY,
      x2: clientX,
      y2: clientY,
      elementType,

      stroke: toolOptions.stroke,
      fill: toolOptions.fill,
      fillStyle: toolOptions.fillStyle,
      roughness: toolOptions.roughness ? toolOptions.roughness : 1,
    });

    insertElement(element);
  };

  // ----------------------------------------------

  // MOUSE MOVE (Click mouse and move the mouse on the canvas)
  const handleMouseMove = throttle(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      // The new height and width of the element or position of mouse cursor
      const { clientX, clientY } = event;

      // Update the position of the user cursor position to liveblocks
      updateMyPresence({ cursor: { x: clientX, y: clientY } });

      if (!isDrawing) return;

      updateElement(clientX, clientY);
    },
    1000 / 60, // 60 FPS
    { leading: true, trailing: true },
  );

  // --------------------------------------------------

  // Stop drawing (mouse up)
  const handleMouseUp = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    setIsDrawing(false);
  };

  // --------------------------------------------

  // The cursor move away from the browser
  const handlePointerLeave = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    updateMyPresence({ cursor: null });
  };

  /////////////////////////////////////

  //////////////////////

  // RENDER THE CANVAS
  // if (isClient === false) return null;
  return (
    <main className=" relative h-full w-full">
      {/* Show other people cursor */}
      <CursorPresence />

      {/* Participants in the room */}
      <Participants />

      {/* User information */}
      <Info boardId={boardId} />

      {/*  Mode toggle */}
      <div className="absolute bottom-2 right-2 hidden md:block">
        <ModeToggle />
      </div>

      {/* Toolbar */}
      <Toolbar setElementType={setElementType} />

      {/* Tool options */}
      <ToolOptions setToolOptions={setToolOptions} toolOptions={toolOptions} />

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
    </main>
  );
};
