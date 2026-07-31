"use client";

import type { Food } from "@/types/food";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Star, Timer } from "lucide-react";
import Image from "next/image";
import { startTransition, useCallback, useEffect, useState } from "react";

interface HeroImageProps {
  foods: Food[];
}

export function HeroImage({ foods }: HeroImageProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    startTransition(() => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [api]);

  if (foods.length === 0) return null;

  return (
    <div className="relative flex w-full flex-col items-center gap-4 lg:max-w-[500px] xl:max-w-[681px]">
      <div className="pointer-events-none absolute -inset-4 rounded-[3rem] bg-gradient-to-b from-primary/5 via-transparent to-primary/5 blur-2xl" />

      <div className="relative w-full">
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {foods
              .filter((f) => f.thumbnail)
              .map((food, i) => (
                <CarouselItem key={food.id}>
                  <div
                    className="group relative aspect-square w-full lg:aspect-auto lg:h-[490px]"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-amber-500/10" />
                    <div className="absolute inset-[3px] overflow-hidden rounded-[calc(1.5rem-3px)]">
                      <Image
                        src={food.thumbnail!}
                        alt={food.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 681px"
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                        priority={i === 0}
                        fetchPriority={i === 0 ? "high" : undefined}
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-foreground/40 to-transparent rounded-b-3xl" />

                    <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                      <div className="flex w-fit items-center gap-2.5 rounded-2xl bg-background/90 p-2.5 shadow-[var(--shadow-badge)] backdrop-blur-sm">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
                          <Star className="size-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Best Seller
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {food.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-3 sm:bottom-8 sm:right-4">
                      <div className="flex w-fit items-center gap-2 rounded-2xl bg-background/90 p-3 shadow-[var(--shadow-elevated)] backdrop-blur-sm">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                          <Timer className="size-4 text-primary" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                          {food.preparationTime ?? 0} min &middot; {food.averageRating}
                          <Star className="size-3 fill-foreground" />
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-4 flex items-center justify-center gap-2">
          {foods.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`size-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                index === current
                  ? "w-6 bg-primary shadow-[0_0_8px_rgba(206,163,89,0.4)]"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
