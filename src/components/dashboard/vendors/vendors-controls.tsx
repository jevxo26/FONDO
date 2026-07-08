import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export function VendorControls() {
  return (
    <div className="flex gap-6">
      <div className="flex-1 flex gap-4 items-center bg-card p-4 rounded-xl border border-border">
        <div className="flex gap-2">
          {["All", "Pending", "Active", "Suspended"].map((s) => (
            <Button key={s} variant={s === "All" ? "default" : "outline"} size="sm">{s}</Button>
          ))}
        </div>
        <Select>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Regions" /></SelectTrigger>
        </Select>
      </div>
      
      <Card className="w-[300px] bg-primary p-4 text-primary-foreground">
        <p className="text-xs opacity-90">TOTAL VENDOR BALANCE</p>
        <h3 className="text-2xl font-bold">৳1,42,850.00</h3>
        <p className="text-xs">48 Active Payouts</p>
      </Card>
    </div>
  );
}