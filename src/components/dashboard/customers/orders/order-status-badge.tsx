import type { OrderStatus } from "@/data/orders";
import { cn } from "@/lib/utils";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "bg-muted text-muted-foreground",
  PAYMENT_PENDING: "bg-muted text-muted-foreground",
  CONFIRMED: "bg-primary/10 text-primary",
  PREPARING: "bg-primary/20 text-primary",
  READY_FOR_PICKUP: "bg-primary text-primary-foreground",
  PICKED_UP: "bg-primary text-primary-foreground",
  ON_THE_WAY: "bg-primary text-primary-foreground",
  DELIVERED: "bg-success/10 text-success",
  COMPLETED: "bg-success/10 text-success",
  CANCELLED: "bg-destructive/10 text-destructive",
  REFUNDED: "bg-muted text-muted-foreground",
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
        statusStyles[status],
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
