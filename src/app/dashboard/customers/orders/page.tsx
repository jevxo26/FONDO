import { OrdersTable } from "@/components/dashboard/customers/orders/orders-table";
import { orders } from "@/data/orders";
import { Download, Filter } from "lucide-react";

export default function CustomerOrdersPage() {
  const totalOrders = orders.length;
  const pending = orders.filter((o) => o.orderStatus === "PENDING").length;
  const inProgress = orders.filter(
    (o) => o.orderStatus === "PREPARING" || o.orderStatus === "ON_THE_WAY",
  ).length;
  const completed = orders.filter((o) => o.orderStatus === "COMPLETED").length;

  return (
    <div>
      <nav className="mb-2 flex gap-2 text-xs text-muted-foreground">
        <a href="/dashboard" className="hover:text-primary">Dashboard</a>
        <span>/</span>
        <a href="/dashboard/customers" className="hover:text-primary">
          Customer Management
        </a>
        <span>/</span>
        <span className="font-bold text-primary">Orders</span>
      </nav>

      <div className="flex items-end justify-between">
        <h2 className="font-fraunces text-4xl font-bold text-foreground">
          Customer Orders
        </h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-full border border-foreground px-6 py-2 text-xs font-bold text-foreground transition-all hover:bg-foreground hover:text-white">
            <Download className="size-[18px]" />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-full border border-foreground px-6 py-2 text-xs font-bold text-foreground transition-all hover:bg-foreground hover:text-white">
            <Filter className="size-[18px]" />
            Filters
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-6">
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Pending" value={pending} />
        <StatCard label="In Progress" value={inProgress} />
        <StatCard label="Completed" value={completed} />
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-fraunces text-2xl font-bold text-foreground">
        {value}
      </p>
    </div>
  );
}
