import { Button } from "@/components/ui/button";
import { CreditCard, Wallet } from "lucide-react";

interface WalletCardProps {
  totalHoldings: number;
  pendingRefunds: number;
}

export function WalletCard({ totalHoldings, pendingRefunds }: WalletCardProps) {
  return (
    <section className="group relative rounded-[2rem] bg-white/10 p-[1px] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
      <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-gradient-to-br from-foreground to-foreground/95 p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:p-6 lg:p-8">
        <div className="pointer-events-none absolute -top-16 -left-16 size-36 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-4 -right-4 size-24 rounded-full bg-primary/8 blur-2xl" />

        <div className="relative z-10">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                Total Assets
              </p>
              <h4 className="font-fraunces text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] md:text-4xl">
                ৳{(totalHoldings + pendingRefunds).toLocaleString()}
              </h4>
            </div>
            <Wallet className="size-8 text-primary drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
          </div>

          <div className="relative mb-8 space-y-4 text-sm">
            <div className="absolute inset-x-0 bottom-0 h-px -mb-4 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="flex items-center justify-between">
              <span className="text-white/60">Cust. Wallet Holdings</span>
              <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                ৳{totalHoldings.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Pending Refunds</span>
              <span className="text-destructive drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                ৳{pendingRefunds.toLocaleString()}
              </span>
            </div>
          </div>

          <Button className="w-full rounded-xl shadow-lg shadow-black/10">
            <CreditCard className="size-[18px]" />
            Manage Settlement
          </Button>
        </div>
      </div>
    </section>
  );
}
