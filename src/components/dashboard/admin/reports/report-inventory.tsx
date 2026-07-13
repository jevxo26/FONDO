"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Package, AlertTriangle, TrendingDown, CheckCircle2 } from "lucide-react";

const inventoryReports = [
  { id: 1, ingredient: "Basmati Rice (Aged)", vendor: "Sultan's Dine", category: "Grains", stock: 245, minStock: 50, unit: "kg", status: "In Stock" },
  { id: 2, ingredient: "Mutton (Premium)", vendor: "Kacchi Bhai", category: "Meat", stock: 38, minStock: 40, unit: "kg", status: "Low Stock" },
  { id: 3, ingredient: "Cooking Oil", vendor: "Zaman Heritage", category: "Oil", stock: 120, minStock: 30, unit: "L", status: "In Stock" },
  { id: 4, ingredient: "Yogurt", vendor: "Spice Garden", category: "Dairy", stock: 15, minStock: 25, unit: "kg", status: "Low Stock" },
  { id: 5, ingredient: "Chicken (Broiler)", vendor: "Star Kabab", category: "Meat", stock: 0, minStock: 30, unit: "kg", status: "Out of Stock" },
  { id: 6, ingredient: "Tomato", vendor: "Thai Orchid", category: "Vegetables", stock: 85, minStock: 20, unit: "kg", status: "In Stock" },
  { id: 7, ingredient: "Onion", vendor: "Tandoori Nights", category: "Vegetables", stock: 180, minStock: 40, unit: "kg", status: "In Stock" },
  { id: 8, ingredient: "Spice Mix (Garam Masala)", vendor: "Sultan's Dine", category: "Spices", stock: 8, minStock: 15, unit: "kg", status: "Low Stock" },
  { id: 9, ingredient: "Cooking Cream", vendor: "Spice Garden", category: "Dairy", stock: 22, minStock: 10, unit: "L", status: "In Stock" },
];

const PAGE_SIZE = 5;

export function ReportInventory() {
  const [page, setPage] = useState(0);
  const total = inventoryReports.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = inventoryReports.slice(start, end);

  const lowStock = inventoryReports.filter(i => i.status === "Low Stock").length;
  const outOfStock = inventoryReports.filter(i => i.status === "Out of Stock").length;

  const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    "In Stock": "default", "Low Stock": "secondary", "Out of Stock": "destructive",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Items" value={inventoryReports.length.toString()} icon={Package} accent="right" />
        <StatCard label="In Stock" value={inventoryReports.filter(i => i.status === "In Stock").length.toString()} variant="success" icon={CheckCircle2} accent="right" />
        <StatCard label="Low Stock" value={lowStock.toString()} variant="warning" icon={AlertTriangle} accent="right" />
        <StatCard label="Out of Stock" value={outOfStock.toString()} variant="danger" icon={TrendingDown} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["INGREDIENT", "VENDOR", "CATEGORY", "STOCK", "MIN STOCK", "UNIT", "STATUS"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((i) => (
                  <tr key={i.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{i.ingredient}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{i.vendor}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{i.category}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-semibold ${i.status === "Out of Stock" ? "text-rose-500" : i.status === "Low Stock" ? "text-amber-500" : ""}`}>
                        {i.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{i.minStock}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{i.unit}</td>
                    <td className="px-4 py-3"><Badge variant={variantMap[i.status]}>{i.status}</Badge></td>
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
