"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, CheckCircle, PauseCircle, XCircle } from "lucide-react";
import { DataTable } from "@/components/common/table";
import { StatCard } from "@/components/dashboard/common/stat-card";
import {
  useAdminCustomerSubscriptions,
  type AdminSubscription,
} from "@/hooks/use-admin-customers";
import { DataTableColumnHeader } from "@/components/common/table";
import type { ColumnDef } from "@tanstack/react-table";
import { SubscriptionStatusBadge } from "@/components/dashboard/admin/customers/subscriptions/subscription-status-badge";

const subscriptionColumns: ColumnDef<AdminSubscription>[] = [
  {
    accessorKey: "subscriptionNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sub #" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">{row.original.subscriptionNumber}</span>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-bold text-foreground">৳{row.original.totalAmount.toLocaleString()}</p>
        {row.original.remainingAmount > 0 && (
          <p className="text-[11px] text-destructive">৳{row.original.remainingAmount.toLocaleString()} due</p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <SubscriptionStatusBadge status={row.original.status as never} />,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Duration" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.duration} days</span>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Period" />,
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        <p>{new Date(row.original.startDate).toLocaleDateString()}</p>
        <p className="text-[13px]">→ {new Date(row.original.endDate).toLocaleDateString()}</p>
      </div>
    ),
  },
];

export default function CustomerSubscriptionsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useAdminCustomerSubscriptions(id, { page: 1, limit: 50 });

  const subscriptions = data?.items ?? [];
  const total = subscriptions.length;
  const active = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const paused = subscriptions.filter((s) => s.status === "PAUSED").length;
  const expired = subscriptions.filter(
    (s) => s.status === "EXPIRED" || s.status === "CANCELLED",
  ).length;

  return (
    <div>
      <Link
        href={`/dashboard/admin/customers/${id}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Customer
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <h1 className="font-fraunces text-2xl font-bold text-foreground">Subscriptions</h1>
        <div className="flex gap-1">
          <Link href={`/dashboard/admin/customers/${id}`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Overview</Link>
          <Link href={`/dashboard/admin/customers/${id}/orders`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Orders</Link>
          <Link href={`/dashboard/admin/customers/${id}/subscriptions`} className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold uppercase text-primary-foreground">Subscriptions</Link>
          <Link href={`/dashboard/admin/customers/${id}/payments`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Payments</Link>
          <Link href={`/dashboard/admin/customers/${id}/wallets`} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">Wallet</Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Subscriptions" value={total} icon={CreditCard} accent="top" />
        <StatCard label="Active" value={active} variant="success" icon={CheckCircle} accent="top" />
        <StatCard label="Paused" value={paused} variant="warning" icon={PauseCircle} accent="top" />
        <StatCard label="Expired / Cancelled" value={expired} variant="danger" icon={XCircle} accent="top" />
      </div>

      <div className="mt-6">
        <DataTable
          columns={subscriptionColumns}
          data={subscriptions}
          isLoading={isLoading}
          pageSize={subscriptions.length || 10}
          enableSearch={false}
          enableColumnToggle={false}
          emptyMessage="No subscriptions for this customer."
        />
      </div>
    </div>
  );
}
