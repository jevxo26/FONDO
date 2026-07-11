import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'Profiles', href: '/dashboard/customers' },
  { label: 'Orders', href: '/dashboard/customers/orders' },
  { label: 'Subscriptions', href: '/dashboard/customers/subscriptions' },
  { label: 'Payments', href: '/dashboard/customers/payments' },
  { label: 'Wallets', href: '/dashboard/customers/wallets' },
] as const;

export default function CustomersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
