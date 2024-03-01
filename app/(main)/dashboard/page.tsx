"use client";

import { useOrganization } from "@clerk/clerk-react";
import { useTheme } from "next-themes";
import { EmptyOrg } from "./_components/dashboard/empty-org";
import { BoardList } from "./_components/dashboard/board-list";

const DashBoardPage = () => {
  const { organization } = useOrganization();
  const { resolvedTheme } = useTheme();

  return (
    <div className="h-calc(100%-80px)] flex-1 p-6 ">
      {!organization ? (
        <EmptyOrg resolved={resolvedTheme} />
      ) : (
        <p className="h-[80%] ">
          <BoardList />
        </p>
      )}
    </div>
  );
};

export default DashBoardPage;
