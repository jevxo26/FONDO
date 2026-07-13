"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { DataTablePagination } from "@/components/common/table";
import { Search, X, ArrowLeftRight, Calendar, ArrowUpRight, Wallet, CheckCircle2, AlertTriangle } from "lucide-react";

const settlements = [
  { id: 1, vendor: "Sultan's Dine", period: "Jan 1-15, 2024", amount: "৳84,200", orders: 142, status: "Settled", date: "2024-01-20" },
  { id: 2, vendor: "Kacchi Bhai", period: "Jan 1-15, 2024", amount: "৳1,20,500", orders: 215, status: "Processing", date: "2024-01-20" },
  { id: 3, vendor: "Star Kabab", period: "Dec 16-31, 2023", amount: "৳45,900", orders: 78, status: "Flagged", date: "2024-01-05" },
  { id: 4, vendor: "Zaman Heritage", period: "Jan 1-15, 2024", amount: "৳2,10,000", orders: 310, status: "Settled", date: "2024-01-20" },
  { id: 5, vendor: "Spice Garden", period: "Jan 1-15, 2024", amount: "৳1,56,800", orders: 198, status: "Processing", date: "2024-01-20" },
  { id: 6, vendor: "Thai Orchid", period: "Dec 16-31, 2023", amount: "৳92,400", orders: 134, status: "Flagged", date: "2024-01-05" },
  { id: 7, vendor: "Tandoori Nights", period: "Jan 1-15, 2024", amount: "৳1,78,900", orders: 267, status: "Processing", date: "2024-01-20" },
  { id: 8, vendor: "Pizza House", period: "Dec 16-31, 2023", amount: "৳67,300", orders: 112, status: "Settled", date: "2024-01-05" },
];

const PAGE_SIZE = 5;
const statuses = ["Settled", "Processing", "Flagged"];

export function PaymentSettlements() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);

  const filtered = settlements
    .filter((s) => {
      const matchSearch = s.vendor.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || s.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortField as keyof typeof a] || "";
      const bVal = b[sortField as keyof typeof b] || "";
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });

  const total = filtered.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = filtered.slice(start, end);

  const handleSort = (field: string) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
    setPage(0);
  };

  const totalOutstanding = settlements
    .filter(s => s.status !== "Settled")
    .reduce((s, item) => s + parseInt(item.amount.replace(/[৳,]/g, "")), 0);

  const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    Settled: "default", Processing: "secondary", Flagged: "destructive",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Outstanding" value={`৳${totalOutstanding.toLocaleString()}`} icon={Wallet} accent="right" />
        <StatCard label="Settled" value={settlements.filter(s => s.status === "Settled").length.toString()} variant="success" icon={CheckCircle2} accent="right" />
        <DarkCard icon={<Calendar className="size-32" />} title="Last Settlement" description="Jan 20, 2024 — Processed to 4 vendors">
          <Button variant="link" className="text-primary p-0 h-auto text-sm font-bold">
            View Report <ArrowUpRight className="size-4" />
          </Button>
        </DarkCard>
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 pb-0">
            <h3 className="font-fraunces text-lg font-semibold text-foreground">Settlement Ledger</h3>
            <Button variant="outline" size="sm">Export CSV</Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 p-6 pb-0">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vendor..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v ?? "all"); setPage(0); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            {(search || statusFilter !== "all") && (
              <Button variant="ghost" onClick={() => { setSearch(""); setStatusFilter("all"); setPage(0); }} className="gap-2">
                <X className="h-4 w-4" /> Clear
              </Button>
            )}
          </div>

          <div className="overflow-x-auto p-6 pt-4">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["VENDOR", "PERIOD", "AMOUNT", "ORDERS", "STATUS", "DATE"].map((h) => {
                    const fieldMap: Record<string, string> = { VENDOR: "vendor", AMOUNT: "amount", ORDERS: "orders", DATE: "date" };
                    const field = fieldMap[h];
                    return (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {field ? (
                          <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-foreground">
                            {h} {sortField === field ? (sortDir === "asc" ? "▲" : "▼") : ""}
                          </button>
                        ) : h }
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {current.map((s) => (
                  <tr key={s.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{s.vendor}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{s.period}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{s.amount}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{s.orders}</td>
                    <td className="px-4 py-3"><Badge variant={variantMap[s.status]}>{s.status}</Badge></td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{s.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-8 text-muted-foreground">No settlements found</div>}
          </div>
          {filtered.length > 0 && (
            <div className="px-6 pb-6"><DataTablePagination currentPage={page} totalPages={pages} start={start} end={end} totalItems={total} onPageChange={setPage} /></div>
          )}
        </div>
      </div>
    </div>
  );
}
