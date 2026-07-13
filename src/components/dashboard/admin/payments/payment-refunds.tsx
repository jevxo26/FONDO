"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Search, X, Undo2, CheckCircle2, XCircle, Clock } from "lucide-react";

const refunds = [
  { id: 1, customer: "Hasan Ali", order: "#ORD-1024", amount: "৳3,200", reason: "Wrong item delivered", status: "Completed", date: "2024-01-15" },
  { id: 2, customer: "Tanvir Rahman", order: "#ORD-1021", amount: "৳5,600", reason: "Order cancelled by customer", status: "Completed", date: "2024-01-14" },
  { id: 3, customer: "Sharmin Akter", order: "#ORD-1018", amount: "৳1,200", reason: "Delivery delayed 2+ hours", status: "Processing", date: "2024-01-14" },
  { id: 4, customer: "Nusrat Jahan", order: "#ORD-1015", amount: "৳2,100", reason: "Quality issues reported", status: "Pending", date: "2024-01-13" },
  { id: 5, customer: "Rahim Ahmed", order: "#ORD-1012", amount: "৳980", reason: "Duplicate payment", status: "Completed", date: "2024-01-12" },
  { id: 6, customer: "Fatima Begum", order: "#ORD-1009", amount: "৳4,500", reason: "Missing items from order", status: "Rejected", date: "2024-01-11" },
];

const PAGE_SIZE = 5;
const statuses = ["Pending", "Processing", "Completed", "Rejected"];

export function PaymentRefunds() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);

  const filtered = refunds
    .filter((r) => {
      const matchSearch = r.customer.toLowerCase().includes(search.toLowerCase()) || r.order.toLowerCase().includes(search.toLowerCase()) || r.reason.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });

  const total = filtered.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = filtered.slice(start, end);

  const totalRefund = refunds.filter(r => r.status === "Completed").reduce((s, r) => s + parseInt(r.amount.replace(/[৳,]/g, "")), 0);

  const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    Completed: "default", Processing: "secondary", Pending: "outline", Rejected: "destructive",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Refunded" value={`৳${totalRefund.toLocaleString()}`} icon={Undo2} accent="right" />
        <StatCard label="Completed" value={refunds.filter(r => r.status === "Completed").length.toString()} variant="success" icon={CheckCircle2} accent="right" />
        <StatCard label="Processing" value={refunds.filter(r => r.status === "Processing").length.toString()} variant="warning" icon={Clock} accent="right" />
        <StatCard label="Rejected" value={refunds.filter(r => r.status === "Rejected").length.toString()} variant="danger" icon={XCircle} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="flex flex-wrap items-center gap-4 p-6 pb-0">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customer, order or reason..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
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
                  {["CUSTOMER", "ORDER", "AMOUNT", "REASON", "STATUS", "DATE"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((r) => (
                  <tr key={r.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{r.customer}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{r.order}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{r.amount}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground max-w-[200px] truncate">{r.reason}</td>
                    <td className="px-4 py-3"><Badge variant={variantMap[r.status]}>{r.status}</Badge></td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-8 text-muted-foreground">No refunds found</div>}
          </div>
          {filtered.length > 0 && (
            <div className="px-6 pb-6"><DataTablePagination currentPage={page} totalPages={pages} start={start} end={end} totalItems={total} onPageChange={setPage} /></div>
          )}
        </div>
      </div>
    </div>
  );
}
