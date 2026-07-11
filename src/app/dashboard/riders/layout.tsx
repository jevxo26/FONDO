import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'All Riders', href: '/dashboard/riders' },
  { label: 'Live Tracking', href: '/dashboard/riders/live' },
  { label: 'Performance', href: '/dashboard/riders/performance' },
  { label: 'Earnings', href: '/dashboard/riders/earnings' },
] as const;

export default function RidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
