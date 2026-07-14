"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { revenueColumns } from "./report-revenue-columns";
import type { RevenueEntry } from "@/data/reports";
import { Banknote, CheckCircle, Eye, Landmark } from "lucide-react";

const rowActions: RowAction<RevenueEntry>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Revenue Entry", row.id),
  },
];

const sourceFilter: FacetedFilter = {
  columnId: "source",
  title: "Source",
  icon: <Landmark className="size-4" />,
  options: [
    { label: "Platform Fee", value: "PLATFORM_FEE" },
    { label: "Delivery Fee", value: "DELIVERY_FEE" },
    { label: "Commission", value: "COMMISSION" },
    { label: "Subscription", value: "SUBSCRIPTION" },
    { label: "Advertising", value: "ADVERTISING" },
  ],
};

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Settled", value: "SETTLED" },
    { label: "Pending", value: "PENDING" },
    { label: "Disputed", value: "DISPUTED" },
  ],
};

export function ReportRevenueSection({ data }: { data: RevenueEntry[] }) {
  return (
    <DataTable
      columns={revenueColumns}
      data={data}
      rowActions={rowActions}
      filters={[sourceFilter, statusFilter]}
    />
  );
}
