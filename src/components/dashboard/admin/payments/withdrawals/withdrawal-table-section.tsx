"use client";

import { DataTable } from "@/components/common/table";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { withdrawalColumns } from "./withdrawal-columns";
import { CheckCheck, ListChecks, X } from "lucide-react";
import type { AdminWithdrawListItem } from "@/store/api/slices/wallet-api";

interface WithdrawalTableSectionProps {
  data: AdminWithdrawListItem[];
  isLoading?: boolean;
  onApprove: (item: AdminWithdrawListItem) => void;
  onReject: (item: AdminWithdrawListItem) => void;
}

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <ListChecks className="size-4" />,
  options: [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ],
};

export function WithdrawalTableSection({
  data,
  isLoading,
  onApprove,
  onReject,
}: WithdrawalTableSectionProps) {
  const rowActions: RowAction<AdminWithdrawListItem>[] = [
    {
      label: "Approve",
      icon: <CheckCheck className="size-4" />,
      onClick: (item) => {
        if (item.status === "pending") onApprove(item);
      },
    },
    {
      label: "Reject",
      icon: <X className="size-4" />,
      onClick: (item) => {
        if (item.status === "pending") onReject(item);
      },
    },
  ];

  return (
    <DataTable
      columns={withdrawalColumns}
      data={data}
      isLoading={isLoading}
      pageSize={10}
      filters={[statusFilter]}
      rowActions={rowActions}
      emptyMessage="No withdrawal requests found."
    />
  );
}
