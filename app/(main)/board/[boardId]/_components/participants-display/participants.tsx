"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";
import { connectionIdToColor } from "@/utils/colors";

const MAX_SHOW_USERS = 2;

export const Participants = () => {
  // List of participants
  const users = useOthers();

  // Your information
  const currentUser = useSelf();

  // Check if participants are still available
  const hasMoreUsers = users.length > MAX_SHOW_USERS;

  return (
    <div className="absolute right-2 top-2 z-50 flex h-12 items-center rounded-md p-3 shadow-md ">
      <div className="flex gap-x-2">
        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0] || "T"}
          />
        )}

        {users.slice(0, MAX_SHOW_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOW_USERS} more`}
            fallback={`+${users.length - MAX_SHOW_USERS}`}
          />
        )}
      </div>
    </div>
  );
};
