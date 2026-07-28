"use client";

import Link from "next/link";

interface CustomerTabNavProps {
  customerId: string;
  currentTab?: string;
}

const tabs = [
  { label: "Overview", href: "" },
  { label: "Orders", href: "/orders" },
  { label: "Subscriptions", href: "/subscriptions" },
  { label: "Payments", href: "/payments" },
  { label: "Wallet", href: "/wallets" },
];

export default function CustomerTabNav({ customerId, currentTab = "" }: CustomerTabNavProps) {
  return (
    <div className="mt-6">
      <nav className="flex gap-1">
        {tabs.map((tab) => {
          const href = tab.href ? `/dashboard/admin/customers/${customerId}${tab.href}` : `/dashboard/admin/customers/${customerId}`;
          const isActive = tab.href === currentTab;
          return (
            <Link
              key={tab.label}
              href={href}
              className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
