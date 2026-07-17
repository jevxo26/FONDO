"use client";

import { DataTable } from "@/components/common/table/data-table";
import type { KitchenOrder } from "@/data/kitchen";
import { kitchenOrderColumns } from "./kitchen-order-columns";
import type { RowAction, FacetedFilter } from "@/components/common/table/types";
import { ChefHat, CheckCircle, Package } from "lucide-react";

interface KitchenOrderTableProps {
  data: KitchenOrder[];
  isLoading?: boolean;
  onStartPrep?: (order: KitchenOrder) => void;
  onMarkReady?: (order: KitchenOrder) => void;
  onMarkPacked?: (order: KitchenOrder) => void;
}

export function KitchenOrderTable({ data, isLoading, onStartPrep, onMarkReady, onMarkPacked }: KitchenOrderTableProps) {
  const filters: FacetedFilter[] = [
    { columnId: "status", title: "Status", options: [
      { label: "Queued", value: "QUEUED" },
      { label: "Preparing", value: "PREPARING" },
      { label: "Ready", value: "READY" },
      { label: "Packed", value: "PACKED" },
    ]},
    { columnId: "mealType", title: "Meal", options: [
      { label: "Breakfast", value: "BREAKFAST" },
      { label: "Lunch", value: "LUNCH" },
      { label: "Dinner", value: "DINNER" },
      { label: "Snacks", value: "SNACKS" },
    ]},
  ];

  const rowActions: RowAction<KitchenOrder>[] = [
    ...(onStartPrep ? [{ label: "Start Prep", icon: <ChefHat className="size-3.5" />, onClick: onStartPrep }] : []),
    ...(onMarkReady ? [{ label: "Mark Ready", icon: <CheckCircle className="size-3.5" />, onClick: onMarkReady }] : []),
    ...(onMarkPacked ? [{ label: "Mark Packed", icon: <Package className="size-3.5" />, onClick: onMarkPacked }] : []),
  ];

  return (
    <DataTable
      columns={kitchenOrderColumns}
      data={data}
      isLoading={isLoading}
      pageSize={10}
      filters={filters}
      rowActions={rowActions}
      emptyMessage="No kitchen orders found."
    />
  );
}
