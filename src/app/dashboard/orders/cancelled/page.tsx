import { XCircle } from "lucide-react";

export default function OrdersCancelledPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <XCircle className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Cancelled Orders
          </h2>
          <p className="mt-1 text-muted-foreground">
            Orders that were cancelled or refunded.
          </p>
        </div>
      </div>
    </div>
  );
}
