"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { riderPerformanceColumns } from "./rider-performance-columns";
import type { RiderPerformanceData } from "@/data/riders";
import { BarChart3, CheckCircle, Eye, UserX } from "lucide-react";

const rowActions: RowAction<RiderPerformanceData>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Performance", row.id),
  },
  {
    label: "Deactivate",
    icon: <UserX className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Deactivate Rider", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Offline", value: "OFFLINE" },
  ],
};

export function RiderPerformanceSection({ data }: { data: RiderPerformanceData[] }) {
  return (
    <DataTable
      columns={riderPerformanceColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
