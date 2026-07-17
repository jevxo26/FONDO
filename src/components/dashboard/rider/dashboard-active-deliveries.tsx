"use client";

import { DataTable } from "@/components/common/table/data-table";
import type { RiderDelivery } from "@/data/riders";
import { dashboardColumns } from "./dashboard-columns";

interface ActiveDeliveriesProps {
  data: RiderDelivery[];
  isLoading?: boolean;
}

export function DashboardActiveDeliveries({ data, isLoading }: ActiveDeliveriesProps) {
  return (
    <DataTable
      columns={dashboardColumns}
      data={data}
      isLoading={isLoading}
      pageSize={5}
      enableSearch={false}
      enableColumnToggle={false}
      emptyMessage="No active deliveries."
      className="mt-4"
    />
  );
}
