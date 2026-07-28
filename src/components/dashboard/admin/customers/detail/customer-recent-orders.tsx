"use client";

import Link from "next/link";
import { OrderStatusBadge } from "@/components/dashboard/admin/customers/orders/order-status-badge";

interface RecentOrder {
  id: string;
  orderNumber: string;
  items: number;
  placedAt: string | null;
  totalAmount: number;
  orderStatus: string;
}

interface CustomerRecentOrdersProps {
  orders: RecentOrder[];
  customerId: string;
}

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CustomerRecentOrders({ orders, customerId }: CustomerRecentOrdersProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold text-foreground">Recent Orders</h3>
          <Link
            href={`/dashboard/admin/customers/${customerId}/orders`}
            className="text-xs font-bold text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3 transition-colors hover:bg-muted"
            >
              <div>
                <p className="text-sm font-bold text-foreground">{order.orderNumber}</p>
                <p className="text-xs text-muted-foreground">
                  {order.items} items · {formatDate(order.placedAt)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-foreground">৳{order.totalAmount.toLocaleString()}</span>
                <OrderStatusBadge status={order.orderStatus as never} />
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
