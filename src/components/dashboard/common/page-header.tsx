import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-start gap-3 md:gap-5", className)}>
      {Icon && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15 shadow-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] md:size-14 md:rounded-2xl">
          <Icon className="size-5 text-primary drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)] md:size-7" />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-3">
        <div className="min-w-0">
          <h2 className="font-heading text-xl font-bold leading-tight tracking-tight text-foreground md:text-[32px]">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground md:mt-1.5">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-2 md:gap-1 max-sm:mt-1 md:gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
