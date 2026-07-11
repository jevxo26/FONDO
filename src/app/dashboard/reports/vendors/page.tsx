import { Store } from "lucide-react";

export default function ReportsVendorsPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Store className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Vendor Report</h2>
          <p className="mt-1 text-muted-foreground">
            Vendor-specific sales and performance reports.
          </p>
        </div>
      </div>
    </div>
  );
}
