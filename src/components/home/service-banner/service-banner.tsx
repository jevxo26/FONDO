import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ServiceBanner() {
  return (
    <section className="py-6">
      <div className="wrapper">
        <div className="relative flex min-h-[250px] overflow-hidden rounded-3xl md:min-h-[383px]">
          <Image
            src="/images/home/restaurant_interior_2.png"
            alt="Restaurant interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/85 via-primary-foreground/55 to-transparent" />

          <div className="relative z-10 flex max-w-[730px] flex-col gap-4 p-6 sm:gap-6 sm:p-8 lg:p-10">
            <div className="inline-flex w-fit items-center rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.275px] text-background">
                Tonight&apos;s service is open
              </span>
            </div>

            <h2 className="font-fraunces text-3xl leading-[120%] tracking-[-1.2px] text-background sm:text-4xl md:text-5xl lg:text-[60px]">
              A heritage feast, delivered in 25 minutes.
            </h2>

            <p className="text-sm leading-[120%] text-background/75 sm:text-base">
              Free delivery over ৳999 across Dhaka. Reserve a table, or let us
              bring the kitchen to you.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/foods"
                className="flex items-center gap-2.5 rounded-full bg-primary px-5 py-3 sm:px-6 sm:py-3.5"
              >
                <Play className="size-4 fill-primary-foreground text-primary-foreground" />
                <span className="font-sans text-sm font-semibold text-primary-foreground">
                  Order now
                </span>
              </Link>
              <Link
                href="/foods"
                className="flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-5 py-3 backdrop-blur sm:px-6 sm:py-3.5"
              >
                <span className="font-sans text-sm font-semibold text-background">
                  Explore menu
                </span>
                <ArrowRight className="size-4 text-background" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
