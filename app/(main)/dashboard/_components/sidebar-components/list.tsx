"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { Item } from "./item";

export const List = () => {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  return (
    <>
      {!isLoaded ? (
        <div className="w-full gap-2 flex items-center justify-center flex-col">
          <Item.Skeleton />
          <Item.Skeleton />
          <Item.Skeleton />
        </div>
      ) : (
        <ul className="space-y-4">
          {userMemberships.data?.map((mem) => {
            return (
              <Item
                name={mem.organization.name}
                imageUrl={mem.organization.imageUrl}
                key={mem.organization.id}
                id={mem.organization.id}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};
