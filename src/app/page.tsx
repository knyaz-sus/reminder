import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { HomeBackground } from "@/components/home-background/home-background";
import { buttonVariants } from "@/components/variants/button-variants";
import { cn } from "@/lib/cn";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex justify-center items-center min-h-svh w-full">
      <HomeBackground />
      <div className="flex flex-col items-center gap-6 text-center max-w-5xl px-4">
        <img
          src="https://shadcnblocks.com/images/block/block-1.svg"
          alt="logo"
          className="h-16"
        />
        <Badge variant="outline">Task manager</Badge>
        <div>
          <h1 className="mb-6 text-pretty text-2xl font-bold lg:text-5xl">
            Build your shedule with minimalistic task manager
          </h1>
          <p className="text-muted-foreground lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <Button>
            <Link href="/auth/signin">Get Started Now</Link>
          </Button>
        </div>
        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-center: text-muted-foreground lg:text-left">
            Built with open-source technologies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group px-3"
              )}
            >
              <img
                src="https://shadcnblocks.com/images/block/logos/shadcn-ui-small.svg"
                alt="company logo"
                className="h-6 saturate-0 transition-all group-hover:saturate-100"
              />
            </a>
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group px-3"
              )}
            >
              <img
                src="https://shadcnblocks.com/images/block/logos/typescript-small.svg"
                alt="company logo"
                className="h-6 saturate-0 transition-all group-hover:saturate-100"
              />
            </a>

            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group px-3"
              )}
            >
              <img
                src="https://shadcnblocks.com/images/block/logos/react-icon.svg"
                alt="company logo"
                className="h-6 saturate-0 transition-all group-hover:saturate-100"
              />
            </a>
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group px-3"
              )}
            >
              <img
                src="https://shadcnblocks.com/images/block/logos/tailwind-small.svg"
                alt="company logo"
                className="h-4 saturate-0 transition-all group-hover:saturate-100"
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
