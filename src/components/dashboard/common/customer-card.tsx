import Link from 'next/link';
import type { Customer } from '@/data/customers';
import { ArrowRight } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  const initials = customer.fullName
    .split(' ')
    .map((n) => n[0])
    .join('');

  const tierBadge =
    customer.totalOrders >= 100
      ? { label: 'Gold', style: 'bg-primary/10 text-primary border-primary/20' }
      : { label: 'Silver', style: 'bg-muted text-muted-foreground border-border/50' };

  return (
    <Link
      href={`/dashboard/customers/orders?customer=${encodeURIComponent(customer.fullName)}`}
      className="group relative block rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]"
    >
      <div className="pointer-events-none absolute right-3 top-3 z-10 size-1.5 rounded-full bg-primary/20" />
      <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-1 group-hover:ring-primary/15 md:p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary shadow-sm ring-1 ring-primary/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] md:size-14">
              {initials}
            </div>
            <div>
              <h4 className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                {customer.fullName}
              </h4>
              <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
            </div>
          </div>
          <span
            className={`rounded-full border px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide shadow-sm ${tierBadge.style}`}
          >
            {tierBadge.label}
          </span>
        </div>

        <div className="relative grid grid-cols-2 gap-4 py-4">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Total Orders</p>
            <p className="font-bold text-foreground">{customer.totalOrders} Orders</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Wallet Balance</p>
            <p className="font-bold text-success">৳{customer.walletBalance.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Last active: {customer.lastActive}</p>
          <span className="flex items-center gap-1 text-xs font-bold text-primary transition-all duration-300 group-hover:gap-2">
            Manage <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
