import { Users, Download, UserPlus, UserCheck, UserX, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/common/page-header';
import { StatCard } from '@/components/dashboard/common/stat-card';
import { CustomerCard } from '@/components/dashboard/common/customer-card';
import { StatusMetrics } from '@/components/dashboard/customers/profiles/customer-status';
import { TransactionList } from '@/components/dashboard/customers/profiles/transaction-list';
import { WalletCard } from '@/components/dashboard/common/wallet-card';
import { customers, recentTransactions } from '@/data/customers';

export default function CustomersPage() {
  const totalHoldings = customers.reduce((s, c) => s + c.walletBalance, 0);
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
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <h3 className="font-fraunces mt-8 text-xl font-semibold text-foreground">Active Profiles</h3>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {customers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        </div>
        <div className="col-span-12 mt-8 space-y-8 lg:col-span-4 lg:mt-8">
          <WalletCard totalHoldings={totalHoldings} pendingRefunds={46500} />
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
