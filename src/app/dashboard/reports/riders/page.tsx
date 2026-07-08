import { Truck } from "lucide-react";

export default function ReportsRidersPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Truck className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Rider Report
          </h2>
          <p className="mt-1 text-muted-foreground">
            Rider delivery and earnings reports.
          </p>
        </div>
      </div>
    </div>
  );
}
