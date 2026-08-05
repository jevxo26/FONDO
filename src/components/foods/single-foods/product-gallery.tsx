"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const imageVariants = {
  hidden: { opacity: 0, filter: "blur(8px)", scale: 0.95 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const safeImages = images.length > 0 ? images : ["/placeholder.svg"];

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <motion.div variants={imageVariants} className="lg:col-span-6">
      <Carousel
        setApi={setApi}
        opts={{ loop: safeImages.length > 1, align: "start" }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {safeImages.map((img, i) => (
            <CarouselItem key={i} className="pl-0">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-[32px] bg-muted shadow-[var(--shadow-card)] border border-border/40">
                <Image
                  src={img}
                  alt={`${name} ${i + 1}`}
                  fill
                  priority={i === 0}
                  unoptimized
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {safeImages.length > 1 && (
          <>
            <CarouselPrevious
              size="icon-lg"
              className="left-3! bg-background/80 text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm hover:bg-background active:scale-95"
            />
            <CarouselNext
              size="icon-lg"
              className="right-3! bg-background/80 text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm hover:bg-background active:scale-95"
            />
          </>
        )}
      </Carousel>

      {safeImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "relative aspect-4/3 w-20 shrink-0 overflow-hidden rounded-2xl border bg-muted transition-all sm:w-24",
                i === activeIndex
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border/40 opacity-70 hover:opacity-100",
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img} alt={`${name} ${i + 1}`} fill unoptimized className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
