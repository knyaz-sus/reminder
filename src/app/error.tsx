"use client";

import { Button } from "@/components/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex items-center justify-center min-h-svh px-6">
        <div className="flex flex-col items-center gap-2">
          <h2>Something went wrong!</h2>
          <span className="max-w-[400px] text-cente break-words">
            {error.message}
          </span>
          <Button className="self-stretch" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
