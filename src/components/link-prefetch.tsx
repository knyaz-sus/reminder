import { PropsWithChildren, useState } from "react";
import Link from "next/link";

export function LinkPrefetch({
  className,
  href,
  children,
}: PropsWithChildren<{ className?: string; href: string }>) {
  const [shouldPrefetch, setShouldPrefetch] = useState<null | true>(null);

  const handleHover = () => {
    if (!shouldPrefetch) setShouldPrefetch(true);
  };

  return (
    <Link
      prefetch={shouldPrefetch}
      onPointerEnter={handleHover}
      className={className}
      href={href}
    >
      {children}
    </Link>
  );
}
