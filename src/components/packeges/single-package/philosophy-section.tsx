"use client";

import React from "react";
import { Utensils, Zap } from "lucide-react";
import type { Package } from "@/types/package";

interface PhilosophySectionProps {
  package: Package;
}

export default function PhilosophySection({
  package: pkg,
}: PhilosophySectionProps) {
  const formatPackageType = (type?: string) => {
    if (!type) return "Standard Plan";
    return type
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const totalMeals = pkg?.totalMeals ?? 0;
  const durationDays = pkg?.durationDays ?? 0;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-card border border-border/40 rounded-3xl p-6 lg:p-8 shadow-sm">
      <div className="md:col-span-2 space-y-3">
        <h2 className="font-heading text-xl text-foreground">
          {pkg?.packageCategory?.name ?? "Meal Package"}
        </h2>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {pkg?.rule?.description ??
            pkg?.description ??
            "Healthy meal package carefully prepared with fresh ingredients and balanced nutrition."}
        </p>

        {(pkg?.rule?.title || pkg?.packageCode) && (
          <blockquote className="border-l-2 border-primary pl-3 text-xs italic text-primary/80 font-heading">
            &ldquo;{pkg?.rule?.title ?? pkg?.packageCode ?? "Healthy food, healthy life."}&rdquo;
          </blockquote>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-background border border-border/30 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
            <Utensils className="size-4" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-foreground">
              {totalMeals} {totalMeals === 1 ? "Meal" : "Meals"}
            </h4>

            <p className="text-[10px] text-muted-foreground/75">
              {durationDays} {durationDays === 1 ? "Day" : "Days"} Plan
            </p>
          </div>
        </div>

        <div className="bg-background border border-border/30 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
            <Zap className="size-4" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-foreground">
              {formatPackageType(pkg?.packageType)}
            </h4>

            <p className="text-[10px] text-muted-foreground/75">
              {pkg?.isCustomizable
                ? "Customization Available"
                : "Standard Meal Package"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}