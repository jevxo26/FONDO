"use client";
import Image from "next/image";
import { Heart, Star, Clock, ShoppingBag, Plus, ArrowUpRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

const FOOD_ITEMS = [
  {
    id: 1,
    title: "Royal Mutton Kacchi",
    price: 520,
    rating: 4.9,
    time: "35 min",
    description: "Hand-selected mutton sealed with aged basmati, saffron and kewra...",
    image: "https://picsum.photos/id/1080/600/450", // Dummy food image
    hasCartOverlay: false,
  },
  {
    id: 2,
    title: "Royal Mutton Kacchi",
    price: 520,
    rating: 4.9,
    time: "35 min",
    description: "Hand-selected mutton sealed with aged basmati, saffron and kewra...",
    image: "https://picsum.photos/id/292/600/450", // Different dummy image
    hasCartOverlay: true,
    cartItemsCount: 2,
  },
  {
    id: 3,
    title: "Royal Mutton Kacchi",
    price: 520,
    rating: 4.9,
    time: "35 min",
    description: "Hand-selected mutton sealed with aged basmati, saffron and kewra...",
    image: "https://picsum.photos/id/431/600/450", // Another dummy image
    hasCartOverlay: false,
  },
];

interface FoodGridProps {
  activeCategory: string;
}

export function FoodGrid({ activeCategory }: FoodGridProps) {
  return (
    <section className="py-12 bg-background">
      <div className="wrapper">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FOOD_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-[32px] bg-white p-4 shadow-[var(--shadow-card)] dark:bg-card border border-border/40"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Heart Button */}
                <button
                  className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-foreground shadow-sm transition-colors hover:bg-white hover:text-destructive focus-visible:outline-none"
                  aria-label="Add to favorites"
                >
                  <Heart className="size-4" />
                </button>

                {/* Central Cart Badge */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-4
    transition-all duration-300
    opacity-0 scale-95 pointer-events-none
    group-hover:opacity-100 group-hover:scale-100">
                  <div className="inline-flex items-center gap-2 rounded-4xl bg-[#16100C]/90 backdrop-blur-md px-4 py-2.5 text-white shadow-lg border border-white/10">
                    <div className="ml-1 flex size-8 items-center justify-center rounded-full bg-primary">
                      <ShoppingBag className="size-4 text-foreground" />
                    </div>
                    <span className="font-sans text-xs font-medium">
                      {item.cartItemsCount} items &middot; ৳{item.price}
                    </span>
                    <div className="ml-1 flex size-8 items-center justify-center rounded-full bg-white/20">
                    <Link href={`/categories/${item.id}`} className="flex items-center justify-center">
                                          <ArrowUpRight className="size-5 text-white" />

                    </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-1 pt-5 pb-2 px-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-sans text-lg font-semibold leading-snug text-secondary-foreground">
                    {item.title}
                  </h3>
                  <span className="font-sans text-lg font-bold text-secondary-foreground whitespace-nowrap">
                    ৳{item.price}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-primary text-primary" />
                    <span className="font-semibold text-foreground">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground flex-1">
                  {item.description}
                </p>

                <button
                  className="mt-5 flex w-full items-center justify-between rounded-full bg-[#16100C] py-3 pl-5 pr-3 text-white transition-all duration-200 hover:bg-[#2C241E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-foreground dark:text-background"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="size-5 text-white dark:text-background" />
                    <span className="font-sans text-sm font-semibold tracking-wide">
                      Add to cart
                    </span>
                  </div>
                  <div className="ml-1 flex size-8 items-center justify-center rounded-full bg-primary">
                    <Plus className="size-4 text-foreground" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}