import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import type { Payment } from "@/types/payment";

const statusBadgeMap: Record<string, { label: string; className: string }> = {
  COMPLETED: { label: "Completed", className: "bg-success/10 text-success ring-success/20" },
  PENDING: { label: "Pending", className: "bg-warning/10 text-warning ring-warning/20" },
  PROCESSING: { label: "Processing", className: "bg-primary/10 text-primary ring-primary/20" },
  FAILED: { label: "Failed", className: "bg-destructive/10 text-destructive ring-destructive/20" },
  CANCELLED: { label: "Cancelled", className: "bg-muted text-muted-foreground ring-muted-foreground/20" },
  REFUNDED: { label: "Refunded", className: "bg-muted text-muted-foreground ring-muted-foreground/20" },
  PARTIALLY_REFUNDED: { label: "Partial Refund", className: "bg-warning/10 text-warning ring-warning/20" },
};

export const paymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "paymentNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment #" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-bold text-foreground">{row.original.paymentNumber}</span>
    ),
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.original.order?.orderNumber ?? row.original.orderId.slice(0, 8)}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">৳{Number(row.original.amount).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const badge = statusBadgeMap[row.original.status] ?? statusBadgeMap.PENDING;
      return <Badge variant="outline" className={`ring-1 ${badge.className}`}>{badge.label}</Badge>;
    },
  },
  {
    accessorKey: "transactionId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.original.transactionId ?? "—"}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString("en-BD")}
      </span>
    ),
  },
];
