"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Star, Share2, Plus, Minus, ShoppingCart, MessageSquare } from "lucide-react";

export function ProductHero() {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="wrapper">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left: Main Showcase Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-muted shadow-[var(--shadow-card)] border border-border/40">
              <Image
                src="/images/menu/kacchi-large.jpg"
                alt="Hand selected mutton kacchi"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Product Meta Data & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                &middot; In stock
              </span>
              <button className="flex size-9 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm hover:text-destructive dark:bg-card">
                <Heart className="size-4" />
              </button>
            </div>

            <h1 className="mt-3 font-fraunces text-3xl font-normal tracking-tight text-secondary-foreground sm:text-4xl leading-tight">
              Hand selected mutton sealed with aged basmati, saffron and kewra
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-primary text-primary" />
                ))}
                <span className="ml-1 font-semibold text-foreground">4.9</span>
                <span>(892 reviews)</span>
              </div>
              <span>&middot;</span>
              <span>4,120 sold</span>
              <span>&middot;</span>
              <button className="inline-flex items-center gap-1 hover:text-foreground">
                <Share2 className="size-3.5" /> Share
              </button>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-sans text-3xl font-bold text-secondary-foreground">৳520</span>
              <span className="font-sans text-lg text-muted-foreground line-through">৳699</span>
              <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                25% discount
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Free delivery on orders of ৳2,000+</p>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-sans text-sm font-medium text-muted-foreground">Quantity:</span>
              <div className="flex items-center border border-border bg-white rounded-xl overflow-hidden dark:bg-card">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2.5 text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-10 text-center font-sans text-sm font-semibold text-foreground select-none">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-2.5 text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">(123 in stock)</span>
            </div>

            {/* Core Page Primary Action Group */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-primary bg-primary/5 font-sans text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
                <ShoppingCart className="size-4" /> Add to cart
              </button>
              <button className="flex h-12 items-center justify-center rounded-2xl bg-[#CEA359] font-sans text-sm font-semibold text-[#1B0E08] transition-colors hover:bg-[#bfa052]">
                Buy Now
              </button>
            </div>

            <button className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#CEA359]/20 border border-primary/30 font-sans text-sm font-semibold text-[#1B0E08] dark:text-white transition-colors hover:bg-[#CEA359]/30">
              <MessageSquare className="size-4 text-primary" /> Order Directly via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}