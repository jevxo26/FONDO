import { cn } from '@/lib/utils';

interface DarkCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: 'foreground' | 'primary';
  className?: string;
}

export function DarkCard({
  icon,
  title,
  description,
  children,
  variant = 'foreground',
  className,
}: DarkCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-3xl bg-white/10 p-[1px] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]',
        className,
      )}
    >
      <div
        className={cn(
          'relative rounded-[calc(1.375rem-1px)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:p-6 lg:p-8',
          variant === 'foreground'
            ? 'bg-gradient-to-br from-foreground to-foreground/95 text-white'
            : 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground',
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-transparent via-transparent to-primary/10" />
        <div className="pointer-events-none absolute -bottom-6 -right-6 flex size-36 items-center justify-center opacity-15 transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>
        <div className="pointer-events-none absolute -top-4 -right-4 size-20 rounded-full bg-primary/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-4 -left-4 size-16 rounded-full bg-white/5 blur-2xl" />
        <div className="relative z-10">
          <h3 className="font-fraunces text-lg leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] md:text-xl">{title}</h3>
          {description && <p className="mt-1 text-sm text-white/70 md:mt-2">{description}</p>}
        </div>
        {children && <div className="relative z-10 mt-4">{children}</div>}
      </div>
    </div>
  );
}
