"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Truck, CreditCard, Smartphone, Loader2 } from "lucide-react";
import { useOrder } from "@/hooks/use-orders";
import { handleApiError } from "@/lib/api-error";
import FeedbackSection from "@/components/track-order/feedback-section";
import InvoiceSection from "@/components/track-order/invoice-section";
import DeliveryStatusTimeline from "@/components/track-order/delivery-status-timeline";
import OrderSummaryCard from "@/components/track-order/order-summary-card";
import DeliveryDetailsCard from "@/components/track-order/delivery-details-card";

function TrackingContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";

  const { data: order, isLoading, error } = useOrder(orderId);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-background py-8 lg:py-12">
        <div className="wrapper max-w-6xl text-center py-20">
          <h1 className="font-heading text-2xl font-normal text-foreground mb-2">
            Track Your Order
          </h1>
          <p className="font-sans text-sm text-muted-foreground mb-6">
            Enter your order ID to track your delivery.
          </p>
          <Link href="/" className="text-primary underline text-sm">
            Go back home
          </Link>
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
          <h1 className="font-heading text-2xl font-normal text-foreground mb-2">
            Order Not Found
          </h1>
          <p className="font-sans text-sm text-muted-foreground mb-6">{handleApiError(error)}</p>
          <Link href="/" className="text-primary underline text-sm">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const delivered = order.orderStatus === "DELIVERED" || order.orderStatus === "COMPLETED";

  const steps = [
    { label: "Order Confirmed", completed: true, icon: CreditCard },
    { label: "Preparing", completed: true, icon: Smartphone },
    {
      label: "Out for Delivery",
      completed: order.deliveryStatus === "ON_THE_WAY" || order.deliveryStatus === "DELIVERED",
      icon: Truck,
    },
    { label: "Delivered", completed: delivered, icon: Check },
  ];

  return (
    <div className="min-h-screen bg-background py-8 lg:py-12">
      <div className="wrapper max-w-6xl">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-normal text-foreground">Track Your Order</h1>
          <p className="font-sans text-sm text-muted-foreground">Order #{order.id}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <DeliveryStatusTimeline steps={steps} />

            {delivered && (
              <FeedbackSection
                orderId={orderId}
                existing={
                  order.feedback
                    ? { rating: order.feedback.rating, review: order.feedback.review }
                    : null
                }
              />
            )}
          </div>

          <div className="space-y-4">
            <DeliveryDetailsCard phone={order.customer.phone || "N/A"} />

            <OrderSummaryCard
              itemsCount={order.items?.length ?? 0}
              totalAmount={order.totalAmount ?? 0}
              paymentStatus={order.payment?.status ?? "N/A"}
            />

            <InvoiceSection orderId={orderId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background py-8 lg:py-12 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <TrackingContent />
    </Suspense>
  );
}
