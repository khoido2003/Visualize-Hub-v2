import { useOther } from "@/liveblocks.config";
import { connectionIdToColor } from "@/utils/colors";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";

type Props = {
  connectionId: number;
};

//
// RATIONALE:
// Each cursor itself subscribes to _just_ the change for the user. This
// means that if only one user's cursor is moving, only one <Cursor />
// component has to re-render. All the others can remain idle.
//
function Cursor({ connectionId }: Props) {
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  const info = useOther(connectionId, (user) => user.info);
  const name = info?.name || "Teammate";

  if (!cursor) {
    return null;
  }
  const { x, y } = cursor;

  return (
    <div
      className=""
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <span
        className="rounded-md px-1.5 py-0.5 text-xs font-semibold text-white"
        style={{ backgroundColor: connectionIdToColor(connectionId) }}
      >
        {name}
      </span>
    </div>
  );
}

export default memo(Cursor);
