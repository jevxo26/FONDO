import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

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

      <div className="flex flex-col justify-center rounded-xl bg-primary p-4 text-primary-foreground lg:w-[300px]">
        <p className="text-xs opacity-90">TOTAL VENDOR BALANCE</p>
        <h3 className="font-fraunces text-2xl font-bold">৳1,42,850.00</h3>
        <p className="text-xs opacity-80">48 Active Payouts</p>
      </div>
    </div>
  );
}
