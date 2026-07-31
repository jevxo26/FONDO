"use client";

import Link from "next/link";
import { ArrowRight, Menu, Search, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroContent() {
  return (
    <motion.div
      className="flex w-full flex-col gap-6"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeUp} className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5">
        <div className="size-1.5 rotate-45 bg-primary" />
        <span className="text-xs font-medium text-primary">
          Open now &middot; Delivering across Dhaka
        </span>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="font-heading text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] tracking-[-0.03em] text-foreground"
      >
        Honest food from
        <br />
        <span className="text-gold-gradient">local gardens.</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="max-w-[480px] text-base leading-relaxed text-muted-foreground lg:text-lg"
      >
        Experience hyper-seasonal ingredients prepared with obsessive detail in a space designed for
        slow conversations.
      </motion.p>

      <motion.div variants={fadeUp} className="relative w-full max-w-[440px]">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search dishes, categories..."
          className="h-12 w-full rounded-full border-border bg-card pl-10 pr-4 text-sm shadow-[var(--shadow-card)] transition-shadow duration-300 focus-visible:shadow-[0_0_0_2px_rgba(206,163,89,0.3),var(--shadow-elevated)]"
        />
      </motion.div>

      <motion.div variants={fadeUp} className="flex items-center gap-3 sm:gap-4">
        <Button
          variant="default"
          size="xl"
          className="group relative gap-2 overflow-hidden rounded-full h-auto"
          nativeButton={false}
          render={<Link href="/foods" />}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Menu className="size-4 shrink-0 text-primary-foreground" />
            <span className="text-sm font-semibold lg:text-base">Order Now</span>
            <ArrowRight className="size-3.5 shrink-0 text-primary-foreground/60 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </Button>
        <Button
          variant="outline"
          size="xl"
          className="gap-2 rounded-full h-auto border-border/60"
          nativeButton={false}
          render={<Link href="/foods" />}
        >
          <span className="text-sm font-medium">Browse categories</span>
          <ArrowRight className="size-4 shrink-0" />
        </Button>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center gap-6 pt-2"
      >
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="size-3.5 fill-primary text-primary" />
          <span className="font-semibold text-foreground">4.9</span>
          <span>(12k+ ratings)</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">28m</span>
          <span>Avg delivery</span>
          <span className="mx-2 inline-block size-1 rounded-full bg-primary/40" />
          <span className="font-semibold text-foreground">120K+</span>
          <span>Plates served</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
