"use client";

import { RecentActivity } from "@/components/dashboard/vendor/overview/recent-activity";
import { RevenueChart } from "@/components/dashboard/vendor/overview/revenue-chart";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { OrderPieChart } from "@/components/dashboard/vendor/overview/order-pie-chart";

import { useGetVendorFoodsQuery } from "@/store/api/slices/foods-api";
import { useGetVendorOrdersQuery, useMyVendor } from "@/store/api/slices/vendor-orders-api";
import {
  useGetVendorWalletQuery,
  useGetVendorWalletTransactionsQuery,
} from "@/store/api/slices/vendor-settlement-api";
import {
  ClipboardList,
  DollarSign,
  Loader2,
  Store,
  Utensils,
  Package,
  AlertCircle,
} from "lucide-react";
import { useMemo } from "react";

export default function VendorOverviewPage() {
  const { data: vendor, isLoading: vendorLoading } = useMyVendor();
  const vendorId = vendor?.id;

  const { data: vendorFoods, isLoading: foodsLoading } = useGetVendorFoodsQuery();
  const { data: vendorOrders, isLoading: ordersLoading } = useGetVendorOrdersQuery(vendorId || "", {
    skip: !vendorId,
  });
  const { isLoading: walletLoading } = useGetVendorWalletQuery(vendorId || "", {
    skip: !vendorId,
  });
  const { data: transactions, isLoading: txLoading } = useGetVendorWalletTransactionsQuery(
    vendorId || "",
    {
      skip: !vendorId,
    },
  );

  const isLoading = vendorLoading || foodsLoading || ordersLoading || walletLoading || txLoading;

  const todayEarnings = useMemo(() => {
    if (!transactions) return 0;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return transactions
      .filter(
        (tx) =>
          new Date(tx.createdAt) >= today && tx.transactionType.toUpperCase().includes("CREDIT"),
      )
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  }, [transactions]);

  const chartData = useMemo(() => {
    if (!transactions) return [];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return days.map((day, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - index));
      const dailyTotal = transactions
        .filter((tx) => {
          const txDate = new Date(tx.createdAt);
          return (
            txDate >= date &&
            txDate < new Date(date.getTime() + 86400000) &&
            tx.transactionType.toUpperCase().includes("CREDIT")
          );
        })
        .reduce((sum, tx) => sum + Number(tx.amount), 0);
      return { day, revenue: dailyTotal };
    });
  }, [transactions]);

  const pieData = useMemo(() => {
    if (!vendorOrders || vendorOrders.length === 0) return [];

    const statusCount: Record<string, number> = {};
    vendorOrders.forEach((o) => {
      statusCount[o.orderStatus] = (statusCount[o.orderStatus] || 0) + 1;
    });

    const colorMap: Record<string, string> = {
      COMPLETED: "var(--success)",
      DELIVERED: "var(--chart-2)",
      CONFIRMED: "var(--info)",
      PREPARING: "var(--info)",
      READY_FOR_PICKUP: "var(--info)",
      PICKED_UP: "var(--info)",
      ON_THE_WAY: "var(--info)",
      PENDING: "var(--warning)",
      CANCELLED: "var(--destructive)",
    };

    const labelMap: Record<string, string> = {
      COMPLETED: "Completed",
      DELIVERED: "Delivered",
      CONFIRMED: "Confirmed",
      PREPARING: "Preparing",
      READY_FOR_PICKUP: "Ready",
      PICKED_UP: "Picked Up",
      ON_THE_WAY: "On The Way",
      PENDING: "Pending",
      CANCELLED: "Cancelled",
    };

    return Object.entries(statusCount).map(([status, count]) => ({
      name: labelMap[status] || status,
      value: count,
      color: colorMap[status] || "var(--muted-foreground)",
    }));
  }, [vendorOrders]);

  // Build activity list from orders - FIXED TYPE
  const activities = useMemo(() => {
    if (!vendorOrders || vendorOrders.length === 0) return [];

    return vendorOrders.slice(0, 8).map((order) => ({
      id: parseInt(order.id?.replace(/-/g, "").slice(0, 6) || "0"),
      type: (order.orderStatus === "CANCELLED" ? "alert" : "order") as "alert" | "order",
      text: `Order #${order.orderNumber} - ${order.orderStatus.replace(/_/g, " ").toLowerCase()}`,
      time: order.placedAt ? new Date(order.placedAt).toLocaleDateString() : "Today",
      icon: order.orderStatus === "CANCELLED" ? AlertCircle : Package,
    }));
  }, [vendorOrders]);

  const totalFoods = vendorFoods?.length || 0;
  const totalOrders = vendorOrders?.length || 0;
  const pendingOrders =
    vendorOrders?.filter((o) => o.orderStatus === "PENDING" || o.orderStatus === "PREPARING")
      .length || 0;

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
            <RevenueChart data={chartData} isLoading={isLoading} />
            <OrderPieChart data={pieData} isLoading={isLoading} />
          </div>

          <RecentActivity activities={activities} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}
