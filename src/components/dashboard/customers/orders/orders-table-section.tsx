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
] as const;

export function OrdersTableSection({ data }: { data: CustomerOrder[] }) {
  const [sortKey, setSortKey] = useState("newest");

  const sortedData = useMemo(() => {
    const sorted = [...data];
    switch (sortKey) {
      case "newest":
        sorted.sort((a, b) => b.placedAt.localeCompare(a.placedAt));
        break;
      case "oldest":
        sorted.sort((a, b) => a.placedAt.localeCompare(b.placedAt));
        break;
      case "amount-desc":
        sorted.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
      case "amount-asc":
        sorted.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
    }
    return sorted;
  }, [data, sortKey]);

  return (
    <DataTable
      columns={orderColumns}
      data={sortedData}
      rowActions={rowActions}
      toolbarActions={
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
      }
    />
  );
}
