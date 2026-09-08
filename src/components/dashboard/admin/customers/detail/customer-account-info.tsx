"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { OrderStatusBadge } from "@/components/dashboard/admin/customers/orders/order-status-badge";

interface LastOrder {
  totalAmount: number;
  placedAt: string | null;
  orderStatus: string;
}

interface CustomerAccountInfoProps {
  id: string;
  dateOfBirth: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastOrder: LastOrder | null;
}

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CustomerAccountInfo({
  id,
  dateOfBirth,
  isEmailVerified,
  isPhoneVerified,
  lastOrder,
}: CustomerAccountInfoProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)]">
      <div className="relative z-10">
        <h3 className="font-heading text-lg font-semibold text-foreground">Account Info</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
            <span className="text-xs text-muted-foreground">Customer ID</span>
            <span className="text-sm font-bold text-foreground">{id.slice(0, 8)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
            <span className="text-xs text-muted-foreground">Date of Birth</span>
            <span className="text-sm font-bold text-foreground">{formatDate(dateOfBirth)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
            <span className="text-xs text-muted-foreground">Email Verified</span>
            {isEmailVerified ? (
              <CheckCircle2 className="size-4 text-success" />
            ) : (
              <XCircle className="size-4 text-destructive" />
            )}
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
            <span className="text-xs text-muted-foreground">Phone Verified</span>
            {isPhoneVerified ? (
              <CheckCircle2 className="size-4 text-success" />
            ) : (
              <XCircle className="size-4 text-destructive" />
            )}
          </div>
          {lastOrder && (
            <>
              <div className="my-2 border-t border-primary/10" />
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Last Order
              </p>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-foreground">
                    ৳{lastOrder.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(lastOrder.placedAt)}</p>
                </div>
                <OrderStatusBadge status={lastOrder.orderStatus as never} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
