import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'Transactions', href: '/dashboard/payments' },
  { label: 'Refunds', href: '/dashboard/payments/refunds' },
  { label: 'Coupons', href: '/dashboard/payments/coupons' },
  { label: 'Settlements', href: '/dashboard/payments/settlements' },
] as const;

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
