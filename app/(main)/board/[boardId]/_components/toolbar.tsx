import { Button } from "@/components/ui/button";
import { ElementType } from "@/types/canvas";
import {
  Circle,
  Eraser,
  Minus,
  MousePointer,
  Pencil,
  Square,
  Type,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface ToolbarProps {
  setElementType: Dispatch<SetStateAction<ElementType>>;
}

export const Toolbar = ({ setElementType }: ToolbarProps) => {
  return (
    <div className="absolute left-0 right-0 top-2 ml-auto mr-auto  flex h-12 w-[340px] items-center rounded-md px-1.5 shadow-md ">
      <Button variant="board">
        <MousePointer height={15} width={15} />
      </Button>

      <Button
        variant="board"
        onClick={() => {
          setElementType(ElementType.Rectangle);
        }}
      >
        <Square height={15} width={15} />
      </Button>

      <Button
        variant="board"
        onClick={() => {
          setElementType(ElementType.Circle);
        }}
      >
        <Circle height={15} width={15} />
      </Button>

      <Button
        variant="board"
        onClick={() => {
          setElementType(ElementType.Line);
        }}
      >
        <Minus height={15} width={15} />
      </Button>

      <Button
        variant="board"
        onClick={() => {
          // setElementType();
        }}
      >
        <Pencil height={15} width={15} />
      </Button>

      <Button
        variant="board"
        onClick={() => {
          // setElementType();
        }}
      >
        <Type height={15} width={15} />
      </Button>

      <Button
        variant="board"
        onClick={() => {
          // setElementType();
        }}
      >
        <Eraser height={15} width={15} />
      </Button>
    </div>
  );
};
