"use client";

import { DataTable } from "@/components/common/table/data-table";
import type { RiderDelivery } from "@/data/riders";
import { deliveryColumns } from "./delivery-columns";
import type { RowAction, FacetedFilter } from "@/components/common/table/types";
import { Check, X, Bike, MapPin } from "lucide-react";

interface DeliveryTableProps {
  data: RiderDelivery[];
  isLoading?: boolean;
  onAccept?: (delivery: RiderDelivery) => void;
  onPickup?: (delivery: RiderDelivery) => void;
  onDeliver?: (delivery: RiderDelivery) => void;
  onCancel?: (delivery: RiderDelivery) => void;
}

export function DeliveryTable({ data, isLoading, onAccept, onPickup, onDeliver, onCancel }: DeliveryTableProps) {
  const statusFilters: FacetedFilter[] = [
    { columnId: "status", title: "Status", options: [
      { label: "Assigned", value: "ASSIGNED" },
      { label: "Accepted", value: "ACCEPTED" },
      { label: "Picked Up", value: "PICKED_UP" },
      { label: "On the Way", value: "ON_THE_WAY" },
      { label: "Delivered", value: "DELIVERED" },
    ]},
  ];

  const rowActions: RowAction<RiderDelivery>[] = [
    ...(onAccept ? [{ label: "Accept", icon: <Check className="size-3.5" />, onClick: onAccept }] : []),
    ...(onPickup ? [{ label: "Mark Picked Up", icon: <Bike className="size-3.5" />, onClick: onPickup }] : []),
    ...(onDeliver ? [{ label: "Mark Delivered", icon: <MapPin className="size-3.5" />, onClick: onDeliver }] : []),
    ...(onCancel ? [{ label: "Cancel", icon: <X className="size-3.5" />, onClick: onCancel, variant: "destructive" as const }] : []),
  ];

  return (
    <DataTable
      columns={deliveryColumns}
      data={data}
      isLoading={isLoading}
      pageSize={10}
      filters={statusFilters}
      rowActions={rowActions}
      emptyMessage="No deliveries found."
    />
  );
}
