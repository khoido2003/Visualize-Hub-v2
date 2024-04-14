"use client";

// external dependencies
import rough from "roughjs";
import { throttle } from "lodash";
import { LiveObject } from "@liveblocks/client";

// types and constants
import { HANDLE_WIDTH } from "@/constants";
import {
  CanvasElement,
  Color,
  ElementType,
  LayersType,
  Point,
  SelectionNet,
  StrokePoint,
  ToolOptionsType,
} from "@/types/canvas";

// Hooks
import { useMutation, useMyPresence, useStorage } from "@/liveblocks.config";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDeleteLayers } from "@/hooks/use-delete-elements";
import { useTheme } from "next-themes";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

// UI
import CursorPresence from "./cursor-display/cursor-presence";
import { Toolbar } from "./toolbar";
import { Info } from "./info";
import { ModeToggle } from "@/components/mode-toggle";
import { ToolOptions } from "./tool-options";
import { Participants } from "./participants-display/participants";

// Actions
import { createElement } from "../_actions/create-element";
import { getElementAtPosition } from "../_actions/get-element-at-position";
import { findIntersectingLayers } from "@/utils/find-intersecting-layers";
import { cursorForPosition } from "@/utils/cursor-for-position";
import { resizeCoordinates } from "@/utils/resize-coordinates";
import { drawElement } from "../_actions/draw-elements";

/////////////////////////////////////////////////////////////

// Implement double buffering to avoid flickering issues when create new element on the canvas:
// The mechanism is create an offscreen canvas to render the element first, then re-render the element back to the original canvas

// Create an off-screen canvas (back buffer)
const offscreenCanvas = document.createElement("canvas");
const offscreenContext = offscreenCanvas.getContext("2d");

