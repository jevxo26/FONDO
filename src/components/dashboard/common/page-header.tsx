import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, icon: Icon, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-start gap-5', className)}>
      {Icon && (
        <div className="rounded-2xl bg-primary/8 p-[1px] shadow-sm">
          <div className="flex size-14 items-center justify-center rounded-[calc(1rem-1px)] bg-primary/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
            <Icon className="size-7 text-primary drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]" />
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-fraunces text-[32px] font-bold leading-tight tracking-tight text-foreground">{title}</h2>
          {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
      </div>
    </div>
  );
}
