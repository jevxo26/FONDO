"use client";

import { useState } from "react";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { TrendingUp, DollarSign, Building2, Wallet, Repeat } from "lucide-react";

const revenueData = [
  { id: 1, source: "Platform Commission", amount: "৳1,24,560", percentage: 42, change: "+12%" },
  { id: 2, source: "Delivery Charges", amount: "৳54,300", percentage: 18, change: "+8%" },
  { id: 3, source: "Service Fees", amount: "৳38,400", percentage: 13, change: "+5%" },
  { id: 4, source: "Subscription Fees", amount: "৳32,100", percentage: 11, change: "+22%" },
  { id: 5, source: "Promotional Revenue", amount: "৳28,800", percentage: 10, change: "-3%" },
  { id: 6, source: "Wallet Charges", amount: "৳18,240", percentage: 6, change: "+15%" },
];

const PAGE_SIZE = 5;

export function ReportRevenue() {
  const [page, setPage] = useState(0);
  const total = revenueData.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = revenueData.slice(start, end);

  const totalRevenue = revenueData.reduce((s, r) => s + parseInt(r.amount.replace(/[৳,]/g, "")), 0);
  const platformRev = revenueData[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Revenue" value={`৳${totalRevenue.toLocaleString()}`} icon={DollarSign} accent="right" />
        <StatCard label="Commission" value={platformRev.amount} variant="success" icon={Building2} accent="right" />
        <StatCard label="Delivery Income" value={revenueData[1].amount} variant="default" icon={Wallet} accent="right" />
        <StatCard label="Subscriptions" value={revenueData[3].amount} variant="default" icon={Repeat} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["REVENUE SOURCE", "AMOUNT", "SHARE", "TREND"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((r) => (
                  <tr key={r.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{r.source}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{r.amount}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${r.percentage}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{r.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${r.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}>
                        {r.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 pb-6"><DataTablePagination currentPage={page} totalPages={pages} start={start} end={end} totalItems={total} onPageChange={setPage} /></div>
        </div>
      </div>
    </div>
  );
}
