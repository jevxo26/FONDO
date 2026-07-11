import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'All Vendors', href: '/dashboard/vendors' },
  { label: 'Pending Approval', href: '/dashboard/vendors/pending' },
  { label: 'Performance', href: '/dashboard/vendors/performance' },
  { label: 'Settlement', href: '/dashboard/vendors/settlement' },
] as const;

export default function VendorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