// Helper function: Render the display canvas on the screen
function renderCanvas(
  layers: readonly LayersType[],
  resolvedTheme: string | undefined,
  selectionNet: SelectionNet | undefined,
  selectedElement: CanvasElement | null,
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null,
) {
  const canvas = document.getElementById("canvas-board") as HTMLCanvasElement;
  // Setup the canvas
  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;

  // representing a two-dimensional rendering context.
  const context = canvas!.getContext("2d");

  // Erase the whole canvas or else the old element or old state will still be there and causing some weird behaviors.
  context!.clearRect(0, 0, canvas!.width, canvas!.height);

  // Linking roughjs to html canvas
  const roughCanvas = rough.canvas(canvas!);

  // Draw all elements onto the off-screen canvas
  offscreenContext!.clearRect(
    0,
    0,
    offscreenCanvas.width,
    offscreenCanvas.height,
  );

  const roughOffscreenCanvas = rough.canvas(offscreenCanvas);

  // Render the elements store inside liveblocks to the canvas
  layers.forEach((layer, index) => {
    // the rough element from roughjs currently does not compatible with liveblocks so I have to turn off typescript for this line
    // if (
    //   resolvedTheme === "dark" &&
    //   // @ts-ignore
    //   layer.roughElement!.options.stroke === "#000"
    // ) {
    //   // @ts-ignore
    //   layer.roughElement!.options.stroke = "#fff";
    // }

    // if (
    //   resolvedTheme !== "dark" &&
    //   // @ts-ignore
    //   layer.roughElement!.options.stroke === "#fff"
    // ) {
    //   // @ts-ignore
    //   layer.roughElement!.options.stroke = "#000";
    // }

    if (layer.id === index - 1) {
      // @ts-ignore
      // roughOffscreenCanvas.draw(layer.roughElement!); // Old way to render the layer
      // Refactor code to add drawing freehand to the canvas
      drawElement(roughOffscreenCanvas, context!, layer);
    }
  });

  // Render the section net to select multiple elements
  if (selectionNet && selectionNet.current) {
    const { origin, current } = selectionNet;
    const { x: originX, y: originY } = origin!;
    const { x: currentX, y: currentY } = current!;

    const minX = Math.min(originX, currentX);
    const minY = Math.min(originY, currentY);
    const width = Math.abs(currentX - originX);
    const height = Math.abs(currentY - originY);

    context!.strokeStyle = "#3b82f6"; // Set your desired border color
    context!.lineWidth = 1; // Set your desired border thickness

    // Draw stroked rectangle (border)
    context!.strokeRect(minX, minY, width, height);

    context!.fillStyle = "#3b83f63b"; // Set your desired fill color
    // Fill the rectangle
    context!.fillRect(minX, minY, width, height);
  }

  // Render the bounding box for single element
  if (selectedElement) {
    const { x1, x2, y1, y2 } = selectedElement;
    const minX = Math.min(x1, x2) - 10;
    const minY = Math.min(y1, y2) - 10;
    const width = Math.abs(x2 - x1) + 20;
    const height = Math.abs(y2 - y1) + 20;

    context!.strokeStyle = "#3b82f6"; // Set your desired border color
    context!.lineWidth = 2; // Set your desired border thickness

    // Draw stroked rectangle (border)
    context!.strokeRect(minX, minY, width, height);
    context!.rect(minX, minY, width, height);

    // bound top left
    context!.strokeRect(
      minX - HANDLE_WIDTH / 2,
      minY - HANDLE_WIDTH / 2,
      HANDLE_WIDTH,
      HANDLE_WIDTH,
    );

    // bound top right
    context!.strokeRect(
      minX + width - HANDLE_WIDTH / 2,
      minY - HANDLE_WIDTH / 2,
      HANDLE_WIDTH,
      HANDLE_WIDTH,
    );

    // bound bottom left
    context!.strokeRect(
      minX - HANDLE_WIDTH / 2,
      minY + height - HANDLE_WIDTH / 2,
      HANDLE_WIDTH,
      HANDLE_WIDTH,
    );

    // bound bottom right
    context!.strokeRect(
      minX + width - HANDLE_WIDTH / 2,
      minY + height - HANDLE_WIDTH / 2,
      HANDLE_WIDTH,
      HANDLE_WIDTH,
    );
  }

  // Select multiple
  if (bounds) {
    context!.strokeStyle = "#3b82f6"; // Set your desired border color
    context!.lineWidth = 2; // Set your desired border thickness

    // Draw stroked rectangle (border)
    context!.strokeRect(
      bounds.x - 10,
      bounds.y - 10,
      bounds.width + 20,
      bounds.height + 20,
    );

    context!.fillStyle = "#3b83f63b"; // Set your desired fill color
    // Fill the rectangle
    context!.fillRect(
      bounds.x - 10,
      bounds.y - 10,
      bounds.width + 20,
      bounds.height + 20,
    );

    // bound top left
    context!.strokeRect(
      bounds.x - HANDLE_WIDTH / 2 - 10,
      bounds.y - HANDLE_WIDTH / 2 - 10,
      8,
      8,
    );

    // bound top right
    context!.strokeRect(
      bounds.x + bounds.width + 10 - HANDLE_WIDTH / 2,
      bounds.y - HANDLE_WIDTH / 2 - 10,
      8,
      8,
    );

    // bound bottom left
    context!.strokeRect(
      bounds.x - HANDLE_WIDTH / 2 - 10,
      bounds.y + bounds.height + 10 - HANDLE_WIDTH / 2,
      8,
      8,
    );

    // bound bottom right
    context!.strokeRect(
      bounds.x + bounds.width + 10 - HANDLE_WIDTH / 2,
      bounds.y + bounds.height + 10 - HANDLE_WIDTH / 2,
      8,
      8,
    );
  }

  // Copy the content of the off-screen canvas onto the visible canvas
  context?.drawImage(offscreenCanvas, 0, 0);

  return roughCanvas;
}

/////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

export interface CanvasProps {
  boardId: string;
}

