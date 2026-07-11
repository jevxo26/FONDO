"use client";

import type { RowAction } from "@/components/common/table";
import { DataTable } from "@/components/common/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CustomerOrder } from "@/data/orders";
import { Eye, Truck, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { orderColumns } from "./order-columns";

const rowActions: RowAction<CustomerOrder>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Details", row.id),
  },
  {
    label: "Assign Rider",
    icon: <Truck className="size-4" />,
    onClick: (row) => console.log("Assign Rider", row.id),
  },
  {
    label: "Cancel Order",
    icon: <XCircle className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Cancel Order", row.id),
  },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "amount-desc", label: "Highest Amount" },
  { value: "amount-asc", label: "Lowest Amount" },
  { value: "status", label: "Order Status" },
] as const;

const statusOptions = [
  { value: "all", label: "All Orders" },
  { value: "processing", label: "Processing" },
  { value: "out-for-delivery", label: "Out for Delivery" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

const statusPriority: Record<string, number> = {
  PENDING: 0,
  PREPARING: 1,
  ON_THE_WAY: 2,
  COMPLETED: 3,
  CANCELLED: 4,
};

const statusFilterMap: Record<string, string[]> = {
  all: [],
  processing: ["PENDING", "PREPARING"],
  "out-for-delivery": ["ON_THE_WAY"],
  completed: ["COMPLETED"],
  cancelled: ["CANCELLED"],
};

export function OrdersTableSection({ data }: { data: CustomerOrder[] }) {
  const [sortKey, setSortKey] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");

  const sortedData = useMemo(() => {
    const filtered =
      statusFilter === "all"
        ? [...data]
        : data.filter((o) => statusFilterMap[statusFilter].includes(o.orderStatus));
    switch (sortKey) {
      case "newest":
        filtered.sort((a, b) => b.placedAt.localeCompare(a.placedAt));
        break;
      case "oldest":
        filtered.sort((a, b) => a.placedAt.localeCompare(b.placedAt));
        break;
      case "amount-desc":
        filtered.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
      case "amount-asc":
        filtered.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
      case "status":
        filtered.sort(
          (a, b) => (statusPriority[a.orderStatus] ?? 0) - (statusPriority[b.orderStatus] ?? 0),
        );
        break;
    }
    return filtered;
  }, [data, sortKey, statusFilter]);

  return (
    <DataTable
      columns={orderColumns}
      data={sortedData}
      rowActions={rowActions}
      toolbarActions={
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
            <SelectTrigger className="w-40 border-border text-xs font-bold">
              <SelectValue>
                {statusOptions.find((o) => o.value === statusFilter)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortKey} onValueChange={(v) => v && setSortKey(v)}>
            <SelectTrigger className="w-36 border-border text-xs font-bold">
              <SelectValue>{sortOptions.find((o) => o.value === sortKey)?.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    />
  );
}
