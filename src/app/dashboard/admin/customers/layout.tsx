import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'Profiles', href: '/dashboard/admin/customers' },
  { label: 'Orders', href: '/dashboard/admin/customers/orders' },
  { label: 'Subscriptions', href: '/dashboard/admin/customers/subscriptions' },
  { label: 'Payments', href: '/dashboard/admin/customers/payments' },
  { label: 'Wallets', href: '/dashboard/admin/customers/wallets' },
] as const;

export default function CustomersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
