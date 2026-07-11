import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'All Packages', href: '/dashboard/packages' },
  { label: 'Meal Plans', href: '/dashboard/packages/plans' },
] as const;

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
