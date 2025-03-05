"use client";

import { PropsWithChildren, useState } from "react";
import Link from "next/link";

export function LinkPrefetch({
  onClick,
  className,
  href,
  children,
}: PropsWithChildren<{
  className?: string;
  href: string;
  onClick?: () => void;
}>) {
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
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
