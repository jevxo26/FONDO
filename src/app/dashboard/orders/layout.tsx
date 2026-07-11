import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'Pending', href: '/dashboard/orders' },
  { label: 'Confirmed', href: '/dashboard/orders/confirmed' },
  { label: 'Kitchen Queue', href: '/dashboard/orders/kitchen' },
  { label: 'Delivery Queue', href: '/dashboard/orders/delivery' },
  { label: 'Completed', href: '/dashboard/orders/completed' },
  { label: 'Cancelled', href: '/dashboard/orders/cancelled' },
] as const;

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
