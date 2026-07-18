import { cn } from "@/lib/utils";
import type { KitchenMealSlot } from "@/data/kitchen";
import { Sun, SunDim, Moon, Cookie } from "lucide-react";

const mealIcons = {
  BREAKFAST: Sun,
  LUNCH: SunDim,
  DINNER: Moon,
  SNACKS: Cookie,
};

const mealColors = {
  BREAKFAST: "from-amber-500/10 via-card to-amber-500/5",
  LUNCH: "from-orange-500/10 via-card to-orange-500/5",
  DINNER: "from-indigo-500/10 via-card to-indigo-500/5",
  SNACKS: "from-pink-500/10 via-card to-pink-500/5",
};

interface KitchenMealSlotCardProps {
  slot: KitchenMealSlot;
}

export function KitchenMealSlotCard({ slot }: KitchenMealSlotCardProps) {
  const Icon = mealIcons[slot.mealType];
  const colorClass = mealColors[slot.mealType];
  const progressPercent = slot.totalMeals > 0 ? Math.round((slot.prepared / slot.totalMeals) * 100) : 0;

  return (
    <div className={cn("rounded-3xl bg-gradient-to-br p-6 shadow-[var(--shadow-card)]", colorClass)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Icon className="size-5" />
          </div>
          <div>
            <p className="font-fraunces text-lg font-bold text-foreground capitalize">{slot.mealType.toLowerCase()}</p>
            <p className="text-xs text-muted-foreground">{slot.time}</p>
          </div>
        </div>
        <span className="text-sm font-semibold text-foreground">{slot.totalMeals} meals</span>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div><span className="text-success font-semibold">{slot.prepared}</span> <span className="text-muted-foreground">prepared</span></div>
          <div><span className="text-primary font-semibold">{slot.inProgress}</span> <span className="text-muted-foreground">in progress</span></div>
          {slot.shortfall > 0 && (
            <div><span className="text-destructive font-semibold">{slot.shortfall}</span> <span className="text-muted-foreground">shortfall</span></div>
          )}
        </div>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{progressPercent}% complete</p>

      <div className="mt-6 space-y-3">
        {slot.items.map((item) => {
          const itemProgress = item.total > 0 ? Math.round((item.prepared / item.total) * 100) : 0;
          return (
            <div key={item.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{item.name}</span>
                <span className="text-muted-foreground">{item.prepared}/{item.total}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full transition-all", itemProgress >= 100 ? "bg-success" : "bg-primary")}
                  style={{ width: `${itemProgress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
