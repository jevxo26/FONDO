import { UtensilsCrossed } from "lucide-react";
import { mealSlots } from "@/data/kitchen";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { KitchenMealSlotCard } from "@/components/dashboard/kitchen/kitchen-meal-slot-card";

export default function KitchenMealsPage() {
  const total = mealSlots.reduce((s, m) => s + m.totalMeals, 0);
  const prepared = mealSlots.reduce((s, m) => s + m.prepared, 0);
  const inProgress = mealSlots.reduce((s, m) => s + m.inProgress, 0);
  const shortfall = mealSlots.reduce((s, m) => s + m.shortfall, 0);

  return (
    <div>
      <PageHeader title="Meals" description="Manage today's meal production schedule." icon={UtensilsCrossed} />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Meals" value={total} icon={UtensilsCrossed} accent="right" />
        <StatCard label="Prepared" value={prepared} variant="success" icon={UtensilsCrossed} accent="right" />
        <StatCard label="In Progress" value={inProgress} variant="warning" icon={UtensilsCrossed} accent="right" />
        <StatCard label="Shortfall" value={shortfall} variant="danger" icon={UtensilsCrossed} accent="right" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {mealSlots.map((slot) => (
          <KitchenMealSlotCard key={slot.id} slot={slot} />
        ))}
      </div>
    </div>
  );
}
