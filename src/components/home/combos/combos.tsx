"use client";

import { useCallback, useEffect, useState } from "react";
import { SectionHeader } from "@/components/common/section-header";
import { SectionReveal } from "@/components/common/section-reveal";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ComboCard } from "./combo-card";
import { COMBOS } from "@/data/homepage";

function CarouselArrow({
  onClick,
  disabled,
  direction,
}: {
  onClick: () => void;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous combos" : "Next combos"}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:border-primary/40 hover:text-primary active:scale-90",
        "disabled:pointer-events-none disabled:opacity-40",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

export function Combos() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    onSelect();
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section className="relative py-8 lg:py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 size-[200px] rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="wrapper">
        <SectionReveal variant="blurReveal" distance={20}>
          <SectionHeader
            title="Plates built for sharing"
            description="Curated by our chef, priced to feed the whole table."
            action={
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="group h-auto gap-2 rounded-full px-4 py-3"
                  nativeButton={false}
                  render={<Link href="/foods" />}
                >
                  <Sparkles className="size-3.5 text-primary" />
                  View full menu
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
                <div className="hidden items-center gap-2 sm:flex">
                  <CarouselArrow onClick={scrollPrev} disabled={!canScrollPrev} direction="prev" />
                  <CarouselArrow onClick={scrollNext} disabled={!canScrollNext} direction="next" />
                </div>
              </div>
            }
          />

          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: false }}
            className="mt-8"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {COMBOS.map((combo, i) => (
                <CarouselItem
                  key={combo.id}
                  className="basis-full pl-3 sm:basis-1/2 sm:pl-4 lg:basis-1/3"
                >
                  <ComboCard combo={combo} index={i} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </SectionReveal>
      </div>
    </section>
  );
}
