"use client";

import { Users, Download } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { CustomerReportSummaryCards } from "@/components/dashboard/admin/reports/customers/customer-report-summary-cards";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/table";
import { DataTableColumnHeader } from "@/components/common/table";
import { StatusDotBadge } from "@/components/dashboard/admin/reports/report-badges";
import { useAdminCustomers } from "@/hooks/use-admin-customers";
import type { AdminCustomer } from "@/types/admin";
import type { ColumnDef } from "@tanstack/react-table";

function getSegment(c: AdminCustomer): string {
  if (c.totalOrders === 0) return "NEW";
  if (c.lastOrderDate) {
    const daysSince = Math.floor(
      (Date.now() - new Date(c.lastOrderDate).getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysSince <= 7) return "ACTIVE";
    if (daysSince <= 30) return "AT_RISK";
    return "CHURNED";
  }
  return "NEW";
}

const avgOrderValue = (c: AdminCustomer) =>
  c.totalOrders > 0 ? Math.round(c.totalSpent / c.totalOrders) : 0;

const lifetimeDays = (c: AdminCustomer) =>
  Math.floor((Date.now() - new Date(c.joinedAt).getTime()) / (1000 * 60 * 60 * 24));

const reportColumns: ColumnDef<AdminCustomer>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.original.fullName}</span>,
  },
  {
    accessorKey: "totalOrders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
    cell: ({ row }) => <span className="font-bold text-foreground">{row.original.totalOrders}</span>,
  },
  {
    accessorKey: "totalSpent",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Spent" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">৳{row.original.totalSpent.toLocaleString()}</span>
    ),
  },
  {
    id: "avgOrderValue",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Avg Order" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">৳{avgOrderValue(row.original).toLocaleString()}</span>
    ),
  },
  {
    id: "segment",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Segment" />,
    cell: ({ row }) => <StatusDotBadge status={getSegment(row.original)} />,
  },
  {
    id: "lifetimeDays",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lifetime" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{lifetimeDays(row.original)} days</span>,
  },
  {
    accessorKey: "lastOrderDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Order" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.lastOrderDate
          ? new Date(row.original.lastOrderDate).toLocaleDateString()
          : "—"}
      </span>
    ),
  },
];

const segmentFilter = {
  columnId: "segment",
  title: "Segment",
  icon: <Users className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "At Risk", value: "AT_RISK" },
    { label: "Churned", value: "CHURNED" },
    { label: "New", value: "NEW" },
  ],
};

export default function ReportsCustomersPage() {
  const { data, isLoading } = useAdminCustomers({ limit: 100 });

  const customers = data?.items ?? [];

  return (
    <div>
      <PageHeader
        title="Customer Report"
        description="Customer acquisition and retention reports."
        icon={Users}
        actions={
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" /> Export
          </Button>
        }
      />
      <div className="mt-8">
        <CustomerReportSummaryCards customers={customers} />
      </div>
      <div className="mt-8">
        <DataTable
          columns={reportColumns}
          data={customers}
          filters={[segmentFilter]}
          isLoading={isLoading}
          emptyMessage="No customer report data available."
        />
      </div>
    </div>
  );
}
