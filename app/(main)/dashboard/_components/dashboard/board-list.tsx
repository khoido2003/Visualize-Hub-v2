"use client";

import { BoardCard } from "./board-card";

interface BoardListProps {
  orgId?: string;
  faviourites?: string;
}

export const BoardList = ({ faviourites, orgId }: BoardListProps) => {
  return (
    <div>
      <h2 className="text-3xl">Team boards</h2>

      <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-scroll h-[calc(100vh-250px)]">
        <BoardCard imageUrl="/dashboard/board-light/1.svg" />
        <BoardCard imageUrl="/dashboard/board-light/2.svg" />
        <BoardCard imageUrl="/dashboard/board-light/3.svg" />
        <BoardCard imageUrl="/dashboard/board-light/4.svg" />
        <BoardCard imageUrl="/dashboard/board-light/5.svg" />
        <BoardCard imageUrl="/dashboard/board-light/6.svg" />
        <BoardCard imageUrl="/dashboard/board-light/7.svg" />
        <BoardCard imageUrl="/dashboard/board-light/8.svg" />
        <BoardCard imageUrl="/dashboard/board-light/9.svg" />
        <BoardCard imageUrl="/dashboard/board-light/10.svg" />
        <BoardCard imageUrl="/dashboard/board-light/11.svg" />
        <BoardCard imageUrl="/dashboard/board-light/12.svg" />
        <BoardCard imageUrl="/dashboard/board-light/13.svg" />
        <BoardCard imageUrl="/dashboard/board-light/14.svg" />
        <BoardCard imageUrl="/dashboard/board-light/15.svg" />
      </div>
    </div>
  );
};
