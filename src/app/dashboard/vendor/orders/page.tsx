// src/app/dashboard/vendor/orders/page.tsx
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { VendorOrderTableSection } from "@/components/dashboard/vendor/orders/order-table-section";
import { ClipboardList, Clock, CheckCircle2, XCircle, Package } from "lucide-react";
import { vendorOrders } from "@/data/vendor-orders";

export default function VendorOrdersPage() {
  const totalOrders = vendorOrders.length;
  const pendingOrders = vendorOrders.filter((o) => o.status === "PENDING").length;
  const inProgress = vendorOrders.filter((o) => 
    ["CONFIRMED", "PREPARING", "READY_FOR_PICKUP", "PICKED_UP", "ON_THE_WAY"].includes(o.status)
  ).length;
  const completedToday = vendorOrders.filter((o) => 
    o.status === "COMPLETED" || o.status === "DELIVERED"
  ).length;
  const cancelledOrders = vendorOrders.filter((o) => o.status === "CANCELLED").length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Orders"
        description="View and manage incoming customer orders."
        icon={ClipboardList}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Orders"
          value={totalOrders.toString()}
          icon={Package}
          accent="right"
        />
        <StatCard
          label="Pending"
          value={pendingOrders.toString()}
          variant="warning"
          icon={Clock}
          accent="right"
        />
        <StatCard
          label="In Progress"
          value={inProgress.toString()}
          icon={ClipboardList}
          accent="right"
        />
        <StatCard
          label="Completed"
          value={completedToday.toString()}
          variant="success"
          icon={CheckCircle2}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">
            Order List
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {completedToday} Completed · {cancelledOrders} Cancelled
          </p>
        </div>
        <VendorOrderTableSection />
      </div>
    </div>
  );
}