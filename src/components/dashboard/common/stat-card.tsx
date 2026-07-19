import { cn } from '@/lib/utils';
import { BarChart3, TrendingDown, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  accent?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

const cardBgStyles = {
  default: 'from-primary/10 via-card to-primary/[0.04]',
  success: 'from-success/10 via-card to-success/[0.04]',
  warning: 'from-warning/10 via-card to-warning/[0.04]',
  danger: 'from-destructive/[0.08] via-card to-destructive/[0.03]',
};

const accentBarStyles = {
  default: 'from-primary to-primary/60',
  success: 'from-success to-success/60',
  warning: 'from-warning to-warning/60',
  danger: 'from-destructive to-destructive/60',
};

const accentPositions: Record<string, { bar: string; pad: string }> = {
  left: { bar: 'left-0 top-0 h-full w-1.5 bg-gradient-to-b', pad: 'pl-6' },
  right: { bar: 'right-0 top-0 h-full w-1.5 bg-gradient-to-b', pad: 'pr-6' },
  top: { bar: 'top-0 left-0 h-1.5 w-full bg-gradient-to-r', pad: 'pt-6' },
  bottom: { bar: 'bottom-0 left-0 h-1.5 w-full bg-gradient-to-r', pad: 'pb-6' },
};

const iconBgStyles = {
  default: 'bg-primary/10 text-primary ring-primary/20',
  success: 'bg-success/10 text-success ring-success/20',
  warning: 'bg-warning/10 text-warning ring-warning/20',
  danger: 'bg-destructive/10 text-destructive ring-destructive/20',
};

const trendPillBg = {
  up: 'bg-success/10 text-success',
  down: 'bg-destructive/10 text-destructive',
  neutral: 'bg-muted text-muted-foreground',
};

const orbStyles = {
  default: 'bg-primary/10',
  success: 'bg-success/10',
  warning: 'bg-warning/10',
  danger: 'bg-destructive/10',
};

export function StatCard({ label, value, icon: Icon, trend, trendValue, variant = 'default', accent = 'left', className }: StatCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
  const IconComponent = Icon ?? BarChart3;
  const pos = accentPositions[accent];

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl bg-gradient-to-br shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]',
        cardBgStyles[variant],
        className,
      )}
    >
      <div className={cn('absolute', pos.bar, accentBarStyles[variant])} />
      <div className={cn('pointer-events-none absolute -right-8 -top-8 size-36 rounded-full opacity-60 blur-3xl', orbStyles[variant])} />
      <div className={cn('relative z-10 p-5', pos.pad)}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-heading text-[30px] font-bold leading-tight tracking-tighter text-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.03)]">{value}</p>
            <p className="mt-1 truncate text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
          </div>
          <div className={cn('mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1', iconBgStyles[variant])}>
            <IconComponent className="size-[18px]" />
          </div>
        </div>
        {trend && trendValue && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold', trendPillBg[trend])}>
              {TrendIcon && <TrendIcon className="size-3" />}
              {trendValue}
            </span>
            <span className="text-[11px] text-muted-foreground">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
}
