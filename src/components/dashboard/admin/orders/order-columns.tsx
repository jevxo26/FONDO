"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import type { CustomerOrder } from "@/data/orders";
import { DataTableColumnHeader } from "@/components/common/table";
import { OrderStatusBadge } from "@/components/dashboard/admin/customers/orders/order-status-badge";
import { useUpdateOrderStatusMutation } from "@/store/api/slices/orders-api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, Eye, Loader2, MoreHorizontal, Truck, XCircle } from "lucide-react";

function ConfirmButton({ orderId, status }: { orderId: string; status: string }) {
  const [confirmOrder, { isLoading }] = useUpdateOrderStatusMutation();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        confirmOrder({ orderId, status })
          .unwrap()
          .then(() => toast.success("Order confirmed"))
          .catch(() => toast.error("Failed to confirm order"));
      }}
      disabled={isLoading}
      className="inline-flex items-center gap-1.5 rounded-lg bg-success/10 px-3 py-1.5 text-[13px] font-semibold text-success transition-all duration-200 hover:bg-success/20 active:scale-[0.97] disabled:opacity-50"
    >
      {isLoading ? <Loader2 className="size-3.5 animate-spin" /> : <CheckCircle className="size-3.5" />}
      Accept
    </button>
  );
}

function RowDropdown({ row }: { row: CustomerOrder }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuItem onClick={() => router.push(`/dashboard/admin/orders/${row.id}`)}>
          <Eye className="size-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Assign Rider", row.id)}>
          <Truck className="size-4" />
          Assign Rider
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={() => console.log("Cancel Order", row.id)}>
          <XCircle className="size-4" />
          Cancel Order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const orderColumns: ColumnDef<CustomerOrder>[] = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order #" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">{row.original.orderNumber}</span>
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-bold text-foreground">{row.original.customerName}</p>
        <p className="text-[13px] text-muted-foreground">{row.original.customerId}</p>
      </div>
    ),
  },
  {
    accessorKey: "items",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Items" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.items}</span>,
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => (
      <span className="font-bold text-foreground">
        ৳{row.original.totalAmount.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "orderStatus",
    filterFn: "equalsString",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <OrderStatusBadge status={row.original.orderStatus} />,
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
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
    accessorKey: "placedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.placedAt}</span>
    ),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {row.original.orderStatus === "PENDING" && (
          <ConfirmButton orderId={row.original.id} status="CONFIRMED" />
        )}
        <RowDropdown row={row.original} />
      </div>
    ),
  },
];
