"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Profiles", href: "/dashboard/customers" },
  { label: "Orders", href: "/dashboard/customers/orders" },
  { label: "Subscriptions", href: "/dashboard/customers/subscriptions" },
  { label: "Payments", href: "/dashboard/customers/payments" },
  { label: "Wallets", href: "/dashboard/customers/wallets" },
] as const;

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const activeTab = tabs.find((t) =>
    t.href === "/dashboard/customers"
      ? pathname === "/dashboard/customers"
      : pathname.startsWith(t.href),
  );

  return (
    <div>
      <nav className="flex gap-2 text-xs text-muted-foreground">
        <a href="/dashboard" className="hover:text-primary">Dashboard</a>
        <span>/</span>
        <span className="font-bold text-primary">Customer Management</span>
        <span>/</span>
        <span className="text-foreground">{activeTab?.label ?? "Profiles"}</span>
      </nav>

      <nav className="relative mb-8 mt-6 flex gap-10 border-b border-border">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/dashboard/customers"
              ? pathname === "/dashboard/customers"
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
