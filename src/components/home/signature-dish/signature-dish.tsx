"use client";

import { SectionReveal } from "@/components/common/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SIGNATURE_DISH } from "@/data/homepage";
import { ArrowRight, ChefHat, ScrollText, ShoppingBag, Sprout, Wine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const cardIcons: Record<string, typeof ChefHat> = {
  ChefHat,
  Sprout,
  ScrollText,
  Wine,
};

export function SignatureDish() {
  return (
    <section className="relative py-6 lg:py-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 size-[300px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-[200px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>
      <div className="bg-overlay py-12 lg:py-20">
        <div className="wrapper">
          <SectionReveal variant="blurReveal" distance={20}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="group relative aspect-square w-full overflow-hidden rounded-3xl ring-1 ring-primary/20">
                  <Image
                    src={SIGNATURE_DISH.image}
                    alt={SIGNATURE_DISH.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-overlay/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex w-fit items-center gap-2 rounded-xl bg-background/10 px-4 py-2 backdrop-blur-sm border border-foreground/10">
                    <div className="size-2 rounded-full bg-primary animate-glow" />
                    <span className="text-xs font-medium text-white">Available tonight</span>
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-1 flex-col gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5">
                  <div className="size-1.5 rotate-45 bg-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
                    {SIGNATURE_DISH.label}
                  </span>
                </div>

                <h2 className="font-heading text-3xl text-white sm:text-4xl lg:text-[48px] leading-tight">
                  {SIGNATURE_DISH.heading}
                </h2>

                <p className="text-sm leading-relaxed text-white/60 lg:text-base">
                  {SIGNATURE_DISH.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {SIGNATURE_DISH.infoCards.map((card, i) => {
                    const Icon = cardIcons[card.icon ?? ""];
                    return (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Card className="border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:border-primary/30">
                          <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-primary/20">
                            {Icon && <Icon className="size-4 text-primary" />}
                          </div>
                          <h4 className="text-sm font-semibold text-white">{card.title}</h4>
                          <p className="mt-0.5 text-xs text-white/50">{card.text}</p>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2.5 pt-2 sm:gap-3">
                  <Button
                    size="lg"
                    className="group h-auto gap-2 rounded-full bg-primary px-3 py-2.5 text-sm text-primary-foreground hover:bg-primary/90 sm:px-4 sm:py-3"
                    nativeButton={false}
                    render={<Link href="/foods" />}
                  >
                    <ShoppingBag className="size-4 shrink-0" />
                    <span>
                      Order<span className="hidden sm:inline"> signature</span>
                    </span>
                    <ArrowRight className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-auto gap-2 rounded-full bg-transparent px-3 py-2.5 text-sm text-white hover:bg-white/10 hover:text-white border-white/20 sm:px-4 sm:py-3"
                    nativeButton={false}
                    render={<Link href="/foods" />}
                  >
                    <span className="sm:hidden">Menu</span>
                    <span className="hidden sm:inline">Explore the menu</span>
                    <ArrowRight className="size-4 shrink-0" />
                  </Button>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
