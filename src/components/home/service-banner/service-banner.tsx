import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ServiceBanner() {
  return (
    <section className="px-[60px] py-6">
      <div className="relative flex min-h-[383px] overflow-hidden rounded-[24px]">
        <Image
          src="/images/home/restaurant_interior_2.png"
          alt="Restaurant interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/85 via-primary-foreground/55 to-transparent" />

        <div className="relative z-10 flex max-w-[730px] flex-col gap-6 p-10">
          <div className="inline-flex w-fit items-center rounded-[20px] border border-primary/40 bg-primary/15 px-3 py-1.5">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.275px] text-background">
              Tonight&apos;s service is open
            </span>
          </div>

          <h2 className="font-fraunces text-[60px] leading-[120%] tracking-[-1.2px] text-background">
            A heritage feast, delivered in 25 minutes.
          </h2>

          <p className="text-base leading-[120%] text-background/75">
            Free delivery over ৳999 across Dhaka. Reserve a table, or let us bring the kitchen to
            you.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/foods"
              className="flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5"
            >
              <Play className="size-4 fill-primary-foreground text-primary-foreground" />
              <span className="font-sans text-sm font-semibold text-primary-foreground">
                Order now
              </span>
            </Link>
            <Link
              href="/foods"
              className="flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-6 py-3.5 backdrop-blur"
            >
              <span className="font-sans text-sm font-semibold text-background">Explore menu</span>
              <ArrowRight className="size-4 text-background" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
