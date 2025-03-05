import { PropsWithChildren } from "react";

export function PageContainer({ children }: PropsWithChildren) {
  return (
    <main className="flex justify-center w-full">
      <div className="flex flex-col pt-16 px-4 pb-6 flex-auto max-w-[85vw] lg:max-w-3xl">
        {children}
      </div>
    </main>
  );
}
