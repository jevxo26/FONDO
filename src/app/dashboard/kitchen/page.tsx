"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { ChefHat, CookingPot, Loader2 } from "lucide-react";
import { kitchenOrders as fallbackKitchenOrders, type KitchenOrder } from "@/data/kitchen";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { KitchenSummaryCards } from "@/components/dashboard/kitchen/kitchen-summary-cards";
import { KitchenOrderCard } from "@/components/dashboard/kitchen/kitchen-order-card";
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "@/store/api/slices/orders-api";

export default function KitchenQueuePage() {
  const { data: apiOrders, isLoading } = useGetOrdersQuery();
  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

  const [localOrders, setLocalOrders] = useState<KitchenOrder[] | null>(null);

  const orders: KitchenOrder[] = useMemo(() => {
    if (localOrders) return localOrders;
    if (apiOrders && apiOrders.length > 0) {
      return apiOrders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        customerName: o.deliveryAddress?.receiverName || "Customer",
        customerPhone: o.deliveryAddress?.receiverPhone || "",
        deliveryAddress: `${o.deliveryAddress?.area || ""}, ${o.deliveryAddress?.district || ""}`,
        deliveryTime: "ASAP",
        mealType: "Lunch",
        status:
          o.status === "PREPARING"
            ? "PREPARING"
            : o.status === "READY_FOR_PICKUP"
              ? "READY"
              : "QUEUED",
        items: o.items.map((i) => ({
          name: i.food?.name || "Dish Item",
          quantity: i.quantity,
          variant: i.variant?.name,
          addons: [],
        })),
        createdAt: o.createdAt,
      }));
    }
    return fallbackKitchenOrders;
  }, [apiOrders, localOrders]);

  const handleStatusChange = async (
    id: string,
    newStatus: KitchenOrder["status"],
    orderNum: string,
  ) => {
    if (isUpdating) return;
    try {
      const backendStatus =
        newStatus === "PREPARING"
          ? "PREPARING"
          : newStatus === "READY"
            ? "READY_FOR_PICKUP"
            : "CONFIRMED";
      await updateOrderStatus({ orderId: id, status: backendStatus }).unwrap();
      toast.success(`${orderNum} status updated to ${newStatus}`);
    } catch {
      // Fallback local update
      setLocalOrders((prev) =>
        (prev || orders).map((o) => (o.id === id ? { ...o, status: newStatus } : o)),
      );
      toast.success(`${orderNum} marked ${newStatus} (Offline mode)`);
    }
  };

  const queued = orders.filter((o) => o.status === "QUEUED");
  const preparing = orders.filter((o) => o.status === "PREPARING");
  const ready = orders.filter((o) => o.status === "READY" || o.status === "PACKED");

  return (
    <div>
      <PageHeader
        title="Today's Kitchen Queue"
        description="View and manage today's meal preparation queue."
        icon={ChefHat}
      />
      <KitchenSummaryCards
        queued={queued.length}
        preparing={preparing.length}
        ready={ready.length}
        total={orders.length}
      />
      <PageHeader
        title="Today's Kitchen Queue"
        description="View and manage today's meal preparation queue in real-time."
        icon={ChefHat}
      />

      {isLoading ? (
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <KitchenSummaryCards
            queued={queued.length}
            preparing={preparing.length}
            ready={ready.length}
            total={orders.length}
          />

          {preparing.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-semibold text-foreground">In Preparation</h2>
              <p className="text-sm text-muted-foreground">
                {preparing.length} orders currently being cooked
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {preparing.map((order) => (
                  <KitchenOrderCard
                    key={order.id}
                    order={order}
                    onMarkReady={(o) => {
                      updateStatus(o.id, "READY");
                      toast.success(`${o.orderNumber} marked ready`);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {preparing.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-semibold text-foreground">In Preparation</h2>
              <p className="text-sm text-muted-foreground">
                {preparing.length} orders currently being cooked
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {preparing.map((order) => (
                  <KitchenOrderCard
                    key={order.id}
                    order={order}
                    onMarkReady={(o) => handleStatusChange(o.id, "READY", o.orderNumber)}
                  />
                ))}
              </div>
            </div>
          )}

          {queued.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Queued (Next to Prepare)
              </h2>
              <p className="text-sm text-muted-foreground">{queued.length} orders waiting</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {queued.slice(0, 6).map((order) => (
                  <KitchenOrderCard
                    key={order.id}
                    order={order}
                    onStartPrep={(o) => handleStatusChange(o.id, "PREPARING", o.orderNumber)}
                  />
                ))}
              </div>
              {queued.length > 6 && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  +{queued.length - 6} more queued orders
                </p>
              )}
            </div>
          )}

          {preparing.length === 0 && queued.length === 0 && (
            <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
              <CookingPot className="size-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No active orders in the kitchen queue.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
