"use client";

import { ShoppingBag, Wallet, Heart, BadgeCheck } from "lucide-react";
import { SectionReveal } from "@/components/common/section-reveal";
import { Skeleton } from "@/components/ui/skeleton";
import type { Order } from "@/types/order";
import type { CustomerWallet } from "@/types/wallet";
import type { Food } from "@/types/food";

interface Props {
  orders?: Order[];
  wallet?: CustomerWallet;
  favorites?: Food[];
  loading: boolean;
}

export function ProfileStats({ orders, wallet, favorites, loading }: Props) {
  const orderCount = orders?.length ?? 0;
  const totalSpent = (orders ?? []).reduce((sum, o) => sum + Number(o.totalAmount ?? 0), 0);
  const balance = Number(wallet?.balance ?? 0);
  const favoriteCount = favorites?.length ?? 0;

  const stats = [
    {
      label: "Total Orders",
      value: loading ? null : orderCount.toLocaleString(),
      icon: ShoppingBag,
    },
    {
      label: "Total Spent",
      value: loading ? null : `৳${totalSpent.toLocaleString()}`,
      icon: BadgeCheck,
    },
    {
      label: "Wallet Balance",
      value: loading ? null : `৳${balance.toLocaleString()}`,
      icon: Wallet,
    },
    {
      label: "Favorites",
      value: loading ? null : favoriteCount.toLocaleString(),
      icon: Heart,
    },
  ];

  return (
    <SectionReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger>
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.04] via-card to-primary/[0.02] p-5 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]"
        >
          <div className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-primary/8 opacity-60 blur-3xl" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {value === null ? (
                <Skeleton className="h-8 w-24 rounded-lg" />
              ) : (
                <p className="font-heading text-[28px] font-bold leading-tight tracking-tighter text-foreground">
                  {value}
                </p>
              )}
              <p className="mt-1 truncate text-badge uppercase tracking-widest text-muted-foreground">
                {label}
              </p>
            </div>
            <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20">
              <Icon className="size-[18px]" />
            </div>
          </div>
        </div>
      ))}
    </SectionReveal>
  );
}
