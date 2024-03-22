"use client";

import { useEffect, useState } from "react";

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
  if (!isClient) return null;
  return (
    <div>
      <canvas
        width={window.innerWidth}
        height={innerHeight}
        className="bg-violet-300"
      ></canvas>
    </div>
  );
};
