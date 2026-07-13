import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'Transactions', href: '/dashboard/admin/payments' },
  { label: 'Refunds', href: '/dashboard/admin/payments/refunds' },
  { label: 'Coupons', href: '/dashboard/admin/payments/coupons' },
  { label: 'Settlements', href: '/dashboard/admin/payments/settlements' },
] as const;

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
