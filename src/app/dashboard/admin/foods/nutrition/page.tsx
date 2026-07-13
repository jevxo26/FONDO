import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { NutritionTableSection } from "@/components/dashboard/admin/foods/nutrition-columns/nutrition-table-section";
import { nutritionItems } from "@/data/nutrition";
import { Scale, TrendingDown, DollarSign, Zap } from "lucide-react";

export default function FoodsNutritionPage() {
  const avgCalories = Math.round(nutritionItems.reduce((s, i) => s + i.calories, 0) / nutritionItems.length);
  const avgProtein = Math.round(nutritionItems.reduce((s, i) => s + i.protein, 0) / nutritionItems.length);
  const onSale = nutritionItems.filter((i) => i.salePrice).length;

  return (
    <div>
      <PageHeader
        title="Nutrition & Pricing"
        description="Manage nutritional info and pricing for all food items."
        icon={Scale}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Avg Calories" value={avgCalories} icon={Zap} accent="right" />
        <StatCard label="Avg Protein" value={`${avgProtein}g`} variant="success" icon={TrendingDown} accent="right" />
        <StatCard label="Items on Sale" value={onSale} variant="warning" icon={DollarSign} accent="right" />
      </div>
      <div className="mt-8">
        <NutritionTableSection />
      </div>
    </div>
  );
}
