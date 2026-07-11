import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <BarChart3 className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Sales Report</h2>
          <p className="mt-1 text-muted-foreground">View sales performance across all channels.</p>
        </div>
      </div>
    </div>
  );
}
