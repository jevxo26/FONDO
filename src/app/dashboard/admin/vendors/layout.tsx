import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'All Vendors', href: '/dashboard/admin/vendors' },
  { label: 'Pending Approval', href: '/dashboard/admin/vendors/pending' },
  { label: 'Performance', href: '/dashboard/admin/vendors/performance' },
  { label: 'Settlement', href: '/dashboard/admin/vendors/settlement' },
] as const;

export default function VendorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
