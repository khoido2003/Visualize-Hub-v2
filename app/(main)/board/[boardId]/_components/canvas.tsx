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
import { getElementAtPosition } from "../_actions/get-element-at-position";
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

  // Check if drawing or moving or none
  const [action, setAction] = useState<"moving" | "drawing" | "none">("none");

  // Check the current element being selected
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(
    null,
  );

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

  // Add the new element to the list of layer
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
    (
      { storage, setMyPresence },
      id: number | "no-value",
      newX1: number | "no-value",
      newY1: number | "no-value",
      newX2: number,
      newY2: number,
    ) => {
      let index;
      let element;

      // The current list of elements
      const liveLayers = storage.get("layers");

      // Get the postion of the curent element inside the layers
      // Because the Id is always smaller than its index 1 so we have to plus 1 to id to get the current index of the element.
      // NOTE: index = id + 1 !IMPORTANT
      id !== "no-value" ? (index = id + 1) : (index = liveLayers.length - 1);

      // Take out the corresponding element from the layers
      const { x1, y1, elementType, stroke, fill, fillStyle, roughness } =
        liveLayers.get(index)!.toObject();

      // Update the position of the element if we create it
      if (newX1 === "no-value" && newY1 === "no-value") {
        newX1 = x1;
        newY1 = y1;
      }

      // As I explain above, the index is greater than the id 1 so we need to minus 1 from the index to calculate the id
      element = createElement({
        id: index - 1, // This is imporant or else it will cause some weird behavior on the canvas
        x1: newX1 as number,
        y1: newY1 as number,
        x2: newX2,
        y2: newY2,
        elementType,

        stroke: action === "drawing" ? toolOptions.stroke : stroke,
        fill: action === "drawing" ? toolOptions.fill : fill,
        fillStyle: action === "drawing" ? toolOptions.fillStyle : fillStyle,
        roughness:
          action === "drawing"
            ? toolOptions.roughness
              ? toolOptions.roughness
              : 1
            : roughness,
      }) as CanvasElement;

      // Create the new state of the element
      const updatedElement = new LiveObject(element);

      // Update the new height and width of the element by overwrite it with the new value
      liveLayers.set(index, updatedElement);
    },
    [toolOptions, selectedElement, action],
  );

  //---------------------------

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

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  // ACTIONS

  // Start drawing(mouse down event)
  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    // Check the current position of the mouse cursor
    const { clientX, clientY } = event;

    // Find the element that going to be selected
    if (elementType === "none") {
      const element = getElementAtPosition(clientX, clientY, layers);

      // If the element is existing
      if (element) {
        // Calculate the distance between the mouse to the coordinates of the element so we can uuse it later to calcualte the new position of the element.
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;

        // Store the selected element
        setSelectedElement({ ...element, offsetX, offsetY });

        // Change action to moving
        setAction("moving");
      }
    }
    // Or create a new element
    else {
      // Set the id for the new created element
      const id = layers.length - 1;

      // Add the new element to the layers array
      const element = createElement({
        id,
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

      // CHange action to drawing
      setAction("drawing");

      // Add the new created element to the layers list
      insertElement(element);
    }
  };

  // ----------------------------------------------

  // MOUSE MOVE (Click mouse and move the mouse on the canvas)
  const handleMouseMove = throttle(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      // The new height and width of the element or position of mouse cursor
      const { clientX, clientY } = event;

      // Update the position of the user cursor position to liveblocks
      updateMyPresence({ cursor: { x: clientX, y: clientY } });

      // Update the mouse cursor style by checking if the cursor is inside the element or not
      if (elementType === "none") {
        document.body.style.cursor = getElementAtPosition(
          clientX,
          clientY,
          layers,
        )
          ? "move"
          : "default";
      }

      // Handle create or move element base on the current action
      switch (action) {
        case "drawing":
          // Keep the positon, only update the height and width of the element due to the position of the mouse cursor
          updateElement("no-value", "no-value", "no-value", clientX, clientY);
          break;

        case "moving":
          const { id, x1, y1, x2, y2, offsetX, offsetY, elementType } =
            selectedElement as CanvasElement;

          const width = x2 - x1;
          const height = y2 - y1;

          const newX1 = clientX - offsetX!;
          const newY1 = clientY - offsetY!;

          updateElement(id!, newX1, newY1, newX1 + width, newY1 + height);
          break;

        default:
          break;
      }
    },
    1000 / 60, // 60 FPS
    { leading: true, trailing: true },
  );

  // --------------------------------------------------

  // Stop drawing (mouse up)
  const handleMouseUp = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    setAction("none");
    setSelectedElement(null);
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

      {/*  Mode toggle light/dark */}
      <div className="absolute bottom-2 right-2 z-50 hidden md:block">
        <ModeToggle />
      </div>

      {/* Toolbar */}
      <Toolbar setElementType={setElementType} elementType={elementType} />

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
