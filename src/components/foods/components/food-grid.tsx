import type { Food } from "@/types/food";
import { Award, ChevronDown, Clock, Plus, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FoodGrid = ({ filteredFoods }: { filteredFoods: Food[] }) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const handleVariantChange = (foodId: string, variantId: string) => {
    setSelectedVariants((prev) => ({ ...prev, [foodId]: variantId }));
  };

  return (
    <div>
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFoods.map((food: Food) => {
            const activeVariantId = selectedVariants[food.id] || food.variants[0].id;
            const currentVariant =
              food.variants.find((v) => v.id === activeVariantId) || food.variants[0];

            return (
              <div
                key={food.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-card shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] hover:scale-[1.01] hover:border-primary/30"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/60" />

                <div>
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                    <Image
                      src={food.thumbnail ?? "/placeholder.svg"}
                      alt={food.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />

                    {food.labels.map((lbl, i) => (
                      <span
                        key={lbl.id}
                        style={{ backgroundColor: lbl.color }}
                        className={cn(
                          "absolute top-3 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider",
                          i === 0 ? "left-3" : "left-[calc(theme(spacing.3)+var(--label-offset))]",
                        )}
                      >
                        {lbl.label}
                      </span>
                    ))}

                    <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm">
                      <Clock className="size-3 text-primary" />
                      {food.preparationTime} min
                    </span>

                    {food.averageRating && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm">
                        <Star className="size-3 fill-primary text-primary" />
                        {food.averageRating}
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-heading text-base font-semibold text-foreground leading-tight">
                          {food.name}
                        </h4>
                        {food.category?.name && (
                          <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
                            {food.category.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {food.shortDescription ?? ""}
                    </p>

                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: "Cal", value: food.calories },
                        { label: "Prot", value: `${food.protein}g` },
                        { label: "Fat", value: `${food.fat}g` },
                        { label: "Carb", value: `${food.carbohydrate}g` },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-border/50 bg-muted/30 p-2 text-center transition-colors duration-300 group-hover:border-primary/20"
                        >
                          <span className="block text-[9px] font-bold text-foreground">
                            {item.value}
                          </span>
                          <span className="block text-[8px] uppercase tracking-wider text-muted-foreground/70">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {food.variants.length > 1 && (
                      <div className="relative">
                        <select
                          value={activeVariantId}
                          onChange={(e) => handleVariantChange(food.id, e.target.value)}
                          className="w-full appearance-none rounded-xl border border-border/60 bg-background px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                        >
                          {food.variants.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name} ({v.servingSize})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/60" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-auto border-t border-border/40 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-muted-foreground block">
                        Price
                      </span>
                      <span className="font-heading text-lg font-bold text-foreground">
                        ৳{currentVariant.price}
                      </span>
                    </div>
                    <Link
                      href={`/foods/${food.slug}`}
                      className="group/btn inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-[0.97]"
                    >
                      <ShoppingBag className="size-3.5" />
                      Add to Cart
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary-foreground/20">
                        <Plus className="size-3 stroke-[2.5]" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-20 rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Award className="size-6 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">No dishes match your search.</p>
        </div>
      )}
    </div>
  );
};

export default FoodGrid;
