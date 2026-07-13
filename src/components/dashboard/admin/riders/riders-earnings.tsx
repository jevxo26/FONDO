"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { Search, X, Wallet, TrendingUp, Star, DollarSign } from "lucide-react";

const earnings = [
  { id: 1, name: "Rider Kamal", total: "৳45,200", deliveries: 124, tips: "৳3,800", bonus: "৳2,000", avgPerDelivery: "৳364", status: "Paid", period: "Jan 2024" },
  { id: 2, name: "Rider Faruk", total: "৳38,400", deliveries: 98, tips: "৳2,900", bonus: "৳1,500", avgPerDelivery: "৳392", status: "Paid", period: "Jan 2024" },
  { id: 3, name: "Rider Hasan", total: "৳62,800", deliveries: 156, tips: "৳5,200", bonus: "৳3,000", avgPerDelivery: "৳402", status: "Pending", period: "Jan 2024" },
  { id: 4, name: "Rider Shafiq", total: "৳24,500", deliveries: 67, tips: "৳1,800", bonus: "৳1,000", avgPerDelivery: "৳366", status: "Paid", period: "Jan 2024" },
  { id: 5, name: "Rider Jamil", total: "৳78,900", deliveries: 201, tips: "৳6,500", bonus: "৳4,000", avgPerDelivery: "৳392", status: "Pending", period: "Jan 2024" },
  { id: 6, name: "Rider Rashed", total: "৳32,100", deliveries: 89, tips: "৳2,400", bonus: "৳1,200", avgPerDelivery: "৳361", status: "Paid", period: "Jan 2024" },
  { id: 7, name: "Rider Siraj", total: "৳41,600", deliveries: 112, tips: "৳3,100", bonus: "৳1,800", avgPerDelivery: "৳371", status: "Pending", period: "Jan 2024" },
  { id: 8, name: "Rider Kabir", total: "৳16,800", deliveries: 45, tips: "৳1,200", bonus: "৳600", avgPerDelivery: "৳373", status: "Paid", period: "Jan 2024" },
];

const PAGE_SIZE = 5;

export function RidersEarnings() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);

  const filtered = earnings
    .filter((e) => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || e.status === statusFilter;
      return matchSearch && matchStatus;
    });

  const total = filtered.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = filtered.slice(start, end);

  const grandTotal = earnings.reduce((s, e) => s + parseInt(e.total.replace(/[৳,]/g, "")), 0);

  const variantMap: Record<string, "default" | "secondary"> = { Paid: "default", Pending: "secondary" };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Payout" value={`৳${grandTotal.toLocaleString()}`} icon={Wallet} accent="right" />
        <StatCard label="Paid" value={earnings.filter(e => e.status === "Paid").length.toString()} variant="success" icon={DollarSign} accent="right" />
        <StatCard label="Pending" value={earnings.filter(e => e.status === "Pending").length.toString()} variant="warning" icon={TrendingUp} accent="right" />
        <StatCard label="Avg Per Rider" value={`৳${Math.round(grandTotal / earnings.length).toLocaleString()}`} variant="default" icon={Star} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="flex flex-wrap items-center gap-4 p-6 pb-0">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search rider..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v ?? "all"); setPage(0); }}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            {(search || statusFilter !== "all") && (
              <Button variant="ghost" onClick={() => { setSearch(""); setStatusFilter("all"); setPage(0); }} className="gap-2"><X className="h-4 w-4" /> Clear</Button>
            )}
          </div>

          <div className="overflow-x-auto p-6 pt-4">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["RIDER", "TOTAL", "DELIVERIES", "TIPS", "BONUS", "AVG/DELIVERY", "STATUS", "PERIOD"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((e) => (
                  <tr key={e.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{e.name}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{e.total}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{e.deliveries}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{e.tips}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{e.bonus}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{e.avgPerDelivery}</td>
                    <td className="px-4 py-3"><Badge variant={variantMap[e.status]}>{e.status}</Badge></td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{e.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-8 text-muted-foreground">No earnings found</div>}
          </div>
          {filtered.length > 0 && (
            <div className="px-6 pb-6"><DataTablePagination currentPage={page} totalPages={pages} start={start} end={end} totalItems={total} onPageChange={setPage} /></div>
          )}
        </div>
      </div>
    </div>
  );
}
