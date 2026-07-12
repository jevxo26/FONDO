import { Scale } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";

export default function FoodsNutritionPage() {
  return (
    <div>
      <PageHeader
        title="Nutrition & Pricing"
        description="Manage nutritional info and pricing for all food items."
        icon={Scale}
      />
    </div>
  );
}
