"use client";

import React from "react";
import { usePackages, ApiPackage } from "./packages-context";
import { Check, Clock, Flame, Star, Utensils, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PackageCardProps {
  pkg: ApiPackage;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  const { toggleComparison, comparedIds, categories } = usePackages();
  const isCompared = comparedIds.includes(pkg.id);

  // ক্যাটাগরির নাম বের করা
  const categoryName =
    pkg.packageCategory?.name ||
    categories.find((c) => c.id === pkg.packageCategoryId)?.name ||
    "General";

  // মোট ক্যালোরি হিসাব
  let totalCalories = 0;
  pkg.days?.forEach((day) => {
    day.meals?.forEach((meal) => {
      meal.foods?.forEach((f) => {
        if (f.food?.calories) totalCalories += f.food.calories;
      });
    });
  });

  const dailyCalories =
    pkg.durationDays > 0 ? Math.round(totalCalories / pkg.durationDays) : 0;
  const mealsPerDay =
    pkg.durationDays > 0 ? Math.round(pkg.totalMeals / pkg.durationDays) : 0;

  const hasDiscount = Boolean(pkg.discountPrice);

  return (
    <article className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all hover:-translate-y-1 hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative">
        <Image
          width={500}
          height={300}
          src={pkg.thumbnail || "/placeholder-food.jpg"}
          alt={pkg.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-card/90 backdrop-blur-md text-[10px] font-bold uppercase rounded-lg shadow-sm border border-border/50 text-foreground">
          {categoryName}
        </span>

        {pkg.isCustomizable && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-amber-500/90 text-white text-[9px] font-bold uppercase rounded-md shadow-sm">
            Customizable
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-semibold text-foreground line-clamp-1">
            {pkg.name}
          </h3>
          <div className="flex items-center gap-0.5 text-[10px] bg-secondary px-1.5 py-0.5 rounded border border-border font-bold shrink-0">
            <Star className="size-3 text-amber-400 fill-amber-400" />
            <span>{pkg.rating ?? "4.8"}</span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground line-clamp-2 h-8 leading-relaxed">
          {pkg.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-1 bg-secondary/80 p-2 border border-border/40 rounded-xl text-center text-[10px] font-bold">
          <div>
            <Clock className="size-3.5 mx-auto text-primary mb-0.5" />
            {pkg.durationDays} Days
          </div>
          <div>
            <Utensils className="size-3.5 mx-auto text-primary mb-0.5" />
            {mealsPerDay || 2}/Day
          </div>
          <div>
            <Flame className="size-3.5 mx-auto text-primary mb-0.5" />
            {dailyCalories || 1800} kcal
          </div>
        </div>

        {/* Footer & Price */}
        <div className="flex items-end justify-between pt-2 mt-auto border-t border-border/40">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-[10px] line-through text-muted-foreground">
                ৳{pkg.price}
              </span>
            )}
            <span className="text-sm font-black text-foreground">
              ৳{pkg.discountPrice ?? pkg.price}
            </span>
          </div>

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => toggleComparison(pkg.id)}
              className={`p-1.5 border rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                isCompared
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border hover:bg-muted text-muted-foreground"
              }`}
            >
              <Check className={`size-3 ${isCompared ? "block" : "hidden"}`} />
              Compare
            </button>

            <Link
              href={`/packages/${pkg.id}`}
              className="px-3 py-1.5 bg-primary text-primary-foreground font-bold text-[10px] rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PackageCard;