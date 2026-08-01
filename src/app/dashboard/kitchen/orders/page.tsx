"use client";

import { ClipboardList, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { KitchenSummaryCards } from "@/components/dashboard/kitchen/kitchen-summary-cards";
import { KitchenOrderTable } from "@/components/dashboard/kitchen/kitchen-order-table";
import { useKitchenQueuePage } from "@/hooks/use-kitchen-queue";

export default function KitchenOrdersPage() {
  const { orders, queued, preparing, ready, isLoading, handleStartPrep, handleMarkReady } =
    useKitchenQueuePage();

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Order Queue" description="View and manage incoming meal orders." icon={ClipboardList} />
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Order Queue" description="View and manage incoming meal orders." icon={ClipboardList} />
      <KitchenSummaryCards queued={queued.length} preparing={preparing.length} ready={ready.length} total={orders.length} />
      <div className="mt-8">
        <KitchenOrderTable
          data={orders}
          onStartPrep={(o) => handleStartPrep(o.id, o.orderNumber)}
          onMarkReady={(o) => handleMarkReady(o.id, o.orderNumber)}
        />
      </div>
    </div>
  );
}
