import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'Sales', href: '/dashboard/reports' },
  { label: 'Revenue', href: '/dashboard/reports/revenue' },
  { label: 'Vendors', href: '/dashboard/reports/vendors' },
  { label: 'Riders', href: '/dashboard/reports/riders' },
  { label: 'Customers', href: '/dashboard/reports/customers' },
  { label: 'Subscriptions', href: '/dashboard/reports/subscriptions' },
  { label: 'Inventory', href: '/dashboard/reports/inventory' },
] as const;

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
