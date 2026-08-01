import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { CustomerWalletTransaction } from "@/types/wallet";

function formatMoney(n: number | null | undefined) {
  return n === undefined || n === null ? "0" : n.toLocaleString();
}

function isCredit(type: string) {
  const t = type.toUpperCase();
  return t.includes("CREDIT") || t === "TOPUP" || t === "REFUND";
}

export function WalletTransactionList({
  transactions,
}: {
  transactions: CustomerWalletTransaction[];
}) {
  if (transactions.length === 0) {
    return <p className="mt-4 text-sm text-muted-foreground">No transactions yet.</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {transactions.slice(0, 20).map((tx) => {
        const credit = isCredit(tx.transactionType);
        return (
          <div key={tx.id} className="flex items-center justify-between rounded-xl bg-muted/30 p-3">
            <div className="flex items-center gap-3">
              <span className={`flex size-9 items-center justify-center rounded-lg ${credit ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                {credit ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
              </span>
              <div>
                <p className="text-sm font-semibold capitalize">{tx.transactionType.toLowerCase()}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(tx.createdAt).toLocaleDateString("en-BD")} · {tx.remarks ?? tx.referenceType ?? ""}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-fraunces text-base font-bold ${credit ? "text-success" : "text-foreground"}`}>
                {credit ? "+" : "-"}৳{formatMoney(Number(tx.amount))}
              </p>
              <p className="text-xs text-muted-foreground">Bal: ৳{formatMoney(Number(tx.balanceAfter))}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
