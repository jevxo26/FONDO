"use client";

import { Bell, HelpCircle, Menu, Search, Settings } from "lucide-react";
import { useSidebar } from "../sidebar-context";

export function DashboardHeader() {
  const { toggle } = useSidebar();

  return (
    <header className="fixed right-0 top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/80 px-4 shadow-sm backdrop-blur-md lg:w-[calc(100%-16rem)] lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
        >
          <Menu className="size-5" />
        </button>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customers, orders, or transactions..."
            className="w-full rounded-full border-none bg-muted py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden items-center gap-4 border-r border-border pr-6 md:flex">
          <button className="text-muted-foreground transition-colors hover:text-primary">
            <Bell className="size-5" />
          </button>
          <button className="text-muted-foreground transition-colors hover:text-primary">
            <Settings className="size-5" />
          </button>
          <button className="text-muted-foreground transition-colors hover:text-primary">
            <HelpCircle className="size-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-sm font-bold text-foreground">Ahmed Rizvi</p>
            <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
              System Administrator
            </p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
            AR
          </div>
        </div>
      </div>
    </header>
  );
}
