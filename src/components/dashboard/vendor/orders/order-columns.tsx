// src/components/dashboard/vendor/orders/order-columns.tsx
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { type VendorOrder } from "@/types/vendor";
import { getOrderStatusBadge } from "@/data/vendor-orders";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";

export const orderColumns: ColumnDef<VendorOrder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="h-4 w-4 rounded border-border accent-primary"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="h-4 w-4 rounded border-border accent-primary"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order #" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-sm">{order.orderNumber}</span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(order.createdAt), "MMM d, h:mm a")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{order.customerName}</span>
          <span className="text-xs text-muted-foreground">{order.customerPhone}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">{order.totalItems} items</span>
          <span className="text-xs text-muted-foreground">
            {order.items.map((item) => item.name).join(", ")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number;
      return (
        <span className="font-fraunces text-lg font-bold tracking-tight text-foreground">
          ৳{amount}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as VendorOrder["status"];
      const badge = getOrderStatusBadge(status);
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as VendorOrder["paymentStatus"];
      const variants: Record<string, { label: string; className: string }> = {
        PAID: { label: "Paid", className: "bg-success/10 text-success ring-success/20" },
        PENDING: { label: "Pending", className: "bg-warning/10 text-warning ring-warning/20" },
        REFUNDED: { label: "Refunded", className: "bg-muted text-muted-foreground ring-muted-foreground/20" },
      };
      const badge = variants[status];
      return (
        <Badge variant="outline" className={`ring-1 ${badge.className}`}>
          {badge.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "deliveryDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">{format(new Date(order.deliveryDate), "MMM d")}</span>
          <span className="text-xs text-muted-foreground">{order.deliverySlot}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <span className="text-sm">
          {format(new Date(order.createdAt), "MMM d, h:mm a")}
        </span>
      );
    },
  },
];