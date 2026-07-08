import { CreditCard, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function PaymentSummaryCards() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="relative col-span-12 overflow-hidden rounded-xl bg-foreground p-4 shadow-lg md:p-6 md:col-span-7 lg:p-8">
        <div className="absolute right-0 top-0 p-4 opacity-10">
          <CreditCard className="size-32" />
        </div>
        <div className="relative z-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-primary">
            Total Revenue Collected
          </p>
          <div className="mb-6 flex items-baseline gap-2">
            <span className="font-fraunces text-3xl font-bold text-primary">৳</span>
            <h2 className="font-fraunces text-3xl font-bold text-white md:text-5xl">1,42,850.00</h2>
          </div>
          <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Growth
              </p>
              <p className="flex items-center font-bold text-success">
                <TrendingUp className="mr-1 size-4" />
                +12.4%
              </p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Successful
              </p>
              <p className="font-bold text-white">2,143 Tx</p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Avg. Order
              </p>
              <p className="font-bold text-white">৳1,250</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-sm md:col-span-5 md:p-6 lg:p-8">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Pending Payouts
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-fraunces text-2xl font-bold text-primary">৳</span>
            <h2 className="font-fraunces text-3xl font-bold text-foreground">28,400.00</h2>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-4 h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: '65%' }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm italic text-muted-foreground">
              Next payout scheduled: Oct 24
            </span>
            <Button variant="link" className="h-auto p-0 text-xs font-bold">Process Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
