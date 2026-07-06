import { Package, SquareCheck } from "lucide-react";
import Image from "next/image";

export function HeroImage() {
  return (
    <div className="flex w-full flex-col items-center gap-4 lg:w-[681px]">
      <div className="relative aspect-square w-full lg:aspect-auto lg:h-[490px]">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5" />
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <Image
            src="/images/hero/hero_image.png"
            alt="Hero Image"
            fill
            sizes="(max-width: 1024px) 100vw, 681px"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute left-3 top-3 flex w-48 gap-2.5 rounded-2xl bg-white p-2.5 shadow-[var(--shadow-badge)] sm:left-4 sm:top-4 sm:w-52">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
            <SquareCheck className="size-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[11px] font-normal uppercase leading-4 tracking-wider text-muted-foreground">
              Today
            </span>
            <span className="font-sans text-sm font-normal leading-tight text-secondary-foreground">
              Best Seller &middot; Kacchi
            </span>
          </div>
        </div>
        <div className="absolute bottom-4 right-3 flex w-44 gap-2 rounded-2xl bg-white p-3 shadow-[var(--shadow-elevated)] sm:bottom-8 sm:right-4">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
            <Package className="size-4 text-primary" />
          </div>
          <span className="font-sans text-xs font-semibold leading-snug text-foreground">
            Order delivered in 22 min &middot; Dhanmondi
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="size-2.5 rounded-full bg-primary" />
        <span className="box-border size-2.5 rounded-full border border-primary" />
        <span className="box-border size-2.5 rounded-full border border-primary" />
        <span className="box-border size-2.5 rounded-full border border-primary" />
      </div>
    </div>
  );
}
