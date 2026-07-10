"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ArrowUpRight, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTablePagination } from "@/components/common/table";


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
    .filter(s => {
      const matchesSearch = s.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.settlementId.toLowerCase().includes(searchTerm.toLowerCase());
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
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(0);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(0);
  };

  const handleStatusChange = (value: string | null) => {
    setStatusFilter(value || "all");
    setCurrentPage(0);
  };

  const getStatusVariant = (status: string) => {
    switch(status) {
      case "Settled": return "default";
      case "Flagged": return "destructive";
      default: return "secondary";
    }
  };

  const getTotalOutstanding = () => {
    const total = settlementsData
      .filter(s => s.status !== "Settled")
      .reduce((sum, s) => {
        const amount = parseInt(s.amount.replace(/[৳,]/g, ''));
        return sum + amount;
      }, 0);
    return `৳ ${total.toLocaleString()}`;
  };

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">Vendor Financial Settlement</h1>
        <p className="text-slate-500">Manage and authorize payouts for Mughal-partnered culinary establishments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 col-span-2 flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-wide">Total Outstanding Balance</p>
            <h2 className="text-4xl font-bold mt-2">{getTotalOutstanding()}</h2>
            <p className="text-green-600 text-sm mt-1 flex items-center">
              <ArrowUpRight size={16} /> +12.4% from last month
            </p>
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600">Process Settlement</Button>
        </Card>

        <Card className="p-6 bg-slate-900 text-white">
          <p className="text-sm text-slate-400">LAST SETTLEMENT</p>
          <h3 className="text-xl font-bold mt-2">Oct 24, 2023</h3>
          <p className="text-sm text-slate-400 mt-1">Successfully processed to 12 vendors</p>
          <Button variant="link" className="text-amber-400 p-0 mt-4 h-auto">View Report →</Button>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <h3 className="text-xl font-bold">Settlement Ledger</h3>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export CSV</Button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search settlements..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(searchTerm || statusFilter !== "all") && (
            <Button variant="ghost" onClick={handleClearFilters} className="gap-2">
              <X className="h-4 w-4" /> Clear Filters
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button onClick={() => handleSort("vendor")} className="flex items-center gap-1 hover:text-foreground">
                    VENDOR NAME
                    {sortField === "vendor" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button onClick={() => handleSort("settlementId")} className="flex items-center gap-1 hover:text-foreground">
                    SETTLEMENT ID
                    {sortField === "settlementId" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button onClick={() => handleSort("date")} className="flex items-center gap-1 hover:text-foreground">
                    DATE
                    {sortField === "date" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button onClick={() => handleSort("amount")} className="flex items-center gap-1 hover:text-foreground">
                    AMOUNT
                    {sortField === "amount" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button onClick={() => handleSort("status")} className="flex items-center gap-1 hover:text-foreground">
                    STATUS
                    {sortField === "status" && (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </button>
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentSettlements.map((item) => (
                <tr key={item.id} className="border-t hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-bold">{item.vendor}</div>
                    <div className="text-xs text-slate-500">{item.branch}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{item.settlementId}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3 font-semibold">{item.amount}</td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSettlements.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No settlements found</div>
          )}
        </div>

        {filteredSettlements.length > 0 && (
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            start={start}
            end={end}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
          />
        )}
      </Card>
    </div>
  );
}