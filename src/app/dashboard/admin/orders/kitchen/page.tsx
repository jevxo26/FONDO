"use client";

import { orders } from "@/data/orders";
import { getOrderDetail } from "@/data/order-detail";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { CookingPot, Timer, Utensils, CheckCircle } from "lucide-react";

export default function KitchenQueuePage() {
  const preparing = orders.filter((o) => o.orderStatus === "PREPARING");
  const queued = orders.filter(
    (o) => o.orderStatus === "CONFIRMED" || o.orderStatus === "PENDING",
  );
  const ready = orders.filter((o) => o.orderStatus === "READY_FOR_PICKUP");

  return (
    <div>
      <PageHeader
        title="Kitchen Queue"
        description="Real-time order queue for kitchen preparation."
        icon={CookingPot}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-warning/10 via-card to-warning/[0.04] p-5 shadow-[var(--shadow-card)]">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Queued</p>
          <p className="mt-1 font-fraunces text-[30px] font-bold text-warning">{queued.length}</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-5 shadow-[var(--shadow-card)]">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">In Prep</p>
          <p className="mt-1 font-fraunces text-[30px] font-bold text-primary">{preparing.length}</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-success/10 via-card to-success/[0.04] p-5 shadow-[var(--shadow-card)]">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Ready</p>
          <p className="mt-1 font-fraunces text-[30px] font-bold text-success">{ready.length}</p>
        </div>
      </div>

      {preparing.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-fraunces text-lg font-bold text-foreground">In Preparation</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {preparing.map((order) => {
              const detail = getOrderDetail(order.id);
              return (
                <div
                  key={order.id}
                  className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-5 shadow-[var(--shadow-card)]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-foreground">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase text-primary ring-1 ring-primary/20">
                      <Timer className="size-3" />
                      Prep
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {detail.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-mono text-foreground">৳{item.price}</span>
                      </div>
                    ))}
                    {detail.items.length > 3 && (
                      <p className="text-xs text-muted-foreground">+{detail.items.length - 3} more items</p>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Utensils className="size-3" />
                      {detail.vendor}
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold text-success ring-1 ring-success/20 transition-all duration-300 hover:bg-success/20 active:scale-[0.98]">
                        <CheckCircle className="mr-1 inline size-3" />
                        Mark Ready
                      </button>
                      <button className="rounded-full bg-warning/10 px-3 py-1 text-[11px] font-semibold text-warning ring-1 ring-warning/20 transition-all duration-300 hover:bg-warning/20 active:scale-[0.98]">
                        <Timer className="mr-1 inline size-3" />
                        Add Time
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {queued.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-fraunces text-lg font-bold text-foreground">Queued (Next to Prepare)</h2>
          <div className="space-y-2">
            {queued.slice(0, 5).map((order, i) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-2xl border border-border/40 bg-card px-5 py-3 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{order.items} items</span>
              </div>
            ))}
            {queued.length > 5 && (
              <p className="text-center text-xs text-muted-foreground">+{queued.length - 5} more</p>
            )}
          </div>
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
