import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'All Riders', href: '/dashboard/admin/riders' },
  { label: 'Live Tracking', href: '/dashboard/admin/riders/live' },
  { label: 'Performance', href: '/dashboard/admin/riders/performance' },
  { label: 'Earnings', href: '/dashboard/admin/riders/earnings' },
] as const;

export default function RidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
