"use client";

import { useState } from "react";
import { Repeat, CreditCard, CheckCircle, PauseCircle, XCircle, Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTable } from "@/components/common/table";
import { DataTableColumnHeader } from "@/components/common/table";
import type { ColumnDef } from "@tanstack/react-table";
import { SubscriptionStatusBadge } from "@/components/dashboard/admin/customers/subscriptions/subscription-status-badge";
import { CustomerSearch } from "@/components/dashboard/admin/customers/common/customer-search";
import {
  useAdminCustomerSubscriptions,
  useAdminCustomer,
} from "@/hooks/use-admin-customers";
import type { AdminSubscription, AdminCustomer } from "@/types/admin";

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
    accessorKey: "autoRenew",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Auto Renew" />,
    cell: ({ row }) => (
      <span className={`text-sm font-bold ${row.original.autoRenew ? "text-success" : "text-muted-foreground"}`}>
        {row.original.autoRenew ? "Yes" : "No"}
      </span>
    ),
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

export default function SubscriptionsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const { data: customerDetail } = useAdminCustomer(selectedCustomer?.id ?? "");
  const { data, isLoading } = useAdminCustomerSubscriptions(
    selectedCustomer?.id ?? "",
    { page: 1, limit: 50 },
  );

  const subscriptions = data?.items ?? [];
  const total = subscriptions.length;
  const active = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const paused = subscriptions.filter((s) => s.status === "PAUSED").length;
  const expired = subscriptions.filter(
    (s) => s.status === "EXPIRED" || s.status === "CANCELLED",
  ).length;

  return (
    <div>
      <PageHeader
        title="Subscription Management"
        description="View and manage customer meal subscriptions."
        icon={Repeat}
      />
      <div className="mt-6">
        <CustomerSearch
          selectedCustomer={selectedCustomer}
          onSelect={setSelectedCustomer}
          placeholder="Search customer to view their subscriptions..."
        />
      </div>
      {!selectedCustomer ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <Search className="size-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-fraunces text-lg font-bold text-foreground">Select a Customer</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Search for a customer above to view their subscription plans, status, and payment history.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        </>
      )}
    </div>
  );
}
