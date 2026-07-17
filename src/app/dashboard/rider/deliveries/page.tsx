"use client";

import { useState } from "react";
import { Bike } from "lucide-react";
import { toast } from "sonner";
import { riderDeliveries, type RiderDelivery } from "@/data/riders";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DeliveryTable } from "@/components/dashboard/rider/delivery-table";

export default function RiderDeliveriesPage() {
  const [deliveries, setDeliveries] = useState(riderDeliveries);

  const updateStatus = (id: string, status: RiderDelivery["status"]) => {
    setDeliveries((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const activeCount = deliveries.filter((d) => !["DELIVERED", "FAILED", "CANCELLED"].includes(d.status)).length;
  const deliveredCount = deliveries.filter((d) => d.status === "DELIVERED").length;

  return (
    <div>
      <PageHeader title="Deliveries" description="View and manage your assigned deliveries." icon={Bike} />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Total" value={deliveries.length} icon={Bike} accent="right" />
        <StatCard label="Active" value={activeCount} variant="warning" icon={Bike} accent="right" />
        <StatCard label="Delivered" value={deliveredCount} variant="success" icon={Bike} accent="right" />
      </div>
      <div className="mt-8">
        <DeliveryTable
          data={deliveries}
          onAccept={(d) => { updateStatus(d.id, "ACCEPTED"); toast.success("Delivery accepted"); }}
          onPickup={(d) => { updateStatus(d.id, "PICKED_UP"); toast.success("Marked as picked up"); }}
          onDeliver={(d) => { updateStatus(d.id, "DELIVERED"); toast.success("Delivery completed"); }}
          onCancel={(d) => { updateStatus(d.id, "CANCELLED"); toast.info("Delivery cancelled"); }}
        />
      </div>
    </div>
  );
}
