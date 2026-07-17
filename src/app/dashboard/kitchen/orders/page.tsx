"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ClipboardList } from "lucide-react";
import { kitchenOrders, type KitchenOrder } from "@/data/kitchen";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { KitchenSummaryCards } from "@/components/dashboard/kitchen/kitchen-summary-cards";
import { KitchenOrderTable } from "@/components/dashboard/kitchen/kitchen-order-table";

export default function KitchenOrdersPage() {
  const [orders, setOrders] = useState(kitchenOrders);

  const updateStatus = (id: string, status: KitchenOrder["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const queued = orders.filter((o) => o.status === "QUEUED").length;
  const preparing = orders.filter((o) => o.status === "PREPARING").length;
  const ready = orders.filter((o) => o.status === "READY").length;

  return (
    <div>
      <PageHeader title="Order Queue" description="View and manage incoming meal orders." icon={ClipboardList} />
      <KitchenSummaryCards queued={queued} preparing={preparing} ready={ready} total={orders.length} />
      <div className="mt-8">
        <KitchenOrderTable
          data={orders}
          onStartPrep={(o) => { updateStatus(o.id, "PREPARING"); toast.success(`${o.orderNumber} started`); }}
          onMarkReady={(o) => { updateStatus(o.id, "READY"); toast.success(`${o.orderNumber} marked ready`); }}
          onMarkPacked={(o) => { updateStatus(o.id, "PACKED"); toast.success(`${o.orderNumber} packed`); }}
        />
      </div>
    </div>
  );
}
