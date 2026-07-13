"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { Search, X, Star, Bike, Clock, TrendingUp, Zap } from "lucide-react";

const performances = [
  { id: 1, name: "Rider Kamal", deliveries: 124, completed: 120, cancelled: 2, avgTime: "22 min", rating: 4.8, acceptance: 95, earnings: "৳45,200" },
  { id: 2, name: "Rider Faruk", deliveries: 98, completed: 95, cancelled: 1, avgTime: "18 min", rating: 4.6, acceptance: 92, earnings: "৳38,400" },
  { id: 3, name: "Rider Hasan", deliveries: 156, completed: 154, cancelled: 0, avgTime: "15 min", rating: 4.9, acceptance: 98, earnings: "৳62,800" },
  { id: 4, name: "Rider Shafiq", deliveries: 67, completed: 64, cancelled: 2, avgTime: "25 min", rating: 4.5, acceptance: 88, earnings: "৳24,500" },
  { id: 5, name: "Rider Jamil", deliveries: 201, completed: 196, cancelled: 3, avgTime: "20 min", rating: 4.7, acceptance: 93, earnings: "৳78,900" },
  { id: 6, name: "Rider Rashed", deliveries: 89, completed: 86, cancelled: 1, avgTime: "19 min", rating: 4.4, acceptance: 90, earnings: "৳32,100" },
  { id: 7, name: "Rider Siraj", deliveries: 112, completed: 108, cancelled: 2, avgTime: "21 min", rating: 4.3, acceptance: 85, earnings: "৳41,600" },
  { id: 8, name: "Rider Kabir", deliveries: 45, completed: 43, cancelled: 1, avgTime: "28 min", rating: 4.2, acceptance: 82, earnings: "৳16,800" },
];

const PAGE_SIZE = 5;

export function RidersPerformance() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("deliveries");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);

  const filtered = performances
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aVal = a[sortField as keyof typeof a] || "";
      const bVal = b[sortField as keyof typeof b] || "";
      if (typeof aVal === "string") return sortDir === "asc" ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

  const total = filtered.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = filtered.slice(start, end);

  const handleSort = (field: string) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
    setPage(0);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Deliveries" value={performances.reduce((s, p) => s + p.deliveries, 0).toLocaleString()} icon={Bike} accent="right" />
        <StatCard label="Completion Rate" value={`${Math.round(performances.reduce((s, p) => s + p.completed, 0) / performances.reduce((s, p) => s + p.deliveries, 0) * 100)}%`} variant="success" icon={TrendingUp} accent="right" />
        <StatCard label="Avg Delivery Time" value="21 min" variant="default" icon={Clock} accent="right" />
        <StatCard label="Top Performer" value="Rider Hasan" variant="default" icon={Zap} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="flex flex-wrap items-center gap-4 p-6 pb-0">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search rider..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
            </div>
            {search && (
              <Button variant="ghost" onClick={() => { setSearch(""); setPage(0); }} className="gap-2"><X className="h-4 w-4" /> Clear</Button>
            )}
          </div>

          <div className="overflow-x-auto p-6 pt-4">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["RIDER", "DELIVERIES", "COMPLETED", "CANCELLED", "AVG TIME", "RATING", "ACCEPTANCE", "EARNINGS"].map((h) => {
                    const fieldMap: Record<string, string> = { RIDER: "name", DELIVERIES: "deliveries", COMPLETED: "completed", RATING: "rating", EARNINGS: "earnings" };
                    const field = fieldMap[h];
                    return (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {field ? (
                          <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-foreground">
                            {h} {sortField === field ? (sortDir === "asc" ? "▲" : "▼") : ""}
                          </button>
                        ) : h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {current.map((p) => (
                  <tr key={p.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{p.deliveries}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.completed}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.cancelled}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.avgTime}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm"><Star className="size-3.5 text-amber-500 fill-amber-500" />{p.rating}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${p.acceptance}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{p.acceptance}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold">{p.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-8 text-muted-foreground">No data found</div>}
          </div>
          {filtered.length > 0 && (
            <div className="px-6 pb-6"><DataTablePagination currentPage={page} totalPages={pages} start={start} end={end} totalItems={total} onPageChange={setPage} /></div>
          )}
        </div>
      </div>
    </div>
  );
}
