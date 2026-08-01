"use client";

import { useMemo } from "react";
import { ClipboardList, Clock, CheckCircle2, Package } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { VendorOrderTableSection } from "@/components/dashboard/vendor/orders/order-table-section";
import { useVendorOrdersPage } from "@/hooks/use-vendor-orders";

export default function VendorOrdersPage() {
  const { orders, isLoading, handleUpdateStatus, updateStatusPending } = useVendorOrdersPage();

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.orderStatus === "PENDING").length;
    const inProgress = orders.filter((o) =>
      ["CONFIRMED", "PREPARING", "READY_FOR_PICKUP", "PICKED_UP", "ON_THE_WAY"].includes(o.orderStatus),
    ).length;
    const completed = orders.filter(
      (o) => o.orderStatus === "COMPLETED" || o.orderStatus === "DELIVERED",
    ).length;
    const cancelled = orders.filter((o) => o.orderStatus === "CANCELLED").length;
    return { total, pending, inProgress, completed, cancelled };
  }, [orders]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Orders"
        description="View and manage incoming customer orders."
        icon={ClipboardList}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={stats.total} icon={Package} accent="right" />
        <StatCard label="Pending" value={stats.pending} variant="warning" icon={Clock} accent="right" />
        <StatCard label="In Progress" value={stats.inProgress} icon={ClipboardList} accent="right" />
        <StatCard
          label="Completed"
          value={stats.completed}
          variant="success"
          icon={CheckCircle2}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">Order List</h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {stats.completed} Completed · {stats.cancelled} Cancelled
          </p>
        </div>
        <VendorOrderTableSection
          orders={orders}
          isLoading={isLoading}
          onUpdateStatus={handleUpdateStatus}
          updateStatusPending={updateStatusPending}
        />
      </div>
    </div>
  );
}
