import { Hint } from "@/components/hint";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar = ({
  borderColor,
  fallback,
  name,
  src,
}: UserAvatarProps) => {
  return (
    <Hint label={name || "Teamate"} side="bottom" sideOffset={10}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};
