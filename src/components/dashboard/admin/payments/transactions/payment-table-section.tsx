"use client";

import { DataTable } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { paymentColumns } from "./payment-columns";
import { CreditCard, Eye, Settings2 } from "lucide-react";
import type { Payment } from "@/types/payment";

interface PaymentTableSectionProps {
  data: Payment[];
  isLoading?: boolean;
  onView: (payment: Payment) => void;
  onAdjust: (payment: Payment) => void;
}

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CreditCard className="size-4" />,
  options: [
    { label: "Completed", value: "COMPLETED" },
    { label: "Pending", value: "PENDING" },
    { label: "Failed", value: "FAILED" },
    { label: "Refunded", value: "REFUNDED" },
  ],
};

export function PaymentTableSection({ data, isLoading, onView, onAdjust }: PaymentTableSectionProps) {
  const rowActions: RowAction<Payment>[] = [
    {
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: onView,
    },
    {
      label: "Adjust",
      icon: <Settings2 className="size-4" />,
      onClick: onAdjust,
    },
  ];

  return (
    <DataTable
      columns={paymentColumns}
      data={data}
      isLoading={isLoading}
      pageSize={10}
      filters={[statusFilter]}
      rowActions={rowActions}
      emptyMessage="No payments found."
    />
  );
}

