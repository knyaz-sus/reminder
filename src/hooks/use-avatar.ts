import { UserAvatarContext } from "@/context/user-avatar-provider";
import { useContextTyped } from "./use-context-typed";

export const useAvatar = () => useContextTyped(UserAvatarContext);
