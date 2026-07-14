"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { performanceColumns } from "./performance-columns";
import type { VendorPerformance } from "@/data/vendors";
import { CheckCircle, Eye, UserX } from "lucide-react";

const rowActions: RowAction<VendorPerformance>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Performance", row.id),
  },
  {
    label: "Suspend Vendor",
    icon: <UserX className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Suspend", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Suspended", value: "SUSPENDED" },
  ],
};

export function PerformanceTableSection({ data }: { data: VendorPerformance[] }) {
  return (
    <DataTable
      columns={performanceColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
