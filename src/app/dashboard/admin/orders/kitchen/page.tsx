"use client";

import { CookingPot, Timer, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { useGetAllAdminOrdersQuery } from "@/store/api/slices/admin-customers-api";
import { useUpdateOrderStatus } from "@/store/api/slices/orders-api";

interface AdminOrder {
  id: string;
  orderNumber: string;
  orderStatus: string;
  totalAmount: number;
  customer: { firstName: string; lastName: string };
  items: Array<{ id: string; quantity: number; totalPrice: number; food: { name: string } }>;
}

const statCard = (label: string, value: number, color: string, text: string) => (
  <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-5 shadow-[var(--shadow-card)]">
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    <p className={`mt-1 font-heading text-[30px] font-bold ${text}`}>{value}</p>
  </div>
);

export default function AdminKitchenQueuePage() {
  const { data, isLoading } = useGetAllAdminOrdersQuery();
  const updateStatus = useUpdateOrderStatus();
  const orders = (data ?? []) as AdminOrder[];

  const preparing = orders.filter((o) => o.orderStatus === "PREPARING");
  const queued = orders.filter((o) => o.orderStatus === "CONFIRMED" || o.orderStatus === "PENDING");
  const ready = orders.filter((o) => o.orderStatus === "READY_FOR_PICKUP");

  const handleMarkReady = (orderId: string, orderNumber: string) => {
    if (updateStatus.isPending) return;
    updateStatus.mutate(
      { orderId, status: "READY_FOR_PICKUP" },
      { onSuccess: () => toast.success(`${orderNumber} marked ready`), onError: () => toast.error("Failed") },
    );
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Kitchen Queue" description="Real-time order queue for kitchen preparation." icon={CookingPot} />
        <div className="mt-12 flex justify-center"><Loader2 className="size-8 animate-spin text-primary" /></div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Kitchen Queue" description="Real-time order queue for kitchen preparation." icon={CookingPot} />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {statCard("Queued", queued.length, "warning", "text-warning")}
        {statCard("In Prep", preparing.length, "primary", "text-primary")}
        {statCard("Ready", ready.length, "success", "text-success")}
      </div>

      {preparing.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">In Preparation</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {preparing.map((order) => (
              <div key={order.id} className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-foreground">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.firstName} {order.customer.lastName}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase text-primary ring-1 ring-primary/20">
                    <Timer className="size-3" /> Prep
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.quantity}x {item.food?.name}</span>
                      <span className="font-mono text-foreground">৳{Number(item.totalPrice).toLocaleString()}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && <p className="text-xs text-muted-foreground">+{order.items.length - 3} more</p>}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                  <span className="text-xs text-muted-foreground">Total ৳{Number(order.totalAmount).toLocaleString()}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkReady(order.id, order.orderNumber)}
                    disabled={updateStatus.isPending}
                    className="rounded-full bg-success/10 text-success ring-1 ring-success/20 hover:bg-success/20 active:scale-[0.98]"
                  >
                    <CheckCircle className="mr-1 inline size-3" /> Mark Ready
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {queued.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Queued (Next to Prepare)</h2>
          <div className="space-y-2">
            {queued.slice(0, 5).map((order, i) => (
              <div key={order.id} className="flex items-center justify-between rounded-2xl border border-border/40 bg-card px-5 py-3 shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">{order.customer.firstName} {order.customer.lastName}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{order.items.length} items</span>
              </div>
            ))}
            {queued.length > 5 && <p className="text-center text-xs text-muted-foreground">+{queued.length - 5} more</p>}
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
