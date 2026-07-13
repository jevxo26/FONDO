import { CreditCard, Download, UserPlus, UserCheck, UserX, Users, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/common/page-header';
import { StatCard } from '@/components/dashboard/common/stat-card';
import { CustomerCard } from '@/components/dashboard/common/customer-card';
import { DarkCard } from '@/components/dashboard/common/dark-card';
import { StatusMetrics } from '@/components/dashboard/customers/profiles/customer-status';
import { TransactionList } from '@/components/dashboard/customers/profiles/transaction-list';

import { customers, recentTransactions } from '@/data/customers';

export default function CustomersPage() {
  const totalHoldings = customers.reduce((s, c) => s + c.walletBalance, 0);
  const pendingRefunds = 46500;
  const activeCount = customers.filter((c) => c.status === 'ACTIVE').length;
  const suspendedCount = customers.filter((c) => c.status === 'SUSPENDED').length;

  return (
    <div>
      <PageHeader
        title="Customer Operations"
        description="View and manage customer profiles, segments, and account statuses."
        icon={Users}
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="size-[18px]" />
              Export List
            </Button>
            <Button className="rounded-full">
              <UserPlus className="size-[18px]" />
              Add New Customer
            </Button>
          </>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Customers" value={customers.length} icon={Users} accent="bottom" />
        <StatCard label="Active" value={activeCount} variant="success" icon={UserCheck} accent="bottom" />
        <StatCard label="Suspended" value={suspendedCount} variant="warning" icon={UserX} accent="bottom" />
        <StatCard label="Wallet Holdings" value={`৳${totalHoldings.toLocaleString()}`} variant="default" icon={Wallet} accent="bottom" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
            <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
            <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
            <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
            <div className="relative z-10">
              <h3 className="font-fraunces text-xl font-semibold text-foreground">Active Profiles</h3>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {customers.map((customer) => (
                  <CustomerCard key={customer.id} customer={customer} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 mt-8 space-y-8 lg:col-span-4 lg:mt-0">
          <DarkCard icon={<Wallet className="size-40" />}>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                  Total Assets
                </p>
                <h4 className="font-fraunces text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] md:text-4xl">
                  ৳{(totalHoldings + pendingRefunds).toLocaleString()}
                </h4>
              </div>
              <Wallet className="size-8 text-primary drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>

            <div className="mb-6 space-y-3">
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Cust. Wallet Holdings</p>
                <p className="mt-1 text-base font-bold text-white">৳{totalHoldings.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Pending Refunds</p>
                <p className="mt-1 text-base font-bold text-red-400">-৳{pendingRefunds.toLocaleString()}</p>
              </div>
            </div>

            <Button className="w-full rounded-xl shadow-lg shadow-black/10">
              <CreditCard className="size-[18px]" />
              Manage Settlement
            </Button>
          </DarkCard>
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
