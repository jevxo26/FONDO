'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface DashboardTab {
  label: string;
  href: string;
}

interface DashboardTabsProps {
  tabs: readonly DashboardTab[] | DashboardTab[];
  className?: string;
}

export function DashboardTabs({ tabs, className }: DashboardTabsProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('relative mb-8 flex gap-1 overflow-x-auto whitespace-nowrap border-b border-border md:gap-2 scrollbar-none', className)}>
      {tabs.map((tab) => {
        const href = tab.href;
        const isActive = href === pathname || (href !== tabs[0].href && pathname.startsWith(href));

        return (
          <Link
            key={tab.label}
            href={href}
            className={cn(
              'relative rounded-lg px-4 pb-3.5 pt-2.5 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
              isActive
                ? 'bg-primary/8 font-semibold text-primary'
                : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground',
            )}
          >
            {tab.label}
            {isActive && (
              <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary shadow-[0_2px_8px_rgba(206,163,89,0.3)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
