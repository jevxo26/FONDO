"use client";

import { DataTable } from "@/components/common/table";
import type { FacetedFilter } from "@/components/common/table";
import { paymentColumns } from "./payment-columns";
import { CreditCard } from "lucide-react";
import type { Payment } from "@/types/payment";

interface PaymentTableSectionProps {
  data: Payment[];
  isLoading?: boolean;
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

export function PaymentTableSection({ data, isLoading }: PaymentTableSectionProps) {
  return (
    <DataTable
      columns={paymentColumns}
      data={data}
      isLoading={isLoading}
      pageSize={10}
      filters={[statusFilter]}
      emptyMessage="No payments found."
    />
  );
}

