// src/components/dashboard/vendor/orders/order-detail-modal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { getOrderStatusBadge } from "@/data/vendor-orders";
import type { VendorOrder } from "@/types/vendor";
import { Clock, MapPin, Phone, User, Package, DollarSign, Calendar } from "lucide-react";

interface OrderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: VendorOrder | null;
  onUpdateStatus: (order: VendorOrder, status: VendorOrder["status"]) => void;
}

const STATUS_FLOW: VendorOrder["status"][] = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "ON_THE_WAY",
  "DELIVERED",
  "COMPLETED",
];

export function OrderDetailModal({ open, onOpenChange, order, onUpdateStatus }: OrderDetailModalProps) {
  if (!order) return null;

  const currentStatusIndex = STATUS_FLOW.indexOf(order.status);
  const nextStatus = currentStatusIndex < STATUS_FLOW.length - 1 ? STATUS_FLOW[currentStatusIndex + 1] : null;

  const handleNextStatus = () => {
    if (nextStatus) {
      onUpdateStatus(order, nextStatus);
    }
  };

  const statusBadge = getOrderStatusBadge(order.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-fraunces text-2xl">
            Order {order.orderNumber}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Status & Actions */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={`ring-1 ${statusBadge.className} text-sm px-3 py-1`}>
                {statusBadge.label}
              </Badge>
              <div className="flex gap-2">
                {nextStatus && order.status !== "CANCELLED" && order.status !== "COMPLETED" && (
                  <Button onClick={handleNextStatus} size="sm">
                    Mark as {nextStatus.replace(/_/g, " ")}
                  </Button>
                )}
                {order.status === "CANCELLED" && (
                  <Button variant="outline" size="sm" disabled>
                    Order Cancelled
                  </Button>
                )}
              </div>
            </div>

            <Separator className="border-primary/10" />

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Customer</h4>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customerName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customerPhone}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Delivery</h4>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{order.deliveryAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(new Date(order.deliveryDate), "MMM d, yyyy")} • {order.deliverySlot}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="border-primary/10" />

            {/* Order Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Payment</p>
                <Badge variant="outline" className={order.paymentStatus === "PAID" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}>
                  {order.paymentStatus}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Total Items</p>
                <p className="font-medium text-sm">{order.totalItems}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Total Amount</p>
                <p className="font-fraunces text-xl font-bold tracking-tight text-primary">
                  ৳{order.totalAmount}
                </p>
              </div>
            </div>

            <Separator className="border-primary/10" />

            {/* Order Items */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Items</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground">×{item.quantity}</span>
                    </div>
                    <span className="font-fraunces text-sm font-semibold">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="border-primary/10" />

            {/* Timeline */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Order Timeline</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Order placed</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(order.createdAt), "MMM d, h:mm a")}
                  </span>
                </div>
                {order.status !== "PENDING" && (
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Status updated</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(order.updatedAt), "MMM d, h:mm a")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}