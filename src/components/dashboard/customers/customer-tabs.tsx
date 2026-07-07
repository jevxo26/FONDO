"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  "Profiles",
  "Orders",
  "Subscriptions",
  "Payments",
  "Wallets",
] as const;

export function CustomerTabs() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Profiles");

  return (
    <nav className="relative flex gap-10 border-b border-border">
      {tabs.map((tab) =>
        tab === "Orders" ? (
          <Link
            key={tab}
            href="/dashboard/customers/orders"
            className={cn(
              "relative pb-4 text-sm font-medium transition-colors",
              activeTab === tab
                ? "font-bold text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </Link>
        ) : (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative pb-4 text-sm font-medium transition-colors",
              activeTab === tab
                ? "font-bold text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ),
      )}
    </nav>
  );
}
