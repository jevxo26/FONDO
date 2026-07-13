"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { settlementColumns } from "./settlement-columns";
import type { Settlement } from "@/data/payments";
import { Banknote, CheckCircle, Eye, Send } from "lucide-react";

const rowActions: RowAction<Settlement>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Settlement", row.id),
  },
  {
    label: "Process Payment",
    icon: <Send className="size-4" />,
    onClick: (row) => console.log("Process Payment", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Pending", value: "PENDING" },
    { label: "Processing", value: "PROCESSING" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Failed", value: "FAILED" },
  ],
};

export function SettlementTableSection({ data }: { data: Settlement[] }) {
  return (
    <DataTable
      columns={settlementColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
      toolbarActions={
        <span className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
          <Banknote className="size-3.5" />
          Total: ৳{data.reduce((s, d) => s + d.netAmount, 0).toLocaleString()}
        </span>
      }
    />
  );
}
