import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
  elementType: ElementType;
}

export const Toolbar = ({ setElementType, elementType }: ToolbarProps) => {
  return (
    <div className="absolute left-0 right-0 top-2 z-50 ml-auto mr-auto flex h-12 w-[320px] items-center gap-1 rounded-md px-1.5 shadow-md dark:bg-gray-100/10">
      <Button
        className={cn("", elementType === ElementType.None && "bg-blue-500/20")}
        onClick={() => {
          setElementType(ElementType.None);
        }}
        variant="board"
      >
        <MousePointer height={15} width={15} />
      </Button>

      <Button
        variant="board"
        onClick={() => {
          setElementType(ElementType.Rectangle);
        }}
        className={cn(
          "",
          elementType === ElementType.Rectangle && "bg-blue-500/20",
        )}
      >
        <Square height={15} width={15} />
      </Button>

      <Button
        variant="board"
        onClick={() => {
          setElementType(ElementType.Circle);
        }}
        className={cn(
          "",
          elementType === ElementType.Circle && "bg-blue-500/20",
        )}
      >
        <Circle height={15} width={15} />
      </Button>

      <Button
        variant="board"
        onClick={() => {
          setElementType(ElementType.Line);
        }}
        className={cn("", elementType === ElementType.Line && "bg-blue-500/20")}
      >
        <Minus height={15} width={15} />
      </Button>

      <Button
        variant="board"
        onClick={() => {
          setElementType(ElementType.Pencil);
        }}
        className={cn(
          "",
          elementType === ElementType.Pencil && "bg-blue-500/20",
        )}
      >
        <Pencil height={15} width={15} />
      </Button>

      {/* <Button
        variant="board"
        onClick={() => {
          // setElementType();
        }}
        className={cn(
          "",
          // elementType === ElementType.Rectangle && "bg-blue-500/20",
        )}
      >
        <Type height={15} width={15} />
      </Button> */}

      <Button
        variant="board"
        onClick={() => {
          setElementType(ElementType.Erase);
        }}
        className={cn(
          "",
          elementType === ElementType.Erase && "bg-blue-500/20",
        )}
      >
        <Eraser height={15} width={15} />
      </Button>
    </div>
  );
};
