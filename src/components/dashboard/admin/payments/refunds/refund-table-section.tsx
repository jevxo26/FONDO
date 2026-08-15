"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { refundColumns } from "./refund-columns";
import { Undo2 } from "lucide-react";
import type { Payment } from "@/types/payment";

interface RefundTableSectionProps {
  data: Payment[];
  isLoading?: boolean;
  onOpenRefund: (payment: Payment) => void;
}

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  options: [
    { label: "Completed", value: "COMPLETED" },
    { label: "Pending", value: "PENDING" },
    { label: "Refunded", value: "REFUNDED" },
    { label: "Failed", value: "FAILED" },
  ],
};

export function RefundTableSection({ data, isLoading, onOpenRefund }: RefundTableSectionProps) {
  const rowActions: RowAction<Payment>[] = [
    {
      label: "Issue Refund",
      icon: <Undo2 className="size-4" />,
      variant: "destructive" as const,
      onClick: (row) => onOpenRefund(row),
    },
  ];

  return (
    <DataTable
      columns={refundColumns}
      data={data}
      isLoading={isLoading}
      pageSize={10}
      rowActions={rowActions}
      filters={[statusFilter]}
      emptyMessage="No payments found."
    />
  );
}
