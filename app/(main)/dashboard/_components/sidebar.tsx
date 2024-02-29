import { List } from "./sidebar-components/list";
import { NewButton } from "./sidebar-components/new-button";

export const Sidebar = () => {
  return (
    <div className="fixed left-0 z-[1] h-full w-[60px] flex-col gap-y-4 bg-light_bg dark:bg-dark_bg p-3 hidden sm:flex">
      <List />
      <NewButton />
    </div>
  );
};
