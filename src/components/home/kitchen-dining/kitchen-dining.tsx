"use client";

import { SectionReveal } from "@/components/common/section-reveal";
import Image from "next/image";
import { motion } from "framer-motion";

export function KitchenDining() {
  return (
    <section className="relative py-10 lg:py-16">
      <div className="wrapper">
        <SectionReveal variant="fadeScale" distance={20}>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-2">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5">
              <div className="size-1.5 rotate-45 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Behind the pass
              </span>
            </div>
            <h2 className="text-center font-heading text-3xl leading-tight tracking-heading text-foreground sm:text-4xl lg:text-[48px] mt-2">
              Kitchen &amp; dining experience
            </h2>
            <p className="text-center text-sm text-muted-foreground sm:text-base max-w-lg">
              A look at the people, copper pots and quiet rooms behind every plate.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <motion.div
              className="group relative aspect-[4/6] overflow-hidden rounded-3xl md:row-span-2 md:h-[456px] md:aspect-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/home/kitchen_brigade.png"
                alt="Kitchen brigade"
                fill
                sizes="(max-width: 768px) 100vw, 292px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-overlay/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 rounded-xl bg-background/90 px-3.5 py-2 backdrop-blur-sm shadow-[var(--shadow-card)]">
                <span className="flex items-center gap-2 text-xs font-medium text-foreground">
                  <div className="size-1.5 rotate-45 bg-primary" />
                  Kitchen brigade
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.div
                className="group relative aspect-[327/220] overflow-hidden rounded-3xl md:h-[220px] md:aspect-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src="/images/home/cooking.png"
                  alt="Cooking"
                  fill
                  sizes="(max-width: 768px) 100vw, 327px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-overlay/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 rounded-xl bg-background/90 px-3.5 py-2 backdrop-blur-sm shadow-[var(--shadow-card)]">
                  <span className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <div className="size-1.5 rotate-45 bg-primary" />
                    Cooking
                  </span>
                </div>
              </motion.div>
              <motion.div
                className="group relative aspect-[327/220] overflow-hidden rounded-3xl md:h-[220px] md:aspect-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src="/images/home/dining_table.png"
                  alt="Dining table"
                  fill
                  sizes="(max-width: 768px) 100vw, 327px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-overlay/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 rounded-xl bg-background/90 px-3.5 py-2 backdrop-blur-sm shadow-[var(--shadow-card)]">
                  <span className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <div className="size-1.5 rotate-45 bg-primary" />
                    Dining table
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="group relative aspect-[4/6] overflow-hidden rounded-3xl md:row-span-2 md:h-[456px] md:aspect-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/home/restaurant_interior.png"
                alt="Restaurant interior"
                fill
                sizes="(max-width: 768px) 100vw, 327px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-overlay/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 rounded-xl bg-background/90 px-3.5 py-2 backdrop-blur-sm shadow-[var(--shadow-card)]">
                <span className="flex items-center gap-2 text-xs font-medium text-foreground">
                  <div className="size-1.5 rotate-45 bg-primary" />
                  Restaurant interior
                </span>
              </div>
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
