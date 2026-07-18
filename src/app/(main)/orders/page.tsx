"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, XCircle } from "lucide-react";
import { useOrders, useCancelOrder } from "@/hooks/use-orders";
import { handleApiError } from "@/lib/api-error";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const { data, isLoading, error } = useOrders(1, 20);
  const cancelOrder = useCancelOrder();

  const handleCancel = (orderId: string) => {
    cancelOrder.mutate(orderId, {
      onSuccess: () => toast.success("Order cancelled"),
      onError: (err) => toast.error(handleApiError(err)),
    });
  };

  if (isLoading) {
    return (
      <main className="flex-1 py-12">
        <div className="wrapper flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 py-12">
        <div className="wrapper">
          <div className="py-16 text-center border border-dashed border-border rounded-[32px] bg-white dark:bg-card">
            <p className="font-sans text-sm text-destructive">{handleApiError(error)}</p>
            <Link href="/menu" className="mt-4 inline-flex h-10 items-center rounded-xl bg-primary px-5 font-sans text-xs font-semibold text-primary-foreground">
              Return to Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const orders = data?.items ?? [];

  return (
    <main className="flex-1 py-12">
      <div className="wrapper">
        <div className="mb-8">
          <Link href="/profile" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="size-3.5" /> Back to Profile
          </Link>
          <h1 className="font-fraunces text-4xl font-normal text-secondary-foreground tracking-tight">My Orders</h1>
          <p className="font-sans text-xs text-muted-foreground mt-1">{data?.total ?? 0} total orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-border rounded-[32px] bg-white dark:bg-card">
            <p className="font-sans text-sm text-muted-foreground">No orders yet.</p>
            <Link href="/menu" className="mt-4 inline-flex h-10 items-center rounded-xl bg-primary px-5 font-sans text-xs font-semibold text-primary-foreground">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-[28px] bg-white border border-border/40 p-5 shadow-[var(--shadow-card)] dark:bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/track-order?orderId=${order.id}`}
                      className="font-sans text-base font-semibold text-secondary-foreground hover:text-primary transition-colors"
                    >
                      {order.orderNumber}
                    </Link>
                    <p className="font-sans text-xs text-muted-foreground mt-1">
                      {new Date(order.placedAt).toLocaleDateString("en-BD", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-md font-semibold bg-primary/10 text-primary uppercase tracking-wider text-[10px]">
                        {order.orderStatus}
                      </span>
                      <span>{order.items.length} {order.items.length === 1 ? "item" : "items"}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-xl font-bold text-secondary-foreground">৳{order.totalAmount}</span>
                    <div className="mt-2 flex gap-2 justify-end">
                      <Link
                        href={`/track-order?orderId=${order.id}`}
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                      >
                        Track
                      </Link>
                      {["PENDING", "CONFIRMED"].includes(order.orderStatus) && (
                        <button
                          onClick={() => handleCancel(order.id)}
                          disabled={cancelOrder.isPending}
                          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-destructive/20 text-destructive rounded-lg hover:bg-destructive/10 transition-colors disabled:opacity-50"
                        >
                          <XCircle className="size-3" /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {order.items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 4).map((item) => (
                        <span key={item.id} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                          {item.food.name} x{item.quantity}
                        </span>
                      ))}
                      {order.items.length > 4 && (
                        <span className="text-xs text-muted-foreground">+{order.items.length - 4} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
