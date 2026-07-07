"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { walletColumns } from "./wallet-columns";
import type { WalletTransaction } from "@/data/wallets";
import { Eye, Ban, Plus } from "lucide-react";

const rowActions: RowAction<WalletTransaction>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Details", row.id),
  },
  {
    label: "Adjust Balance",
    icon: <Plus className="size-4" />,
    onClick: (row) => console.log("Adjust Balance", row.id),
  },
  {
    label: "Freeze Wallet",
    icon: <Ban className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Freeze Wallet", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  options: [
    { label: "Completed", value: "COMPLETED" },
    { label: "Pending", value: "PENDING" },
    { label: "Failed", value: "FAILED" },
    { label: "Reversed", value: "REVERSED" },
  ],
};

export function WalletTableSection({ data }: { data: WalletTransaction[] }) {
  return (
    <DataTable
      columns={walletColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
