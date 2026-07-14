"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { riderReportColumns } from "./report-riders-columns";
import type { RiderReportEntry } from "@/data/reports";
import { CheckCircle, Eye, Truck } from "lucide-react";

const rowActions: RowAction<RiderReportEntry>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Rider Report", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ],
};

export function ReportRidersSection({ data }: { data: RiderReportEntry[] }) {
  return (
    <DataTable
      columns={riderReportColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
