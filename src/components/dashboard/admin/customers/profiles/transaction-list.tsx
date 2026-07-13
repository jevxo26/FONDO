import type { Transaction } from "@/data/customers";
import { Minus, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/dashboard/common/glass-card";
import { Receipt } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <GlassCard
      icon={<Receipt className="size-5 text-primary" />}
      iconBg="bg-primary/10"
      title="Recent Transactions"
      value={transactions.length.toString()}
      subtitle="total transactions"
    >
      <div className="mt-4 space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted"
          >
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                tx.type === "CREDIT"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {tx.type === "CREDIT" ? <Plus className="size-4" /> : <Minus className="size-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground">{tx.title}</p>
              <p className="text-[10px] text-muted-foreground truncate">#{tx.id} - {tx.description}</p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-sm font-bold ${tx.type === "CREDIT" ? "text-success" : "text-destructive"}`}>
                {tx.type === "CREDIT" ? "+" : "-"}৳{tx.amount.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">{tx.time}</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="ghost" className="mt-3 w-full gap-1 text-xs font-bold text-muted-foreground hover:text-primary">
        View All <ArrowUpRight className="size-3" />
      </Button>
    </GlassCard>
  );
}
