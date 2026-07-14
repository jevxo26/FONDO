import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'All Orders', href: '/dashboard/admin/orders' },
  { label: 'Kitchen Queue', href: '/dashboard/admin/orders/kitchen' },
  { label: 'Analytics', href: '/dashboard/admin/orders/analytics' },
] as const;

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
