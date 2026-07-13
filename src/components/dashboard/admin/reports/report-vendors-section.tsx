"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { vendorReportColumns } from "./report-vendors-columns";
import type { VendorReportEntry } from "@/data/reports";
import { CheckCircle, Eye, Store } from "lucide-react";

const rowActions: RowAction<VendorReportEntry>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Vendor Report", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Suspended", value: "SUSPENDED" },
    { label: "Pending", value: "PENDING" },
  ],
};

export function ReportVendorsSection({ data }: { data: VendorReportEntry[] }) {
  return (
    <DataTable
      columns={vendorReportColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
