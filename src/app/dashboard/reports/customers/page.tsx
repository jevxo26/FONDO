import { Users } from "lucide-react";

export default function ReportsCustomersPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Users className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Customer Report
          </h2>
          <p className="mt-1 text-muted-foreground">
            Customer acquisition and retention reports.
          </p>
        </div>
      </div>
    </div>
  );
}
