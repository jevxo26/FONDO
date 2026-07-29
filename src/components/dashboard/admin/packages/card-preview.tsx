import React from "react";
import { Sparkles, Tag, Clock, Utensils } from "lucide-react";
import type { PackageFormValues } from "@/lib/schema/package-schema";

interface CardPreviewProps {
  thumbnailWatched?: string;
  nameWatched?: string;
  packageTypeWatched?: string;
  customTypeNameWatched?: string;
  isCustomizableWatched?: boolean;
  selectedCategoryName?: string;
  descriptionWatched?: string;
  durationWatched?: number;
  totalMealsCount: number;
  price: number;
  discountPrice: number;
  daysWatched: NonNullable<PackageFormValues["days"]>;
}

export function CardPreview({
  thumbnailWatched,
  nameWatched,
  packageTypeWatched,
  customTypeNameWatched,
  isCustomizableWatched,
  selectedCategoryName,
  descriptionWatched,
  durationWatched,
  totalMealsCount,
  price,
  discountPrice,
  daysWatched,
}: CardPreviewProps) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-6">
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Live Package Card Preview</h2>
        </div>
        <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">Customer View</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-background border border-border rounded-2xl overflow-hidden shadow-md flex flex-col justify-between">
          <div>
            <div className="relative h-48 w-full bg-muted overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailWatched || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80"}
                alt={nameWatched || "Package"}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                <Tag className="w-3 h-3 text-primary" />
                {packageTypeWatched === "CUSTOM" ? customTypeNameWatched || "CUSTOM" : packageTypeWatched}
              </div>
              {isCustomizableWatched && (
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Customizable
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <span className="text-[11px] font-semibold text-primary uppercase">{selectedCategoryName}</span>
              <h3 className="text-base font-bold text-foreground line-clamp-1">{nameWatched || "Package Name"}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{descriptionWatched || "No description provided."}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5 text-primary" /> {durationWatched || 0} Days</span>
                <span className="flex items-center gap-1 font-medium"><Utensils className="w-3.5 h-3.5 text-primary" /> {totalMealsCount} Meals</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground line-through block">৳{price}</span>
              <span className="text-lg font-bold text-primary">৳{discountPrice}</span>
            </div>
            <button type="button" className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-lg">Subscribe</button>
          </div>
        </div>

        <div className="md:col-span-2 bg-background border border-border rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border pb-2">
            <Utensils className="w-4 h-4 text-primary" /> Included Meals Preview
          </h3>

          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
            {daysWatched?.map((day, idx) => (
              <div key={idx} className="bg-muted/30 p-3 rounded-xl border border-border/60 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-foreground">{day?.title || `Day ${idx + 1}`}</span>
                  <span className="text-[10px] text-muted-foreground bg-background px-2 py-0.5 rounded border border-border">{day?.meals?.length || 0} Meals</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {day?.meals?.map((meal, mIdx) => (
                    <div key={mIdx} className="bg-card p-2.5 rounded-lg border border-border/80 text-xs">
                      <div className="flex justify-between items-center text-primary font-semibold mb-1 text-[11px]">
                        <span>{meal?.mealType}</span>
                        <span className="text-muted-foreground text-[10px]">{meal?.mealTime}</span>
                      </div>
                      <ul className="space-y-1 text-muted-foreground text-[11px]">
                        {meal?.foods?.map((food, fIdx) => (
                          <li key={fIdx} className="flex items-center justify-between">
                            <span className="line-clamp-1">{food?.name || "Unnamed"}</span>
                            <span className="font-medium text-foreground ml-2">x{food?.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}