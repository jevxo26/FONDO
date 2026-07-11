import { TrendingUp, PersonStanding, Wallet } from "lucide-react";

export function WalletSummaryCards() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="relative col-span-12 overflow-hidden rounded-xl bg-foreground p-4 shadow-lg md:p-6 lg:p-8 lg:col-span-5">
        <div className="absolute right-0 top-0 p-4 opacity-10">
          <Wallet className="size-32" />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-primary">
              Total Ecosystem Holdings
            </p>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-fraunces text-3xl font-bold text-primary">৳</span>
              <h2 className="font-fraunces text-3xl font-bold text-white md:text-5xl">48,92,150</h2>
            </div>
            <p className="flex items-center gap-1.5 text-sm font-bold text-success">
              <TrendingUp className="size-4" />
              +12.4% from last month
            </p>
          </div>
          <div className="mt-8 flex items-end gap-1">
            {[40, 60, 55, 85, 70, 50, 65].map((h, i) => (
              <div
                key={i}
                className={`h-full w-full rounded-t-lg transition-all duration-500 ${
                  i === 3 ? "bg-primary" : "bg-white/10"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary opacity-10 blur-3xl" />
      </div>

      <div className="col-span-12 flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-sm md:col-span-6 md:p-6 lg:p-8 lg:col-span-3">
        <div>
          <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
            <PersonStanding className="size-6" />
          </div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Active Wallets
          </p>
          <h3 className="font-fraunces text-3xl font-bold text-foreground">12,482</h3>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          84% Engagement rate in loyalty programs.
        </p>
      </div>

      <div className="relative col-span-12 flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm md:col-span-6 md:p-6 lg:p-8 lg:col-span-4">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Daily Top-ups
            </p>
            <h3 className="font-fraunces text-3xl font-bold text-foreground">৳1,42,500</h3>
          </div>
          <span className="rounded-full bg-success/10 px-3 py-1 text-[10px] font-bold text-success">
            LIVE
          </span>
        </div>
        <div className="mt-auto space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Heritage Gold</span>
              <span className="font-bold">৳82,000</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[65%] rounded-full bg-primary" />
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Standard Credits</span>
              <span className="font-bold">৳60,500</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[45%] rounded-full bg-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
