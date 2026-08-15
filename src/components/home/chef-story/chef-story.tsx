"use client";

import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/common/section-reveal";
import { Badge } from "@/components/ui/badge";
import { CHEF_STORY } from "@/data/homepage";
import { Award, BookOpen, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const iconMap = {
  trophy: Award,
  star: Sparkles,
  book: BookOpen,
};

const variantClasses = {
  dark: "bg-foreground text-background border-foreground",
  orange: "bg-primary/15 text-foreground border-primary/40",
  light: "bg-card text-foreground border-border",
};

export function ChefStory() {
  return (
    <section className="relative py-10 lg:py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 size-[250px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 size-[200px] rounded-full bg-amber-500/8 blur-3xl" />
      </div>
      <div className="wrapper">
        <SectionReveal variant="blurReveal" distance={20}>
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-16">
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-3xl ring-1 ring-primary/20">
                <Image
                  src={CHEF_STORY.image}
                  alt={CHEF_STORY.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-all duration-700 hover:scale-105"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-6 right-6 flex flex-col rounded-2xl border border-primary/20 bg-foreground/90 p-4 shadow-[var(--shadow-elevated)] backdrop-blur-sm"
                >
                  <span className="font-heading text-3xl font-bold leading-none text-primary">
                    {CHEF_STORY.stats.value}
                  </span>
                  <span className="mt-1 text-xs text-background/70">{CHEF_STORY.stats.label}</span>
                </motion.div>
              </div>
            </motion.div>

            <div className="flex flex-1 flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5">
                  <div className="size-1.5 rotate-45 bg-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    {CHEF_STORY.label}
                  </span>
                </div>
                <h2 className="font-heading text-3xl leading-tight tracking-heading text-foreground sm:text-4xl lg:text-[48px]">
                  {CHEF_STORY.name}
                </h2>
                <p className="text-base leading-relaxed text-foreground/65">{CHEF_STORY.bio}</p>
              </div>

              <blockquote className="border-l-2 border-primary pl-5">
                <p className="font-heading text-2xl italic leading-snug tracking-tight text-foreground">
                  &ldquo;{CHEF_STORY.quote}&rdquo;
                </p>
              </blockquote>

              <div className="flex flex-wrap items-center gap-4">
                {CHEF_STORY.badges.map((badge, i) => {
                  const Icon = iconMap[badge.icon as keyof typeof iconMap];
                  const variantClass = variantClasses[badge.variant];
                  return (
                    <motion.div
                      key={badge.text}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Badge
                        variant="outline"
                        className={cn(
                          "h-auto gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:scale-105",
                          variantClass,
                        )}
                      >
                        {Icon && <Icon className="size-3" />}
                        {badge.text}
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
