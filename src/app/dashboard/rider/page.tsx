"use client";

import { useMemo } from "react";
import { Bike, DollarSign, MapPin, Package, Loader2 } from "lucide-react";
import { riderDeliveries as fallbackRiderDeliveries } from "@/data/riders";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DashboardActiveDeliveries } from "@/components/dashboard/rider/dashboard-active-deliveries";
import { useGetOrdersQuery } from "@/store/api/slices/orders-api";

export default function RiderDashboardPage() {
  const { data: apiOrders, isLoading } = useGetOrdersQuery();

  const deliveries = useMemo(() => {
    if (apiOrders && apiOrders.length > 0) {
      return apiOrders.map((o) => ({
        id: o.id,
        orderId: o.id,
        orderNumber: o.orderNumber,
        customerName: o.deliveryAddress?.receiverName || "Customer",
        customerPhone: o.deliveryAddress?.receiverPhone || "",
        pickupAddress: "FONDO Central Kitchen",
        deliveryAddress: `${o.deliveryAddress?.house ? o.deliveryAddress.house + ", " : ""}${o.deliveryAddress?.road ? o.deliveryAddress.road + ", " : ""}${o.deliveryAddress?.area || ""}, ${o.deliveryAddress?.district || ""}`,
        status: o.status === "DELIVERED" ? "DELIVERED" : o.status === "ON_THE_WAY" ? "ON_THE_WAY" : o.status === "PICKED_UP" ? "PICKED_UP" : "ASSIGNED",
        deliveryFee: 60,
        estimatedTime: "25 min",
        createdAt: o.createdAt,
      }));
    }
    return fallbackRiderDeliveries;
  }, [apiOrders]);

  const activeDeliveries = deliveries.filter(
    (d) => !["DELIVERED", "FAILED", "CANCELLED"].includes(d.status),
  );
  const completedToday = deliveries.filter((d) => d.status === "DELIVERED");
  const activeCount = activeDeliveries.length;
  const completedCount = completedToday.length;

  return (
    <div>
      <PageHeader title="Rider Dashboard" description="Your live delivery overview and active routes." icon={Bike} />

      {isLoading ? (
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <StatCard label="Active Deliveries" value={activeCount} icon={MapPin} accent="right" />
            <StatCard label="Completed Today" value={completedCount} variant="success" icon={Package} accent="right" />
            <StatCard label="Earnings Today" value={`৳${completedCount * 60 + 500}`} variant="default" icon={DollarSign} accent="right" />
          </div>
          <div className="mt-8">
            <h3 className="font-heading text-lg font-semibold text-foreground">Active Deliveries</h3>
            <DashboardActiveDeliveries data={activeDeliveries} />
          </div>
        </>
      )}
    </div>
  );
}

