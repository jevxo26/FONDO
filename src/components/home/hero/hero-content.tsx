import Link from "next/link";
import { ArrowRight, Menu, Zap } from "lucide-react";

export function HeroContent() {
  return (
    <div className="flex w-full flex-col gap-6 p-2 lg:max-w-[608px]">
      <div className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-border bg-secondary px-2.5 py-1">
        <Zap className="size-3.5 text-primary" />
        <span className="font-sans text-xs font-normal leading-4 text-secondary-foreground">
          Open now &middot; Delivering across Dhaka
        </span>
      </div>

      <h1 className="font-fraunces text-4xl font-normal leading-tight tracking-tight text-secondary-foreground sm:text-5xl lg:text-[64px]">
        Honest food from local gardens.
      </h1>

      <p className="font-sans text-base leading-relaxed text-muted-foreground lg:text-lg">
        Experience hyper-seasonal ingredients prepared with obsessive detail in
        a space designed for slow conversations.
      </p>

      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/foods"
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 sm:gap-3 sm:px-5 sm:py-4"
        >
          <Menu className="size-4 shrink-0 text-white" />
          <span className="whitespace-nowrap font-sans text-sm font-semibold leading-5 text-white lg:text-base">
            Order Now
          </span>
        </Link>
        <Link
          href="/foods"
          className="flex items-center justify-center gap-2 rounded-2xl border border-primary bg-white/4 px-4 py-3 sm:px-5 sm:py-4"
        >
          <span className="whitespace-nowrap font-sans text-sm font-medium leading-5 text-foreground">
            Browse categories
          </span>
          <ArrowRight className="size-4 shrink-0 text-foreground" />
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col gap-0.5 pr-4 border-r border-border">
          <span className="font-sans text-lg font-semibold leading-tight text-foreground">
            28m
          </span>
          <span className="font-sans text-sm font-normal leading-tight text-muted-foreground">
            Avg delivery
          </span>
        </div>
        <div className="flex flex-col gap-0.5 pr-4 border-r border-border">
          <span className="font-sans text-lg font-semibold leading-tight text-foreground">
            4.9
          </span>
          <span className="font-sans text-sm font-normal leading-tight text-muted-foreground">
            Rating &middot; 12k
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-sans text-lg font-semibold leading-tight text-foreground">
            120K+
          </span>
          <span className="font-sans text-sm font-normal leading-tight text-muted-foreground">
            Plates served
          </span>
        </div>
      </div>
    </div>
  );
}