// MAIN COMPONENT
export const Canvas = ({ boardId }: CanvasProps) => {
  // Check dark mode or light mode
  const { resolvedTheme } = useTheme();

  // Selection net
  const [selectionNet, setSelectionNet] = useState<SelectionNet>();

  // Took options initial state for roughjs
  const [toolOptions, setToolOptions] = useState<ToolOptionsType>({
    stroke: resolvedTheme === "dark" ? "#fff" : "#000",
    roughness: 0,
    fill: "",
    fillStyle: "hachure",
  });

  // Cusror presence
  const [myPresence, updateMyPresence] = useMyPresence();

  // Delete element in the layer
  const deleteLayers = useDeleteLayers();

  // layers contain all the elements that rendered on the canvas
  const layers = useStorage((root) => root.layers);

  // Select element type
  const [elementType, setElementType] = useState<ElementType>(ElementType.None);

  // Check if drawing or moving or none
  const [action, setAction] = useState<
    | "moving"
    | "drawing"
    | "none"
    | "select"
    | "pressing"
    | "moving-multiple"
    | "resizing"
  >("none");

  // Check the current element being selected
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(
    null,
  );

  // Handle selection net to choose multiple elements
  const bounds = useSelectionBounds();

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

    // Render the canvas and all the elements
    renderCanvas(layers, resolvedTheme, selectionNet, selectedElement, bounds);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [
    layers,
    innerHeight,
    innerWidth,
    resolvedTheme,
    selectionNet,
    selectedElement,
    bounds,
  ]);

  // -------------------------------------------

  // Update the canvas when the canvas layer has new elements
  useEffect(() => {
    // Render the canvas
    renderCanvas(layers, resolvedTheme, selectionNet, selectedElement, bounds);
    console.log(layers);
    console.log(selectedElement);
  }, [layers, resolvedTheme, selectionNet, selectedElement, bounds]);

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
      { storage, self },
      id: number | "no-value",
      newX1: number | "no-value",
      newY1: number | "no-value",
      newX2: number,
      newY2: number,
    ) => {
      // The current list of elements
      const liveLayers = storage.get("layers");

      let index: number;
      let element;
      // Get the postion of the curent element inside the layers
      // Because the Id is always smaller than its index 1 so we have to plus 1 to id to get the current index of the element.
      // NOTE: index = id + 1 !IMPORTANT
      id !== "no-value" ? (index = id + 1) : (index = layers.length - 1);
      // Note: Don't use liveLayers here to calculate the index since the way it update the state is not stable so it can causing bugs with the id

      // Take out the corresponding element from the layers
      const {
        x1,
        y1,
        elementType,
        stroke,
        fill,
        fillStyle,
        roughness,
        id: curId,
      } = liveLayers.get(index)!.toObject();

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

      // Move the element to the the new position
      // Update the new height and width of the element by overwrite it with the new value
      liveLayers.set(index, updatedElement);

      // console.log(layers);
      // console.log(liveLayers.toArray());
    },
    [toolOptions, selectedElement, action],
  );

  // ---------------------------------------------------------

  // DRAWING FREEHAND
  const updateDrawingFreehand = useMutation(
    ({ storage }, x1: number, y1: number, x2: number, y2: number) => {
      const liveLayers = storage.get("layers");
      const element = liveLayers.get(layers.length - 1)?.toObject();

      if (element && liveLayers.length > 0) {
        element.points = [...element!.points!, { x: x2, y: y2 }];

        const updatedElement = new LiveObject(element!);
        liveLayers.set(layers.length - 1, updatedElement);
      }
    },
    [layers, selectedElement, action],
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
            if (layers.length > 0) {
              deleteLayers();
              setSelectedElement(null);
            }
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

  //Multiple selection
  const startMultipleSelection = useCallback(
    (current: Point, origin: Point) => {
      if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
        setAction("select");
      }
    },
    [],
  );

  // Update the selection net while dragging
  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence, self }, current: Point, origin: Point) => {
      setAction("select");
      setSelectionNet({ current, origin });
      const elementsIntersectionArr = findIntersectingLayers({
        current,
        origin,
        layers,
      });

      console.log(layers);
      // console.log(elementsIntersectionArr);
      console.log(self.presence.selectionLayers);

      // Add al the selected layers to the list of layers in presence
      setMyPresence({ selectionLayers: elementsIntersectionArr });
    },
    [layers, action],
  );

  // Unselected layers when mouse up
  const unSelectedLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selectionLayers.length > 0) {
      setMyPresence({ selectionLayers: [] }, { addToHistory: true });
    }
  }, []);

  // Move multiple selection layers
  const translateSelectedLayers = useMutation(
    ({ storage, self }, clientX: number, clientY: number) => {
      console.log(self.presence.selectionLayers);

      const offsetX = clientX - bounds!.centerX;
      const offsetY = clientY - bounds!.centerY;

      for (let i = 0; i < self.presence.selectionLayers.length; i++) {
        const element = createElement({
          ...self.presence.selectionLayers[i],
          x1: self.presence.selectionLayers[i].x1 + offsetX,
          y1: self.presence.selectionLayers[i].y1 + offsetY,
          x2:
            self.presence.selectionLayers[i].x1 +
            offsetX +
            (self.presence.selectionLayers[i].x2 -
              self.presence.selectionLayers[i].x1),
          y2:
            self.presence.selectionLayers[i].y1 +
            offsetY +
            (self.presence.selectionLayers[i].y2 -
              self.presence.selectionLayers[i].y1),
        }) as CanvasElement;

        // Update the bounds of the element
        self.presence.selectionLayers[i] = element;

        const liveLayers = storage.get("layers");
        const updatedElement = new LiveObject(element);
        liveLayers.set(
          (self!.presence!.selectionLayers[i]!.id as number) + 1,
          updatedElement,
        );
      }
    },
    [action, bounds, layers],
  );

  //- ----------------------------------------------------

  // Start drawing(mouse down event)
  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    // Check the current position of the mouse cursor
    const { clientX, clientY } = event;

    // Find the element that going to be selected
    if (elementType === "none") {
      // Check if the mouse is clicking
      setAction("pressing");

      // // UnSelect the multiple element
      // unSelectedLayers();

      // Create selection net
      setSelectionNet({
        origin: { x: clientX, y: clientY },
        current: { x: clientX, y: clientY },
      });

      if (bounds) {
        if (
          clientX > bounds.x &&
          clientX < bounds.width + bounds.x &&
          clientY > bounds.y &&
          clientY < bounds.y + bounds.height
        ) {
          translateSelectedLayers(clientX, clientY);
          setAction("moving-multiple");
        }
      }

      // If the cursor is on an element then change the action to moving and not create a selection net
      const element = getElementAtPosition(clientX, clientY, layers);

      // If the element is existing
      if (element) {
        // If not select multiple
        if (!bounds) {
          // Calculate the distance between the mouse to the coordinates of the element so we can uuse it later to calcualte the new position of the element.
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          // Store the selected element
          setSelectedElement({ ...element, offsetX, offsetY });

          // Check if user moving element or resizing element
          if (element.position === "inside") {
            setAction("moving");
          } else {
            setAction("resizing");
          }
        } else return;
      }
    }
    // Or create a new element
    else {
      // Add the new element to the layers array
      // Set the id for the new created element
      const id = layers.length - 1;
      let element;
      if (elementType === ElementType.Pencil) {
        element = createElement({
          id,
          x1: clientX,
          y1: clientY,
          x2: clientX,
          y2: clientY,
          elementType,
        });
      } else {
        // Rectangle, circle and line elements
        element = createElement({
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
      }

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
        const element = getElementAtPosition(clientX, clientY, layers);

        document.body.style.cursor = element
          ? cursorForPosition(element.position!)
          : "default";
      }

      if (bounds && elementType === "none") {
        if (
          clientX > bounds.x &&
          clientX < bounds.width + bounds.x &&
          clientY > bounds.y &&
          clientY < bounds.y + bounds.height
        ) {
          document.body.style.cursor = "move";
        }
      }

      if (
        elementType === ElementType.Circle ||
        elementType === ElementType.Rectangle ||
        elementType === ElementType.Line ||
        elementType === ElementType.Pencil
      ) {
        document.body.style.cursor = "crosshair";
      }

      //-----------------------------

      if (action === "drawing") {
        if (
          elementType === ElementType.Circle ||
          elementType === ElementType.Rectangle ||
          elementType === ElementType.Line
        ) {
          // Keep the positon, only update the height and width of the element due to the position of the mouse cursor
          updateElement("no-value", "no-value", "no-value", clientX, clientY);
        }

        if (elementType === ElementType.Pencil) {
          const index = layers.length - 1;
          const { x1, y1, elementType } = layers[index];

          console.log(layers);
          updateDrawingFreehand(x1, y1, clientX, clientY);
        }
      }

      if (action === "moving") {
        // Selected element
        const { id, offsetX, offsetY, position, ...coordinates } =
          selectedElement as CanvasElement;
        const width = coordinates.x2 - coordinates.x1;
        const height = coordinates.y2 - coordinates.y1;

        const newX1 = clientX - offsetX!;
        const newY1 = clientY - offsetY!;

        // Update the position of the selected element
        updateElement(id!, newX1, newY1, newX1 + width, newY1 + height);

        // Update the state of the moving element so the bounding is also updated
        // Without this, the bounding box will not be updated causing stale state
        setSelectedElement((selectedElement) => ({
          ...selectedElement!,
          id,
          x1: newX1,
          x2: newX1 + width,
          y1: newY1,
          y2: newY1 + height,
        }));
      }

      if (action === "moving-multiple") {
        translateSelectedLayers(clientX, clientY);
      }

      if (action === "pressing") {
        startMultipleSelection(
          { x: clientX, y: clientY },
          { x: selectionNet!.origin!.x, y: selectionNet!.origin!.y },
        );
      }

      if (action === "select") {
        updateSelectionNet(
          { x: clientX, y: clientY },
          { x: selectionNet!.origin!.x, y: selectionNet!.origin!.y },
        );
      }

      if (action === "resizing") {
        // Selected element
        const { id, position, ...coordinates } =
          selectedElement as CanvasElement;
        const {
          x1: newX1,
          y1: newY1,
          x2: newX2,
          y2: newY2,
        } = resizeCoordinates(clientX, clientY, position!, coordinates)!;

        // Update the position and widt, height of the selected element
        updateElement(id!, newX1, newY1, newX2, newY2);

        // Update the state of the réizing element so the bounding is also updated !IMPOTANT
        // Without this, the bounding box will not be updated causing stale state
        setSelectedElement((selectedElement) => ({
          ...selectedElement!,
          id,
          x1: newX1,
          x2: newX2,
          y1: newY1,
          y2: newY2,
        }));
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
    const { clientX, clientY } = event;
    setAction("none");

    setSelectionNet(undefined);

    // Unselect multiple elements
    if (
      elementType === ElementType.None &&
      (action === "pressing" || action === "none")
    ) {
      unSelectedLayers();
    }
    // If the cursor is on an element then change the action to moving and not create a selection net
    const element = getElementAtPosition(clientX, clientY, layers);
    // If the element is existing
    if (element) {
      if (myPresence.selectionLayers.length === 0) {
        // Store the selected element
        setSelectedElement({ ...element });
        // Unselect multiple elements
        unSelectedLayers();
      }
    } else {
      setSelectedElement(null);
    }
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
        className="h-full fill-blue-500/5"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onPointerLeave={handlePointerLeave}
      ></canvas>
    </main>
  );
};
