import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { InventoryTableSection } from "@/components/dashboard/foods/inventory/inventory-table-section";
import { inventoryItems } from "@/data/inventory";
import { Package, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export default function InventoryPage() {
  const total = inventoryItems.length;
  const inStock = inventoryItems.filter((i) => i.status === "IN_STOCK").length;
  const lowStock = inventoryItems.filter((i) => i.status === "LOW_STOCK").length;
  const outOfStock = inventoryItems.filter((i) => i.status === "OUT_OF_STOCK").length;

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Monitor food stock levels across all vendors."
        icon={Package}
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Items" value={total} icon={Package} accent="right" />
        <StatCard
          label="In Stock"
          value={inStock}
          variant="success"
          icon={CheckCircle}
          accent="right"
        />
        <StatCard
          label="Low Stock"
          value={lowStock}
          variant="warning"
          icon={AlertTriangle}
          accent="right"
        />
        <StatCard
          label="Out of Stock"
          value={outOfStock}
          variant="danger"
          icon={XCircle}
          accent="right"
        />
      </div>
      <div className="mt-8">
        <InventoryTableSection />
      </div>
    </div>
  );
}
