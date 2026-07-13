"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { refundColumns } from "./refund-columns";
import type { RefundRequest } from "@/data/payments";
import { CheckCircle, Eye, ThumbsUp, XCircle } from "lucide-react";

const rowActions: RowAction<RefundRequest>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Refund", row.id),
  },
  {
    label: "Approve",
    icon: <ThumbsUp className="size-4" />,
    onClick: (row) => console.log("Approve Refund", row.id),
  },
  {
    label: "Reject",
    icon: <XCircle className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Reject Refund", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <CheckCircle className="size-4" />,
  options: [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Processed", value: "PROCESSED" },
    { label: "Rejected", value: "REJECTED" },
  ],
};

export function RefundTableSection({ data }: { data: RefundRequest[] }) {
  return (
    <DataTable
      columns={refundColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
