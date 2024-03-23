import { useOthersConnectionIds } from "@/liveblocks.config";

import Cursor from "./cursor";
import React from "react";

//
// RATIONALE:
// We're using useConnectionIds() here instead of useOthers(), because this
// will only re-render this component if users enter or leave.
//
// Each <Cursor /> component we loop over here will subscribe to necessary
// changes happening for _that_ user alone, which is most rendering
// efficient.
//

function Cursors() {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connextionId) => {
        return <Cursor key={connextionId} connectionId={connextionId} />;
      })}
    </>
  );
}

export default React.memo(function CursorPresence() {
  return (
    <>
      <Cursors />
    </>
  );
});
