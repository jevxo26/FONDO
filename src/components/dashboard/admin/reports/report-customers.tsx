"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Users, UserPlus, TrendingUp, Star } from "lucide-react";

const customerReports = [
  { id: 1, name: "Rahim Ahmed", orders: 24, totalSpent: "৳72,000", avgOrder: "৳3,000", subs: 1, lastOrder: "2024-01-15", ltv: "৳72,000", status: "Active" },
  { id: 2, name: "Fatima Begum", orders: 18, totalSpent: "৳45,000", avgOrder: "৳2,500", subs: 1, lastOrder: "2024-01-14", ltv: "৳45,000", status: "Active" },
  { id: 3, name: "Hasan Ali", orders: 32, totalSpent: "৳1,12,000", avgOrder: "৳3,500", subs: 2, lastOrder: "2024-01-13", ltv: "৳1,12,000", status: "Active" },
  { id: 4, name: "Nusrat Jahan", orders: 8, totalSpent: "৳16,000", avgOrder: "৳2,000", subs: 0, lastOrder: "2024-01-10", ltv: "৳16,000", status: "At Risk" },
  { id: 5, name: "Tanvir Rahman", orders: 15, totalSpent: "৳52,500", avgOrder: "৳3,500", subs: 1, lastOrder: "2024-01-12", ltv: "৳52,500", status: "Active" },
  { id: 6, name: "Kamal Hossain", orders: 42, totalSpent: "৳1,89,000", avgOrder: "৳4,500", subs: 3, lastOrder: "2024-01-15", ltv: "৳1,89,000", status: "VIP" },
  { id: 7, name: "Sharmin Akter", orders: 6, totalSpent: "৳9,600", avgOrder: "৳1,600", subs: 0, lastOrder: "2024-01-05", ltv: "৳9,600", status: "Inactive" },
];

const PAGE_SIZE = 5;

export function ReportCustomers() {
  const [page, setPage] = useState(0);
  const total = customerReports.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = customerReports.slice(start, end);

  const variantMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    Active: "default", VIP: "secondary", "At Risk": "outline", Inactive: "destructive",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Customers" value={customerReports.length.toString()} icon={Users} accent="right" />
        <StatCard label="Active" value={customerReports.filter(c => c.status === "Active" || c.status === "VIP").length.toString()} variant="success" icon={UserPlus} accent="right" />
        <StatCard label="At Risk" value={customerReports.filter(c => c.status === "At Risk").length.toString()} variant="warning" icon={TrendingUp} accent="right" />
        <StatCard label="Avg LTV" value={`৳${Math.round(customerReports.reduce((s, c) => s + parseInt(c.ltv.replace(/[৳,]/g, "")), 0) / customerReports.length).toLocaleString()}`} variant="default" icon={Star} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["CUSTOMER", "ORDERS", "TOTAL SPENT", "AVG ORDER", "SUBS", "LAST ORDER", "LTV", "STATUS"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((c) => (
                  <tr key={c.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{c.orders}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{c.totalSpent}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.avgOrder}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.subs}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.lastOrder}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{c.ltv}</td>
                    <td className="px-4 py-3"><Badge variant={variantMap[c.status]}>{c.status}</Badge></td>
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
