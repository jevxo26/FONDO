"use client";

import type { FacetedFilter, RowAction } from "@/components/common/table";
import { DataTable } from "@/components/common/table";
import type { CustomerOrder } from "@/data/orders";
import { CreditCard, Eye, Truck, XCircle } from "lucide-react";
import { orderColumns } from "./order-columns";

const rowActions: RowAction<CustomerOrder>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Details", row.id),
  },
  {
    label: "Assign Rider",
    icon: <Truck className="size-4" />,
    onClick: (row) => console.log("Assign Rider", row.id),
  },
  {
    label: "Cancel Order",
    icon: <XCircle className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Cancel Order", row.id),
  },
];

const orderStatusFilter: FacetedFilter = {
  columnId: "orderStatus",
  title: "Order Status",
  icon: <Truck className="size-4" />,
  options: [
    { label: "Pending", value: "PENDING" },
    { label: "Preparing", value: "PREPARING" },
    { label: "On the Way", value: "ON_THE_WAY" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Refunded", value: "REFUNDED" },
  ],
};

const paymentStatusFilter: FacetedFilter = {
  columnId: "paymentStatus",
  title: "Payment",
  icon: <CreditCard className="size-4" />,
  options: [
    { label: "Paid", value: "PAID" },
    { label: "Unpaid", value: "UNPAID" },
    { label: "Refunded", value: "REFUNDED" },
  ],
};

export function OrdersTableSection({ data }: { data: CustomerOrder[] }) {
  return (
    <DataTable
      columns={orderColumns}
      data={data}
      rowActions={rowActions}
      filters={[orderStatusFilter, paymentStatusFilter]}
    />
  );
}
