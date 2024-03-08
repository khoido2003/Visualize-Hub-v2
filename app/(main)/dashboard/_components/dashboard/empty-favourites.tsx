import Image from "next/image";

export const EmptyFavourites = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="/dashboard/empty-favourite-light.svg"
        height={300}
        width={300}
        alt="Empty search result"
        className="dark:hidden block"
      />

      <Image
        src="/dashboard/empty-favourite-dark.svg"
        height={300}
        width={300}
        alt="Empty search result"
        className="dark:block hidden"
      />

      <h2 className="mt-1 text-2xl font-semibold">No results found.</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try searching for something else
      </p>
    </div>
  );
};
