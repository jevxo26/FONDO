"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { salesColumns } from "./report-sales-columns";
import type { SalesEntry } from "@/data/reports";
import { CheckCircle, Eye, Store, TrendingUp } from "lucide-react";

const rowActions: RowAction<SalesEntry>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Sales Entry", row.id),
  },
];

const channelFilter: FacetedFilter = {
  columnId: "channel",
  title: "Channel",
  icon: <Store className="size-4" />,
  options: [
    { label: "Online", value: "ONLINE" },
    { label: "Dine-In", value: "DINE_IN" },
    { label: "Catering", value: "CATERING" },
  ],
};

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Completed", value: "COMPLETED" },
    { label: "Pending", value: "PENDING" },
    { label: "Cancelled", value: "CANCELLED" },
  ],
};

export function ReportSalesSection({ data }: { data: SalesEntry[] }) {
  return (
    <DataTable
      columns={salesColumns}
      data={data}
      rowActions={rowActions}
      filters={[channelFilter, statusFilter]}
    />
  );
}
