"use client";

import { RecentActivity } from "@/components/dashboard/admin/overview/recent-activity";
import { RevenueChart } from "@/components/dashboard/admin/overview/revenue-chart";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { OrderPieChart } from "@/components/dashboard/vendor/overview/order-pie-chart";

import { useGetFoodsQuery } from "@/store/api/slices/foods-api";
import { useGetOrdersQuery } from "@/store/api/slices/orders-api";
import {
  ClipboardList,
  DollarSign,
  Loader2,
  Store,
  Utensils,
  TrendingUp,
  Package,
} from "lucide-react";

export default function VendorOverviewPage() {
  const { data: apiOrders, isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: apiFoods, isLoading: foodsLoading } = useGetFoodsQuery({});

  const totalFoods = apiFoods?.items ? apiFoods.items.length : 47;
  const totalOrders = apiOrders ? apiOrders.length : 23;
  const pendingOrders = apiOrders
    ? apiOrders.filter((o) => o.orderStatus === "PENDING" || o.orderStatus === "PREPARING").length
    : 5;

  const isLoading = ordersLoading || foodsLoading;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Vendor Overview"
        description="Monitor your business performance at a glance."
        icon={Store}
      />

      {isLoading ? (
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Foods"
              value={totalFoods.toString()}
              icon={Utensils}
              accent="right"
            />
            <StatCard
              label="Today's Orders"
              value={totalOrders.toString()}
              variant="success"
              icon={ClipboardList}
              accent="right"
            />
            <StatCard
              label="Pending"
              value={pendingOrders.toString()}
              variant="warning"
              icon={Package}
              accent="right"
            />
            <StatCard
              label="Today's Earnings"
              value="৳12,450"
              variant="default"
              icon={DollarSign}
              accent="right"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RevenueChart/>
            <OrderPieChart/>
          </div>

          {/* Recent Activity */}
          <RecentActivity/>
        </>
      )}
    </div>
  );
}
