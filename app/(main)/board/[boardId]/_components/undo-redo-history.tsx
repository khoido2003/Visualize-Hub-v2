import { Redo, Undo } from "lucide-react";

export interface UndoRedoHistory {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const UndoRedoHistory = ({
  canRedo,
  canUndo,
  redo,
  undo,
}: UndoRedoHistory) => {
  return (
    <div className="absolute bottom-2 left-2 z-[100] flex items-center justify-center gap-3 ">
      <button
        className="cursor-pointer rounded-md px-3 py-1 shadow-md dark:bg-gray-100/10 dark:hover:bg-gray-100/30"
        onClick={undo}
        disabled={canUndo}
      >
        <Undo />
      </button>

      <button
        className="cursor-pointer rounded-md px-3 py-1 shadow-md dark:bg-gray-100/10 dark:hover:bg-gray-100/30"
        onClick={redo}
        disabled={canRedo}
      >
        <Redo></Redo>
      </button>
    </div>
  );
};
