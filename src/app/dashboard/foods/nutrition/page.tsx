import { Scale } from "lucide-react";

export default function FoodsNutritionPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Scale className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Nutrition TITLE Pricing
          </h2>
          <p className="mt-1 text-muted-foreground">
            Manage nutritional info and pricing for all food items.
          </p>
        </div>
      </div>
    </div>
  );
}
