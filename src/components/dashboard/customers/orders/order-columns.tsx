"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { CustomerOrder } from "@/data/orders";
import { DataTableColumnHeader } from "@/components/common/table";
import { OrderStatusBadge } from "@/components/dashboard/customers/orders/order-status-badge";
import { ChevronRight } from "lucide-react";

export const orderColumns: ColumnDef<CustomerOrder>[] = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order #" />
    ),
    cell: ({ row }) => (
      <span className="font-bold text-foreground">{row.original.orderNumber}</span>
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-bold text-foreground">
          {row.original.customerName}
        </p>
        <p className="text-[13px] text-muted-foreground">
          {row.original.customerId}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.items}
      </span>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <span className="font-bold text-foreground">
        ৳{row.original.totalAmount.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <OrderStatusBadge status={row.original.orderStatus} />
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      return (
        <span
          className={`text-[11px] font-bold uppercase ${
            status === "PAID"
              ? "text-success"
              : status === "REFUNDED"
                ? "text-muted-foreground"
                : "text-destructive"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: () => (
      <div className="flex justify-end">
        <button className="flex items-center gap-1 text-[11px] font-bold text-primary transition-all hover:gap-2">
          View Details <ChevronRight className="size-4" />
        </button>
      </div>
    ),
  },
];
