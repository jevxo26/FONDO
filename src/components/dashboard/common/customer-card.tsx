import Link from 'next/link';
import type { Customer } from '@/data/customers';
import { ArrowRight, Clock, ShoppingBag, Wallet } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
}

type Tier = 'bronze' | 'silver' | 'gold';

const tierConfig: Record<Tier, {
  label: string;
  badge: string;
  cardBg: string;
}> = {
  bronze: {
    label: 'Bronze',
    badge: 'bg-amber-900/10 text-amber-700 ring-amber-900/20',
    cardBg: 'bg-gradient-to-br from-amber-100/80 via-card to-amber-50/50 dark:from-amber-900/40 dark:via-card dark:to-amber-950/30',
  },
  silver: {
    label: 'Silver',
    badge: 'bg-muted text-muted-foreground',
    cardBg: 'bg-gradient-to-br from-slate-100/70 via-card to-slate-50/40 dark:from-zinc-800/50 dark:via-card dark:to-zinc-900/40',
  },
  gold: {
    label: 'Gold',
    badge: 'bg-primary/10 text-primary',
    cardBg: 'bg-gradient-to-br from-primary/15 via-card to-primary/[0.06] dark:from-amber-800/30 dark:via-card dark:to-amber-900/20',
  },
};

function activePill(timing: string): { label: string; style: string } {
  if (timing.includes('min')) {
    const n = timing.match(/(\d+)/)?.[1] ?? '';
    return { label: `${n}m ago`, style: 'bg-success/10 text-success ring-success/20' };
  }
  if (timing.includes('hour')) {
    const n = timing.match(/(\d+)/)?.[1] ?? '';
    return { label: `${n}h ago`, style: 'bg-success/10 text-success ring-success/20' };
  }
  if (timing.includes('day') && !timing.startsWith('4')) {
    const n = timing.match(/(\d+)/)?.[1] ?? '';
    return { label: `${n}d ago`, style: 'bg-warning/10 text-warning ring-warning/20' };
  }
  const n = timing.match(/(\d+)/)?.[1] ?? '';
  return { label: `${n}d ago`, style: 'bg-muted text-muted-foreground ring-border/40' };
}

export function CustomerCard({ customer }: CustomerCardProps) {
  const initial = customer.fullName[0];

  const tier: Tier =
    customer.totalOrders >= 100 ? 'gold'
      : customer.totalOrders >= 50 ? 'silver'
        : 'bronze';

  const config = tierConfig[tier];
  const progress = Math.min(customer.totalOrders / 100, 1);
  const progressLabel =
    tier === 'gold' ? 'Gold tier'
      : tier === 'silver' ? `${100 - customer.totalOrders} to Gold`
        : `${50 - customer.totalOrders} to Silver`;

  return (
    <Link
      href={`/dashboard/customers/orders?customer=${encodeURIComponent(customer.fullName)}`}
      className={`group relative block overflow-hidden rounded-3xl shadow-[var(--shadow-card)] ring-1 ring-border/60 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] hover:ring-primary/20 active:scale-[0.98] ${config.cardBg}`}
    >
      <span className="pointer-events-none absolute -bottom-4 -right-4 select-none text-[120px] font-bold leading-none text-primary/[0.06]">
        {initial}
      </span>

      <div className="relative z-10 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-sm font-bold text-primary shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-primary/10">
              {initial}
            </div>
            <div className="min-w-0">
              <h4 className="truncate font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">{customer.fullName}</h4>
              <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${config.badge}`}>
            {config.label}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-primary/[0.04] p-3 ring-1 ring-primary/[0.06]">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <ShoppingBag className="size-4 text-primary" />
            </div>
            <p className="mt-2 text-sm font-bold text-foreground">{customer.totalOrders}</p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-primary/[0.08]">
              <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${progress * 100}%` }} />
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">{progressLabel}</p>
          </div>

          <div className="rounded-xl bg-success/[0.04] p-3 ring-1 ring-success/[0.06]">
            <div className="flex size-8 items-center justify-center rounded-lg bg-success/10">
              <Wallet className="size-4 text-success" />
            </div>
            <p className="mt-2 text-sm font-bold text-success">{customer.walletBalance.toLocaleString()} ৳</p>
            <p className="mt-2 text-[10px] text-muted-foreground">Wallet</p>
          </div>

          <div className="rounded-xl bg-muted/40 p-3 ring-1 ring-border/40">
            <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
              <Clock className="size-4 text-muted-foreground" />
            </div>
            <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${activePill(customer.lastActive).style}`}>
              {activePill(customer.lastActive).label}
            </span>
            <p className="mt-2 text-[10px] text-muted-foreground">Last active</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <span className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 transition-all duration-300 group-hover:gap-2 group-hover:opacity-100">
            Manage <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
