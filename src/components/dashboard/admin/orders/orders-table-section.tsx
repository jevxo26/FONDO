"use client";

import { useRouter } from "next/navigation";
import type { FacetedFilter, RowAction } from "@/components/common/table";
import { DataTable } from "@/components/common/table";
import type { CustomerOrder } from "@/data/orders";
import { CreditCard, Eye, ListChecks, Truck, XCircle } from "lucide-react";
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
  const router = useRouter();

  const rowActions: RowAction<CustomerOrder>[] = [
    {
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (row) => router.push(`/dashboard/admin/orders/${row.id}`),
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

  return (
    <DataTable
      columns={orderColumns}
      data={data}
      rowActions={rowActions}
      filters={[orderStatusFilter, paymentStatusFilter]}
    />
  );
}
