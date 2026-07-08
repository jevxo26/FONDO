"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Pending", href: "/dashboard/orders" },
  { label: "Confirmed", href: "/dashboard/orders/confirmed" },
  { label: "Kitchen Queue", href: "/dashboard/orders/kitchen" },
  { label: "Delivery Queue", href: "/dashboard/orders/delivery" },
  { label: "Completed", href: "/dashboard/orders/completed" },
  { label: "Cancelled", href: "/dashboard/orders/cancelled" },
] as const;

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <nav className="relative mb-8 flex gap-4 overflow-x-auto whitespace-nowrap border-b border-border md:gap-10">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/dashboard/orders"
              ? pathname === "/dashboard/orders"
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
