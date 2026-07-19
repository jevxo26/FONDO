"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api-client";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { ContextCards } from "@/components/dashboard/admin/customers/orders/context-cards";
import { OrdersTableSection } from "@/components/dashboard/admin/customers/orders/orders-table-section";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Clock, Download, Plus, ShoppingBag, Timer, X } from "lucide-react";
import Link from "next/link";
import type { CustomerOrder } from "@/data/orders";

interface ApiOrder {
  id: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: number;
  placedAt: string;
  items: unknown[];
  customer: { id: string; firstName: string; lastName: string; phone: string };
}

interface PaginatedOrders {
  items: ApiOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function adaptOrder(o: ApiOrder): CustomerOrder {
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    customerId: o.customer.id,
    customerName: `${o.customer.firstName} ${o.customer.lastName}`.trim(),
    items: o.items.length,
    totalAmount: Number(o.totalAmount),
    orderStatus: o.orderStatus as CustomerOrder["orderStatus"],
    paymentStatus: o.paymentStatus as CustomerOrder["paymentStatus"],
    placedAt: o.placedAt ? new Date(o.placedAt).toLocaleDateString() : "",
  };
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const customerFilter = searchParams.get("customer") ?? undefined;

  const { data } = useQuery({
    queryKey: ["admin", "orders", "all"],
    queryFn: () => api.get<PaginatedOrders>("/admin/orders?page=1&limit=100"),
  });

  const allOrders = (data?.items ?? []).map(adaptOrder);
  const orders = customerFilter
    ? allOrders.filter((o) => o.customerName.toLowerCase().includes(customerFilter.toLowerCase()))
    : allOrders;
  const total = orders.length;
  const pending = orders.filter((o) => o.orderStatus === "PENDING").length;
  const inProgress = orders.filter(
    (o) => o.orderStatus === "PREPARING" || o.orderStatus === "ON_THE_WAY",
  ).length;
  const completed = orders.filter((o) => o.orderStatus === "COMPLETED").length;

  return (
    <div>
      <PageHeader
        title="Customer Orders"
        description="Manage and track all customer meal orders across Dhaka."
        icon={ShoppingBag}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" />
              Export Report
            </Button>
            <Button className="rounded-full">
              <Plus className="size-[18px]" />
              Manual Order
            </Button>
          </>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={total} icon={ShoppingBag} accent="bottom" />
        <StatCard label="Pending" value={pending} variant="warning" icon={Clock} accent="bottom" />
        <StatCard label="In Progress" value={inProgress} variant="danger" icon={Timer} accent="bottom" />
        <StatCard label="Completed" value={completed} variant="success" icon={CheckCircle} accent="bottom" />
      </div>

      {customerFilter && (
        <div className="mt-6 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Showing orders for <strong>{customerFilter}</strong>
          </span>
          <Link
            href="/dashboard/admin/customers/orders"
            className="flex items-center gap-1 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3" /> Clear filter
          </Link>
        </div>
      )}

      <div className="mt-8">
        <OrdersTableSection data={orders} />
      </div>

      <div className="mt-8">
        <ContextCards />
      </div>
    </div>
  );
}

export default function CustomerOrdersPage() {
  return (
    <Suspense fallback={<div className="space-y-6"><Skeleton className="h-12 w-full" /><Skeleton className="h-64 w-full" /></div>}>
      <OrdersContent />
    </Suspense>
  );
}
