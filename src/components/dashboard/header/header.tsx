import { Bell, HelpCircle, Search, Settings } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-[calc(100%-16rem)] items-center justify-between border-b border-border bg-card/80 px-8 shadow-sm backdrop-blur-md">
      <div className="flex w-1/3 items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customers, orders, or transactions..."
            className="w-full rounded-full border-none bg-muted py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-border pr-6">
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
          <div className="text-right">
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
