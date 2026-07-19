import { ShieldCheck, Smartphone, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PaymentInsightCards() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
        <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
        <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
        <div className="relative z-10">
          <h4 className="mb-3 text-[10px] uppercase tracking-widest text-foreground">
            Fraud Prevention
          </h4>
          <p className="mb-4 text-sm text-muted-foreground">
            All transactions are monitored by FONDO Guard. No suspicious activities detected in the
            last 24 hours.
          </p>
          <Button variant="link" className="h-auto gap-1 p-0 text-xs font-bold text-primary">
            <ShieldCheck className="size-4" />
            Security Settings
          </Button>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
        <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
        <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
        <div className="relative z-10">
          <h4 className="mb-4 text-[10px] uppercase tracking-widest text-foreground">
            Payment Methods
          </h4>
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-gradient-to-br from-primary/[0.04] via-card to-primary/[0.02] p-4 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
              <Smartphone className="mb-2 size-5 text-primary" />
              <span className="font-heading text-2xl font-bold text-foreground">65%</span>
              <span className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                Mobile Wallets
              </span>
            </div>
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-gradient-to-br from-primary/[0.04] via-card to-primary/[0.02] p-4 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
              <CreditCard className="mb-2 size-5 text-primary" />
              <span className="font-heading text-2xl font-bold text-foreground">35%</span>
              <span className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                Card / Direct
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
        <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
        <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
        <div className="relative z-10">
          <h4 className="mb-4 text-[10px] uppercase tracking-widest text-foreground">
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
    </div>
  );
}
