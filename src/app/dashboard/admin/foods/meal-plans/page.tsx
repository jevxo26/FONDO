import { PageHeader } from "@/components/dashboard/common/page-header";
import { MealPlanCard } from "@/components/dashboard/foods/meal-plan/meal-plan-card";
import { Button } from "@/components/ui/button";
import { mealPlans } from "@/data/meal-plans";
import { CakeSlice, FileText, Plus } from "lucide-react";

export default function MealPlansPage() {
  return (
    <div>
      <PageHeader
        title="Meal Plans"
        description="Manage predefined meal subscription plans."
        icon={CakeSlice}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-full">
              <FileText className="size-[18px]" />
              Templates
            </Button>
            <Button className="rounded-full">
              <Plus className="size-[18px]" />
              Create Plan
            </Button>
          </div>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {mealPlans.map((plan) => (
          <MealPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
