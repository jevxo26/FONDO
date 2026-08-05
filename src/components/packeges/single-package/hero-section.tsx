"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import type { Package } from "@/types/package";

interface HeroSectionProps {
  package: Package;
}


export default function HeroSection({ package: pkg }: HeroSectionProps) {
const image = pkg?.coverImage || pkg?.thumbnail;
  const averageRating = pkg?.rating?.averageRating ?? 0;
  const totalReviews = pkg?.rating?.totalReview ?? pkg?.reviews?.length ?? 0;

  const price = Number(pkg?.price ?? 0);
  const discountPrice = Number(pkg?.discountPrice ?? price);

  const mealPrice = pkg?.totalMeals && pkg.totalMeals > 0 ? Math.round(discountPrice / pkg.totalMeals) : discountPrice;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-card border border-border/40 group shadow-sm">
      <div className="relative h-96 lg:h-120 w-full overflow-hidden">
        <Image
          fill
          priority
          src={image}
          alt={pkg?.name || "Package cover image"}
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 lg:p-10 w-full space-y-3 text-white">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-primary text-primary-foreground px-3.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em]">
              {pkg?.packageCategory?.name ?? "Meal Package"}
            </span>

            {pkg?.isCustomizable && (
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em]">
                Customizable
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl lg:text-5xl font-normal leading-tight">
            {pkg?.name}
          </h1>

          {pkg?.description && (
            <p className="text-white/80 font-sans text-xs sm:text-sm max-w-2xl leading-relaxed line-clamp-2">
              {pkg.description}
            </p>
          )}

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="flex text-amber-400">
                <Star className="size-3.5 fill-current" />
              </div>

              <span className="font-semibold">
                {averageRating > 0 ? averageRating.toFixed(1) : "New"}
                <span className="text-white/60 font-normal ml-1">
                  ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                </span>
              </span>
            </div>

            <div className="h-3 w-px bg-white/30" />

            <div className="text-xs">
              <span className="text-white/60">Starts from </span>
              <span className="text-base font-bold ml-0.5">
                ৳{mealPrice.toLocaleString()}
                <span className="text-[10px] font-normal text-white/60">
                  {" "}/ meal
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}