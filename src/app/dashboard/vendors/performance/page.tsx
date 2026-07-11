import { TrendingUp } from "lucide-react";

export default function VendorsPerformancePage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <TrendingUp className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Vendor Performance</h2>
          <p className="mt-1 text-muted-foreground">
            Analyze vendor performance metrics and ratings.
          </p>
        </div>
      </div>
    </div>
  );
}
