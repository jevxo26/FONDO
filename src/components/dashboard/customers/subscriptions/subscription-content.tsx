'use client';

import type { FacetedFilter, RowAction } from '@/components/common/table';
import { DataTable } from '@/components/common/table';
import { subscriptionColumns } from '@/components/dashboard/customers/subscriptions/subscription-columns';
import { SubscriptionContextCards } from '@/components/dashboard/customers/subscriptions/subscription-context-cards';
import type { Subscription } from '@/data/subscriptions';
import { subscriptions } from '@/data/subscriptions';
import { Eye, Pause, XCircle } from 'lucide-react';

const statusFilter: FacetedFilter = {
  columnId: 'status',
  title: 'Status',
  options: [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Paused', value: 'PAUSED' },
    { label: 'Frozen', value: 'FROZEN' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Expired', value: 'EXPIRED' },
    { label: 'Cancelled', value: 'CANCELLED' },
  ],
};

const rowActions: RowAction<Subscription>[] = [
  {
    label: 'View Details',
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log('View Details', row.id),
  },
  {
    label: 'Pause Subscription',
    icon: <Pause className="size-4" />,
    onClick: (row) => console.log('Pause Subscription', row.id),
  },
  {
    label: 'Cancel',
    icon: <XCircle className="size-4" />,
    variant: 'destructive',
    onClick: (row) => console.log('Cancel', row.id),
  },
];

const total = subscriptions.length;
const active = subscriptions.filter((s) => s.status === 'ACTIVE').length;
const paused = subscriptions.filter((s) => s.status === 'PAUSED').length;
const expired = subscriptions.filter(
  (s) => s.status === 'EXPIRED' || s.status === 'CANCELLED',
).length;

export function SubscriptionContent() {
  return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Subscriptions" value={total} />
        <StatCard label="Active" value={active} />
        <StatCard label="Paused" value={paused} />
        <StatCard label="Expired / Cancelled" value={expired} />
      </div>

      <div className="mt-6">
        <DataTable
          columns={subscriptionColumns}
          data={subscriptions}
          filters={[statusFilter]}
          rowActions={rowActions}
        />
      </div>

      <SubscriptionContextCards />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <p className="text-[13px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-fraunces text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}
