import { Skeleton } from "../../ui/skeleton";
import { InfoLoading } from "./info-loading";
import { LogoLoading } from "./logo-loading";
import { ParticipantLoading } from "./participant-loading";
import { ScaleLoading } from "./scale-loading";
import { ToolOptionsLoading } from "./tool-options-loading";
import { ToolbarSkeleton } from "./toolbar-skeleton";

export const Loading = () => {
  return (
    <div className="relative h-full w-full bg-light_bg dark:bg-black">
      <ToolbarSkeleton />
      <InfoLoading />
      <ParticipantLoading />
      <ScaleLoading />
      <LogoLoading />
      <ToolOptionsLoading />
    </div>
  );
};
