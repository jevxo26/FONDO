"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Truck, Phone, CreditCard, MapPin, Smartphone, Loader2 } from "lucide-react";
import { useOrder } from "@/hooks/use-orders";
import { handleApiError } from "@/lib/api-error";

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";

  const { data: order, isLoading, error } = useOrder(orderId);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-background py-10">
        <div className="wrapper max-w-6xl text-center py-20">
          <h1 className="font-sans text-2xl font-bold text-foreground mb-2">Track Your Order</h1>
          <p className="font-sans text-sm text-muted-foreground mb-6">
            Provide an order ID to track.
          </p>
          <Link
            href="/orders"
            className="inline-flex h-10 items-center rounded-xl bg-[#CEA359] px-5 font-sans text-xs font-semibold text-[#1B0E08]"
          >
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-10">
        <div className="wrapper max-w-6xl flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background py-10">
        <div className="wrapper max-w-6xl text-center py-20">
          <p className="font-sans text-sm text-red-600 mb-4">{error ? handleApiError(error) : "Order not found"}</p>
          <Link
            href="/orders"
            className="inline-flex h-10 items-center rounded-xl bg-[#CEA359] px-5 font-sans text-xs font-semibold text-[#1B0E08]"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const statusLabel = order.orderStatus.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  const rider = order.delivery?.rider;
  const eta = order.delivery?.estimatedDeliveryTime
    ? new Date(order.delivery.estimatedDeliveryTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="wrapper max-w-6xl">
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-bold text-foreground mb-2 capitalize">{statusLabel}</h1>
          <div className="font-sans text-sm text-muted-foreground space-y-0.5">
            <p>Order number: {order.orderNumber}</p>
            <p>
              {eta ? `Estimated delivery by ${eta}. ` : ""}
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            {rider && (
              <div className="bg-primary rounded-2xl p-5 text-white shadow-[var(--shadow-card)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="size-11 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <Truck className="size-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-semibold">Your order is on its way!</h3>
                    <p className="font-sans text-xs text-white/90">
                      {eta ? `Estimated delivery by ${eta}` : "Preparing your order"}
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-center bg-black rounded-full px-3 py-1 font-sans text-xs font-semibold tracking-wide uppercase">
                  {order.deliveryStatus.replace(/_/g, " ")}
                </span>
              </div>
            )}

            <div className="bg-card border border-border/40 rounded-[32px] p-6 sm:p-8 shadow-[var(--shadow-card)]">
              <h2 className="font-sans text-lg font-bold text-foreground mb-6">Delivery status</h2>

              <div className="relative pl-2">
                {(order.timeline.length > 0 ? order.timeline : []).map((step, index) => {
                  const isLast = index === order.timeline.length - 1;
                  const stepStatus = step.status === "completed" ? "completed" : step.status === "cancelled" ? "pending" : index === order.timeline.length - 1 ? "current" : "completed";

                  return (
                    <div key={step.id} className="relative flex gap-5 pb-8 group last:pb-0">
                      {!isLast && (
                        <div className="absolute left-4 top-8 bottom-0 w-[2px] bg-[#E5DFD5]" />
                      )}

                      <div className="relative z-10 shrink-0">
                        {stepStatus === "completed" && (
                          <div className="size-8 rounded-full border-2 border-primary bg-card flex items-center justify-center">
                            <Check className="size-4 text-primary stroke-[3]" />
                          </div>
                        )}
                        {stepStatus === "current" && (
                          <div className="size-8 rounded-full border-2 border-primary bg-card flex items-center justify-center">
                            <div className="size-3 rounded-full bg-primary" />
                          </div>
                        )}
                        {stepStatus === "pending" && (
                          <div className="size-8 rounded-full border-2 border-[#DDD6CF] bg-card flex items-center justify-center">
                            <div className="size-2 rounded-full bg-[#9C968E]" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col pt-0.5 font-sans">
                        <h4
                          className={`text-sm font-bold ${
                            stepStatus === "current" ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {step.description}
                        </p>
                        <span className="text-[11px] text-muted-foreground/80 mt-1">
                          {new Date(step.createdAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {rider && (
              <div className="bg-card border border-border/40 rounded-[32px] p-5 shadow-[var(--shadow-card)] flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="size-14 bg-[#EBDCB9] rounded-full flex items-center justify-center font-sans text-2xl font-bold text-[#8A6A32] shrink-0">
                    {rider.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-bold text-foreground">
                      {rider.fullName}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">Your rider</p>
                  </div>
                </div>
                <a
                  href={`tel:${rider.phone}`}
                  className="h-11 px-6 rounded-full bg-[#16100C] text-white font-sans text-xs font-semibold hover:bg-[#2C241E] transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Phone className="size-3.5" />
                  Call
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-6">
            <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-[var(--shadow-card)] font-sans">
              <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-3 mb-4">
                Delivery Information
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-semibold text-foreground mb-0.5">Customer</p>
                    <p className="text-muted-foreground">{order.customer.fullName}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center pt-2 border-t border-dashed border-border/40">
                  <Smartphone className="size-4 text-primary shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">Contact</p>
                    <p className="text-muted-foreground mt-0.5">{order.customer.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-[var(--shadow-card)] font-sans">
              <h3 className="text-sm font-bold text-foreground pb-3 mb-3">Payment Summary</h3>

              <div className="space-y-3 border-b border-border/60 pb-4 mb-4 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">৳{Number(order.subtotal).toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Discount</span>
                    <span className="font-medium text-green-600">-৳{Number(order.discount).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery charges</span>
                  <span className="font-medium text-foreground">৳{Number(order.deliveryCharge)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-foreground">Total</span>
                <span className="text-lg font-bold text-primary">৳{Number(order.totalAmount).toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2 bg-muted rounded-xl p-3 border border-border/20 text-xs">
                <CreditCard className="size-4 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  Payment:{" "}
                  <strong className="text-foreground font-semibold">
                    {order.payment?.status ?? order.orderStatus}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
