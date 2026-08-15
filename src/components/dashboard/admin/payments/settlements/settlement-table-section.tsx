"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { settlementColumns } from "./settlement-columns";
import { Send } from "lucide-react";
import type { VendorSettlement } from "@/types/wallet";

interface SettlementTableSectionProps {
  data: VendorSettlement[];
  isLoading?: boolean;
  onProcess: (settlement: VendorSettlement) => void;
}

const statusFilter: FacetedFilter = {
  columnId: "paymentStatus",
  title: "Status",
  options: [
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Failed", value: "failed" },
  ],
};

export function SettlementTableSection({ data, isLoading, onProcess }: SettlementTableSectionProps) {
  const rowActions: RowAction<VendorSettlement>[] = [
    {
      label: "Process Payment",
      icon: <Send className="size-4" />,
      variant: "default" as const,
      onClick: (row) => onProcess(row),
    },
  ];

  return (
    <DataTable
      columns={settlementColumns}
      data={data}
      isLoading={isLoading}
      pageSize={10}
      filters={[statusFilter]}
      rowActions={rowActions}
      emptyMessage="No settlements found."
    />
  );
}

