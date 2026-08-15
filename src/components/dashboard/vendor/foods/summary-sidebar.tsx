"use client";

import { Apple, Clock, DollarSign, Layers, List, Store, Tag, Utensils } from "lucide-react";

interface SummarySidebarProps {
  vendorName: string;
  categoryName: string;
  foodType: string;
  status: string;
  basePrice: number;
  discountPrice: number;
  variantCount: number;
  ingredientCount: number;
  calories: number;
  preparationTime: number;
}

const statusPills: Record<string, string> = {
  ACTIVE: "bg-success/10 text-success ring-success/20",
  INACTIVE: "bg-muted text-muted-foreground ring-border",
  DRAFT: "bg-warning/10 text-warning ring-warning/20",
  ARCHIVED: "bg-destructive/10 text-destructive ring-destructive/20",
  PENDING: "bg-primary/10 text-primary ring-primary/20",
};

export function SummarySidebar({
  vendorName,
  categoryName,
  foodType,
  status,
  basePrice,
  discountPrice,
  variantCount,
  ingredientCount,
  calories,
  preparationTime,
}: SummarySidebarProps) {
  const pill = statusPills[status] ?? statusPills.DRAFT;

  const rows = [
    { icon: Store, label: "Vendor", value: vendorName },
    { icon: Tag, label: "Category", value: categoryName },
    { icon: Utensils, label: "Food Type", value: foodType },
    { icon: Layers, label: "Variants", value: String(variantCount) },
    { icon: List, label: "Ingredients", value: String(ingredientCount) },
    { icon: Apple, label: "Calories", value: `${calories} kcal` },
    { icon: Clock, label: "Prep Time", value: `${preparationTime} min` },
  ];

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-5 shadow-[var(--shadow-card)] md:p-6">
      <div className="pointer-events-none absolute -bottom-6 -right-6 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute right-3 top-3 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Item Summary</p>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${pill}`}
          >
            {status || "DRAFT"}
          </span>
        </div>

        <div className="mt-3 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="font-heading text-[28px] font-bold leading-tight tracking-tighter text-foreground">
              ৳{basePrice.toFixed(2)}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              {discountPrice > 0 ? "Price" : "Base price"}
            </p>
          </div>
          {discountPrice > 0 && (
            <div className="text-right">
              <p className="font-heading text-lg font-semibold leading-tight text-success">
                ৳{discountPrice.toFixed(2)}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                Discount
              </p>
            </div>
          )}
        </div>

        <dl className="mt-5 space-y-2.5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3 text-sm">
              <dt className="flex items-center gap-2 text-muted-foreground">
                <row.icon className="size-4 text-primary/70" />
                {row.label}
              </dt>
              <dd className="max-w-[55%] truncate font-medium text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-primary/5 px-3 py-2.5 ring-1 ring-primary/10">
          <DollarSign className="size-4 shrink-0 text-primary" />
          <p className="text-xs text-muted-foreground">
            Submitted items are reviewed by FONDO admin before going live.
          </p>
        </div>
      </div>
    </div>
  );
}
