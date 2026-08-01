// src/components/dashboard/vendor/orders/order-detail-modal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { getOrderStatusBadge } from "@/data/vendor-orders";
import { Clock, User, Package, Loader2 } from "lucide-react";
import type { VendorOrderListItem } from "@/store/api/slices/vendor-orders-api";

interface OrderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: VendorOrderListItem | null;
  onUpdateStatus: (orderId: string, status: string) => void;
  updateStatusPending?: boolean;
}

const STATUS_FLOW: Record<string, string> = {
  PENDING: "CONFIRMED",
  CONFIRMED: "PREPARING",
  PREPARING: "READY_FOR_PICKUP",
};

export function OrderDetailModal({
  open,
  onOpenChange,
  order,
  onUpdateStatus,
  updateStatusPending,
}: OrderDetailModalProps) {
  if (!order) return null;

  const nextStatus = STATUS_FLOW[order.orderStatus] ?? null;
  const statusBadge = getOrderStatusBadge(order.orderStatus);

  const handleNextStatus = () => {
    if (nextStatus) onUpdateStatus(order.id, nextStatus);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-fraunces text-2xl">Order {order.orderNumber}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Status & Actions */}
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={`ring-1 ${statusBadge.className} text-sm px-3 py-1`}
              >
                {statusBadge.label}
              </Badge>
              <div className="flex gap-2">
                {nextStatus && order.orderStatus !== "CANCELLED" && order.orderStatus !== "COMPLETED" && (
                  <Button onClick={handleNextStatus} size="sm" disabled={updateStatusPending}>
                    {updateStatusPending && <Loader2 className="mr-1 size-3 animate-spin" />}
                    Mark as {nextStatus.replace(/_/g, " ").toLowerCase()}
                  </Button>
                )}
                {order.orderStatus === "CANCELLED" && (
                  <Button variant="outline" size="sm" disabled>Order Cancelled</Button>
                )}
              </div>
            </div>

            <Separator className="border-primary/10" />

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
                  Customer
                </h4>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer.firstName} {order.customer.lastName}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Total Amount</p>
                <p className="font-fraunces text-xl font-bold tracking-tight text-primary">
                  ৳{Number(order.totalAmount).toLocaleString()}
                </p>
              </div>
            </div>

            <Separator className="border-primary/10" />

            {/* Order Items */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Items</h4>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.food?.name ?? "Unknown"}</span>
                      <span className="text-xs text-muted-foreground">×{item.quantity}</span>
                    </div>
                    <span className="font-fraunces text-sm font-semibold">
                      ৳{Number(item.totalPrice).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="border-primary/10" />

            {/* Timeline */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
                Order Timeline
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Order placed</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(order.placedAt), "MMM d, h:mm a")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
