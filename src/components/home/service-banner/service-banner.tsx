"use client";

import { SectionReveal } from "@/components/common/section-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function ServiceBanner() {
  return (
    <section className="py-6 lg:py-10">
      <div className="wrapper">
        <div className="relative flex min-h-[250px] overflow-hidden rounded-3xl md:min-h-[383px] group">
          <Image
            src="/images/home/restaurant_interior_2.png"
            alt="Restaurant interior"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/90 via-primary-foreground/60 to-transparent" />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 size-[300px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 left-1/3 size-[200px] rounded-full bg-amber-500/10 blur-3xl" />
          </div>

          <SectionReveal variant="blurReveal" distance={20}>
            <div className="relative z-10 flex w-full max-w-full flex-col gap-4 p-6 sm:max-w-[730px] sm:gap-6 sm:p-8 lg:p-10">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1.5"
              >
                <div className="size-1.5 rotate-45 bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-background">
                  Tonight&apos;s service is open
                </span>
              </motion.div>

              <h2 className="font-heading text-3xl leading-tight tracking-tight text-background sm:text-4xl md:text-5xl lg:text-[60px]">
                A heritage feast, delivered in 25 minutes.
              </h2>

              <p className="text-sm leading-tight text-background/75 sm:text-base max-w-lg">
                Free delivery over ৳999 across Dhaka. Reserve a table, or let us bring the kitchen
                to you.
              </p>

              <div className="flex items-center gap-2.5 pt-2 sm:gap-6">
                <Button
                  variant="default"
                  size="xl"
                  className="group relative gap-2 overflow-hidden rounded-full h-auto px-4 py-2.5 text-sm shadow-[var(--shadow-elevated)] sm:px-6 sm:py-3 sm:text-base"
                  nativeButton={false}
                  render={<Link href="/foods" />}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Play className="size-4 shrink-0 fill-primary-foreground" />
                    <span className="text-sm font-semibold">Order now</span>
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Button>
                <Link
                  href="/foods"
                  className="flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-3.5 py-2.5 text-sm backdrop-blur transition-all duration-300 hover:bg-background/20 hover:shadow-[var(--shadow-elevated)] sm:px-6 sm:py-3.5"
                >
                  <span className="sm:hidden">Menu</span>
                  <span className="hidden text-sm font-semibold text-background sm:inline">
                    Explore menu
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-background" />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
