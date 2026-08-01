"use client";

import { Star } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  package: any;
}

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || process.env.NEXT_PUBLIC_API_URL || "";

export default function HeroSection({ package: pkg }: HeroSectionProps) {
  const image =
    pkg?.coverImage?.startsWith("http")
      ? pkg.coverImage
      : `${IMAGE_BASE_URL}${pkg?.coverImage}`;

  const rating = pkg?.rating ?? 0;

  const price = Number(pkg?.price ?? 0);
  const discountPrice = Number(pkg?.discountPrice ?? price);

  const mealPrice =
    pkg?.totalMeals > 0
      ? Math.round(discountPrice / pkg.totalMeals)
      : discountPrice;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-card border border-border/40 group shadow-sm">
      <div className="relative h-100 lg:h-120 overflow-hidden">
        <Image
          fill
          priority
          src={image}
          alt={pkg?.name}
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/40 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 lg:p-10 w-full space-y-3 text-white">

          <div className="flex items-center gap-2">

            <span className="bg-primary text-primary-foreground px-3.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em]">
              {pkg?.packageCategory?.name ?? "Meal Package"}
            </span>

            {pkg?.isCustomizable && (
              <span className="bg-white/10 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em]">
                Customizable
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl lg:text-5xl font-normal leading-tight">
            {pkg?.name}
          </h1>

          <p className="text-background/80 font-sans text-xs sm:text-sm max-w-2xl leading-relaxed">
            {pkg?.description}
          </p>

          <div className="flex items-center gap-6 pt-2">

            <div className="flex items-center gap-1.5 text-xs">

              <div className="flex text-primary">
                <Star className="size-3.5 fill-current" />
              </div>

              <span className="font-semibold">
                {rating}
                <span className="text-white/60 font-normal">
                  {" "}
                  ({pkg?.reviews?.length ?? 0} reviews)
                </span>
              </span>

            </div>

            <div className="h-3 w-px bg-white/30" />

            <div className="text-xs">
              <span className="text-white/60">Starts from </span>

              <span className="text-base font-bold ml-0.5">
                ৳{mealPrice}
                <span className="text-[10px] font-normal text-white/60">
                  /meal
                </span>
              </span>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}