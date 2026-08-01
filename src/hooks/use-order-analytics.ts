"use client";

import { useMemo } from "react";
import { useGetAllAdminOrdersQuery } from "@/store/api/slices/admin-customers-api";

interface AdminOrder {
  id: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: number;
  placedAt: string;
  customer: { id: string; firstName: string; lastName: string; phone: string };
  items: Array<{ id: string; foodId: string; quantity: number; totalPrice: number; food: { id: string; name: string; thumbnail: string | null } }>;
}

export function useOrderAnalytics() {
  const { data, isLoading, error } = useGetAllAdminOrdersQuery();
  const orders = (data ?? []) as AdminOrder[];

  const analytics = useMemo(() => {
    const totalRevenue = orders.reduce((s, o) => s + Number(o.totalAmount), 0);
    const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
    const completed = orders.filter(
      (o) => o.orderStatus === "COMPLETED" || o.orderStatus === "DELIVERED",
    ).length;
    const completionRate = orders.length > 0 ? Math.round((completed / orders.length) * 100) : 0;

    const statusDistribution: Record<string, number> = {};
    orders.forEach((o) => {
      statusDistribution[o.orderStatus] = (statusDistribution[o.orderStatus] ?? 0) + 1;
    });

    const dailyMap: Record<string, { count: number; revenue: number }> = {};
    orders.forEach((o) => {
      const date = new Date(o.placedAt).toLocaleDateString("en-BD", { month: "short", day: "numeric" });
      if (!dailyMap[date]) dailyMap[date] = { count: 0, revenue: 0 };
      dailyMap[date].count += 1;
      dailyMap[date].revenue += Number(o.totalAmount);
    });
    const dailyVolume = Object.entries(dailyMap)
      .map(([date, v]) => ({ date, ...v }))
      .slice(-30);

    return { totalRevenue, avgOrderValue, completionRate, totalOrders: orders.length, statusDistribution, dailyVolume };
  }, [orders]);

  return { orders, analytics, isLoading, error };
}
