"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Search, X, CreditCard, Landmark, Smartphone, Wallet } from "lucide-react";

const transactions = [
  { id: 1, customer: "Rahim Ahmed", method: "bKash", amount: "৳2,499", status: "Success", date: "2024-01-15", gateway: "bKash Merchant" },
  { id: 2, customer: "Fatima Begum", method: "Nagad", amount: "৳1,850", status: "Success", date: "2024-01-15", gateway: "Nagad Gateway" },
  { id: 3, customer: "Hasan Ali", method: "Card", amount: "৳3,200", status: "Failed", date: "2024-01-14", gateway: "SSL Commerz" },
  { id: 4, customer: "Nusrat Jahan", method: "COD", amount: "৳1,200", status: "Pending", date: "2024-01-14", gateway: "—" },
  { id: 5, customer: "Kamal Hossain", method: "bKash", amount: "৳4,500", status: "Success", date: "2024-01-14", gateway: "bKash Merchant" },
  { id: 6, customer: "Sharmin Akter", method: "Wallet", amount: "৳2,100", status: "Success", date: "2024-01-13", gateway: "FONDO Wallet" },
  { id: 7, customer: "Tanvir Rahman", method: "Card", amount: "৳5,600", status: "Refunded", date: "2024-01-13", gateway: "SSL Commerz" },
  { id: 8, customer: "Ayesha Khatun", method: "Nagad", amount: "৳980", status: "Success", date: "2024-01-12", gateway: "Nagad Gateway" },
];

const PAGE_SIZE = 5;
const statuses = ["Success", "Pending", "Failed", "Refunded"];
const methods = ["bKash", "Nagad", "Card", "COD", "Wallet"];

export function PaymentTransactions() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);

  const filtered = transactions
    .filter((t) => {
      const matchSearch = t.customer.toLowerCase().includes(search.toLowerCase()) || t.gateway.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      const matchMethod = methodFilter === "all" || t.method === methodFilter;
      return matchSearch && matchStatus && matchMethod;
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

  const totalRevenue = transactions.filter(t => t.status === "Success").reduce((s, t) => s + parseInt(t.amount.replace(/[৳,]/g, "")), 0);

  const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    Success: "default", Pending: "secondary", Failed: "destructive", Refunded: "outline",
  };

  const iconMap: Record<string, typeof CreditCard> = {
    bKash: Smartphone, Nagad: Smartphone, Card: CreditCard, COD: Landmark, Wallet,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Revenue" value={`৳${totalRevenue.toLocaleString()}`} icon={Wallet} accent="right" />
        <StatCard label="Successful" value={transactions.filter(t => t.status === "Success").length.toString()} variant="success" icon={CreditCard} accent="right" />
        <StatCard label="Failed" value={transactions.filter(t => t.status === "Failed").length.toString()} variant="danger" icon={CreditCard} accent="right" />
        <StatCard label="Today" value={transactions.filter(t => t.date === "2024-01-15").length.toString()} variant="default" icon={CreditCard} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="flex flex-wrap items-center gap-4 p-6 pb-0">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customer or gateway..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v ?? "all"); setPage(0); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={(v) => { setMethodFilter(v ?? "all"); setPage(0); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Method" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                {methods.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
            {(search || statusFilter !== "all" || methodFilter !== "all") && (
              <Button variant="ghost" onClick={() => { setSearch(""); setStatusFilter("all"); setMethodFilter("all"); setPage(0); }} className="gap-2">
                <X className="h-4 w-4" /> Clear
              </Button>
            )}
          </div>

          <div className="overflow-x-auto p-6 pt-4">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["CUSTOMER", "AMOUNT", "METHOD", "STATUS", "GATEWAY", "DATE"].map((h) => {
                    const fieldMap: Record<string, string> = { CUSTOMER: "customer", AMOUNT: "amount", METHOD: "method", DATE: "date", GATEWAY: "gateway" };
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
                {current.map((t) => {
                  const Icon = iconMap[t.method] || CreditCard;
                  return (
                    <tr key={t.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="size-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{t.customer}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold">{t.amount}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{t.method}</td>
                      <td className="px-4 py-3"><Badge variant={variantMap[t.status]}>{t.status}</Badge></td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{t.gateway}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{t.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-8 text-muted-foreground">No transactions found</div>}
          </div>
          {filtered.length > 0 && (
            <div className="px-6 pb-6"><DataTablePagination currentPage={page} totalPages={pages} start={start} end={end} totalItems={total} onPageChange={setPage} /></div>
          )}
        </div>
      </div>
    </div>
  );
}
