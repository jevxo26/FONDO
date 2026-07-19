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
                className="bg-white border border-[#16100C]/10 rounded-2xl overflow-hidden shadow-sm hover:border-[#CEA359]/30 flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Image Module */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#16100C]/5">
                    <Image
                      src={food.thumbnail}
                      alt={food.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-[#16100C]/15 text-[9px] font-bold text-[#16100C] flex items-center gap-1">
                      <Clock className="size-2.5 text-[#CEA359]" /> {food.preparationTime} min
                    </span>
                  </div>

                  {/* Content Layer */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-heading text-base font-normal text-[#16100C] leading-tight">
                        {food.name}
                      </h4>
                      <div className="flex items-center gap-0.5 shrink-0 text-amber-500 font-bold text-[10px] mt-0.5">
                        <Star className="size-3 fill-current" /> {food.rating.averageRating}
                      </div>
                    </div>

                    <p className="font-sans text-[11px] text-[#16100C]/70 leading-relaxed font-light line-clamp-2">
                      {food.shortDescription}
                    </p>

                    {/* Nutritional Analytics Matrix */}
                    <div className="grid grid-cols-4 gap-1.5 text-center bg-[#FAF5EB] p-2 rounded-xl border border-[#16100C]/5">
                      <div className="text-[9px]">
                        <span className="text-[#16100C]/40 block uppercase font-light font-sans">
                          Cals
                        </span>
                        <span className="font-bold font-sans text-[#16100C]">{food.calories}</span>
                      </div>
                      <div className="text-[9px]">
                        <span className="text-[#16100C]/40 block uppercase font-light font-sans">
                          Prot
                        </span>
                        <span className="font-bold font-sans text-[#16100C]">{food.protein}g</span>
                      </div>
                      <div className="text-[9px]">
                        <span className="text-[#16100C]/40 block uppercase font-light font-sans">
                          Fat
                        </span>
                        <span className="font-bold font-sans text-[#16100C]">{food.fat}g</span>
                      </div>
                      <div className="text-[9px]">
                        <span className="text-[#16100C]/40 block uppercase font-light font-sans">
                          Carb
                        </span>
                        <span className="font-bold font-sans text-[#16100C]">
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
                          className="w-full bg-white border border-[#16100C]/10 rounded-xl px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#16100C] appearance-none focus:outline-none"
                        >
                          {food.variants.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name} ({v.servingSize})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none size-3 text-[#16100C]/50 mt-0.5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Trigger Layer */}
                <div className="p-4 pt-0 border-t border-[#16100C]/5 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#16100C]/40 block font-light">
                      Price Target
                    </span>
                    <span className="font-heading text-base font-bold text-[#16100C]">
                      ৳{currentVariant.price}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-[#CEA359] hover:bg-[#b08443] transition-colors font-sans font-bold text-[10px] uppercase tracking-wider text-white rounded-xl shadow-sm">
                    Add to Cell
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#16100C]/5 shadow-sm">
          <Award className="size-8 text-[#CEA359] mx-auto mb-3" />
          <p className="font-sans text-xs text-[#16100C]/50">
            No culinary items match your specified filter matrices.
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodGrid;
