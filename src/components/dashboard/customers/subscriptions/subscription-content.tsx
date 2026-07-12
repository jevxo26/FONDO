"use client";

import type { FacetedFilter, RowAction } from "@/components/common/table";
import { DataTable } from "@/components/common/table";
import { subscriptionColumns } from "@/components/dashboard/customers/subscriptions/subscription-columns";
import { SubscriptionContextCards } from "@/components/dashboard/customers/subscriptions/subscription-context-cards";
import type { Subscription } from "@/data/subscriptions";
import { subscriptions } from "@/data/subscriptions";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { CheckCircle, CreditCard, Eye, Pause, PauseCircle, XCircle } from "lucide-react";

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  options: [
    { label: "Pending", value: "PENDING" },
    { label: "Active", value: "ACTIVE" },
    { label: "Paused", value: "PAUSED" },
    { label: "Frozen", value: "FROZEN" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Expired", value: "EXPIRED" },
    { label: "Cancelled", value: "CANCELLED" },
  ],
};

const packageFilter: FacetedFilter = {
  columnId: "packageName",
  title: "Package",
  options: [
    { label: "7-Day Wellness", value: "7-Day Wellness" },
    { label: "10-Day Balanced", value: "10-Day Balanced" },
    { label: "15-Day High Protein", value: "15-Day High Protein" },
    { label: "Monthly Regular", value: "Monthly Regular" },
    { label: "Monthly Premium", value: "Monthly Premium" },
  ],
};

const rowActions: RowAction<Subscription>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Details", row.id),
  },
  {
    label: "Pause Subscription",
    icon: <Pause className="size-4" />,
    onClick: (row) => console.log("Pause Subscription", row.id),
  },
  {
    label: "Cancel",
    icon: <XCircle className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Cancel", row.id),
  },
];

const total = subscriptions.length;
const active = subscriptions.filter((s) => s.status === "ACTIVE").length;
const paused = subscriptions.filter((s) => s.status === "PAUSED").length;
const expired = subscriptions.filter(
  (s) => s.status === "EXPIRED" || s.status === "CANCELLED",
).length;

export function SubscriptionContent() {
  return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Subscriptions" value={total} icon={CreditCard} accent="bottom" />
        <StatCard label="Active" value={active} variant="success" icon={CheckCircle} accent="bottom" />
        <StatCard label="Paused" value={paused} variant="warning" icon={PauseCircle} accent="bottom" />
        <StatCard label="Expired / Cancelled" value={expired} variant="danger" icon={XCircle} accent="bottom" />
      </div>

      <div className="mt-6">
        <DataTable
          columns={subscriptionColumns}
          data={subscriptions}
          filters={[statusFilter, packageFilter]}
          rowActions={rowActions}
        />
      </div>

      <SubscriptionContextCards />
    </div>
  );
}
