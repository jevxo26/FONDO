import { Wallet } from "lucide-react";

export default function RidersEarningsPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Wallet className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">Earnings</h2>
          <p className="mt-1 text-muted-foreground">View rider earnings and payout history.</p>
        </div>
      </div>
    </div>
  );
}
