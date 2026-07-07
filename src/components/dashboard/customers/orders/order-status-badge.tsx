import type { OrderStatus } from "@/data/orders";
import { Badge } from "@/components/ui/badge";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "border-amber-200 bg-amber-100 text-amber-800",
  PAYMENT_PENDING: "border-amber-200 bg-amber-100 text-amber-800",
  CONFIRMED: "border-blue-200 bg-blue-100 text-blue-800",
  PREPARING: "border-blue-200 bg-blue-100 text-blue-800",
  READY_FOR_PICKUP: "border-blue-200 bg-blue-100 text-blue-800",
  PICKED_UP: "border-blue-200 bg-blue-100 text-blue-800",
  ON_THE_WAY: "border-blue-200 bg-blue-100 text-blue-800",
  DELIVERED: "border-green-200 bg-green-100 text-green-800",
  COMPLETED: "border-green-200 bg-green-100 text-green-800",
  CANCELLED: "border-red-200 bg-red-100 text-red-800",
  REFUNDED: "border-gray-200 bg-gray-100 text-gray-800",
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${statusStyles[status]}`}
    >
      {status.replace(/_/g, " ")}
    </Badge>
  );
}
