import type { OrderStatus } from "@/data/orders";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "bg-warning/10 text-warning ring-warning/20",
  PAYMENT_PENDING: "bg-warning/10 text-warning ring-warning/20",
  CONFIRMED: "bg-primary/10 text-primary ring-primary/20",
  PREPARING: "bg-primary/10 text-primary ring-primary/20",
  READY_FOR_PICKUP: "bg-primary/10 text-primary ring-primary/20",
  PICKED_UP: "bg-primary/10 text-primary ring-primary/20",
  ON_THE_WAY: "bg-primary/10 text-primary ring-primary/20",
  DELIVERED: "bg-success/10 text-success ring-success/20",
  COMPLETED: "bg-success/10 text-success ring-success/20",
  CANCELLED: "bg-destructive/10 text-destructive ring-destructive/20",
  REFUNDED: "bg-muted text-muted-foreground ring-border/40",
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ring-1 ${statusStyles[status]}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
