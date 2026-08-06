"use client";

import { CalendarDays, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/common/section-reveal";

export function SubscriptionTeaser() {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden rounded-3xl bg-foreground p-6 text-background shadow-[var(--shadow-elevated)] md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute right-5 top-5 size-[7px] rotate-45 border border-primary/40" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <CalendarDays className="size-6" />
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-badge font-bold uppercase tracking-widest text-primary/90">
                <Sparkles className="size-3.5" /> Coming soon
              </p>
              <h3 className="mt-1 font-heading text-xl font-semibold tracking-tight md:text-2xl">
                Meal Subscriptions
              </h3>
              <p className="mt-1 max-w-xl text-small text-background/70">
                Set-and-forget weekly meal plans, auto-renewals and flexible pause controls are on
                the way. Explore our subscription packages today.
              </p>
            </div>
          </div>
          <Button
            className="shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            render={<Link href="/packages" />}
          >
            Explore Packages
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </SectionReveal>
  );
}
