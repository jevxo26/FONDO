"use client";

import { DataTable } from "@/components/common/table";
import type { RowAction, FacetedFilter } from "@/components/common/table";
import { couponColumns } from "./coupon-columns";
import type { Coupon } from "@/data/payments";
import { Eye, Tag, Trash2 } from "lucide-react";

const rowActions: RowAction<Coupon>[] = [
  {
    label: "View Details",
    icon: <Eye className="size-4" />,
    onClick: (row) => console.log("View Coupon", row.id),
  },
  {
    label: "Delete",
    icon: <Trash2 className="size-4" />,
    variant: "destructive",
    onClick: (row) => console.log("Delete Coupon", row.id),
  },
];

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  icon: <Tag className="size-4" />,
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Expired", value: "EXPIRED" },
    { label: "Disabled", value: "DISABLED" },
  ],
};

export function CouponTableSection({ data }: { data: Coupon[] }) {
  return (
    <DataTable
      columns={couponColumns}
      data={data}
      rowActions={rowActions}
      filters={[statusFilter]}
    />
  );
}
