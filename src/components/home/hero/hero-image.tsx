"use client"

import Image from "next/image"
import { Star, Timer } from "lucide-react"
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { BEST_SELLERS } from "@/data/homepage"
import { useEffect, useState, useCallback, startTransition } from "react"

export function HeroImage() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const onSelect = useCallback(() => {
    if (!api) return
    startTransition(() => setCurrent(api.selectedScrollSnap()))
  }, [api])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on("select", onSelect)
    return () => { api.off("select", onSelect) }
  }, [api, onSelect])

  useEffect(() => {
    if (!api) return
    const interval = setInterval(() => api.scrollNext(), 4000)
    return () => clearInterval(interval)
  }, [api])

  return (
    <div className="flex w-full flex-col items-center gap-4 lg:max-w-[500px] xl:max-w-[681px]">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {BEST_SELLERS.map((item) => (
            <CarouselItem key={item.id}>
              <div className="relative aspect-square w-full lg:aspect-auto lg:h-[490px]">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5" />
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 681px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute left-3 top-3 flex w-fit items-center gap-2.5 rounded-2xl bg-white p-2.5 shadow-[var(--shadow-badge)] sm:left-4 sm:top-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Star className="size-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[11px] font-normal uppercase leading-4 tracking-wider text-muted-foreground">
                      Best Seller
                    </span>
                    <span className="font-sans text-sm font-normal leading-tight text-secondary-foreground">
                      {item.title}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-3 flex w-fit items-center gap-2 rounded-2xl bg-white p-3 shadow-[var(--shadow-elevated)] sm:bottom-8 sm:right-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Timer className="size-4 text-primary" />
                  </div>
                  <span className="font-sans text-xs font-semibold leading-snug text-foreground">
                    {item.time} &middot; {item.rating} &starf;
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center gap-3">
        {BEST_SELLERS.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`size-2.5 rounded-full transition-colors ${
              index === current
                ? "bg-primary"
                : "border border-primary bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
