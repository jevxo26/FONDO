import { CustomerCard } from "@/components/dashboard/customers/customer-card";
import { CustomerTabs } from "@/components/dashboard/customers/customer-tabs";
import { StatusMetrics } from "@/components/dashboard/customers/status-metrics";
import { TransactionList } from "@/components/dashboard/customers/transaction-list";
import { WalletCard } from "@/components/dashboard/customers/wallet-card";
import { customers, recentTransactions } from "@/data/customers";
import { Download, Filter, Grid3x3, UserPlus } from "lucide-react";

export default function CustomersPage() {
  const totalHoldings = customers.reduce((s, c) => s + c.walletBalance, 0);
  const activeCount = customers.filter((c) => c.status === "ACTIVE").length;
  const suspendedCount = customers.filter(
    (c) => c.status === "SUSPENDED",
  ).length;

  return (
    <div>
      <nav className="mb-2 flex gap-2 text-xs text-muted-foreground">
        <a href="/dashboard" className="hover:text-primary">
          Dashboard
        </a>
        <span>/</span>
        <span className="font-bold text-primary">Customer Management Hub</span>
      </nav>

      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Customer Operations
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-full border border-foreground px-6 py-2 text-xs font-bold text-foreground transition-all hover:bg-foreground hover:text-white">
            <Download className="size-[18px]" />
            Export List
          </button>
          <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-xs font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95">
            <UserPlus className="size-[18px]" />
            Add New Customer
          </button>
        </div>
      </div>

      <div className="mb-8 mt-8">
        <CustomerTabs />
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-fraunces text-xl font-semibold text-foreground">
              Active Profiles
            </h3>
            <div className="flex gap-2">
              <button className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-primary">
                <Filter className="size-4" />
              </button>
              <button className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-primary">
                <Grid3x3 className="size-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {customers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        </div>

        <div className="col-span-4 space-y-8">
          <WalletCard
            totalHoldings={totalHoldings}
            pendingRefunds={46500}
          />
          <TransactionList transactions={recentTransactions} />
          <StatusMetrics
            activeCount={activeCount}
            suspendedCount={suspendedCount}
            totalCustomers={customers.length}
          />
        </div>
      </div>
    </div>
  );
}
