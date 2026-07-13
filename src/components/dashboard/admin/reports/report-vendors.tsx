"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Store, TrendingUp, Star, DollarSign } from "lucide-react";

const vendorReports = [
  { id: 1, vendor: "Sultan's Dine", orders: 312, completed: 298, revenue: "৳9,36,000", commission: "৳1,40,400", avgRating: 4.7, status: "Active" },
  { id: 2, vendor: "Kacchi Bhai", orders: 245, completed: 238, revenue: "৳7,35,000", commission: "৳1,10,250", avgRating: 4.5, status: "Active" },
  { id: 3, vendor: "Zaman Heritage", orders: 189, completed: 185, revenue: "৳5,67,000", commission: "৳85,050", avgRating: 4.8, status: "Active" },
  { id: 4, vendor: "Spice Garden", orders: 156, completed: 150, revenue: "৳4,68,000", commission: "৳70,200", avgRating: 4.3, status: "Active" },
  { id: 5, vendor: "Star Kabab", orders: 98, completed: 92, revenue: "৳2,94,000", commission: "৳44,100", avgRating: 4.1, status: "Suspended" },
  { id: 6, vendor: "Thai Orchid", orders: 134, completed: 130, revenue: "৳4,02,000", commission: "৳60,300", avgRating: 4.4, status: "Active" },
  { id: 7, vendor: "Tandoori Nights", orders: 201, completed: 196, revenue: "৳6,03,000", commission: "৳90,450", avgRating: 4.6, status: "Active" },
];

const PAGE_SIZE = 5;

export function ReportVendors() {
  const [page, setPage] = useState(0);
  const total = vendorReports.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = vendorReports.slice(start, end);

  const totalRevenue = vendorReports.reduce((s, v) => s + parseInt(v.revenue.replace(/[৳,]/g, "")), 0);
  const totalCommission = vendorReports.filter(v => v.status === "Active").reduce((s, v) => s + parseInt(v.commission.replace(/[৳,]/g, "")), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Active Vendors" value={vendorReports.filter(v => v.status === "Active").length.toString()} icon={Store} accent="right" />
        <StatCard label="Total Revenue" value={`৳${totalRevenue.toLocaleString()}`} variant="success" icon={TrendingUp} accent="right" />
        <StatCard label="Commission Earned" value={`৳${totalCommission.toLocaleString()}`} variant="default" icon={DollarSign} accent="right" />
        <StatCard label="Avg Rating" value={(vendorReports.reduce((s, v) => s + v.avgRating, 0) / vendorReports.length).toFixed(1)} variant="default" icon={Star} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["VENDOR", "ORDERS", "COMPLETED", "REVENUE", "COMMISSION", "RATING", "STATUS"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((v) => (
                  <tr key={v.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{v.vendor}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{v.orders}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{v.completed}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{v.revenue}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{v.commission}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1 text-sm"><Star className="size-3.5 text-amber-500 fill-amber-500" />{v.avgRating}</div></td>
                    <td className="px-4 py-3"><Badge variant={v.status === "Active" ? "default" : "destructive"}>{v.status}</Badge></td>
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
