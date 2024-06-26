"use client";

import { RoomProvider } from "@/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { ReactNode } from "react";
import { Loading } from "./loading-room/loading";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, roomId }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialStorage={{ layers: new LiveList() }}
      initialPresence={{
        cursor: null,
        selectionLayers: [],
        pencilDraft: null,
        penColor: null,
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
