"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChefHat, CookingPot } from "lucide-react";
import { kitchenOrders, type KitchenOrder } from "@/data/kitchen";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { KitchenSummaryCards } from "@/components/dashboard/kitchen/kitchen-summary-cards";
import { KitchenOrderCard } from "@/components/dashboard/kitchen/kitchen-order-card";

export default function KitchenQueuePage() {
  const [orders, setOrders] = useState(kitchenOrders);

  const updateStatus = (id: string, status: KitchenOrder["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const queued = orders.filter((o) => o.status === "QUEUED");
  const preparing = orders.filter((o) => o.status === "PREPARING");
  const ready = orders.filter((o) => o.status === "READY" || o.status === "PACKED");

  return (
    <div>
      <PageHeader title="Today's Kitchen Queue" description="View and manage today's meal preparation queue." icon={ChefHat} />
      <KitchenSummaryCards queued={queued.length} preparing={preparing.length} ready={ready.length} total={orders.length} />

      {preparing.length > 0 && (
        <div className="mt-10">
          <h2 className="font-fraunces text-lg font-semibold text-foreground">In Preparation</h2>
          <p className="text-sm text-muted-foreground">{preparing.length} orders currently being cooked</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {preparing.map((order) => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                onMarkReady={(o) => { updateStatus(o.id, "READY"); toast.success(`${o.orderNumber} marked ready`); }}
              />
            ))}
          </div>
        </div>
      )}

      {queued.length > 0 && (
        <div className="mt-10">
          <h2 className="font-fraunces text-lg font-semibold text-foreground">Queued (Next to Prepare)</h2>
          <p className="text-sm text-muted-foreground">{queued.length} orders waiting</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {queued.slice(0, 6).map((order) => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                onStartPrep={(o) => { updateStatus(o.id, "PREPARING"); toast.success(`${o.orderNumber} started`); }}
              />
            ))}
          </div>
          {queued.length > 6 && (
            <p className="mt-2 text-center text-xs text-muted-foreground">+{queued.length - 6} more queued orders</p>
          )}
        </div>
      )}

      {preparing.length === 0 && queued.length === 0 && (
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <CookingPot className="size-12 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No orders in the kitchen queue.</p>
        </div>
      )}
    </div>
  );
}
