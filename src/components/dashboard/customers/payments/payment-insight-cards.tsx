import { ShieldCheck, Smartphone, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PaymentInsightCards() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 border-t border-border pt-12 md:grid-cols-3">
      <div>
        <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-foreground">
          Fraud Prevention
        </h4>
        <p className="mb-4 text-sm text-muted-foreground">
          All transactions are monitored by FONDO Guard. No suspicious activities detected in the
          last 24 hours.
        </p>
        <Button variant="link" className="h-auto gap-1 p-0 text-xs font-bold">
          <ShieldCheck className="size-4" />
          Security Settings
        </Button>
      </div>

      <div>
        <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-foreground">
          Payment Methods
        </h4>
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col items-center rounded-lg border border-border bg-card p-3">
            <Smartphone className="mb-1 size-5 text-primary" />
            <span className="font-fraunces text-2xl font-bold text-foreground">65%</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Mobile Wallets
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-lg border border-border bg-card p-3">
            <CreditCard className="mb-1 size-5 text-primary" />
            <span className="font-fraunces text-2xl font-bold text-foreground">35%</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Card / Direct
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-foreground">
          Support Summary
        </h4>
        <ul className="space-y-3">
          <li className="flex justify-between text-sm">
            <span className="text-muted-foreground">Unresolved Disputes</span>
            <span className="font-bold text-destructive">3</span>
          </li>
          <li className="flex justify-between text-sm">
            <span className="text-muted-foreground">Avg. Refund Time</span>
            <span className="font-bold text-foreground">
              <Clock className="mr-1 inline size-3" />
              2.4 Days
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
