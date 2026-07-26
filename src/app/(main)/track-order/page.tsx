"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Truck, Phone, CreditCard, Smartphone, Loader2 } from "lucide-react";
import { useOrder } from "@/hooks/use-orders";
import { handleApiError } from "@/lib/api-error";

function TrackingContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";

  const { data: order, isLoading, error } = useOrder(orderId);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-background py-8 lg:py-12">
        <div className="wrapper max-w-6xl text-center py-20">
          <h1 className="font-heading text-2xl font-normal text-foreground mb-2">Track Your Order</h1>
          <p className="font-sans text-sm text-muted-foreground mb-6">
            Enter your order ID to track your delivery.
          </p>
          <Link href="/" className="text-primary underline text-sm">Go back home</Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 lg:py-12 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background py-8 lg:py-12">
        <div className="wrapper max-w-6xl text-center py-20">
          <h1 className="font-heading text-2xl font-normal text-foreground mb-2">Order Not Found</h1>
          <p className="font-sans text-sm text-muted-foreground mb-6">
            {handleApiError(error)}
          </p>
          <Link href="/" className="text-primary underline text-sm">Go back home</Link>
        </div>
      </div>
    );
  }

  const steps = [
    { label: "Order Confirmed", completed: true, icon: CreditCard },
    { label: "Preparing", completed: true, icon: Smartphone },
    { label: "Out for Delivery", completed: order.deliveryStatus === "ON_THE_WAY" || order.deliveryStatus === "DELIVERED", icon: Truck },
    { label: "Delivered", completed: order.deliveryStatus === "DELIVERED", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-background py-8 lg:py-12">
      <div className="wrapper max-w-6xl">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-normal text-foreground">Track Your Order</h1>
          <p className="font-sans text-sm text-muted-foreground">Order #{order.id}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-heading text-lg font-normal text-foreground mb-6">Delivery Status</h2>
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <div key={step.label} className="flex items-start gap-4">
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <step.icon className="size-4" />
                    </div>
                    <div className="pt-1.5">
                      <p className={`text-sm font-semibold ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`ml-4 h-8 w-0.5 ${step.completed ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Delivery Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4" />
                  <span>{order.customer.phone || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium">{order.items?.length ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">৳{order.totalAmount?.toLocaleString() ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-medium capitalize">{order.payment?.status ?? "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-8 lg:py-12 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    }>
      <TrackingContent />
    </Suspense>
  );
}
