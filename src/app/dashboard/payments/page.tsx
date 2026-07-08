import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <CreditCard className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Transactions
          </h2>
          <p className="mt-1 text-muted-foreground">
            Monitor all payment transactions across the platform.
          </p>
        </div>
      </div>
    </div>
  );
}
