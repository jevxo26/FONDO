import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'Pending', href: '/dashboard/admin/orders' },
  { label: 'Confirmed', href: '/dashboard/admin/orders/confirmed' },
  { label: 'Kitchen Queue', href: '/dashboard/admin/orders/kitchen' },
  { label: 'Delivery Queue', href: '/dashboard/admin/orders/delivery' },
  { label: 'Completed', href: '/dashboard/admin/orders/completed' },
  { label: 'Cancelled', href: '/dashboard/admin/orders/cancelled' },
] as const;

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
