"use client";

import { DataTablePagination } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { Wallet, ArrowUpRight, Search, X, MoreHorizontal, Calendar } from "lucide-react";
import { useState } from "react";

const settlementsData = [
  { id: 1, vendor: "Sultan's Dine", branch: "Dhanmondi Branch", settlementId: "SET-89218-23", date: "Oct 26, 2023", amount: "৳ 84,200", status: "Settled" },
  { id: 2, vendor: "Kacchi Bhai", branch: "Banani Outlet", settlementId: "SET-89441-23", date: "Oct 27, 2023", amount: "৳ 120,500", status: "Processing" },
  { id: 3, vendor: "Star Kabab", branch: "Firmgate", settlementId: "SET-89112-23", date: "Oct 25, 2023", amount: "৳ 45,900", status: "Flagged" },
  { id: 4, vendor: "Zaman Heritage", branch: "Banani Branch", settlementId: "SET-89345-23", date: "Oct 28, 2023", amount: "৳ 210,000", status: "Settled" },
  { id: 5, vendor: "Spice Garden", branch: "Gulshan Outlet", settlementId: "SET-89776-23", date: "Oct 29, 2023", amount: "৳ 156,800", status: "Processing" },
  { id: 6, vendor: "Sushi Master", branch: "Baridhara", settlementId: "SET-89123-23", date: "Oct 24, 2023", amount: "৳ 67,300", status: "Settled" },
  { id: 7, vendor: "Thai Orchid", branch: "Mohakhali", settlementId: "SET-89456-23", date: "Oct 30, 2023", amount: "৳ 92,400", status: "Flagged" },
  { id: 8, vendor: "Tandoori Nights", branch: "Dhanmondi", settlementId: "SET-89678-23", date: "Oct 31, 2023", amount: "৳ 178,900", status: "Processing" },
];

const PAGE_SIZE = 5;

export function VendorFinancialSettlement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState("vendor");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredSettlements = settlementsData
    .filter((s) => {
      const matchesSearch = s.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || s.branch.toLowerCase().includes(searchTerm.toLowerCase()) || s.settlementId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortField as keyof typeof a] || "";
      const bVal = b[sortField as keyof typeof b] || "";
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });

  const totalItems = filteredSettlements.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, totalItems);
  const currentSettlements = filteredSettlements.slice(start, end);
  const statuses = ["Settled", "Processing", "Flagged"];

  const handleSort = (field: string) => {
    if (sortField === field) setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDirection("asc"); }
    setCurrentPage(0);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Settled": return "default";
      case "Flagged": return "destructive";
      default: return "secondary";
    }
  };

  const getTotalOutstanding = () => {
    const total = settlementsData.filter((s) => s.status !== "Settled").reduce((sum, s) => {
      const amount = parseInt(s.amount.replace(/[৳,]/g, ""));
      return sum + amount;
    }, 0);
    return `৳ ${total.toLocaleString()}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-fraunces text-[32px] font-bold tracking-tight text-foreground">Vendor Financial Settlement</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Manage and authorize payouts for Mughal-partnered culinary establishments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Outstanding Balance" value={getTotalOutstanding()} trend="up" trendValue="+12.4%" icon={Wallet} variant="default" />
        <DarkCard
          icon={<Calendar className="size-32" />}
          title="Last Settlement"
          description="Oct 24, 2023 — Successfully processed to 12 vendors"
        >
          <Button variant="link" className="text-primary p-0 h-auto text-sm font-bold">
            View Report <ArrowUpRight className="size-4" />
          </Button>
        </DarkCard>
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
          <div className="flex flex-wrap justify-between items-center gap-4 p-6 pb-0">
            <h3 className="font-fraunces text-lg font-semibold text-foreground">Settlement Ledger</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Export CSV</Button>
            </div>
          </div>

          <div className="p-6 pb-0 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search settlements..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v ?? "all"); setCurrentPage(0); }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            {(searchTerm || statusFilter !== "all") && (
              <Button variant="ghost" onClick={() => { setSearchTerm(""); setStatusFilter("all"); setCurrentPage(0); }} className="gap-2">
                <X className="h-4 w-4" /> Clear Filters
              </Button>
            )}
          </div>

          <div className="overflow-x-auto p-6 pt-4">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["VENDOR NAME", "SETTLEMENT ID", "DATE", "AMOUNT", "STATUS", ""].map((h, i) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {i < 4 ? (
                        <button onClick={() => handleSort(["vendor", "settlementId", "date", "amount"][i])} className="flex items-center gap-1 hover:text-foreground">
                          {["vendor", "settlementId", "date", "amount"].includes(sortField) && sortField === ["vendor", "settlementId", "date", "amount"][i]
                            ? (sortDirection === "asc" ? "▲" : "▼") : ""} {h}
                        </button>
                      ) : h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentSettlements.map((item) => (
                  <tr key={item.id} className="border-t border-border/50 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/5">
                    <td className="px-4 py-3">
                      <div className="font-bold text-sm text-foreground">{item.vendor}</div>
                      <div className="text-xs text-muted-foreground">{item.branch}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{item.settlementId}</td>
                    <td className="px-4 py-3 text-sm">{item.date}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{item.amount}</td>
                    <td className="px-4 py-3">
                      <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal size={16} /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSettlements.length === 0 && <div className="text-center py-8 text-muted-foreground">No settlements found</div>}
          </div>
          {filteredSettlements.length > 0 && (
            <div className="px-6 pb-6">
              <DataTablePagination currentPage={currentPage} totalPages={totalPages} start={start} end={end} totalItems={totalItems} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
