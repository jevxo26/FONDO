import { Food } from "@/types/food";
import { Award, ChevronDown, Clock, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
                className="bg-card border-border rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:scale-[1.01] flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-primary/30 group"
              >
                <div>
                  {/* Image Module */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                    <Image
                      src={food.thumbnail ?? "/placeholder.svg"}
                      alt={food.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
                    />
                    {food.labels.map((lbl) => (
                      <span
                        key={lbl.id}
                        style={{ backgroundColor: lbl.color }}
                        className="absolute top-3 left-3 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider"
                      >
                        {lbl.label}
                      </span>
                    ))}
                    <span className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-border/15 text-[9px] font-bold text-foreground flex items-center gap-1">
                      <Clock className="size-2.5 text-primary" /> {food.preparationTime} min
                    </span>
                  </div>

                  {/* Content Layer */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-heading text-base font-normal text-foreground leading-tight">
                        {food.name}
                      </h4>
                      <div className="flex items-center gap-0.5 shrink-0 text-amber-500 font-bold text-[10px] mt-0.5">
                        <Star className="size-3 fill-current" /> {food.rating.averageRating}
                      </div>
                    </div>

                    <p className="font-sans text-[11px] text-muted-foreground leading-relaxed font-light line-clamp-2">
                      {food.shortDescription ?? ""}
                    </p>

                    {/* Nutritional Analytics Matrix */}
                    <div className="grid grid-cols-4 gap-1.5 text-center bg-muted/30 p-2 rounded-xl border border-border/50">
                      <div className="text-[9px]">
                        <span className="text-muted-foreground block uppercase font-light font-sans">
                          Cals
                        </span>
                        <span className="font-bold font-sans text-foreground">{food.calories}</span>
                      </div>
                      <div className="text-[9px]">
                        <span className="text-muted-foreground block uppercase font-light font-sans">
                          Prot
                        </span>
                        <span className="font-bold font-sans text-foreground">{food.protein}g</span>
                      </div>
                      <div className="text-[9px]">
                        <span className="text-muted-foreground block uppercase font-light font-sans">
                          Fat
                        </span>
                        <span className="font-bold font-sans text-foreground">{food.fat}g</span>
                      </div>
                      <div className="text-[9px]">
                        <span className="text-muted-foreground block uppercase font-light font-sans">
                          Carb
                        </span>
                        <span className="font-bold font-sans text-foreground">
                          {food.carbohydrate}g
                        </span>
                      </div>
                    </div>

                    {/* Variant Configuration Controls Selector */}
                    {food.variants.length > 1 && (
                      <div className="relative pt-1">
                        <select
                          value={activeVariantId}
                          onChange={(e) => handleVariantChange(food.id, e.target.value)}
                          className="w-full bg-background border-border rounded-xl px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-foreground appearance-none focus:outline-none"
                        >
                          {food.variants.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name} ({v.servingSize})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none size-3 text-muted-foreground/60 mt-0.5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Trigger Layer */}
                <div className="p-4 pt-0 border-t border-border mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground block font-light">
                      Price Target
                    </span>
                    <span className="font-heading text-base font-bold text-foreground">
                      ৳{currentVariant.price}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-primary hover:bg-primary/90 transition-colors font-sans font-bold text-[10px] uppercase tracking-wider text-primary-foreground rounded-xl shadow-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl border-border shadow-sm">
          <Award className="size-8 text-primary mx-auto mb-3" />
          <p className="font-sans text-xs text-muted-foreground">
            No culinary items match your specified filter matrices.
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodGrid;
