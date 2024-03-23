"use client";

import { useMyPresence, useOthers } from "@/liveblocks.config";
import { useEffect, useState } from "react";
import CursorPresence from "./cursor-display/cursor-presence";

export interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  // Prevent dehydration
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true when component mounts
    setIsClient(true);
  }, []);

  //-------------------------------------------

  // Cusror presence

  const [myPresence, updateMyPresence] = useMyPresence();
  function handlePointerMove(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    if (!isClient) return;

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateMyPresence({ cursor: { x, y } });
  }

  function handlePointerLeave(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    updateMyPresence({ cursor: null });
  }

  if (!isClient) return null;
  return (
    <div>
      Cursor: {JSON.stringify(myPresence.cursor)}
      <CursorPresence />
      <canvas
        onPointerLeave={handlePointerLeave}
        onMouseMove={handlePointerMove}
        width={window.innerWidth}
        height={window.innerHeight}
        className=" "
      />
    </div>
  );
};
