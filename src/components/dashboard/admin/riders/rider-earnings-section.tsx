"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { riderEarningsColumns } from "./rider-earnings-columns";
import type { RiderEarning } from "@/data/riders";
import { DollarSign, Eye, Wallet } from "lucide-react";

const rowActions: RowAction<RiderEarning>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Earning", row.id),
  },
  {
    label: "Process Payment",
    icon: <DollarSign className="size-4" />,
    onClick: (row) => console.log("Process Payment", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Payment",
  icon: <Wallet className="size-4" />,
  options: [
    { label: "Paid", value: "PAID" },
    { label: "Processing", value: "PROCESSING" },
    { label: "Pending", value: "PENDING" },
  ],
};

export function RiderEarningsSection({ data }: { data: RiderEarning[] }) {
  return (
    <DataTable
      columns={riderEarningsColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
