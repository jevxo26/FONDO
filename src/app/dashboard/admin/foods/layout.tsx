import { DashboardTabs } from '@/components/dashboard/common/dashboard-tabs';

const tabs = [
  { label: 'All Foods', href: '/dashboard/admin/foods' },
  { label: 'Meal Plans', href: '/dashboard/admin/foods/meal-plans' },
  { label: 'Packages', href: '/dashboard/admin/foods/packages' },
  { label: 'Inventory', href: '/dashboard/admin/foods/inventory' },
  { label: 'Approval Queue', href: '/dashboard/admin/foods/approval' },
  { label: 'Categories', href: '/dashboard/admin/foods/categories' },
  { label: 'Nutrition', href: '/dashboard/admin/foods/nutrition' },
] as const;

export default function FoodsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTabs tabs={tabs} />
      {children}
    </div>
  );
}
