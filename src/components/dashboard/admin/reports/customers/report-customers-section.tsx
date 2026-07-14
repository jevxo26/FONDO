"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { customerReportColumns } from "./report-customers-columns";
import type { CustomerReportEntry } from "@/data/reports";
import { CheckCircle, Eye, Users } from "lucide-react";

const rowActions: RowAction<CustomerReportEntry>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Customer Report", row.id),
  },
];

const segmentFilter: FacetedFilter = {
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

export function ReportCustomersSection({ data }: { data: CustomerReportEntry[] }) {
  return (
    <DataTable
      columns={customerReportColumns}
      data={data}
      rowActions={rowActions}
      filters={[segmentFilter]}
    />
  );
}
