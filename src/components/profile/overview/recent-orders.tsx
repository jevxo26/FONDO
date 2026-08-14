"use client";

import { Clock, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/common/section-reveal";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Order } from "@/types/order";

interface Props {
  orders?: Order[];
  isLoading: boolean;
}

export function RecentOrders({ orders, isLoading }: Props) {
  const recent = (orders ?? []).slice(0, 3);

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Recent Orders"
        description="Your latest activity at a glance"
        action={
          <Button variant="outline" className="rounded-xl" render={<Link href="/orders" />}>
            View All
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-36 rounded-3xl" />
          ))}
        </div>
      ) : recent.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
          <Package className="mx-auto mb-3 size-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No orders yet.</p>
          <Button
            className="mt-4 rounded-xl"
            render={<Link href="/foods" />}
          >
            Explore Foods
          </Button>
        </div>
      ) : (
        <SectionReveal className="grid grid-cols-1 gap-4 lg:grid-cols-3" stagger>
          {recent.map((order) => (
            <Link
              key={order.id}
              href={`/track-order?orderId=${order.id}`}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-5 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/5 opacity-60 blur-3xl" />
              <div className="pointer-events-none absolute right-4 top-4 z-10 size-[7px] rotate-45 border border-primary/30" />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-sans text-sm font-semibold text-foreground">
                    {order.orderNumber}
                  </p>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {order.orderStatus}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-small text-muted-foreground">
                  <Clock className="size-3 text-muted-foreground/60" />
                  {new Date(order.placedAt).toLocaleDateString("en-BD", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                  <span className="font-heading text-price font-bold text-foreground">
                    ৳{order.totalAmount}
                  </span>
                  <span className="flex items-center gap-1 text-badge font-bold uppercase tracking-wider text-primary">
                    Track
                    <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </SectionReveal>
      )}
    </section>
  );
}
