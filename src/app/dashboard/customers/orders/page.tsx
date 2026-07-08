import Link from "next/link";
import { FilterBar } from "@/components/dashboard/customers/orders/filter-bar";
import { ContextCards } from "@/components/dashboard/customers/orders/context-cards";
import { OrdersTableSection } from "@/components/dashboard/customers/orders/orders-table-section";
import { orders } from "@/data/orders";
import { Download, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CustomerOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { customer } = await searchParams;
  const customerFilter = typeof customer === "string" ? customer : undefined;

  const filteredOrders = customerFilter
    ? orders.filter(
        (o) => o.customerName.toLowerCase() === customerFilter.toLowerCase(),
      )
    : orders;

  const totalOrders = filteredOrders.length;
  const pending = filteredOrders.filter(
    (o) => o.orderStatus === "PENDING",
  ).length;
  const inProgress = filteredOrders.filter(
    (o) => o.orderStatus === "PREPARING" || o.orderStatus === "ON_THE_WAY",
  ).length;
  const completed = filteredOrders.filter(
    (o) => o.orderStatus === "COMPLETED",
  ).length;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Customer Orders
          </h2>
          <p className="mt-2 text-muted-foreground">
            Manage and track all customer meal orders across Dhaka.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" />
            Export Report
          </Button>
          <Button className="rounded-full">
            <Plus className="size-[18px]" />
            New Manual Order
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Pending" value={pending} />
        <StatCard label="In Progress" value={inProgress} />
        <StatCard label="Completed" value={completed} />
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

      <div className="mt-6">
        <FilterBar />
        <OrdersTableSection data={filteredOrders} />
      </div>

      <ContextCards />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <p className="text-[13px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-fraunces text-2xl font-bold text-foreground">
        {value}
      </p>
    </div>
  );
}
