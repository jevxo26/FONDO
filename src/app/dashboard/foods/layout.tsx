import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'All Foods', href: '/dashboard/foods' },
  { label: 'Meal Plans', href: '/dashboard/foods/meal-plans' },
  { label: 'Approval Queue', href: '/dashboard/foods/approval' },
  { label: 'Categories', href: '/dashboard/foods/categories' },
  { label: 'Nutrition', href: '/dashboard/foods/nutrition' },
] as const;

export default function FoodsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
