import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'Sales', href: '/dashboard/admin/reports' },
  { label: 'Revenue', href: '/dashboard/admin/reports/revenue' },
  { label: 'Vendors', href: '/dashboard/admin/reports/vendors' },
  { label: 'Riders', href: '/dashboard/admin/reports/riders' },
  { label: 'Customers', href: '/dashboard/admin/reports/customers' },
  { label: 'Subscriptions', href: '/dashboard/admin/reports/subscriptions' },
  { label: 'Inventory', href: '/dashboard/admin/reports/inventory' },
] as const;

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
