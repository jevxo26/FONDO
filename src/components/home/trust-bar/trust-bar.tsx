"use client";

import { TRUST_FEATURES } from "@/data/homepage";
import { motion } from "framer-motion";

export function TrustBar() {
  return (
    <section className="py-4 lg:py-6">
      <div className="border-y border-border/70 bg-background/40">
        <div className="wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-x-4 gap-y-3 py-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-3"
          >
            {TRUST_FEATURES.map((feature, i) => (
              <div key={`${feature.label}-${i}`} className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground/80">{feature.label}</span>
                {i < TRUST_FEATURES.length - 1 && (
                  <div className="ml-2 size-1 rotate-45 bg-primary/30 hidden sm:block" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
