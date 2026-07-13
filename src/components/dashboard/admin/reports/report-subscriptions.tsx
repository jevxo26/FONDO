"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Repeat, TrendingUp, TrendingDown, Users } from "lucide-react";

const subscriptionReports = [
  { id: 1, plan: "Weekly Classic", active: 124, new: 18, renewed: 42, paused: 8, cancelled: 3, churn: "2.4%", revenue: "৳1,85,000" },
  { id: 2, plan: "Monthly Premium", active: 89, new: 12, renewed: 31, paused: 5, cancelled: 4, churn: "4.5%", revenue: "৳2,22,500" },
  { id: 3, plan: "Monthly Family", active: 67, new: 8, renewed: 22, paused: 3, cancelled: 2, churn: "3.0%", revenue: "৳2,01,000" },
  { id: 4, plan: "Bi-Weekly", active: 45, new: 5, renewed: 15, paused: 2, cancelled: 1, churn: "2.2%", revenue: "৳67,500" },
  { id: 5, plan: "Custom Plan", active: 28, new: 3, renewed: 8, paused: 1, cancelled: 0, churn: "0%", revenue: "৳1,12,000" },
];

const PAGE_SIZE = 5;

export function ReportSubscriptions() {
  const [page, setPage] = useState(0);
  const total = subscriptionReports.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = subscriptionReports.slice(start, end);

  const totalActive = subscriptionReports.reduce((s, p) => s + p.active, 0);
  const totalRevenue = subscriptionReports.reduce((s, p) => s + parseInt(p.revenue.replace(/[৳,]/g, "")), 0);
  const totalChurn = subscriptionReports.reduce((s, p) => s + p.cancelled, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Active Subscriptions" value={totalActive.toLocaleString()} icon={Repeat} accent="right" />
        <StatCard label="Monthly Revenue" value={`৳${totalRevenue.toLocaleString()}`} variant="success" icon={TrendingUp} accent="right" />
        <StatCard label="New This Week" value={subscriptionReports.reduce((s, p) => s + p.new, 0).toString()} variant="default" icon={Users} accent="right" />
        <StatCard label="Cancelled" value={totalChurn.toString()} variant="danger" icon={TrendingDown} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["PLAN", "ACTIVE", "NEW", "RENEWED", "PAUSED", "CANCELLED", "CHURN", "REVENUE"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((p) => (
                  <tr key={p.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{p.plan}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{p.active}</td>
                    <td className="px-4 py-3 text-sm text-emerald-500">{p.new}</td>
                    <td className="px-4 py-3 text-sm text-blue-500">{p.renewed}</td>
                    <td className="px-4 py-3 text-sm text-amber-500">{p.paused}</td>
                    <td className="px-4 py-3 text-sm text-rose-500">{p.cancelled}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.churn}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{p.revenue}</td>
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
