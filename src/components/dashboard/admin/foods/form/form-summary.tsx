"use client";

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
  { label: "Variants", value: props.variantsCount },
  { label: "Addons", value: props.addonsCount },
  { label: "Prices", value: props.pricesCount },
  { label: "Discounts", value: props.discountsCount },
  { label: "Schedules", value: props.schedulesCount },
  { label: "Ingredients", value: props.ingredientsCount },
  { label: "Allergens", value: props.allergensCount },
  { label: "Labels", value: props.labelsCount },
  { label: "Diets", value: props.dietsCount },
];

export function FormSummary(props: FormSummaryProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-heading text-base font-bold text-foreground">
        {props.name ? props.name : "Untitled Food"}
      </h3>
      <p className="mt-0.5 text-xs text-muted-foreground">Catalog summary</p>

      <dl className="mt-5 space-y-2.5">
        {rows(props).map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="font-semibold text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
