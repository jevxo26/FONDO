"use client";

import { Timer, CheckCircle, ChefHat, Package } from "lucide-react";
import type { KitchenOrder } from "@/data/kitchen";
import { KitchenStatusBadge } from "./kitchen-status-badge";

interface KitchenOrderCardProps {
  order: KitchenOrder;
  onStartPrep?: (order: KitchenOrder) => void;
  onMarkReady?: (order: KitchenOrder) => void;
  onMarkPacked?: (order: KitchenOrder) => void;
}

export function KitchenOrderCard({ order, onStartPrep, onMarkReady, onMarkPacked }: KitchenOrderCardProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-foreground">{order.orderNumber}</p>
            <KitchenStatusBadge status={order.status} />
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{order.customerName}</p>
        </div>
        <span className="text-xs text-muted-foreground">{order.mealType}</span>
      </div>
      <div className="mt-4 space-y-2">
        {order.items.slice(0, 4).map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
          </div>
        ))}
        {order.items.length > 4 && (
          <p className="text-xs text-muted-foreground">+{order.items.length - 4} more items</p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Timer className="size-3" />
          Est. {order.estimatedReadyAt}
        </div>
        <div className="flex gap-2">
          {order.status === "QUEUED" && onStartPrep && (
            <button
              onClick={() => onStartPrep(order)}
              className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/20 transition-all hover:bg-primary/20 active:scale-[0.98]"
            >
              <ChefHat className="mr-1 inline size-3" />
              Start Prep
            </button>
          )}
          {order.status === "PREPARING" && onMarkReady && (
            <button
              onClick={() => onMarkReady(order)}
              className="rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold text-success ring-1 ring-success/20 transition-all hover:bg-success/20 active:scale-[0.98]"
            >
              <CheckCircle className="mr-1 inline size-3" />
              Mark Ready
            </button>
          )}
          {order.status === "READY" && onMarkPacked && (
            <button
              onClick={() => onMarkPacked(order)}
              className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-200 transition-all hover:bg-blue-200 active:scale-[0.98] dark:bg-blue-900/40 dark:text-blue-300 dark:ring-blue-800/50 dark:hover:bg-blue-900/60"
            >
              <Package className="mr-1 inline size-3" />
              Mark Packed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
