import { Button } from "@/components/ui/button";
import {
  Circle,
  Eraser,
  Minus,
  MousePointer,
  Pencil,
  Square,
  Type,
} from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="absolute top-2 flex h-12 items-center rounded-md px-1.5 shadow-md sm:left-2 lg:left-80">
      <Button variant="board" className="">
        <MousePointer height={15} width={15} />
      </Button>

      <Button variant="board" className="">
        <Square height={15} width={15} />
      </Button>

      <Button variant="board" className="">
        <Circle height={15} width={15} />
      </Button>

      <Button variant="board" className="">
        <Minus height={15} width={15} />
      </Button>

      <Button variant="board" className="">
        <Pencil height={15} width={15} />
      </Button>

      <Button variant="board" className="">
        <Type height={15} width={15} />
      </Button>

      <Button variant="board" className="">
        <Eraser height={15} width={15} />
      </Button>
    </div>
  );
};
