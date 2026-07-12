import { StatCard } from "@/components/dashboard/common/stat-card";
import { ContextCards } from "@/components/dashboard/customers/orders/context-cards";
import { OrdersTableSection } from "@/components/dashboard/customers/orders/orders-table-section";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { Button } from "@/components/ui/button";
import { orders } from "@/data/orders";
import { CheckCircle, Clock, Download, Plus, ShoppingBag, Timer, X } from "lucide-react";
import Link from "next/link";

export default async function CustomerOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { customer } = await searchParams;
  const customerFilter = typeof customer === "string" ? customer : undefined;

  const filteredOrders = customerFilter
    ? orders.filter((o) => o.customerName.toLowerCase() === customerFilter.toLowerCase())
    : orders;

  const totalOrders = filteredOrders.length;
  const pending = filteredOrders.filter((o) => o.orderStatus === "PENDING").length;
  const inProgress = filteredOrders.filter(
    (o) => o.orderStatus === "PREPARING" || o.orderStatus === "ON_THE_WAY",
  ).length;
  const completed = filteredOrders.filter((o) => o.orderStatus === "COMPLETED").length;

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
        <StatCard label="Total Orders" value={totalOrders} icon={ShoppingBag} accent="right" />
        <StatCard label="Pending" value={pending} variant="warning" icon={Clock} accent="right" />
        <StatCard
          label="In Progress"
          value={inProgress}
          variant="danger"
          icon={Timer}
          accent="right"
        />
        <StatCard
          label="Completed"
          value={completed}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
      </div>

      {customerFilter && (
        <div className="mt-6 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Showing orders for <strong>{customerFilter}</strong>
          </span>
          <Link
            href="/dashboard/customers/orders"
            className="flex items-center gap-1 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3" /> Clear filter
          </Link>
        </div>
      )}

      <div className="mt-8">
        <OrdersTableSection data={filteredOrders} />
      </div>

      <div className="mt-8">
        <ContextCards />
      </div>
    </div>
  );
}
