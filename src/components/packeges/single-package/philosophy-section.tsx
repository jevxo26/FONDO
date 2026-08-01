"use client";

import React from "react";
import { Utensils, Zap } from "lucide-react";

interface PhilosophySectionProps {
  package: any;
}

export default function PhilosophySection({
  package: pkg,
}: PhilosophySectionProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-card border border-border/20 rounded-3xl p-6 lg:p-8 shadow-sm">
      <div className="md:col-span-2 space-y-3">
        <h2 className="font-heading text-xl text-foreground">
          {pkg?.packageCategory?.name ?? "Meal Package"}
        </h2>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {pkg?.rule?.description ??
            pkg?.description ??
            "Healthy meal package carefully prepared with fresh ingredients and balanced nutrition."}
        </p>

        <blockquote className="border-l-2 border-primary pl-3 text-xs italic text-primary/80 font-heading">
          &quot;
          {pkg?.rule?.title ??
            pkg?.packageCode ??
            "Healthy food, healthy life."}
          &quot;
        </blockquote>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-background border border-border/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Utensils className="size-4" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-foreground">
              {pkg?.totalMeals ?? 0} Meals
            </h4>

            <p className="text-[10px] text-muted-foreground/70">
              {pkg?.durationDays ?? 0} Day Meal Plan
            </p>
          </div>
        </div>

        <div className="bg-background border border-border/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Zap className="size-4" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-foreground">
              {pkg?.packageType}
            </h4>

            <p className="text-[10px] text-muted-foreground/70">
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