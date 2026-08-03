import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  count?: number;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function FormSection({
  icon: Icon,
  title,
  description,
  count,
  action,
  children,
  className,
}: FormSectionProps) {
  return (
    <section
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-5 shadow-[var(--shadow-card)] md:p-6",
        className,
      )}
    >
      <div className="pointer-events-none absolute -bottom-6 -right-6 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute right-3 top-3 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
              <Icon className="size-[18px] text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-base font-bold text-foreground">{title}</h2>
              {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
            </div>
            {count !== undefined && count > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary ring-1 ring-primary/15">
                {count}
              </span>
            )}
          </div>
          {action}
        </header>

        <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}
