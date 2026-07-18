import { Button } from "@/components/ui/button";
import type { MealPlan } from "@/data/meal-plans";
import { cn } from "@/lib/utils";
import { BarChart3, Edit, Eye, Users } from "lucide-react";
import Image from "next/image";

interface MealPlanCardProps {
  plan: MealPlan;
}

export function MealPlanCard({ plan }: MealPlanCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]">
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={"/images/home/card_2.png"}
            alt={plan.name}
            fill
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center gap-2">
              <h3 className="font-fraunces text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                {plan.name}
              </h3>
              {plan.isPopular && (
                <span className="rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-[0_2px_8px_rgba(206,163,89,0.3)]">
                  Popular
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {plan.description}
          </p>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-fraunces text-[28px] font-bold tracking-tight text-foreground">
              ৳{plan.price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">{plan.priceLabel}</span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex size-6 items-center justify-center rounded-md bg-primary/8 text-[11px] font-bold text-primary">
                {plan.totalMeals}
              </span>
              <span>{plan.mealsPerDayDescription}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="size-4 text-primary/60" />
              <span>{plan.subscriberCount.toLocaleString()} subscribers</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {plan.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary ring-1 ring-primary/15"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className={cn(
              "mt-5 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent",
            )}
          />

          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 flex-1 rounded-xl text-xs font-semibold hover:bg-primary/8"
            >
              <Eye className="mr-1.5 size-[15px]" />
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 flex-1 rounded-xl text-xs font-semibold hover:bg-primary/8"
            >
              <Edit className="mr-1.5 size-[15px]" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 flex-1 rounded-xl text-xs font-semibold hover:bg-primary/8"
            >
              <BarChart3 className="mr-1.5 size-[15px]" />
              Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
