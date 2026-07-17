"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Star, Share2, Plus, Minus, ShoppingCart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Food } from "@/types/food";

export function ProductHero({ food }: { food: Food }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="wrapper">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left: Main Showcase Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-muted shadow-[var(--shadow-card)] border border-border/40">
              <Image src={food.coverImage} alt={food.name} fill priority unoptimized className="object-cover" />
            </div>
          </div>

          {/* Right: Product Meta Data & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                &middot; In stock
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-border bg-white shadow-sm hover:text-destructive dark:bg-card"
              >
                <Heart className="size-4" />
              </Button>
            </div>

            <h1 className="mt-3 font-fraunces text-3xl font-normal tracking-tight text-secondary-foreground sm:text-4xl leading-tight">
              {food.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-primary text-primary" />
                ))}
                <span className="ml-1 font-semibold text-foreground">
                  {food.isPopular ? "4.9" : "4.7"}
                </span>
                <span>(892 reviews)</span>
              </div>

              <span>&middot;</span>

              <span>{food.id}</span>

              <span>&middot;</span>

              <Button variant="ghost" size="sm" className="h-auto gap-1 p-0 hover:text-foreground">
                <Share2 className="size-3.5" /> Share
              </Button>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-sans text-3xl font-bold text-secondary-foreground">
                ৳{food.variants[0]?.discountPrice ?? food.variants[0]?.price ?? 0}
              </span>

              {food.variants[0]?.discountPrice && (
              <span className="font-sans text-lg text-muted-foreground line-through">
                ৳{food.variants[0].price}
              </span>
              )}

              <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                25% discount
              </span>
            </div>

            <p className="mt-1 text-xs text-muted-foreground">Free delivery on orders of ৳2,000+</p>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {food.shortDescription}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Preparation:</span>
                <p className="font-medium">{food.preparationTime} min</p>
              </div>

              <div>
                <span className="text-muted-foreground">Serving:</span>
                <p className="font-medium">{food.servingSize}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Calories:</span>
                <p className="font-medium">{food.calories} kcal</p>
              </div>

              <div>
                <span className="text-muted-foreground">Food Type:</span>
                <p className="font-medium capitalize">{food.foodType}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Spice Level:</span>
                <p className="font-medium capitalize">{food.spiceLevel}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Protein:</span>
                <p className="font-medium">{food.protein}g</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-sans text-sm font-medium text-muted-foreground">Quantity:</span>

              <div className="flex items-center border border-border bg-white rounded-xl overflow-hidden dark:bg-card">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-2.5 rounded-none"
                >
                  <Minus className="size-3.5" />
                </Button>

                <span className="w-10 text-center font-sans text-sm font-semibold text-foreground select-none">
                  {quantity}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2.5 rounded-none"
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>

              <span className="text-xs text-muted-foreground">
                (Available)
              </span>
            </div>

            {/* Core Page Primary Action Group */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="xl"
                className="gap-2 rounded-2xl border-primary bg-primary/5 text-primary hover:bg-primary/10"
              >
                <ShoppingCart className="size-4" />
                Add to cart
              </Button>

              <Button variant="default" size="xl" className="rounded-2xl">
                Buy Now
              </Button>
            </div>

            <Button
              variant="outline"
              size="xl"
              className="mt-4 w-full gap-2 rounded-2xl border-primary/30 bg-primary/20 text-primary-foreground hover:bg-primary/30 dark:text-white"
            >
              <MessageSquare className="size-4 text-primary" />
              Order Directly via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
