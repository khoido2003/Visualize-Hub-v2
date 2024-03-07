"use client";

import { BoardCard } from "./board-card";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

export const BoardList = ({ query, orgId }: BoardListProps) => {
  return (
    <div>
      <h2 className="text-3xl">Team boards</h2>

      <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-scroll h-[calc(100vh-220px)]"></div>
    </div>
  );
};
