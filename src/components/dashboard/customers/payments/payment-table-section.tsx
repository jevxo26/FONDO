"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { paymentColumns } from "./payment-columns";
import type { PaymentTransaction } from "@/data/payments";
import { Eye, Undo2 } from "lucide-react";

const rowActions: RowAction<PaymentTransaction>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Details", row.id),
  },
  {
    label: "Issue Refund",
    icon: <Undo2 className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Issue Refund", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  options: [
    { label: "Success", value: "SUCCESS" },
    { label: "Failed", value: "FAILED" },
    { label: "Refunded", value: "REFUNDED" },
  ],
};

export function PaymentTableSection({ data }: { data: PaymentTransaction[] }) {
  return (
    <DataTable
      columns={paymentColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
