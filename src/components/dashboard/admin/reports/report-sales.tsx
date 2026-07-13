"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { BarChart3, TrendingUp, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

const salesData = [
  { id: 1, date: "2024-01-15", orders: 156, grossSales: "৳4,68,000", netSales: "৳4,21,200", discount: "৳18,720", refund: "৳5,600", delivery: "৳9,360", vat: "৳13,520" },
  { id: 2, date: "2024-01-14", orders: 142, grossSales: "৳4,26,000", netSales: "৳3,83,400", discount: "৳17,040", refund: "৳3,200", delivery: "৳8,520", vat: "৳13,840" },
  { id: 3, date: "2024-01-13", orders: 168, grossSales: "৳5,04,000", netSales: "৳4,53,600", discount: "৳20,160", refund: "৳1,200", delivery: "৳10,080", vat: "৳18,960" },
  { id: 4, date: "2024-01-12", orders: 134, grossSales: "৳4,02,000", netSales: "৳3,61,800", discount: "৳16,080", refund: "৳0", delivery: "৳8,040", vat: "৳16,080" },
  { id: 5, date: "2024-01-11", orders: 189, grossSales: "৳5,67,000", netSales: "৳5,10,300", discount: "৳22,680", refund: "৳4,500", delivery: "৳11,340", vat: "৳18,180" },
  { id: 6, date: "2024-01-10", orders: 121, grossSales: "৳3,63,000", netSales: "৳3,26,700", discount: "৳14,520", refund: "৳0", delivery: "৳7,260", vat: "৳14,520" },
  { id: 7, date: "2024-01-09", orders: 155, grossSales: "৳4,65,000", netSales: "৳4,18,500", discount: "৳18,600", refund: "৳2,800", delivery: "৳9,300", vat: "৳15,800" },
];

const PAGE_SIZE = 5;

export function ReportSales() {
  const [page, setPage] = useState(0);
  const total = salesData.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = salesData.slice(start, end);

  const totalOrders = salesData.reduce((s, d) => s + d.orders, 0);
  const totalNet = salesData.reduce((s, d) => s + parseInt(d.netSales.replace(/[৳,]/g, "")), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Orders (7 days)" value={totalOrders.toLocaleString()} icon={ShoppingCart} accent="right" />
        <StatCard label="Net Sales" value={`৳${totalNet.toLocaleString()}`} variant="success" icon={DollarSign} accent="right" />
        <StatCard label="Avg Daily Orders" value={Math.round(totalOrders / 7).toString()} variant="default" icon={BarChart3} accent="right" />
        <StatCard label="Avg Order Value" value={`৳${Math.round(totalNet / totalOrders).toLocaleString()}`} variant="default" icon={TrendingUp} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["DATE", "ORDERS", "GROSS SALES", "NET SALES", "DISCOUNT", "REFUND", "DELIVERY", "VAT"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((d) => (
                  <tr key={d.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3 text-sm font-medium">{d.date}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{d.orders}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{d.grossSales}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{d.netSales}</td>
                    <td className="px-4 py-3 text-sm text-rose-500">{d.discount}</td>
                    <td className="px-4 py-3 text-sm text-orange-500">{d.refund}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{d.delivery}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{d.vat}</td>
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
