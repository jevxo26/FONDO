import { Button } from '@/components/ui/button';
import { CreditCard, Wallet } from 'lucide-react';

interface WalletCardProps {
  totalHoldings: number;
  pendingRefunds: number;
}

export function WalletCard({ totalHoldings, pendingRefunds }: WalletCardProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-foreground p-8 text-white shadow-xl">
      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
              Total Assets
            </p>
            <h4 className="font-fraunces text-4xl font-bold">
              ৳{(totalHoldings + pendingRefunds).toLocaleString()}
            </h4>
          </div>
          <Wallet className="size-8 text-primary" />
        </div>

        <div className="mb-8 space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-white/60">Cust. Wallet Holdings</span>
            <span>৳{totalHoldings.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/60">Pending Refunds</span>
            <span className="text-destructive">৳{pendingRefunds.toLocaleString()}</span>
          </div>
        </div>

        <Button className="w-full rounded-xl">
          <CreditCard className="size-[18px]" />
          Manage Settlement
        </Button>
      </div>
      <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-primary/10 blur-3xl" />
    </section>
  );
}
