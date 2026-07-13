import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { Wallet } from "lucide-react";

export function VendorControls() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="group relative flex flex-1 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
        <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
        <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
        <div className="relative z-10 flex flex-wrap items-center gap-4 p-4">
          <div className="flex flex-wrap gap-2">
            {["All", "Pending", "Active", "Suspended"].map((s) => (
              <Button key={s} variant={s === "All" ? "default" : "outline"} size="sm">
                {s}
              </Button>
            ))}
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
          </Select>
        </div>
      </div>

      <DarkCard
        variant="primary"
        icon={<Wallet className="size-32" />}
        title="৳1,42,850.00"
        description="48 Active Payouts"
        className="lg:w-[300px]"
      >
        <p className="text-[11px] font-bold uppercase tracking-wider opacity-70">Total Vendor Balance</p>
      </DarkCard>
    </div>
  );
}