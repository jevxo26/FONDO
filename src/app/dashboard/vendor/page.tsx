"use client";

import { RecentActivity } from "@/components/dashboard/admin/overview/recent-activity";
import { RevenueChart } from "@/components/dashboard/admin/overview/revenue-chart";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { OrderPieChart } from "@/components/dashboard/vendor/overview/order-pie-chart";

import { useGetVendorFoodsQuery } from "@/store/api/slices/foods-api";
import { useGetVendorOrdersQuery, useMyVendor } from "@/store/api/slices/vendor-orders-api";
import { useGetVendorWalletQuery } from "@/store/api/slices/vendor-settlement-api";
import { ClipboardList, DollarSign, Loader2, Store, Utensils, Package } from "lucide-react";

export default function VendorOverviewPage() {
  const { data: vendor, isLoading: vendorLoading } = useMyVendor();
  const vendorId = vendor?.id;

  const { data: vendorFoods, isLoading: foodsLoading } = useGetVendorFoodsQuery();
  const { data: vendorOrders, isLoading: ordersLoading } = useGetVendorOrdersQuery(vendorId || "", {
    skip: !vendorId,
  });
  const { data: wallet, isLoading: walletLoading } = useGetVendorWalletQuery(vendorId || "", {
    skip: !vendorId,
  });

  const isLoading = vendorLoading || foodsLoading || ordersLoading || walletLoading;

  const totalFoods = vendorFoods?.length || 0;
  const totalOrders = vendorOrders?.length || 0;
  const pendingOrders =
    vendorOrders?.filter((o) => o.orderStatus === "PENDING" || o.orderStatus === "PREPARING")
      .length || 0;
  const todayEarnings = wallet?.balance || 0;

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
              value={`৳${todayEarnings.toLocaleString()}`}
              variant="default"
              icon={DollarSign}
              accent="right"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RevenueChart />
            <OrderPieChart />
          </div>

          <RecentActivity />
        </>
      )}
    </div>
  );
}
