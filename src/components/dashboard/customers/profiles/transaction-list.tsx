import type { Transaction } from "@/data/customers";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Recent Transactions</h4>
        <Button variant="link" className="h-auto p-0 text-xs font-bold">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted"
          >
            <div
              className={`flex size-10 items-center justify-center rounded-full ${
                tx.type === "CREDIT"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {tx.type === "CREDIT" ? <Plus className="size-5" /> : <Minus className="size-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">{tx.title}</p>
              <p className="text-[10px] text-muted-foreground">
                #{tx.id} - {tx.description}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-bold ${
                  tx.type === "CREDIT" ? "text-success" : "text-destructive"
                }`}
              >
                {tx.type === "CREDIT" ? "+" : "-"}৳{tx.amount.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">{tx.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
