"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center w-full min-h-svh">
        <h2>Something went wrong!</h2>
        <span>{error.message}</span>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
