"use client";

import {
  CalendarClock,
  GripVertical,
  ListPlus,
  BadgeDollarSign,
  Percent,
  Salad,
  AlertTriangle,
  Tag,
  Apple,
} from "lucide-react";

interface FormSummaryProps {
  name: string;
  variantsCount: number;
  addonsCount: number;
  pricesCount: number;
  discountsCount: number;
  schedulesCount: number;
  ingredientsCount: number;
  allergensCount: number;
  labelsCount: number;
  dietsCount: number;
}

const rows = (props: FormSummaryProps) => [
  { icon: BadgeDollarSign, label: "Prices", value: props.pricesCount },
  { icon: Percent, label: "Discounts", value: props.discountsCount },
  { icon: GripVertical, label: "Variants", value: props.variantsCount },
  { icon: ListPlus, label: "Addons", value: props.addonsCount },
  { icon: CalendarClock, label: "Schedules", value: props.schedulesCount },
  { icon: Salad, label: "Ingredients", value: props.ingredientsCount },
  { icon: AlertTriangle, label: "Allergens", value: props.allergensCount },
  { icon: Tag, label: "Labels", value: props.labelsCount },
  { icon: Apple, label: "Diets", value: props.dietsCount },
];

export function FormSummary(props: FormSummaryProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-5 shadow-[var(--shadow-card)] md:p-6">
      <div className="pointer-events-none absolute -bottom-6 -right-6 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute right-3 top-3 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10">
        <h3 className="font-heading text-xl font-bold leading-tight text-foreground">
          {props.name ? props.name : "Untitled Food"}
        </h3>
        <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
          Catalog summary
        </p>

        <div className="mt-3 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

        <dl className="mt-5 space-y-2.5">
          {rows(props).map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3 text-sm">
              <dt className="flex items-center gap-2 text-muted-foreground">
                <row.icon className="size-4 text-primary/70" />
                {row.label}
              </dt>
              <dd className="font-medium text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
