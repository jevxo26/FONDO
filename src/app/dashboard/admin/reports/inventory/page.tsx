import { Package, AlertTriangle, CheckCircle, TrendingDown, RefreshCw } from "lucide-react";
import { inventoryReportData } from "@/data/reports";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ReportInventorySection } from "@/components/dashboard/admin/reports/inventory/report-inventory-section";
import { DarkCard } from "@/components/dashboard/common/dark-card";
import { GlassCard } from "@/components/dashboard/common/glass-card";

export default function ReportsInventoryPage() {
  const total = inventoryReportData.length;
  const inStock = inventoryReportData.filter((i) => i.status === "IN_STOCK").length;
  const lowStock = inventoryReportData.filter((i) => i.status === "LOW_STOCK").length;
  const outOfStock = inventoryReportData.filter((i) => i.status === "OUT_OF_STOCK").length;
  const overstocked = inventoryReportData.filter((i) => i.status === "OVERSTOCKED").length;
  const avgUsage = (inventoryReportData.reduce((s, i) => s + i.usageRate, 0) / total).toFixed(1);
  const topCategory = [...inventoryReportData.reduce((acc, i) => {
    acc.set(i.category, (acc.get(i.category) || 0) + 1);
    return acc;
  }, new Map<string, number>())].sort((a, b) => b[1] - a[1])[0];

  return (
    <div>
      <PageHeader title="Inventory Report" description="Kitchen inventory usage and stock reports." icon={Package} />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Items" value={total} icon={Package} accent="bottom" />
        <StatCard label="In Stock" value={inStock} variant="success" icon={CheckCircle} accent="bottom" />
        <StatCard label="Low/Out" value={lowStock + outOfStock} variant="danger" icon={AlertTriangle} accent="bottom" />
        <StatCard label="Overstocked" value={overstocked} variant="warning" icon={TrendingDown} accent="bottom" />
      </div>
      <div className="mt-8">
        <ReportInventorySection data={inventoryReportData} />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
        <DarkCard icon={<AlertTriangle className="size-40" />} title="Out of Stock" description={`${outOfStock} items need immediate action`}>
          <div className="font-fraunces text-4xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] text-red-400">{outOfStock}</div>
          <div className="mt-2 text-sm text-white/70">{lowStock} more at low stock levels</div>
        </DarkCard>
        <GlassCard icon={<RefreshCw className="size-5 text-primary" />} title="Low Stock" value={lowStock.toString()} subtitle="Items below minimum threshold">
          <div className="mt-4 space-y-1.5">
            {inventoryReportData.filter((i) => i.status === "LOW_STOCK").slice(0, 4).map((i) => (
              <div key={i.id} className="flex justify-between text-xs"><span className="text-muted-foreground">{i.itemName}</span><span className="font-bold text-warning">{i.currentStock}/{i.minStock}</span></div>
            ))}
          </div>
        </GlassCard>
        <GlassCard icon={<Package className="size-5 text-muted-foreground" />} iconBg="bg-muted" title="Overstocked" value={overstocked.toString()} subtitle="Items exceeding 3x min stock">
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            Top category: {topCategory[0]} ({topCategory[1]} items) · Avg daily usage: {avgUsage} units
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
