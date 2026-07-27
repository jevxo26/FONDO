"use client";

import { toast } from "sonner";
import { ArrowLeft, Building, CheckCircle, Clock, Loader2, Phone, User } from "lucide-react";
import Link from "next/link";
import { useGetOrderQuery, useUpdateOrderStatusMutation } from "@/store/api/slices/orders-api";
import { useGetAllAdminOrdersQuery } from "@/store/api/slices/admin-customers-api";
import { OrderStatusBadge } from "@/components/dashboard/admin/customers/orders/order-status-badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Order, OrderItem, OrderTimeline } from "@/types/order";
import type { OrderStatus } from "@/data/orders";

interface ApiVendorType {
  id: string;
  businessName: string;
  phone: string;
  email: string;
}

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

function OrderDetailContent({ orderId }: { orderId: string }) {
  const { data: order, isLoading, error } = useGetOrderQuery(orderId);
  useGetAllAdminOrdersQuery();

  const [confirmOrder, { isLoading: isConfirming }] = useUpdateOrderStatusMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !order) return <OrderNotFound />;

  const isPending = order.orderStatus === "PENDING";
  const orderStatus = order.orderStatus as OrderStatus;

  const timelineItems = (order.timeline as OrderTimeline[]).map((t) => ({
    label: t.title,
    time: t.createdAt ? new Date(t.createdAt).toLocaleString() : null,
    done: true,
  }));

  const itemRows = (order.items as OrderItem[]).map((item) => ({
    name: item.food?.name ?? "Unknown item",
    quantity: item.quantity,
    price: Number(item.totalPrice),
  }));

  const subtotal = Number(order.subtotal);
  const deliveryFee = Number(order.deliveryCharge);
  const discount = Number(order.discount);
  const total = Number(order.totalAmount);

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
            <OrderStatusBadge status={orderStatus} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Placed on {order.placedAt ? new Date(order.placedAt).toLocaleDateString() : ""}
          </p>
        </div>
        {isPending && (
          <Button
            onClick={async () => {
              try {
                await confirmOrder({ orderId, status: "CONFIRMED" }).unwrap();
                toast.success("Order confirmed");
              } catch {
                toast.error("Failed to confirm order");
              }
            }}
            disabled={isConfirming}
            className="rounded-full"
          >
            {isConfirming ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CheckCircle className="size-4" />
            )}
            Confirm Order
          </Button>
        )}
      </div>

      <div className="mb-8 grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {timelineItems.length > 0 && (
            <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
                Timeline
              </h2>
              <div className="space-y-0">
                {timelineItems.map((step, i) => (
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
                      {i < timelineItems.length - 1 && (
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
          )}

          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
              Items ({itemRows.length})
            </h2>
            <div className="divide-y divide-border/40">
              {itemRows.map((item, i) => (
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
                <span className="font-mono text-foreground">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-mono text-foreground">
                  {deliveryFee === 0 ? "Free" : `৳${deliveryFee}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-mono text-success">-৳{discount}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-border/40 pt-2 text-base font-bold">
                <span className="text-foreground">Total</span>
                <span className="font-mono text-foreground">৳{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Customer</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="size-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">
                  {order.customer.firstName} {order.customer.lastName}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{order.customer.phone}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Vendor & Rider</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building className="size-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">
                  {(order as Order & { vendor?: ApiVendorType }).vendor?.businessName ?? "Not assigned yet"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <User className="size-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">
                  {order.delivery?.rider?.fullName ?? "Not assigned yet"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <OrderDetailContent orderId={id} />;
}
