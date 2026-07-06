"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const subTabs = [
  { label: "All", href: "/dashboard/customers/subscriptions" },
  { label: "Active", href: "/dashboard/customers/subscriptions/active" },
  { label: "Paused", href: "/dashboard/customers/subscriptions/paused" },
  { label: "Expired", href: "/dashboard/customers/subscriptions/expired" },
  { label: "Cancelled", href: "/dashboard/customers/subscriptions/cancelled" },
] as const;

export default function SubscriptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Subscription Management
          </h2>
          <p className="mt-2 text-muted-foreground">
            Manage and monitor all customer meal subscriptions.
          </p>
        </div>
      </div>

      <nav className="relative mb-6 mt-8 flex gap-10 border-b border-border">
        {subTabs.map((tab) => {
          const isActive =
            tab.href === "/dashboard/customers/subscriptions"
              ? pathname === "/dashboard/customers/subscriptions"
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
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}
