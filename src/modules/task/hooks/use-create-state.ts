import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useCreateState = () => {
  const [isCreating, setIsCreating] = useState(false);

  const pathname = usePathname();
  useEffect(() => setIsCreating(false), [pathname]);

  const toggleCreating = () => setIsCreating((prev) => !prev);

  return { isCreating, toggleCreating };
};
