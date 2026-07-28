"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { OrderStatusBadge } from "@/components/dashboard/admin/customers/orders/order-status-badge";
import { Button } from "@/components/ui/button";
import type { OrderStatus } from "@/data/orders";

interface OrderHeaderSectionProps {
  orderNumber: string;
  orderStatus: OrderStatus;
  placedAt: string | null;
  isPending: boolean;
  isConfirming: boolean;
  onConfirm: () => void;
}

export default function OrderHeaderSection({
  orderNumber,
  orderStatus,
  placedAt,
  isPending,
  isConfirming,
  onConfirm,
}: OrderHeaderSectionProps) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            {orderNumber}
          </h1>
          <OrderStatusBadge status={orderStatus} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Placed on {placedAt ? new Date(placedAt).toLocaleDateString() : ""}
        </p>
      </div>
      {isPending && (
        <Button onClick={onConfirm} disabled={isConfirming} className="rounded-full">
          {isConfirming ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <CheckCircle className="size-4" />
          )}
          Confirm Order
        </Button>
      )}
    </div>
  );
}
