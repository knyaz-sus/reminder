import { UserContext } from "@/context/user-provider";
import { useContextTyped } from "@/hooks/use-context-typed";

export const useAuth = () => useContextTyped(UserContext);
