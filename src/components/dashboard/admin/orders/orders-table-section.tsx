"use client";

import type { FacetedFilter } from "@/components/common/table";
import { DataTable } from "@/components/common/table";
import type { CustomerOrder } from "@/data/orders";
import { CreditCard, ListChecks } from "lucide-react";
import { orderColumns } from "./order-columns";

const orderStatusFilter: FacetedFilter = {
  columnId: "orderStatus",
  title: "Order Status",
  icon: <ListChecks className="size-4" />,
  options: [
    { label: "Pending", value: "PENDING" },
    { label: "Payment Pending", value: "PAYMENT_PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Preparing", value: "PREPARING" },
    { label: "Ready for Pickup", value: "READY_FOR_PICKUP" },
    { label: "Picked Up", value: "PICKED_UP" },
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

interface OrdersTableSectionProps {
  data: CustomerOrder[];
}

export function OrdersTableSection({ data }: OrdersTableSectionProps) {
  return (
    <DataTable
      columns={orderColumns}
      data={data}
      filters={[orderStatusFilter, paymentStatusFilter]}
    />
  );
}
