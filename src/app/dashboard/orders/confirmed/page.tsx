import { CheckCircle } from "lucide-react";

export default function OrdersConfirmedPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <CheckCircle className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Confirmed Orders</h2>
          <p className="mt-1 text-muted-foreground">Orders confirmed and queued for preparation.</p>
        </div>
      </div>
    </div>
  );
}
