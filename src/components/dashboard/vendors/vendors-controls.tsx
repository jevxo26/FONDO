import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { Wallet } from "lucide-react";

export function VendorControls() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex flex-1 flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4">
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
