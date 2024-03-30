import { Room } from "@/components/liveblocks/room";
import { Canvas } from "./_components/canvas";
import { Loading } from "@/components/liveblocks/loading-room/loading";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room roomId={params.boardId} fallback={<div>Loading</div>}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;
