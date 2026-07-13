"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Truck, Star, Clock, TrendingUp } from "lucide-react";

const riderReports = [
  { id: 1, name: "Rider Hasan", deliveries: 156, completed: 154, failed: 2, avgTime: "15 min", rating: 4.9, earnings: "৳62,800", zone: "Dhanmondi" },
  { id: 2, name: "Rider Kamal", deliveries: 124, completed: 120, failed: 2, avgTime: "22 min", rating: 4.8, earnings: "৳45,200", zone: "Gulshan" },
  { id: 3, name: "Rider Jamil", deliveries: 201, completed: 196, failed: 2, avgTime: "20 min", rating: 4.7, earnings: "৳78,900", zone: "Mohakhali" },
  { id: 4, name: "Rider Faruk", deliveries: 98, completed: 95, failed: 2, avgTime: "18 min", rating: 4.6, earnings: "৳38,400", zone: "Banani" },
  { id: 5, name: "Rider Shafiq", deliveries: 67, completed: 64, failed: 1, avgTime: "25 min", rating: 4.5, earnings: "৳24,500", zone: "Uttara" },
  { id: 6, name: "Rider Rashed", deliveries: 89, completed: 86, failed: 2, avgTime: "19 min", rating: 4.4, earnings: "৳32,100", zone: "Baridhara" },
  { id: 7, name: "Rider Siraj", deliveries: 112, completed: 108, failed: 2, avgTime: "21 min", rating: 4.3, earnings: "৳41,600", zone: "Mirpur" },
];

const PAGE_SIZE = 5;

export function ReportRiders() {
  const [page, setPage] = useState(0);
  const total = riderReports.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = riderReports.slice(start, end);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Riders" value={riderReports.length.toString()} icon={Truck} accent="right" />
        <StatCard label="Total Deliveries" value={riderReports.reduce((s, r) => s + r.deliveries, 0).toLocaleString()} variant="success" icon={TrendingUp} accent="right" />
        <StatCard label="Success Rate" value={`${Math.round(riderReports.reduce((s, r) => s + r.completed, 0) / riderReports.reduce((s, r) => s + r.deliveries, 0) * 100)}%`} variant="default" icon={Clock} accent="right" />
        <StatCard label="Avg Rating" value={(riderReports.reduce((s, r) => s + r.rating, 0) / riderReports.length).toFixed(1)} variant="default" icon={Star} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["RIDER", "ZONE", "DELIVERIES", "COMPLETED", "FAILED", "AVG TIME", "RATING", "EARNINGS"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((r) => (
                  <tr key={r.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{r.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{r.zone}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{r.deliveries}</td>
                    <td className="px-4 py-3 text-sm text-emerald-500">{r.completed}</td>
                    <td className="px-4 py-3 text-sm text-rose-500">{r.failed}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{r.avgTime}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1 text-sm"><Star className="size-3.5 text-amber-500 fill-amber-500" />{r.rating}</div></td>
                    <td className="px-4 py-3 text-sm font-semibold">{r.earnings}</td>
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
