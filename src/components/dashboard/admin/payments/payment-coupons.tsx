"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Search, X, TicketPercent, CheckCircle2, Clock, Ban } from "lucide-react";

const coupons = [
  { id: 1, code: "WELCOME25", discount: "25% Off", type: "Percentage", usage: 342, limit: 500, status: "Active", endDate: "2024-03-31" },
  { id: 2, code: "FREEDEL60", discount: "৳60 Off", type: "Flat", usage: 189, limit: 300, status: "Active", endDate: "2024-02-28" },
  { id: 3, code: "FESTIVE50", discount: "50% Off", type: "Percentage", usage: 512, limit: 500, status: "Expired", endDate: "2024-01-01" },
  { id: 4, code: "BOGO", discount: "Buy 1 Get 1", type: "Promo", usage: 45, limit: 100, status: "Active", endDate: "2024-04-15" },
  { id: 5, code: "NEWUSER", discount: "20% Off", type: "Percentage", usage: 678, limit: 1000, status: "Active", endDate: "2024-06-30" },
  { id: 6, code: "FLAT100", discount: "৳100 Off", type: "Flat", usage: 89, limit: 200, status: "Paused", endDate: "2024-03-15" },
  { id: 7, code: "FIRSTORDER", discount: "15% Off", type: "Percentage", usage: 1024, limit: 1000, status: "Expired", endDate: "2023-12-31" },
];

const PAGE_SIZE = 5;
const statuses = ["Active", "Paused", "Expired"];

export function PaymentCoupons() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);

  const filtered = coupons
    .filter((c) => {
      const matchSearch = c.code.toLowerCase().includes(search.toLowerCase()) || c.discount.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });

  const total = filtered.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = filtered.slice(start, end);

  const activeCoupons = coupons.filter(c => c.status === "Active").length;

  const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    Active: "default", Paused: "secondary", Expired: "outline",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Active Coupons" value={activeCoupons.toString()} icon={TicketPercent} accent="right" />
        <StatCard label="Total Used" value={coupons.reduce((s, c) => s + c.usage, 0).toLocaleString()} variant="success" icon={CheckCircle2} accent="right" />
        <StatCard label="Paused" value={coupons.filter(c => c.status === "Paused").length.toString()} variant="warning" icon={Clock} accent="right" />
        <StatCard label="Expired" value={coupons.filter(c => c.status === "Expired").length.toString()} variant="danger" icon={Ban} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="flex flex-wrap items-center gap-4 p-6 pb-0">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search coupon code..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
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
                  {["CODE", "DISCOUNT", "TYPE", "USAGE", "LIMIT", "STATUS", "EXPIRY"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((c) => {
                  const usagePercent = Math.round((c.usage / c.limit) * 100);
                  const overUsed = c.usage > c.limit;
                  return (
                    <tr key={c.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                      <td className="px-4 py-3">
                        <code className="rounded-md bg-primary/10 px-2 py-1 text-sm font-mono font-semibold text-primary">{c.code}</code>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold">{c.discount}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{c.type}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{c.usage}/{c.limit}</span>
                          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className={`h-full rounded-full ${overUsed ? "bg-destructive" : "bg-primary"}`} style={{ width: `${Math.min(usagePercent, 100)}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{c.limit}</td>
                      <td className="px-4 py-3"><Badge variant={variantMap[c.status]}>{c.status}</Badge></td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{c.endDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-8 text-muted-foreground">No coupons found</div>}
          </div>
          {filtered.length > 0 && (
            <div className="px-6 pb-6"><DataTablePagination currentPage={page} totalPages={pages} start={start} end={end} totalItems={total} onPageChange={setPage} /></div>
          )}
        </div>
      </div>
    </div>
  );
}
