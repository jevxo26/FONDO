import { Undo2 } from "lucide-react";

export default function PaymentsRefundsPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Undo2 className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Refunds</h2>
          <p className="mt-1 text-muted-foreground">Process and track customer refund requests.</p>
        </div>
      </div>
    </div>
  );
}
