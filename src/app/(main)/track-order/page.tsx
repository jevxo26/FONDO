"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Truck, Phone, CreditCard, Smartphone, Loader2, Star, ChevronDown, ChevronUp, Receipt } from "lucide-react";
import { useOrder, useSubmitFeedback, useInvoice } from "@/hooks/use-orders";
import { handleApiError } from "@/lib/api-error";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function FeedbackSection({ orderId, existing }: { orderId: string; existing: { rating: number; review: string | null } | null }) {
  const [rating, setRating] = useState(existing?.rating ?? 0);
  const [review, setReview] = useState(existing?.review ?? "");
  const [hovered, setHovered] = useState(0);
  const submitFeedback = useSubmitFeedback();
  const isDelivered = true;

  if (!isDelivered) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    submitFeedback.mutate(
      { orderId, rating, review: review.trim() || undefined },
      {
        onSuccess: () => toast.success(existing ? "Feedback updated" : "Feedback submitted"),
        onError: (err) => toast.error(handleApiError(err)),
      },
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h2 className="font-heading text-lg font-normal text-foreground mb-4">
        {existing ? "Your Feedback" : "Rate Your Experience"}
      </h2>

      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-colors"
          >
            <Star
              className={`size-6 ${star <= (hovered || rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your thoughts (optional)..."
        rows={3}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none mb-4"
      />

      <Button
        onClick={handleSubmit}
        disabled={submitFeedback.isPending || rating === 0}
        className="rounded-xl"
      >
        {submitFeedback.isPending && <Loader2 className="size-4 animate-spin mr-2" />}
        {existing ? "Update Feedback" : "Submit Feedback"}
      </Button>
    </div>
  );
}

function InvoiceSection({ orderId }: { orderId: string }) {
  const [open, setOpen] = useState(false);
  const { data: invoice, isLoading } = useInvoice(orderId);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Receipt className="size-4 text-muted-foreground" />
          <h3 className="font-heading text-sm font-semibold text-foreground">Invoice</h3>
        </div>
        {open ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
      </button>

      {open && (
        <div className="mt-4 pt-4 border-t border-border">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : invoice ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoice #</span>
                <span className="font-medium">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{new Date(invoice.invoiceDate).toLocaleDateString("en-BD")}</span>
              </div>
              <div className="border-t border-border my-2" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>৳{Number(invoice.subtotal).toLocaleString()}</span>
              </div>
              {Number(invoice.discount) > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">-৳{Number(invoice.discount).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>৳{Number(invoice.deliveryCharge).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT</span>
                <span>৳{Number(invoice.vat).toLocaleString()}</span>
              </div>
              <div className="border-t border-border my-2" />
              <div className="flex justify-between font-semibold text-foreground">
                <span>Total</span>
                <span>৳{Number(invoice.grandTotal).toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2">Invoice not available</p>
          )}
        </div>
      )}
    </div>
  );
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const showInvoice = searchParams.get("showInvoice") === "true";

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

  const delivered = order.orderStatus === "DELIVERED" || order.orderStatus === "COMPLETED";

  const steps = [
    { label: "Order Confirmed", completed: true, icon: CreditCard },
    { label: "Preparing", completed: true, icon: Smartphone },
    { label: "Out for Delivery", completed: order.deliveryStatus === "ON_THE_WAY" || order.deliveryStatus === "DELIVERED", icon: Truck },
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

            {delivered && (
              <FeedbackSection
                orderId={orderId}
                existing={order.feedback ? { rating: order.feedback.rating, review: order.feedback.review } : null}
              />
            )}
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

            <InvoiceSection orderId={orderId} />
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