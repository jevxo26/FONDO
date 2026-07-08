import { CustomerCard } from '@/components/dashboard/customers/profiles/customer-card';
import { StatusMetrics } from '@/components/dashboard/customers/profiles/customer-status';
import { TransactionList } from '@/components/dashboard/customers/profiles/transaction-list';
import { WalletCard } from '@/components/dashboard/customers/profiles/wallet-card';
import { customers, recentTransactions } from '@/data/customers';
import { Download, Filter, Grid3x3, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CustomersPage() {
  const totalHoldings = customers.reduce((s, c) => s + c.walletBalance, 0);
  const activeCount = customers.filter((c) => c.status === 'ACTIVE').length;
  const suspendedCount = customers.filter((c) => c.status === 'SUSPENDED').length;

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Customer Operations</h2>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full">
            <Download className="size-[18px]" />
            Export List
          </Button>
          <Button className="rounded-full">
            <UserPlus className="size-[18px]" />
            Add New Customer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <div className="mb-6 mt-8 flex items-center justify-between">
            <h3 className="font-fraunces text-xl font-semibold text-foreground">Active Profiles</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="size-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Grid3x3 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
