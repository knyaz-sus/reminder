import { Button } from "@/components/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
      <h1>home</h1>
      <Button asChild>
        <Link href="/auth"> Auth</Link>
      </Button>
      <Button asChild>
        <Link href="/app">App</Link>
      </Button>
    </div>
  );
}
