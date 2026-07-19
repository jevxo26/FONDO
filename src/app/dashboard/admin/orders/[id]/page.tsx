import { ArrowLeft, Building, CheckCircle, Clock, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { orders } from "@/data/orders";
import { getOrderDetail } from "@/data/order-detail";
import { OrderStatusBadge } from "@/components/dashboard/admin/customers/orders/order-status-badge";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

function OrderNotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <Clock className="size-6 text-destructive" />
      </div>
      <h2 className="font-heading text-xl font-bold text-foreground">Order Not Found</h2>
      <p className="text-sm text-muted-foreground">The order doesn&apos;t exist.</p>
      <Link
        href="/dashboard/admin/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to All Orders
      </Link>
    </div>
  );
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  if (!order) return <OrderNotFound />;

  const detail = getOrderDetail(order.id);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to All Orders
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {order.orderNumber}
            </h1>
            <OrderStatusBadge status={order.orderStatus} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Placed on {order.placedAt}
          </p>
        </div>
      </div>

      <div className="mb-8 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
              Timeline
            </h2>
            <div className="space-y-0">
              {detail.timeline.map((step, i) => (
                <div key={i} className="relative flex gap-4 pb-4 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                        step.done
                          ? "border-success bg-success/10 text-success"
                          : "border-muted-foreground/30 text-muted-foreground/50",
                      )}
                    >
                      {step.done ? <CheckCircle className="size-4" /> : i + 1}
                    </div>
                    {i < detail.timeline.length - 1 && (
                      <div
                        className={cn(
                          "mt-0.5 w-0.5 grow",
                          step.done ? "bg-success/40" : "bg-border",
                        )}
                      />
                    )}
                  </div>
                  <div className="min-w-0 pb-2">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        step.done ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {step.label}
                    </p>
                    {step.time && (
                      <p className="text-xs text-muted-foreground">{step.time}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
              Items ({detail.items.length})
            </h2>
            <div className="divide-y divide-border/40">
              {detail.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {item.quantity}
                    </span>
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="font-mono text-sm font-medium text-foreground">
                    ৳{item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-border/40 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono text-foreground">৳{detail.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-mono text-foreground">
                  {detail.deliveryFee === 0 ? "Free" : `৳${detail.deliveryFee}`}
                </span>
              </div>
              {detail.discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-mono text-success">-৳{detail.discount}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-border/40 pt-2 text-base font-bold">
                <span className="text-foreground">Total</span>
                <span className="font-mono text-foreground">
                  ৳{(detail.subtotal + detail.deliveryFee - detail.discount).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
              Customer
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="size-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{detail.customerPhone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground">{detail.customerAddress}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Deliver to: {detail.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
              Vendor & Rider
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building className="size-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{detail.vendor}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="size-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">
                  {detail.rider ?? "Not assigned yet"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
              Actions
            </h2>
            <div className="space-y-2">
              <button className="w-full rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary ring-1 ring-primary/20 transition-all duration-300 hover:bg-primary/20 active:scale-[0.98]">
                Assign Rider
              </button>
              <button className="w-full rounded-xl bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive ring-1 ring-destructive/20 transition-all duration-300 hover:bg-destructive/20 active:scale-[0.98]">
                Cancel Order
              </button>
              <button className="w-full rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary ring-1 ring-primary/20 transition-all duration-300 hover:bg-primary/20 active:scale-[0.98]">
                Send Notification
              </button>
              <button className="w-full rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary ring-1 ring-primary/20 transition-all duration-300 hover:bg-primary/20 active:scale-[0.98]">
                View Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
