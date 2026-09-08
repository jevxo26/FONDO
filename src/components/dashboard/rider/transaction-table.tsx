"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/table/data-table";
import type { WalletTransaction } from "@/data/riders";
import { cn } from "@/lib/utils";

const columns: ColumnDef<WalletTransaction>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => <span className="text-foreground">{row.original.createdAt}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.description}</span>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const t = row.original.type;
      return (
        <span
          className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", {
            "bg-success/10 text-success": t === "CREDIT",
            "bg-destructive/10 text-destructive": t === "DEBIT",
            "bg-warning/10 text-warning":
              t === "WITHDRAWAL",
          })}
        >
          {t}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const t = row.original.type;
      return (
        <span className={cn("font-medium", t === "CREDIT" ? "text-green-600" : "text-red-600")}>
          {t === "CREDIT" ? "+" : "-"}৳{row.original.amount.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "balanceAfter",
    header: "Balance",
    cell: ({ row }) => (
      <span className="text-foreground">৳{row.original.balanceAfter.toLocaleString()}</span>
    ),
  },
];

interface TransactionTableProps {
  data: WalletTransaction[];
  isLoading?: boolean;
}

export function TransactionTable({ data, isLoading }: TransactionTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      pageSize={6}
      enableSearch={false}
      enableColumnToggle={false}
      emptyMessage="No transactions yet."
    />
  );
}
