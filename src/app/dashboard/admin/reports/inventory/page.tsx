import { Package, AlertTriangle, CheckCircle, RefreshCw, TrendingDown } from "lucide-react";
import { inventoryReportData } from "@/data/reports";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportInventorySection } from "@/components/dashboard/admin/reports/report-inventory-section";
import { DarkCard } from "@/components/dashboard/common/dark-card";

export default function ReportsInventoryPage() {
  const total = inventoryReportData.length;
  const inStock = inventoryReportData.filter((i) => i.status === "IN_STOCK").length;
  const lowStock = inventoryReportData.filter((i) => i.status === "LOW_STOCK" || i.status === "OUT_OF_STOCK").length;
  const overstocked = inventoryReportData.filter((i) => i.status === "OVERSTOCKED").length;
  const outOfStock = inventoryReportData.filter((i) => i.status === "OUT_OF_STOCK").length;

  return (
    <div>
      <PageHeader
        title="Inventory Report"
        description="Kitchen inventory usage and stock reports."
        icon={Package}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Items" value={total} icon={Package} accent="left" />
        <StatCard label="In Stock" value={inStock} variant="success" icon={CheckCircle} accent="left" />
        <StatCard label="Low/Out" value={lowStock} variant="danger" icon={AlertTriangle} accent="left" />
        <StatCard label="Overstocked" value={overstocked} variant="warning" icon={TrendingDown} accent="left" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          <ReportInventorySection data={inventoryReportData} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <DarkCard
            icon={<RefreshCw className="size-40" />}
            title="Stock Alerts"
            description={`${lowStock} items need attention`}
          >
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Out of Stock</p>
                <p className="mt-1 text-base font-bold text-destructive">{outOfStock}</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Low Stock</p>
                <p className="mt-1 text-base font-bold text-warning">{lowStock - outOfStock}</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Overstocked</p>
                <p className="mt-1 text-base font-bold text-white">{overstocked}</p>
              </div>
            </div>
          </DarkCard>
        </div>
      </div>
    </div>
  );
}
