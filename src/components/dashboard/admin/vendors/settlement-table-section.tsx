"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { settlementColumns } from "./settlement-columns";
import type { VendorSettlement } from "@/data/vendors";
import { CheckCircle, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const rowActions: RowAction<VendorSettlement>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Settlement", row.id),
  },
  {
    label: "Download Receipt",
    icon: <Download className="size-4" />,
    onClick: (row) => console.log("Download", row.settlementId),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Settled", value: "Settled" },
    { label: "Processing", value: "Processing" },
    { label: "Flagged", value: "Flagged" },
  ],
};

export function SettlementTableSection({ data }: { data: VendorSettlement[] }) {
  return (
    <DataTable
      columns={settlementColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
      toolbarActions={
        <Button variant="outline" size="sm" className="rounded-full">
          <Download className="size-[18px]" /> Export CSV
        </Button>
      }
    />
  );
}
