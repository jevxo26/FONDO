import { cn } from '@/lib/utils';

interface GlassCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  subtitle: string;
  layout?: 'row' | 'stack';
  valueClassName?: string;
  subtitleClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

export function GlassCard({
  icon,
  iconBg,
  title,
  value,
  subtitle,
  layout = 'row',
  valueClassName,
  subtitleClassName,
  className,
  children,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-3xl border border-white/30 bg-white/30 p-[1px] shadow-[var(--shadow-card)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]',
        className,
      )}
    >
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />

      <div
        className={cn(
          'relative z-10 rounded-[calc(1.375rem-1px)] bg-card/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-1 group-hover:ring-primary/10 md:p-6',
          layout === 'row' ? 'flex flex-col justify-between min-h-48' : 'min-h-44',
        )}
      >
        <div>
          <div className={cn('mb-4 flex size-10 items-center justify-center rounded-xl backdrop-blur-sm bg-white/60 dark:bg-muted/30 shadow-sm ring-1 ring-black/5', iconBg)}>
            <div className="rounded-lg bg-white/40 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
              {icon}
            </div>
          </div>
          <h3
            className={cn(
              'font-fraunces leading-tight text-foreground',
              layout === 'row' ? 'text-xl' : 'text-lg',
            )}
          >
            {title}
          </h3>
        </div>
        {layout === 'row' ? (
          <div className="flex items-baseline gap-2">
            <span className={cn('font-fraunces text-[32px] tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.03)]', valueClassName)}>{value}</span>
            <span className={cn('text-sm font-bold', subtitleClassName)}>{subtitle}</span>
          </div>
        ) : (
          <div>
            <p className={cn('font-fraunces text-[28px] tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.03)]', valueClassName)}>{value}</p>
            <p className={cn('mt-1 text-sm', subtitleClassName)}>{subtitle}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
