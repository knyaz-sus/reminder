import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { HomeBackground } from "@/components/home-background/home-background";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/variants/button-variants";
import { cn } from "@/lib/cn";
import { CalendarCheck } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <header className="flex justify-end w-full fixed pl-6 pt-3 pb-3 pr-6">
        <ThemeToggle />
      </header>
      <main className="flex justify-center items-center min-h-svh w-full touch-none">
        <HomeBackground />
        <div className="flex flex-col items-center gap-6 text-center max-w-5xl px-4">
          <CalendarCheck size={60} />
          <Badge>Task manager</Badge>
          <div>
            <h1 className="mb-6 text-pretty text-2xl font-bold lg:text-5xl">
              Build your shedule with minimalistic task manager
            </h1>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <Button asChild>
              <Link prefetch href="/auth/signin">
                Get Started Now
              </Link>
            </Button>
          </div>
          <div className="mt-20 flex flex-col items-center gap-4">
            <p className="text-center: text-muted-foreground lg:text-left">
              Built with open-source technologies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="#" className={cn(buttonVariants(), "group px-3")}>
                <Image
                  src="/images/tanstack.svg"
                  alt="company logo"
                  className="saturate-0 transition-all group-hover:saturate-100"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="#" className={cn(buttonVariants(), "group px-3")}>
                <Image
                  src="/images/typescript.svg"
                  alt="company logo"
                  className="saturate-0 transition-all group-hover:saturate-100"
                  width={22}
                  height={22}
                />
              </Link>
              <Link href="#" className={cn(buttonVariants(), "group px-3")}>
                <Image
                  src="/images/react.svg"
                  alt="company logo"
                  className="saturate-0 transition-all group-hover:saturate-100"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="#" className={cn(buttonVariants(), "group px-3")}>
                <Image
                  src="/images/tailwind.svg"
                  alt="company logo"
                  className="saturate-0 transition-all group-hover:saturate-100"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
