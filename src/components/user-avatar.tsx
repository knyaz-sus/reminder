import { useAvatar } from "@/hooks/use-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userApi } from "@/api/user-api";

export function UserAvatar({ size }: { size: number }) {
  const { data: user } = useSuspenseQuery(userApi.getUserQueryOptions());
  const { avatarUrl } = useAvatar();
  return (
    <Avatar style={{ width: size, height: size }}>
      {avatarUrl && (
        <AvatarImage
          width={size}
          height={size}
          src={avatarUrl}
          alt="image"
          className="aspect-square object-cover"
          asChild
        />
      )}
      <AvatarFallback className="bg-secondary text-secondary-foreground rounded-full">
        {user.name.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
