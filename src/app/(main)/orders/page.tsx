"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Package, XCircle, Star, Receipt, Clock, MapPin } from "lucide-react";
import { useOrders, useCancelOrder } from "@/store/api/slices/orders-api";
import { handleApiError } from "@/lib/api-error";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SectionReveal } from "@/components/common/section-reveal";

function OrdersContent() {
  const { data, isLoading, error } = useOrders();
  const searchParams = useSearchParams();

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") toast.success("Payment successful! Your order is confirmed.");
    else if (payment === "failed") toast.error("Payment failed. Please try again.");
    else if (payment === "cancelled") toast.info("Payment cancelled.");
  }, [searchParams]);
  const cancelOrder = useCancelOrder();

  const handleCancel = (orderId: string) => {
    cancelOrder.mutate(orderId, {
      onSuccess: () => toast.success("Order cancelled"),
      onError: (err) => toast.error(handleApiError(err)),
    });
  };

  if (isLoading) {
    return (
      <main className="flex-1 py-8 lg:py-12">
        <div className="wrapper flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 py-8 lg:py-12">
        <div className="wrapper">
          <div className="py-16 text-center rounded-3xl bg-gradient-to-br from-primary/[0.02] via-card to-primary/[0.01] shadow-[var(--shadow-card)] relative overflow-hidden">
            <div className="pointer-events-none absolute -top-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 z-0 size-24 rounded-full bg-primary/5 blur-2xl" />
            <div className="relative z-10">
              <p className="font-sans text-sm text-destructive">{handleApiError(error)}</p>
              <Link href="/menu">
                <Button variant="default" className="mt-4 rounded-xl">
                  Return to Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const orders = data ?? [];

  return (
    <main className="flex-1 py-8 lg:py-12">
      <div className="wrapper">
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="size-3.5" /> Back to Profile
          </Link>
          <h1 className="font-heading text-4xl font-normal text-secondary-foreground tracking-tight">
            My Orders
          </h1>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            {orders.length} total orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-gradient-to-br from-primary/[0.02] via-card to-primary/[0.01] shadow-[var(--shadow-card)] relative overflow-hidden">
            <div className="pointer-events-none absolute -top-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 z-0 size-24 rounded-full bg-primary/5 blur-2xl" />
            <div className="relative z-10">
              <Package className="size-8 mx-auto mb-3 text-muted-foreground" />
              <p className="font-sans text-sm text-muted-foreground">No orders yet.</p>
              <Link href="/menu">
                <Button variant="default" className="mt-4 rounded-xl">
                  Browse Menu
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <SectionReveal className="flex flex-col gap-4" stagger>
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl bg-gradient-to-br from-primary/[0.02] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="pointer-events-none absolute -top-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-8 -left-8 z-0 size-24 rounded-full bg-primary/5 blur-2xl" />
                <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
                <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/track-order?orderId=${order.id}`}
                      className="font-sans text-base font-semibold text-secondary-foreground hover:text-primary transition-colors"
                    >
                      {order.orderNumber}
                    </Link>
                    <p className="font-sans text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                      <Clock className="size-3 text-muted-foreground/60" />
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
                      <span className="flex items-center gap-1">
                        <Package className="size-3 text-muted-foreground/60" />
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-xl font-bold text-secondary-foreground">
                      ৳{order.totalAmount}
                    </span>
                    <div className="mt-2 flex gap-2 justify-end">
                      <Tooltip>
                        <TooltipTrigger
                          render={<Link href={`/track-order?orderId=${order.id}`} />}
                          className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-muted transition-colors"
                        >
                          <MapPin className="size-3" /> Track
                        </TooltipTrigger>
                        <TooltipContent>Track delivery status</TooltipContent>
                      </Tooltip>
                      {["PENDING", "CONFIRMED"].includes(order.orderStatus) && (
                        <Tooltip>
                          <TooltipTrigger
                            onClick={() => handleCancel(order.id)}
                            disabled={cancelOrder.isPending}
                            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-destructive/20 text-destructive rounded-lg hover:bg-destructive/10 transition-colors disabled:opacity-50"
                          >
                            <XCircle className="size-3" /> Cancel
                          </TooltipTrigger>
                          <TooltipContent>Cancel this order</TooltipContent>
                        </Tooltip>
                      )}
                      {["DELIVERED", "COMPLETED"].includes(order.orderStatus) && (
                        <Tooltip>
                          <TooltipTrigger
                            render={<Link href={`/track-order?orderId=${order.id}`} />}
                            className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-muted transition-colors"
                          >
                            <Star className="size-3" /> Review
                          </TooltipTrigger>
                          <TooltipContent>Leave a review</TooltipContent>
                        </Tooltip>
                      )}
                      <Tooltip>
                        <TooltipTrigger
                          render={<Link href={`/track-order?orderId=${order.id}&showInvoice=true`} />}
                          className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-muted transition-colors"
                        >
                          <Receipt className="size-3" /> Invoice
                        </TooltipTrigger>
                        <TooltipContent>View order invoice</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {order.items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 4).map((item) => (
                        <span
                          key={item.id}
                          className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md"
                        >
                          {item.food.name} x{item.quantity}
                        </span>
                      ))}
                      {order.items.length > 4 && (
                        <span className="text-xs text-muted-foreground">
                          +{order.items.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          </SectionReveal>
        )}
      </div>
    </main>
  );
}

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <main className="flex-1 py-8 lg:py-12">
          <div className="wrapper flex items-center justify-center min-h-[40vh]">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        </main>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}
