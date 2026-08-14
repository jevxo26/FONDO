"use client";

import { useMemo } from "react";
import type { Order } from "@/types/order";

export interface LoyaltyTier {
  name: "Bronze" | "Silver" | "Gold";
  badgeClass: string;
  accentClass: string;
  stripeClass: string;
  orderCount: number;
  totalSpent: number;
}

const THRESHOLDS = {
  silver: { orders: 10, spent: 10000 },
  gold: { orders: 25, spent: 50000 },
} as const;

export function useLoyaltyTier(orders: Order[] | undefined): LoyaltyTier {
  return useMemo(() => {
    const list = orders ?? [];
    const orderCount = list.length;
    const totalSpent = list.reduce((sum, o) => sum + Number(o.totalAmount ?? 0), 0);

    if (orderCount >= THRESHOLDS.gold.orders || totalSpent >= THRESHOLDS.gold.spent) {
      return {
        name: "Gold",
        badgeClass: "bg-primary/10 text-primary",
        accentClass: "bg-primary",
        stripeClass: "bg-primary",
        orderCount,
        totalSpent,
      };
    }

    if (orderCount >= THRESHOLDS.silver.orders || totalSpent >= THRESHOLDS.silver.spent) {
      return {
        name: "Silver",
        badgeClass: "bg-muted text-muted-foreground",
        accentClass: "bg-slate-400",
        stripeClass: "bg-slate-400",
        orderCount,
        totalSpent,
      };
    }

    return {
      name: "Bronze",
      badgeClass: "bg-amber-900/10 text-amber-700",
      accentClass: "bg-amber-600",
      stripeClass: "bg-amber-600",
      orderCount,
      totalSpent,
    };
  }, [orders]);
}
