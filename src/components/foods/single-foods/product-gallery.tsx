"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const safeImages = images.length > 0 ? images : ["/placeholder.svg"];
  const activeImage = safeImages[activeIndex];

  const go = (delta: number) => {
    setActiveIndex((prev) => (prev + delta + safeImages.length) % safeImages.length);
  };

  return (
    <motion.div variants={imageVariants} className="lg:col-span-6">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-muted shadow-[var(--shadow-card)] border border-border/40">
        <button
          onClick={() => safeImages.length > 1 && setLightbox(true)}
          className="block h-full w-full"
          aria-label="Open image viewer"
        >
          <Image
            src={activeImage}
            alt={name}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </button>

        {safeImages.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm transition-all hover:bg-background active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm transition-all hover:bg-background active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="mt-4 flex gap-3">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative aspect-4/3 w-24 overflow-hidden rounded-2xl border bg-muted transition-all",
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

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close viewer"
          >
            <X className="size-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5" />
          </button>
          <Image
            src={activeImage}
            alt={name}
            width={1200}
            height={900}
            unoptimized
            className="max-h-[85vh] w-auto rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
