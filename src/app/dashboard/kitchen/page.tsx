"use client";

import { ChefHat, CookingPot, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { KitchenSummaryCards } from "@/components/dashboard/kitchen/kitchen-summary-cards";
import { KitchenOrderCard } from "@/components/dashboard/kitchen/kitchen-order-card";
import { useKitchenQueuePage } from "@/hooks/use-kitchen-queue";

export default function KitchenQueuePage() {
  const { queued, preparing, ready, isLoading, handleStartPrep, handleMarkReady } =
    useKitchenQueuePage();

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Today's Kitchen Queue" description="View and manage today's meal preparation queue." icon={ChefHat} />
        <div className="mt-12 flex justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const total = queued.length + preparing.length + ready.length;

  return (
    <div>
      <PageHeader title="Today's Kitchen Queue" description="View and manage today's meal preparation queue." icon={ChefHat} />
      <KitchenSummaryCards queued={queued.length} preparing={preparing.length} ready={ready.length} total={total} />

      {preparing.length > 0 && (
        <div className="mt-10">
          <h2 className="font-heading text-lg font-semibold text-foreground">In Preparation</h2>
          <p className="text-sm text-muted-foreground">{preparing.length} orders currently being cooked</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {preparing.map((order) => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                onMarkReady={(o) => handleMarkReady(o.id, o.orderNumber)}
              />
            ))}
          </div>
        </div>
      )}

      {queued.length > 0 && (
        <div className="mt-10">
          <h2 className="font-heading text-lg font-semibold text-foreground">Queued (Next to Prepare)</h2>
          <p className="text-sm text-muted-foreground">{queued.length} orders waiting</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {queued.slice(0, 6).map((order) => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                onStartPrep={(o) => handleStartPrep(o.id, o.orderNumber)}
              />
            ))}
          </div>
          {queued.length > 6 && (
            <p className="mt-2 text-center text-xs text-muted-foreground">+{queued.length - 6} more queued orders</p>
          )}
        </div>
      )}

      {preparing.length === 0 && queued.length === 0 && (
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <CookingPot className="size-12 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No active orders in the kitchen queue.</p>
        </div>
      )}
    </div>
  );
}

