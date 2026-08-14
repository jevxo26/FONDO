import type { LucideIcon } from "lucide-react";

export interface SummaryRow {
  key: string;
  label: string;
  value: string | number;
  icon?: LucideIcon;
}

interface FormSummaryCardProps {
  title: string;
  subtitle?: string;
  rows: SummaryRow[];
}

export function FormSummaryCard({ title, subtitle, rows }: FormSummaryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-5 shadow-[var(--shadow-card)] md:p-6">
      <div className="pointer-events-none absolute -bottom-6 -right-6 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute right-3 top-3 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10">
        <h3 className="font-heading text-2xl font-bold leading-tight text-foreground">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            {subtitle}
          </p>
        )}

        <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

        <dl className="mt-5 space-y-3">
          {rows.map((row) => (
            <div key={row.key} className="flex items-center justify-between gap-3 text-sm">
              <dt className="flex items-center gap-2 text-muted-foreground">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary/80">
                  {row.icon && <row.icon className="size-4" />}
                </span>
                {row.label}
              </dt>
              <dd className="rounded-full bg-card/80 px-2.5 py-0.5 font-medium text-foreground ring-1 ring-border/60">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
