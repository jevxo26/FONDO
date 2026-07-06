import type { OrderStatus } from "@/data/orders";
import { cn } from "@/lib/utils";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  PAYMENT_PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  PREPARING: "bg-blue-100 text-blue-800 border-blue-200",
  READY_FOR_PICKUP: "bg-blue-100 text-blue-800 border-blue-200",
  PICKED_UP: "bg-blue-100 text-blue-800 border-blue-200",
  ON_THE_WAY: "bg-blue-100 text-blue-800 border-blue-200",
  DELIVERED: "bg-green-100 text-green-800 border-green-200",
  COMPLETED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
  REFUNDED: "bg-gray-100 text-gray-800 border-gray-200",
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
        statusStyles[status],
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
