import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 w-screen h-svh z-40 bg-black/80">
      <Spinner className="relative z-50 text-white/90" size={40} />
    </div>
  );
}
