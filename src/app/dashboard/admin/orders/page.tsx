"use client";

import { useState } from "react";
import { orders, type OrderStatus } from "@/data/orders";
import { OrdersTableSection } from "@/components/dashboard/admin/orders/orders-table-section";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { cn } from "@/lib/utils";
import {
  Ban, Check, CheckCircle, Clock, CookingPot, LayoutList,
  Package, Receipt, Truck, XCircle,
} from "lucide-react";

const statusFilters: { label: string; value: OrderStatus | null; icon: typeof Clock }[] = [
  { label: "All", value: null, icon: LayoutList },
  { label: "Pending", value: "PENDING", icon: Clock },
  { label: "Confirmed", value: "CONFIRMED", icon: CheckCircle },
  { label: "In Kitchen", value: "PREPARING", icon: CookingPot },
  { label: "Ready", value: "READY_FOR_PICKUP", icon: Package },
  { label: "Transit", value: "ON_THE_WAY", icon: Truck },
  { label: "Delivered", value: "DELIVERED", icon: CheckCircle },
  { label: "Cancelled", value: "CANCELLED", icon: XCircle },
];

export default function AllOrdersPage() {
  const [activeFilter, setActiveFilter] = useState<OrderStatus | null>(null);

  const filtered = activeFilter
    ? orders.filter((o) => o.orderStatus === activeFilter)
    : orders;

  const total = orders.length;
  const activeOrders = orders.filter(
    (o) => !["CANCELLED", "REFUNDED", "COMPLETED", "DELIVERED"].includes(o.orderStatus),
  ).length;
  const completed = orders.filter(
    (o) => o.orderStatus === "COMPLETED" || o.orderStatus === "DELIVERED",
  ).length;
  const cancelled = orders.filter(
    (o) => o.orderStatus === "CANCELLED" || o.orderStatus === "REFUNDED",
  ).length;

  return (
    <div>
      <PageHeader
        title="All Orders"
        description="Overview of all orders across the platform."
        icon={Receipt}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={total} icon={Receipt} accent="right" />
        <StatCard label="Active" value={activeOrders} variant="success" icon={Clock} accent="right" />
        <StatCard label="Completed" value={completed} variant="success" icon={CheckCircle} accent="right" />
        <StatCard label="Cancelled" value={cancelled} variant="danger" icon={Ban} accent="right" />
      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/[0.04] p-5 shadow-[var(--shadow-card)]">
        <div className="mb-4 flex items-center gap-2 px-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <LayoutList className="size-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Order Status
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statusFilters.map((f) => {
            const Icon = f.icon;
            const count = f.value
              ? orders.filter((o) => o.orderStatus === f.value).length
              : orders.length;
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl p-4 text-left transition-all duration-300 active:scale-[0.98]",
                  isActive
                    ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                    : "border border-border/40 bg-card text-muted-foreground hover:border-primary/30 hover:shadow-md",
                )}
              >
                <div
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-xl",
                    isActive ? "bg-white/20" : "bg-primary/10 text-primary",
                  )}
                >
                  <Icon className={cn("size-5", isActive && "text-white")} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-tight">{f.label}</p>
                  <p
                    className={cn(
                      "mt-0.5 text-xs font-medium",
                      isActive ? "text-white/80" : "text-muted-foreground",
                    )}
                  >
                    {count} {count === 1 ? "order" : "orders"}
                  </p>
                </div>
                {isActive && <Check className="size-4 shrink-0 text-white/70" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <OrdersTableSection data={filtered} />
      </div>
    </div>
  );
}
