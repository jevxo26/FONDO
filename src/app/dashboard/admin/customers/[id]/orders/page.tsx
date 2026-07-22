"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, CheckCircle, Clock, Timer, XCircle } from "lucide-react";
import { DataTable } from "@/components/common/table";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { useAdminCustomerOrders } from "@/hooks/use-admin-customers";
import type { AdminCustomerOrder } from "@/types/admin";
import { orderColumns } from "@/components/dashboard/admin/customers/orders/order-columns";
import { useMemo } from "react";

export default function CustomerOrdersPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useAdminCustomerOrders(id, { page: 1, limit: 50 });

  const orders = data?.items ?? [];

  const total = orders.length;
  const pending = orders.filter((o) => o.orderStatus === "PENDING").length;
  const inProgress = orders.filter(
    (o) => o.orderStatus === "PREPARING" || o.orderStatus === "ON_THE_WAY",
  ).length;
  const completed = orders.filter((o) => o.orderStatus === "COMPLETED").length;

  const adaptedOrders: (AdminCustomerOrder & { customerName: string; customerId: string })[] =
    useMemo(
      () =>
        orders.map((o) => ({
          ...o,
          customerName: "",
          customerId: "",
        })),
      [orders],
    );

  return (
    <div>
      <Link
        href={`/dashboard/admin/customers/${id}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Customer
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <h1 className="font-fraunces text-2xl font-bold text-foreground">Customer Orders</h1>
        <div className="flex gap-1">
          <Link
            href={`/dashboard/admin/customers/${id}`}
            className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
          >
            Overview
          </Link>
          <Link
            href={`/dashboard/admin/customers/${id}/orders`}
            className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold uppercase text-primary-foreground"
          >
            Orders
          </Link>
          <Link
            href={`/dashboard/admin/customers/${id}/subscriptions`}
            className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
          >
            Subscriptions
          </Link>
          <Link
            href={`/dashboard/admin/customers/${id}/payments`}
            className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
          >
            Payments
          </Link>
          <Link
            href={`/dashboard/admin/customers/${id}/wallets`}
            className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold uppercase text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
          >
            Wallet
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={total} icon={ShoppingBag} accent="bottom" />
        <StatCard label="Pending" value={pending} variant="warning" icon={Clock} accent="bottom" />
        <StatCard label="In Progress" value={inProgress} variant="danger" icon={Timer} accent="bottom" />
        <StatCard label="Completed" value={completed} variant="success" icon={CheckCircle} accent="bottom" />
      </div>

      <div className="mt-8">
        <DataTable
          columns={orderColumns as never}
          data={adaptedOrders}
          isLoading={isLoading}
          pageSize={adaptedOrders.length || 10}
          enableSearch={false}
          enableColumnToggle={false}
          emptyMessage="No orders for this customer."
        />
      </div>
    </div>
  );
}
