import { FoodControls } from "@/components/dashboard/foods/food-controls";
import { FoodTableSection } from "@/components/dashboard/foods/food-table-section";
import { adminFoods } from "@/data/foods";
import { Download, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/common/cards/stat-card";

export default function FoodsPage() {
  const total = adminFoods.length;
  const active = adminFoods.filter((f) => f.status === "ACTIVE").length;
  const draft = adminFoods.filter((f) => f.status === "DRAFT").length;
  const archived = adminFoods.filter((f) => f.status === "ARCHIVED").length;

  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Utensils className="size-8 text-primary" />
        </div>
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-fraunces text-4xl font-bold text-foreground">
              All Foods
            </h2>
            <p className="mt-2 text-muted-foreground">
              Browse and manage all food items across vendors.
            </p>
          </div>
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Foods" value={total} />
        <StatCard label="Active" value={active} />
        <StatCard label="Draft" value={draft} />
        <StatCard label="Archived" value={archived} />
      </div>

      <div className="mt-6">
        <FoodControls />
      </div>

      <div className="mt-6">
        <FoodTableSection />
      </div>
    </div>
  );
}