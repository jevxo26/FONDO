"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "All Riders", href: "/dashboard/riders" },
  { label: "Live Tracking", href: "/dashboard/riders/live" },
  { label: "Performance", href: "/dashboard/riders/performance" },
  { label: "Earnings", href: "/dashboard/riders/earnings" },
] as const;

export default function RidersLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <nav className="relative mb-8 flex gap-4 overflow-x-auto whitespace-nowrap border-b border-border md:gap-10">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/dashboard/riders"
              ? pathname === "/dashboard/riders"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={cn(
                "relative pb-4 text-sm font-medium transition-colors",
                isActive
                  ? "font-bold text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
              {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
