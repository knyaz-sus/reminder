"use client";

import { HTMLAttributes, useState } from "react";
import Link, { LinkProps } from "next/link";

export function LinkPrefetch(
  props: LinkProps &
    HTMLAttributes<HTMLAnchorElement> & {
      className?: string;
      href: string;
      onClick?: () => void;
    }
) {
  const [shouldPrefetch, setShouldPrefetch] = useState<null | true>(null);

  const handleHover = () => {
    if (!shouldPrefetch) setShouldPrefetch(true);
  };

  return (
    <Link
      onClick={props.onClick}
      prefetch={shouldPrefetch}
      onPointerEnter={handleHover}
      {...props}
    >
      {props.children}
    </Link>
  );
}
