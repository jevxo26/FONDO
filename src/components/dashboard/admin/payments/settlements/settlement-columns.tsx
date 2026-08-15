import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import type { VendorSettlement } from "@/types/wallet";

const statusBadgeMap: Record<string, { label: string; className: string }> = {
  paid: { label: "Paid", className: "bg-success/10 text-success ring-success/20" },
  pending: { label: "Pending", className: "bg-warning/10 text-warning ring-warning/20" },
  processing: { label: "Processing", className: "bg-primary/10 text-primary ring-primary/20" },
  failed: { label: "Failed", className: "bg-destructive/10 text-destructive ring-destructive/20" },
};

export const settlementColumns: ColumnDef<VendorSettlement>[] = [
  {
    accessorKey: "settlementNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Settlement #" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-bold text-foreground">{row.original.settlementNumber}</span>
    ),
  },
  {
    id: "vendor",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
    cell: ({ row }) => (
      <span className="text-sm font-bold text-foreground">{row.original.vendor?.businessName ?? "Unknown"}</span>
    ),
  },
  {
    accessorKey: "grossAmount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gross" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">৳{Number(row.original.grossAmount).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "totalCommission",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Commission" />,
    cell: ({ row }) => (
      <span className="text-sm text-destructive">-৳{Number(row.original.totalCommission).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "netAmount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Net" />,
    cell: ({ row }) => (
      <span className="font-bold text-success">৳{Number(row.original.netAmount).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "totalOrders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.totalOrders}</span>,
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const badge = statusBadgeMap[row.original.paymentStatus] ?? statusBadgeMap.pending;
      return <Badge variant="outline" className={`ring-1 ${badge.className}`}>{badge.label}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{new Date(row.original.createdAt).toLocaleDateString("en-BD")}</span>
    ),
  },
];
