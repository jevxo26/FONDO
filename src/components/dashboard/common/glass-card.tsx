import { cn } from '@/lib/utils';

interface GlassCardProps {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  value: string;
  subtitle: string;
  className?: string;
  children?: React.ReactNode;
}

export function GlassCard({
  icon,
  iconBg = 'bg-primary/10',
  title,
  value,
  subtitle,
  className,
  children,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-card to-primary/[0.08] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]',
        className,
      )}
    >
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10 p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-fraunces text-lg leading-tight text-foreground md:text-xl">{title}</h3>
          <div className={cn('mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]', iconBg)}>
            {icon}
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

        <div className="mt-5">
          <p className="font-fraunces text-[30px] tracking-tight text-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.03)]">{value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {children && (
          <>
            <div className="mt-5 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />
            <div className="mt-5">{children}</div>
          </>
        )}
      </div>
    </div>
  );
}
