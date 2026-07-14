"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { subscriptionReportColumns } from "./report-subscriptions-columns";
import type { SubscriptionReportEntry } from "@/data/reports";
import { CheckCircle, Eye, Repeat } from "lucide-react";

const rowActions: RowAction<SubscriptionReportEntry>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Subscription Report", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Expired", value: "EXPIRED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Renewed", value: "RENEWED" },
  ],
};

export function ReportSubscriptionsSection({ data }: { data: SubscriptionReportEntry[] }) {
  return (
    <DataTable
      columns={subscriptionReportColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
