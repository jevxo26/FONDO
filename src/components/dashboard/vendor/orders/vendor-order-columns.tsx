import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { getOrderStatusBadge } from "@/data/vendor-orders";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import type { VendorOrderListItem } from "@/store/api/slices/vendor-orders-api";

const paymentBadgeMap: Record<string, { label: string; className: string }> = {
  COMPLETED: { label: "Paid", className: "bg-success/10 text-success ring-success/20" },
  PENDING: { label: "Pending", className: "bg-warning/10 text-warning ring-warning/20" },
  REFUNDED: { label: "Refunded", className: "bg-muted text-muted-foreground ring-muted-foreground/20" },
  PARTIALLY_REFUNDED: { label: "Partial Refund", className: "bg-warning/10 text-warning ring-warning/20" },
};

export const vendorOrderColumns: ColumnDef<VendorOrderListItem>[] = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order #" />,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-sm">{row.original.orderNumber}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.placedAt ? format(new Date(row.original.placedAt), "MMM d, h:mm a") : ""}
        </span>
      </div>
    ),
  },
  {
    id: "customer",
    accessorKey: "customer.firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      const c = row.original.customer;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{c.firstName} {c.lastName}</span>
        </div>
      );
    },
  },
  {
    id: "items",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Items" />,
    cell: ({ row }) => {
      const items = row.original.items;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">{items.length} items</span>
          <span className="text-xs text-muted-foreground truncate max-w-[180px]">
            {items.map((i) => i.food?.name).join(", ")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => (
      <span className="font-fraunces text-lg font-bold tracking-tight text-foreground">
        ৳{Number(row.original.totalAmount).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const badge = getOrderStatusBadge(row.original.orderStatus);
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
    cell: ({ row }) => {
      const badge = paymentBadgeMap[row.original.paymentStatus] ?? paymentBadgeMap.PENDING;
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "placedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Placed" />,
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.placedAt ? format(new Date(row.original.placedAt), "MMM d, h:mm a") : ""}
      </span>
    ),
  },
];
